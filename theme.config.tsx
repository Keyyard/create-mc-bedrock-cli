import React from "react";
import { ThemeSwitch, type DocsThemeConfig } from "nextra-theme-docs";

const config: DocsThemeConfig = {
  logo: <span style={{ fontWeight: 700 }}>Bedrock CLI</span>,
  project: {
    link: "https://github.com/Keyyard/create-mc-bedrock-cli",
  },
  chat: {
    link: "https://discord.gg/EJ4swPKJNU",
  },
  docsRepositoryBase:
    "https://github.com/Keyyard/create-mc-bedrock-cli/tree/main/website",
  useNextSeoProps() {
    return {
      titleTemplate: "%s | Bedrock CLI",
    };
  },
  head: (
    <>
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta property="og:title" content="Bedrock CLI Docs" />
      <meta
        property="og:description"
        content="Documentation for Create Bedrock CLI. The fastest way to start Minecraft Bedrock Addon development."
      />
    </>
  ),
  // `darkMode: false` hides the sidebar's built-in theme switch.
  // The navbar one below replaces it, top-right placement.
  darkMode: false,
  navbar: {
    extraContent: <ThemeSwitch />,
  },
  nextThemes: {
    defaultTheme: "dark",
  },
  footer: {
    text: "© 2025 Keyyard. MIT Licensed.",
  },
  sidebar: {
    defaultMenuCollapseLevel: 1,
  },
  // Emerald to match marketing site (#10b981 = emerald-500 = hsl(160 84% 39%)).
  primaryHue: 160,
  primarySaturation: 84,
};

export default config;
