import Header from "@/components/organism/Header";
import TopNav from "@/components/organism/TopNav";
import PainPointsSection from "@/components/organism/PainPointsSection";
import ChoosePathSection from "@/components/organism/ChoosePathSection";
import FeaturesSection from "@/components/organism/FeaturesSection";
import ComparisonSection from "@/components/organism/ComparisonSection";
import CtaResourcesSection from "@/components/organism/CtaResourcesSection";
import Footer from "@/components/organism/Footer";

export default function Home() {
  return (
    <>
      <title>Bedrock CLI: Skip the lazy part, work hard and smart.</title>
      <TopNav />
      <main className="flex flex-col w-full">
        <Header />
        <PainPointsSection />
        <ChoosePathSection />
        <FeaturesSection />
        <ComparisonSection />
        <CtaResourcesSection />
      </main>
      <Footer />
    </>
  );
}
