import React from "react";

const testimonials = [
  {
    name: "Ethan",
    role: "Lead @ Blockbytes LLC, CEO @ Golden Studios",
    feedback:
      "As a Developer with lots of commissions I find myself setting up projects constantly. This CLI is a great addition to my workflow allowing me to focus on the actual important tasks.",
  },
    {
    name: "Beyond64",
    role: "Minecraft Addon Developer",
    feedback:
      "Bedrock CLI is really helpful for my addon development as it instantly creates a ready-to-use addon template folder without any setup done by me. I use it all the time and jump straight into coding.",
  },
];

const TestimonialsSection: React.FC = () => {
  return (
    <>
      <section className="py-12 max-w-5xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center">
          What People Say About Bedrock CLI?
        </h2>
        <div
          className="overflow-x-auto"
          style={{
            scrollbarWidth: "none",
            msOverflowStyle: "none",
          }}
        >
          <div className="flex gap-6 min-w-[600px] md:min-w-[900px]">
            {testimonials.map((t, idx) => (
              <div
                key={idx}
                className="flex-shrink-0 w-80 bg-white/80 dark:bg-emerald-800/10 rounded-lg shadow p-6 border border-emerald-100 dark:border-emerald-900"
              >
                <div className="font-semibold text-emerald-700 dark:text-emerald-300">
                  {t.name}
                </div>
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  {t.role}
                </div>
                <p className="text-gray-800 dark:text-gray-200 italic mb-4">
                  “{t.feedback}”
                </p>
              </div>
            ))}{" "}
          </div>
        </div>
      </section>
    </>
  );
};

export default TestimonialsSection;
