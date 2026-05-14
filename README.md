# Bedrock CLI Website & Docs

[![Live site](https://img.shields.io/badge/site-bedrockcli.keyyard.xyz-8A2BE2)](https://bedrockcli.keyyard.xyz/)
[![npm: create-mc-bedrock](https://img.shields.io/npm/v/create-mc-bedrock?label=create-mc-bedrock&color=cb3837&logo=npm)](https://www.npmjs.com/package/create-mc-bedrock)
[![npm: @keyyard/bedrock-build](https://img.shields.io/npm/v/@keyyard/bedrock-build?label=%40keyyard%2Fbedrock-build&color=cb3837&logo=npm)](https://www.npmjs.com/package/@keyyard/bedrock-build)
[![Discord](https://img.shields.io/badge/Discord-join-5865F2?logo=discord&logoColor=white)](https://discord.gg/EJ4swPKJNU)

Marketing site + Nextra documentation for [`create-mc-bedrock`](https://www.npmjs.com/package/create-mc-bedrock) and [`@keyyard/bedrock-build`](https://www.npmjs.com/package/@keyyard/bedrock-build). Lives on the `website` branch of the main CLI repo; deployed to <https://bedrockcli.keyyard.xyz/>.

## Stack

- Next.js 15 (pages router), static export
- Tailwind v4
- Nextra v2 for docs at `/docs/*`
- TypeScript, ESLint
- Hosted via GitHub Pages from the static `out/` build

## Layout

```text
website/
  src/
    pages/
      index.tsx           ← landing page (organism composition)
      docs/               ← Nextra MDX (getting-started, concepts, guides, reference, cookbook)
    components/
      atoms/              ← CopyBlock, ShieldsBadge
      organism/           ← Header, TopNav, PainPoints, ChoosePath, Features, Comparison, Showcase, CTA, Footer
    data/
      showcase.ts         ← edit to add real community projects
      version.ts          ← CLI version sourced from ../../cli/package.json
    styles/
      globals.css
  theme.config.tsx        ← Nextra docs theme
  next.config.mjs         ← Nextra wrapper + Next config
```

## Local dev

```bash
npm install
npm run dev               # http://localhost:3000
npm run build             # static export → out/
```

## Deploy

A GitHub Actions workflow ([`Deploy static site`]) runs on every push to this branch and publishes `out/` to GitHub Pages. CNAME is set to `bedrockcli.keyyard.xyz`.

## Contributing to docs

Docs live under `src/pages/docs/`. MDX with Nextra's components (`<Callout>`, etc.). Each section has a `_meta.json` controlling sidebar order and labels. To add a page:

1. Create the `.mdx` file in the right subdirectory.
2. Add an entry to that directory's `_meta.json`.
3. Test with `npm run dev`.

## License

MIT. Source for the CLI and compiler is in sibling repos:

- [`Keyyard/create-mc-bedrock-cli`](https://github.com/Keyyard/create-mc-bedrock-cli) (`main` branch)
- [`Keyyard/bedrock-build`](https://github.com/Keyyard/bedrock-build)
- [`Keyyard/custom-mc-scripting-templates`](https://github.com/Keyyard/custom-mc-scripting-templates)
