import React from "react";
const Footer: React.FC = () => (
  <footer className="flex flex-col items-center text-center text-gray-700 dark:text-gray-300 border-t">
    <p className="text-lg mt-2">
      Made with <span className="text-red-500">❤️</span> for the Minecraft Bedrock development community
    </p>
    <p className="text-sm">
      &copy; 2025 Keyyard. All rights reserved.
    </p>
    <div className="flex gap-4">
      <a href="https://github.com/Keyyard/create-mc-bedrock-cli" target="_blank" rel="noopener noreferrer" className="hover:text-emerald-600 underline">GitHub Repo</a>
      <a href="https://github.com/Keyyard" target="_blank" rel="noopener noreferrer" className="hover:text-emerald-600 underline">GitHub Profile</a>
    </div>
  </footer>
);

export default Footer;
