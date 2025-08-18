import React from "react";
import Image from "next/image";
const Footer: React.FC = () => (
  <footer className="flex flex-col items-center text-center text-gray-400 border-t border-emerald-800/40 pb-2">
      <p className="text-lg mt-2 text-gray-200">
        Made with <span className="text-red-400">❤️</span> for the Minecraft
        Bedrock development community
      </p>
    <div className="flex gap-4 my-2">
      <a href="https://github.com/Keyyard/create-mc-bedrock-cli">
        <Image
          src="https://img.shields.io/badge/Github%20Repository-Red?style=for-the-badge&logo=Github&logoColor=white&labelColor=%23181717&color=white"
          alt="Github Repository"
          width={180}
          height={30}
        />
      </a>
    </div>
  <p className="text-sm text-gray-300">&copy; 2025 Keyyard. All rights reserved.</p>
  </footer>
);

export default Footer;
