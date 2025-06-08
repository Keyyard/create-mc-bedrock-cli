import Header from "@/components/organism/Header";
import StartSection from "@/components/organism/StartSection";
import WhyUseSection from "@/components/organism/WhyUseSection";
import HowItWorksSection from "@/components/organism/HowItWorksSection";
import ShowcaseSection from "@/components/organism/ShowcaseSection";
import FeaturesSection from "@/components/organism/FeaturesSection";
import RequirementsSection from "@/components/organism/RequirementsSection";
import ProTipsSection from "@/components/organism/ProTipsSection";
import ContributingSection from "@/components/organism/ContributingSection";
import Footer from "@/components/organism/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <main className="flex flex-col gap-12 items-center w-full">
        <section className="w-full"><StartSection /></section>
        <section className="w-full"><WhyUseSection /></section>
        <section className="w-full"><HowItWorksSection /></section>
        <section className="w-full"><ShowcaseSection /></section>
        <section className="w-full"><FeaturesSection /></section>
        <section className="w-full"><RequirementsSection /></section>
        <section className="w-full"><ProTipsSection /></section>
        <section className="w-full"><ContributingSection /></section>
      </main>
      <Footer />
    </>
  );
}
