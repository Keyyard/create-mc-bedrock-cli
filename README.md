Thursday, August 6, 2026 at 9:50 AM

Here is a modernized, clean, and well-structured rewrite of your `README.md`:

---

# Create MC Bedrock CLI

**The fastest, most reliable way to build Minecraft Bedrock Add-ons.**

Scaffold a clean workspace in seconds, then generate custom content with a single command.

---

## 🚀 Why Bedrock CLI 3.0?

Bedrock CLI 3.0 introduces the **Generator Release**. Say goodbye to picking monolithic templates—start with a lightweight, clean starter project, then dynamically scaffold entities, blocks, tools, armor, and items on demand.

* **Automated File Linking:** Generates linked behavior/resource JSONs, texture atlas entries, and language strings automatically.
* **UUID Management:** Automatically regenerates unique UUIDs and keeps Behavior Pack (BP) ↔ Resource Pack (RP) dependencies in perfect sync.
* **Developer Safe:** Built-in `--dry-run` flag lets you preview file changes before writing to disk.

---

## ⚡ Quick Start

Initialize a new project instantly using `npx`:

```bash
npx create-mc-bedrock

```

### Interactive Setup Flow

1. **Project Name:** Sets names in `bedrock.config.json`, `package.json`, and pack manifests.
2. **Destination Folder:** Defaults to `./<project-name>`.
3. **Dependency Installation:** Prompts to automatically run `npm install`.

---

## 📂 Project Structure

```text
my-addon/
├── bedrock.config.json   # CLI & compiler configuration
├── package.json          # Dependencies & npm scripts
├── tsconfig.json         # TypeScript configuration
├── src/
│   └── main.ts           # Entry point (bundled into BP/scripts/main.js)
├── packs/
│   ├── BP/               # Behavior Pack files & manifest.json
│   └── RP/               # Resource Pack files & manifest.json
└── dist/                 # Compiled build output (gitignored)

```

### Available Development Scripts

| Command | Action |
| --- | --- |
| `npm run build` | Builds the project for development |
| `npm run watch` | Rebuilds project automatically on file save |
| `npm run deploy` | Builds and deploys directly to your local Minecraft installation |
| `npm run deploy:watch` | Real-time hot-reloading directly to local Minecraft |
| `npm run pack` | Creates a production release and zips it into a `.mcaddon` package |
| `npm run release` | Compiles a production release without packaging |

*For complete configuration options, check out the [`bedrock.config.json` Reference](https://bedrockcli.keyyard.xyz/docs).*

---

## 🛠️ Content Generators

Run these generators directly inside your project directory to scaffold content seamlessly:

| Generator Command | Description |
| --- | --- |
| `npm run create:weapon` | 2D/3D weapons with default behavior stats; builds item + attachable |
| `npm run create:tool` | Tool picker (Pickaxe, Axe, Shovel, Hoe) with proper mining logic |
| `npm run create:armor` | Armor sets (Helmet, Chestplate, Leggings, Boots), icon-only or 3D |
| `npm run create:item` | Basic custom item with texture registration |
| `npm run create:entity` | Basic custom entity with geometry, animations, and texture |
| `npm run create:block` | Basic block with texture registration |

> **Pro Tip:** Generators are **idempotent** (safe to re-run) and support `--dry-run`. For custom 3D assets, import your model/texture/animation files first, and the generator will automatically wire up all references for you!

---
## 💻 Requirements

* **Node.js:** v18.0.0 or higher.
* **OS:** Windows is recommended for automated deployment to the default Minecraft retail directory. Custom deployment paths can be configured for Mac and Linux (native Mac/Linux retail auto-deploy coming soon).

---

## 🔗 Project Links

* **CLI Repository:** [Keyyard/create-mc-bedrock-cli](https://github.com/Keyyard/create-mc-bedrock-cli)
* **Compiler Engine (`@keyyard/bedrock-build`):** [Keyyard/bedrock-build](https://github.com/Keyyard/bedrock-build)
* **Official Website:** [bedrockcli.keyyard.xyz](https://bedrockcli.keyyard.xyz/)
* **Documentation:** [bedrockcli.keyyard.xyz/docs](https://bedrockcli.keyyard.xyz/docs)

---

## 🤝 Contributing

We welcome community contributions!

* **Community Templates:** Want to submit a custom template? Submit a PR to [Keyyard/custom-mc-scripting-templates](https://github.com/Keyyard/custom-mc-scripting-templates).
* **Bug Reports & Ideas:** Found an issue with the CLI or compiler? Open an issue on GitHub or join our [Discord Server](https://discord.gg/EJ4swPKJNU).

---

## 💖 Credits & Acknowledgments

* **Beyond64** ([@OsmaanGani](https://github.com/OsmaanGani)) — Creator of the official package banner artwork.
* **PottedPropagule** ([@PottedPropagule](https://github.com/PottedPropagule)) — Valuable testing, issue reporting, and feedback.

---

Crafted with ❤️ for the **Minecraft Bedrock Developer Community**.

[⭐ Star us on GitHub](https://github.com/keyyard/create-mc-bedrock-cli/stargazers)
