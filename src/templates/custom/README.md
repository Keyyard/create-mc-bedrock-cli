# {{PROJECT_NAME}}

A Minecraft Bedrock addon scaffolded with [`create-mc-bedrock`](https://bedrockcli.keyyard.xyz) and powered by [`@keyyard/bedrock-build`](https://bedrockcli.keyyard.xyz/docs).

## Getting started

Install dependencies:

```bash
npm install
```

Scaffold canonical Bedrock pack folders interactively (no more guessing whether it's `entity` or `entities`):

```bash
npm run folders
```

Pick the folders you need from the list and they get created under `packs/BP/` and `packs/RP/`.

Build once into `dist/`:

```bash
npm run build
```

Watch sources and rebuild on every change:

```bash
npm run watch
```

Build and deploy to your local Minecraft (Bedrock retail on Windows). The `--watch` variant redeploys on every save — the fastest dev loop:

```bash
npm run deploy
npm run deploy:watch
```

Produce a shareable `.mcaddon` for distribution:

```bash
npm run pack
```

## Generate content

Scaffold a fully-wired feature (behavior JSON + resource JSON + texture/lang registration) in one command:

```bash
npm run create:weapon   # diamond-sword-style weapon (2D or 3D attachable)
npm run create:tool     # pickaxe / axe / shovel / hoe
npm run create:armor    # helmet / chestplate / leggings / boots
npm run create:item     # generic item
npm run create:entity   # BP + RP entity pair
npm run create:block    # block + terrain/blocks/lang registration
```

Pass a name and flags after `--`, e.g. `npm run create:weapon -- fire_sword --mode 3d --icon sword`.

## Project layout

```text
{{PROJECT_NAME}}/
  config.json           ← compiler config
  src/
    main.ts             ← entry — bundled into BP/scripts/main.js
  packs/
    BP/ manifest.json + items/ entities/ blocks/ spawn_rules/ recipes/ loot_tables/
    RP/ manifest.json + attachables/ render_controllers/ entity/ texts/ textures/ ...
  dist/                 ← build output (gitignored)
```

## Learn more

Full documentation, cookbook recipes, and the `config.json` reference live at <https://bedrockcli.keyyard.xyz/docs>.
