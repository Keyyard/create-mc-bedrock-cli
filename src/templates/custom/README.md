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

## Project layout

```text
{{PROJECT_NAME}}/
  bedrock.config.json   ← compiler config
  src/
    main.ts             ← entry — bundled into BP/scripts/main.js
  packs/
    BP/ manifest.json + behavior pack assets
    RP/ manifest.json + resource pack assets
  dist/                 ← build output (gitignored)
```

## Learn more

Full documentation, cookbook recipes, and the `bedrock.config.json` reference live at <https://bedrockcli.keyyard.xyz/docs>.
