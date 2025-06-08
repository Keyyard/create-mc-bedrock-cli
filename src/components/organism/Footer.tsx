import React from "react";
const Footer: React.FC = () => (
  <footer className="py-8 flex flex-col items-center text-center gap-2 text-gray-700 dark:text-gray-300 border-t">

    <p className="text-lg">
      Made with <span className="text-red-500">❤️</span> for the Minecraft Bedrock development community
    </p>
    <p className="text-sm mt-2">
      &copy; 2025 Keyyard. All rights reserved.
    </p>
    <div className="flex gap-4 mt-2">
      <a href="https://github.com/Keyyard/create-mc-bedrock-cli" target="_blank" rel="noopener noreferrer" className="hover:text-emerald-600 underline">GitHub Repo</a>
      <a href="https://github.com/Keyyard" target="_blank" rel="noopener noreferrer" className="hover:text-emerald-600 underline">GitHub Profile</a>
    </div>
  </footer>
);

export default Footer;
