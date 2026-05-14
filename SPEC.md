# `@keyyard/bedrock-build` — Specification v1.0

> **Status:** This is the contract for the compiler package. Agents implementing the compiler MUST follow this spec exactly. Any deviation needs to come back to the Tech Lead first.

---

## 1. Package metadata

| Field | Value |
|---|---|
| Name | `@keyyard/bedrock-build` |
| Initial version | `0.1.0` (will hit `1.0.0` when paired with `create-mc-bedrock@2.0`) |
| License | MIT |
| Type | `module` (ESM) |
| Engines | `"node": ">=18"` |
| Binary | `bedrock-build` |
| Entry | `dist/cli.js` |
| Main | `dist/index.js` (for programmatic use) |
| Files published | `dist/`, `README.md`, `LICENSE` |

---

## 2. CLI surface

```
Usage:
  bedrock-build <command> [options]

Commands:
  build               Compile sources and copy packs to dist/
  watch               Build, then rebuild on file changes (no deploy)
  deploy              Build, then copy dist/packs to com.mojang/development_*_packs/
  pack                Build --release, then zip into .mcaddon

Global options:
  -c, --config <path>   Path to bedrock.config.json (default: ./bedrock.config.json)
  -v, --verbose         Verbose logging
  -h, --help            Show help
  --version             Show version
```

Global flags apply to **every** subcommand. `--config` resolves the config path for `build`, `watch`, `deploy`, and `pack` uniformly.

### `build` flags

```
bedrock-build build [options]

  --release            Minified, no sourcemaps, NODE_ENV=production
                       (default: dev mode — sourcemaps on, no minify)
  --clean              Remove dist/ before building (default: false)
```

### `watch` flags

```
bedrock-build watch [options]

  (no watch-specific flags for v1)
```

Watch mode never minifies. Watch mode does NOT deploy — use `deploy --watch` for that.

### `deploy` flags

```
bedrock-build deploy [options]

  --watch              Rebuild and re-deploy on file changes
  --release            Build in release mode before deploying
                       (default: dev mode)
```

### `pack` flags

```
bedrock-build pack [options]

  --output <path>      Override output .mcaddon path
                       (default: dist/<name>-<version>.mcaddon)
```

`pack` always implies `--release`. There is no `--dev-pack`.

### Exit codes

| Code | Meaning |
|---|---|
| 0 | Success |
| 1 | Generic error (config missing, build failure, etc.) |
| 2 | Invalid config file (schema validation failure) |
| 3 | Deploy target not found (com.mojang dir doesn't exist) |
| 4 | Pack failure (zip step failed) |

---

## 3. `bedrock.config.json` schema

```ts
interface BedrockConfig {
  /** Project name, used for .mcaddon filename and manifest header.name */
  name: string;

  /** Project version, used for .mcaddon filename */
  version: string;

  /** Pack source directories (relative to config file) */
  packs: {
    bp: string;  // default: "packs/BP"
    rp: string;  // default: "packs/RP"
  };

  /** TS entry point for the script module (relative to config file) */
  entry: string;  // default: "src/main.ts"

  /** Build output directory (relative to config file) */
  out: string;  // default: "dist"

  /** Deploy configuration */
  deploy: {
    target: "retail" | "custom";  // default: "retail"
    customPath: string | null;     // required when target === "custom"
  };

  /** Minecraft scripting API target version */
  minecraft?: {
    serverVersion?: string;  // e.g., "1.19.0" — used for hints, not enforced
  };
}
```

### Validation rules

- `name` and `version` are required. `version` must be valid semver.
- `packs.bp` and `packs.rp` must exist as directories on disk at build time.
- Each pack directory must contain a `manifest.json`.
- `entry` must exist as a file at build time.
- If `deploy.target === "custom"`, `deploy.customPath` must be a non-empty string. If `deploy.target === "retail"`, `customPath` is ignored.

### Defaults

If a field is omitted, apply defaults silently. Only `name` and `version` are required to be present.

---

## 4. Expected workspace layout

```
<project>/
  bedrock.config.json
  package.json
  tsconfig.json
  src/
    main.ts                   ← entry
  packs/
    BP/
      manifest.json
      blocks/ entities/ items/ ...
    RP/
      manifest.json
      textures/ models/ ...
  dist/                       ← gitignored, owned by bedrock-build
```

The compiler does NOT regenerate manifest UUIDs at build time. UUIDs are frozen by the scaffolder and committed to git. The compiler reads them as-is.

---

## 5. Subcommand behavior contracts

### 5.1 `build`

1. Load and validate config.
2. If `--clean`, remove `<out>/` recursively.
3. Bundle `<entry>` via esbuild:
   - Target: `es2020`
   - Format: `esm`
   - Platform: `neutral`
   - Bundle: `true`
   - External: `["@minecraft/server", "@minecraft/server-ui", "@minecraft/server-net", "@minecraft/server-admin", "@minecraft/server-gametest"]`
   - Sourcemap: `inline` (dev) / `false` (release)
   - Minify: `false` (dev) / `true` (release)
   - Output: `<out>/packs/BP/scripts/main.js`
4. Copy `<packs.bp>/*` into `<out>/packs/BP/`. **Note:** source workspaces SHOULD NOT have a `<packs.bp>/scripts/` directory — the script module is built from `<entry>` and emitted directly to `<out>/packs/BP/scripts/main.js`. If a `scripts/` folder exists under `<packs.bp>/`, skip it during copy to avoid clobbering the bundled output (defensive only).
5. Copy `<packs.rp>/*` into `<out>/packs/RP/`.
6. Log success with elapsed time.

**Side effects:** Only writes under `<out>/`. Never touches source files.

### 5.2 `watch`

Same as `build` (dev mode), then watch the following with chokidar:
- `<entry>` and everything it imports (via esbuild watch context)
- `<packs.bp>/**/*` (excluding `<packs.bp>/scripts/`)
- `<packs.rp>/**/*`

On change:
- Source file → trigger esbuild rebuild (incremental).
- Pack file → copy the changed file to its dist mirror.

Debounce: 50ms. Log each rebuild with timestamp + what changed.

Ctrl+C exits cleanly with code 0.

### 5.3 `deploy`

1. Run `build` (respecting `--release`).
2. Resolve deploy target:
   - `retail` (Windows): iterate the candidate path list below in order and return the first that exists as a directory. If none match, throw with exit code 3 and a message listing every path checked.
   - `custom`: use `deploy.customPath` directly. Throw with exit code 3 if path doesn't exist.
3. Compute target subdirs:
   - BP `=>` `<comMojang>/development_behavior_packs/<name>/`
   - RP `=>` `<comMojang>/development_resource_packs/<name>/`
4. Remove the target subdirs (clean slate), then copy `<out>/packs/BP/` and `<out>/packs/RP/` into them.
5. If `--watch`, enter watch mode and re-deploy on each rebuild.

#### Retail candidate paths (priority order)

Mirrors the detection logic in Microsoft's `@minecraft/core-build-tasks` so any Bedrock install layout it supports also works here.

| # | Layout | Path |
|---|---|---|
| 1 | Minecraft Bedrock launcher (modern) | `%APPDATA%\Minecraft Bedrock\Users\Shared\games\com.mojang` |
| 2 | Minecraft Bedrock Preview launcher | `%APPDATA%\Minecraft Bedrock Preview\Users\Shared\games\com.mojang` |
| 3 | Microsoft Store UWP (legacy) | `%LOCALAPPDATA%\Packages\Microsoft.MinecraftUWP_8wekyb3d8bbwe\LocalState\games\com.mojang` |
| 4 | Microsoft Store UWP Beta | `%LOCALAPPDATA%\Packages\Microsoft.MinecraftWindowsBeta_8wekyb3d8bbwe\LocalState\games\com.mojang` |
| 5 | Minecraft Education (UWP) | `%LOCALAPPDATA%\Packages\Microsoft.MinecraftEducationEdition_8wekyb3d8bbwe\LocalState\games\com.mojang` |
| 6 | Minecraft Education (desktop) | `%APPDATA%\Minecraft Education Edition\games\com.mojang` |

**Fallback** after the priority list misses: glob `%LOCALAPPDATA%\Packages\Microsoft.MinecraftUWP_*` case-insensitively (handles unusual publisher hashes or case variants). Return the first `LocalState/games/com.mojang` that exists.

**Cross-platform note:** Phase 1 supports Windows retail only. Custom path works on all platforms. Mac/Linux retail detection is a P2 (not 2.0).

On non-Windows platforms with `deploy.target === "retail"`, throw with exit code 3 and the message: `"Retail deploy is Windows-only for v1.0. Set deploy.target='custom' and deploy.customPath to your Minecraft data directory."`

### 5.4 `pack`

1. Run `build --release`.
2. Create zip with contents:
   ```
   <name>-<version>.mcaddon
     <name>_BP/    ← contents of dist/packs/BP/
     <name>_RP/    ← contents of dist/packs/RP/
   ```
   (Two subfolders inside the zip, named after the project + pack type. Minecraft accepts this layout.)
3. Output to `<out>/<name>-<version>.mcaddon` (or `--output` if given).
4. Log path + file size.

Use `archiver` for zipping. No native zip binary dependency.

---

## 6. Dependencies (locked)

Production:
- `esbuild` ^0.24.0
- `chokidar` ^4.0.0
- `archiver` ^7.0.0
- `picocolors` ^1.1.0 (for terminal coloring — small, no deps)

Dev:
- `typescript` ^5.6.0
- `@types/node` ^22.0.0
- `tsup` ^8.0.0 (to build the package itself — outputs `dist/cli.js` + `dist/index.js`)

No other runtime deps. Do not add `commander`, `yargs`, `cac`, etc. — write the arg parser by hand. The flag surface is small enough that ~50 lines of code beats taking on a dep.

---

## 7. Logging conventions

- Use `picocolors` for color.
- Format: `[bedrock-build] <emoji> <message>`
- Levels:
  - `info` (cyan): `📦 Building...`, `🚀 Deploying to retail...`
  - `success` (green): `✅ Built in 142ms`
  - `warn` (yellow): `⚠️  Pack <name> missing pack_icon.png`
  - `error` (red): `❌ Config validation failed: packs.bp does not exist`
- `--verbose` adds debug lines prefixed with `[debug]` in gray.

---

## 8. What's OUT of scope for v1.0

Do NOT implement:
- JSON minification
- Asset hashing
- Multi-environment manifests (dev/release with different UUIDs)
- Mac/Linux retail detection
- Bedrock Preview / Education Edition deploy
- Source maps in release builds
- A `bedrock-build init` command (that's `create-mc-bedrock`'s job)
- Manifest UUID rewriting (that's the scaffolder's job)
- TypeScript type checking (esbuild only transpiles; if users want tsc checking, they run `tsc --noEmit` separately)

These may come in 1.1+. Resist scope creep.

---

## 9. File layout for the package repo

```
packages/bedrock-build/        ← or its own repo, TBD
  src/
    cli.ts                     ← entry: parse argv, dispatch
    commands/
      build.ts
      watch.ts
      deploy.ts
      pack.ts
    config.ts                  ← schema + loader + validator
    logger.ts                  ← picocolors wrappers
    paths.ts                   ← com.mojang resolution
    bundler.ts                 ← esbuild config builder
    copier.ts                  ← pack file copying
  package.json
  tsconfig.json
  tsup.config.ts
  README.md
  LICENSE
```

---

## 10. Programmatic API (minimum)

```ts
import { build, watch, deploy, pack, loadConfig } from "@keyyard/bedrock-build";

const config = await loadConfig("./bedrock.config.json");
await build(config, { release: false, clean: true });
```

Each command function takes `(config, options)` and returns `Promise<void>` (throws on error). Used by `create-mc-bedrock`'s scaffold step to run an initial build.

---

## 11. Testing expectations

Each command needs at minimum:
- One smoke test against a fixture workspace under `test/fixtures/basic-addon/`
- Config loader: unit tests for valid + invalid configs (one per validation rule)

Use `vitest`. Run via `npm test`.
