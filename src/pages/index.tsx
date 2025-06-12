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
      <title>Create Bedrock CLI</title>
      <Header />
      <main className="flex flex-col gap-2 items-center w-full">
        <section className="w-full"><StartSection /></section>
        <section className="w-full px-2"><WhyUseSection /></section>
        <section className="w-full px-2"><HowItWorksSection /></section>
        <section className="w-full px-2"><ShowcaseSection /></section>
        <section className="w-full px-2"><FeaturesSection /></section>
        <section className="w-full px-2"><RequirementsSection /></section>
        <section className="w-full px-2"><ProTipsSection /></section>
        <section className="w-full px-2"><ContributingSection /></section>
      </main>
      <Footer />
    </>
  );
}
