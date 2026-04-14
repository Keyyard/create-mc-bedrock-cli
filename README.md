<div>
   <h1>Create MC Bedrock CLI</h1>
   <p>also known as Bedrock CLI
</p>
</div> 
<div align="center">

[![GitHub Stars](https://img.shields.io/github/stars/keyyard/create-mc-bedrock-cli?style=social)](https://github.com/keyyard/create-mc-bedrock-cli)
[![Version](https://img.shields.io/badge/version-1.5.0-blue.svg)](https://github.com/keyyard/create-mc-bedrock-cli)
[![Node.js](https://img.shields.io/badge/Node.js-18%2B-green.svg)](https://nodejs.org/)
[![License](https://img.shields.io/badge/license-MIT-orange.svg)](LICENSE)

[![Website](https://img.shields.io/badge/visit%20our%20website-8A2BE2)](https://bedrockcli.keyyard.xyz/)

<br/>

<img src="medias/create-bedrock-cli-banner.png" alt="Create MC Bedrock CLI Banner" width="600" />

</div>

**The Fastest Way to Start Minecraft Bedrock Addon Development! 🚀**
</div>

---

**Tired of manually setting up Minecraft Bedrock workspaces?**  
With `create-mc-bedrock`, you can bootstrap your next project in seconds, using official Microsoft samples and fresh manifest UUIDs every time.

## Table of Contents
- [✨ Why Use Create MC Bedrock CLI?](#-why-use-create-mc-bedrock-cli)
- [🚀 How It Works](#-how-it-works)
- [🔧 Regolith Integration](#-regolith-integration)
- [📸 Showcase](#-showcase)
- [🛠️ Features](#-features)
- [📦 Requirements](#-requirements)
- [💡 Pro Tips](#-pro-tips)
- [🤝 Contributing](#-contributing)
- [📄 License](#-license)
- [🙏 Credits](#-credits)

## ✨ Why Use Create MC Bedrock CLI?

### ⚡ **Instant Project Setup**

No more copy-pasting or manual configuration. Select a sample, pick a folder, and your workspace is ready to go—complete with unique manifest UUIDs.

### 🧠 **Focus on Building, Not Boilerplate**

Spend your time creating, not setting up. All the essentials are handled for you, so you can jump straight into development.

### 🔒 **Always Unique, Always Clean**

Every project is generated with new manifest UUIDs, ensuring no conflicts and a smooth import into Minecraft.

### 🗂️ **Official Samples, Your Way**

Choose from a curated list of Microsoft’s best scripting samples. Your selected template is cloned directly into your chosen folder—no nested directories, no confusion.

---

## 🚀 How It Works

1. **Run the CLI:**
   ```bash
   npx create-mc-bedrock
   ```
2. **Follow the Prompts:**
   - Select a sample project (⭐ `ts-starter` is recommended for TypeScript users!)
   - Choose your destination folder
3. **Start Coding:**
   - Your workspace is ready, with all manifests updated and temp files cleaned up.

---

## 🔧 Regolith Integration

[Regolith](https://github.com/Bedrock-OSS/regolith) is a popular Bedrock addon compiler that runs filter pipelines on your BP/RP before exporting to `com.mojang`. Create MC Bedrock CLI now supports scaffolding Regolith-compatible projects out of the box.

When the CLI asks **"Set up as a Regolith project?"**, answering yes will:

- Flatten the pack folders from `behavior_packs/<name>/` → `BP/` and `resource_packs/<name>/` → `RP/` (the layout Regolith expects)
- Generate a `config.json` with the correct Regolith schema (name, author, packs, profiles, filterDefinitions)
- Create a `data/` directory for filter data
- Create a `.regolith/` directory (Regolith's internal cache)
- Add `/build` and `/.regolith` to `.gitignore`

**Resulting structure:**
```
my-addon/
  config.json       ← Regolith config
  BP/               ← behavior pack source
  RP/               ← resource pack source
  data/             ← filter data
  .regolith/        ← Regolith cache (git-ignored)
  .gitignore
```

**Next steps after scaffolding with Regolith:**
1. [Install Regolith](https://regolith-docs.readthedocs.io/en/latest/introduction/installation/)
2. Add filters to `config.json` under `regolith.filterDefinitions`
3. Run `regolith install-all` to download filter dependencies
4. Run `regolith run` to compile your addon

---

## 📸 Showcase

<div align="center">
    <img src="medias/gif.gif" alt="Create MC Bedrock CLI in action" width="600" />
    <img src="medias/img1.png" alt="Create MC Bedrock CLI screenshot" width="600" />
    <img src="medias/img2.png" alt="Create MC Bedrock CLI screenshot" width="600" />
</div>

---

## 🛠️ Features

- Interactive CLI with sample selection
- Direct cloning to your specified folder (no more nested directories)
- Automatic manifest UUID regeneration for every project
- Supports both JavaScript and TypeScript samples
- **Regolith integration** — optional one-prompt scaffold for Regolith-compatible projects (flat `BP/`/`RP/`, `config.json`, `data/`)
- Cleans up temporary files after setup

---

## 📦 Requirements

- Node.js 18 or higher

---

## 💡 Pro Tips

- Use the ⭐ `ts-starter` template for a modern TypeScript setup.
- Run the CLI with `npx` for the latest version every time.
- All generated projects are ready to open in VS Code—just `cd` into your folder and run `code .`

---

## 🤝 Contributing

We’d love your help to make Create MC Bedrock CLI even better!  
Whether you have ideas, spot a bug, or want to share new samples, your contributions are always welcome.

Want to add a new workspace template?  
Simply open a pull request to the [Custom MC Scripting Templates](https://github.com/Keyyard/custom-mc-scripting-templates) repository.

Every suggestion, issue, or PR helps the community grow—jump in and let’s build something awesome together!

---

## 🙏 Credits

- **Beyond64** ([OsmaanGani](https://github.com/OsmaanGani)): Package banner artist
- **PottedPropagule** ([PottedPropagule](https://github.com/PottedPropagule)): Issue reporter and helpful feedback

---

## ⭐ Stargazers Over Time

<a href="https://www.star-history.com/#Keyyard/create-mc-bedrock-cli&Date">
 <picture>
   <source media="(prefers-color-scheme: dark)" srcset="https://api.star-history.com/svg?repos=Keyyard/create-mc-bedrock-cli&type=Date&theme=dark" />
   <source media="(prefers-color-scheme: light)" srcset="https://api.star-history.com/svg?repos=Keyyard/create-mc-bedrock-cli&type=Date" />
   <img alt="Star History Chart" src="https://api.star-history.com/svg?repos=Keyyard/create-mc-bedrock-cli&type=Date" />
 </picture>
</a>

<div align="center">
  **Made with ❤️ for the Minecraft Bedrock dev community**  
  <br/>
  <a href="https://github.com/keyyard/create-mc-bedrock-cli/stargazers">
    ⭐ Star us on GitHub
  </a>
</div>
