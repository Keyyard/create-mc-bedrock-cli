import React from "react";

const features = [
  {
    icon: "⚡",
    title: "Instant Project Setup",
    desc: "No more copy-pasting or manual configuration. Select a sample, pick a folder, and your workspace is ready to go—complete with unique manifest UUIDs.",
  },
  {
    icon: "🧠",
    title: "Focus on Building, Not Boilerplate",
    desc: "Spend your time creating, not setting up. All the essentials are handled for you, so you can jump straight into development.",
  },
  {
    icon: "🔒",
    title: "Always Unique, Always Clean",
    desc: "Every project is generated with new manifest UUIDs, ensuring no conflicts and a smooth import into Minecraft.",
  },
  {
    icon: "🗂️",
    title: "Official Samples, Your Way",
    desc: "Choose from a curated list of Microsoft’s best scripting samples. Your selected template is cloned directly into your chosen folder—no nested directories, no confusion.",
  },
];

const WhyUseSection: React.FC = () => (
  <section className="py-4 max-w-4xl mx-auto">
    <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center">✨ Why Use Create MC Bedrock CLI?</h2>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {features.map((f) => (
        <div key={f.title} className="flex flex-col items-center text-center bg-white/80 dark:bg-emerald-800/10 rounded-lg p-6 shadow">
          <span className="text-4xl mb-2">{f.icon}</span>
          <h3 className="text-lg font-semibold mb-1">{f.title}</h3>
          <p className="text-gray-700 dark:text-gray-300">{f.desc}</p>
        </div>
      ))}
    </div>
  </section>
);

export default WhyUseSection;
