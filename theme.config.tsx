import React from "react";
import type { DocsThemeConfig } from "nextra-theme-docs";

const config: DocsThemeConfig = {
  logo: <span style={{ fontWeight: 700 }}>Bedrock CLI</span>,
  project: {
    link: "https://github.com/keyyard/create-mc-bedrock-cli",
  },
  chat: {
    link: "https://discord.gg/EJ4swPKJNU",
  },
  docsRepositoryBase:
    "https://github.com/keyyard/create-mc-bedrock-cli/tree/main/website",
  useNextSeoProps() {
    return {
      titleTemplate: "%s – Bedrock CLI",
    };
  },
  head: (
    <>
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta property="og:title" content="Bedrock CLI Docs" />
      <meta
        property="og:description"
        content="Documentation for Create Bedrock CLI – the fastest way to start Minecraft Bedrock Addon development."
      />
    </>
  ),
  darkMode: true,
  nextThemes: {
    defaultTheme: "dark",
  },
  footer: {
    text: "© 2025 Keyyard. MIT Licensed.",
  },
  sidebar: {
    defaultMenuCollapseLevel: 1,
  },
  primaryHue: 25,
  primarySaturation: 90,
};

export default config;
