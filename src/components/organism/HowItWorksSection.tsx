import React from "react";
import CopyBlock from "@/components/atoms/CopyBlock";

const HowItWorksSection: React.FC = () => (
  <section className="max-w-3xl mx-auto">
    <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center">How It Works</h2>
    <ol className="list-decimal list-inside space-y-4 text-lg">
      <li>
        <span className="font-semibold">Run the CLI:</span>
        <CopyBlock code={`npx create-mc-bedrock`} />
      </li>
      <li>
        <span className="font-semibold">Follow the Prompts:</span>
        <ul className="list-disc list-inside ml-6 text-base">
          <li>Select a sample project (⭐ <b>ts-starter</b> is recommended for TypeScript users!)</li>
          <li>Choose your destination folder</li>
        </ul>
      </li>
      <li>
        <span className="font-semibold">Start Coding:</span>
        <span className="block ml-6 text-base">Your workspace is ready, with all manifests updated and temp files cleaned up.</span>
      </li>
    </ol>
  </section>
);

export default HowItWorksSection;
