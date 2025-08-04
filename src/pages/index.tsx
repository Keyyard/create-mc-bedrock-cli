import Header from "@/components/organism/Header";
import WhyUseSection from "@/components/organism/WhyUseSection";
import HowItWorksSection from "@/components/organism/HowItWorksSection";
import ShowcaseSection from "@/components/organism/ShowcaseSection";
import FeaturesSection from "@/components/organism/FeaturesSection";
import RequirementsSection from "@/components/organism/RequirementsSection";
import ProTipsSection from "@/components/organism/ProTipsSection";
import ContributingSection from "@/components/organism/ContributingSection";
import Footer from "@/components/organism/Footer";
import TestimonialsSection from "@/components/organism/TestimonialsSection";
import SideNavbar from "@/components/organism/SideNavbar";

export default function Home() {
  return (
    <>
      <title>Create Bedrock CLI</title>
      <Header />
      <SideNavbar />
      <main className="flex flex-col gap-2 items-center w-full">
        <section id="testimonials" className="w-full px-2 py-2"><TestimonialsSection /></section>
        <section id="requirements" className="w-full px-2 py-2"><RequirementsSection /></section>
        <section id="why-use" className="w-full px-2 py-2 pb-2"><WhyUseSection /></section>
        <section id="how-it-works" className="w-full px-2 py-2"><HowItWorksSection /></section>
        <section id="showcase" className="w-full px-2 py-2"><ShowcaseSection /></section>
        <section id="features" className="w-full px-2 py-2"><FeaturesSection /></section>
        <section id="pro-tips" className="w-full px-2 py-2"><ProTipsSection /></section>
        <section id="contributing" className="w-full px-2 py-2"><ContributingSection /></section>
      </main>
      <Footer />
    </>
  );
}
