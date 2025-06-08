import React from "react";
import ShowcaseCarousel from "@/components/molecules/ShowcaseCarousel";

const ShowcaseSection: React.FC = () => (
  <section className="py-4 max-w-3xl mx-auto">
    <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center">📸 Showcase</h2>
    <ShowcaseCarousel />
  </section>
);

export default ShowcaseSection;
