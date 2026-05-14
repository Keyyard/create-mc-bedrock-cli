import React from "react";
import Image from "next/image";
import { CLI_VERSION } from "@/data/version";

const Footer: React.FC = () => (
  <footer className="flex flex-col items-center text-center text-gray-400 border-t border-zinc-800 pt-8 pb-6 px-4">
    <p className="text-base text-gray-200">
      Made with <span className="text-red-400">❤️</span> for the Minecraft
      Bedrock development community
    </p>
    <div className="mt-4 flex flex-wrap gap-3 justify-center">
      <a
        href="https://github.com/Keyyard/create-mc-bedrock-cli"
        target="_blank"
        rel="noopener noreferrer"
      >
        <Image
          src="https://img.shields.io/badge/Github%20Repository-Red?style=for-the-badge&logo=Github&logoColor=white&labelColor=%23181717&color=white"
          alt="Github Repository"
          width={180}
          height={30}
        />
      </a>
      <a
        href="https://discord.gg/EJ4swPKJNU"
        target="_blank"
        rel="noopener noreferrer"
      >
        <Image
          src="https://img.shields.io/badge/Discord-Join-5865F2?style=for-the-badge&logo=discord&logoColor=white"
          alt="Discord"
          width={140}
          height={30}
        />
      </a>
      <a
        href="https://www.npmjs.com/package/create-mc-bedrock"
        target="_blank"
        rel="noopener noreferrer"
      >
        <Image
          src="https://img.shields.io/npm/v/create-mc-bedrock?label=create-mc-bedrock&color=cb3837&logo=npm&style=for-the-badge"
          alt="npm: create-mc-bedrock"
          width={210}
          height={30}
        />
      </a>
      <a
        href="https://www.npmjs.com/package/@keyyard/bedrock-build"
        target="_blank"
        rel="noopener noreferrer"
      >
        <Image
          src="https://img.shields.io/npm/v/@keyyard/bedrock-build?label=%40keyyard%2Fbedrock-build&color=cb3837&logo=npm&style=for-the-badge"
          alt="npm: @keyyard/bedrock-build"
          width={240}
          height={30}
        />
      </a>
    </div>
    <p className="mt-4 text-xs text-gray-400 flex items-center justify-center gap-2">
      <span>&copy; 2025 Keyyard. All rights reserved.</span>
      <span className="font-code text-xs text-gray-400">v{CLI_VERSION}</span>
    </p>
  </footer>
);

export default Footer;
