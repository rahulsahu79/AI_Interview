import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import TrustMetricsSection from "@/components/TrustMetricsSection";
import FeaturesSection from "@/components/FeaturesSection";
import HowItWorksSection from "@/components/HowItWorksSection";
import InterviewExperienceSection from "@/components/InterviewExperienceSection";
import CandidateReportPreviewSection from "@/components/CandidateReportPreviewSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import FAQSection from "@/components/FAQSection";
import FinalCTASection from "@/components/FinalCTASection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen w-full bg-white">
      <Navbar />
      <main>
        <HeroSection />
        <TrustMetricsSection />
        <FeaturesSection />
        <HowItWorksSection />
        <InterviewExperienceSection />
        <CandidateReportPreviewSection />
        <TestimonialsSection />
        <FAQSection />
        <FinalCTASection />
      </main>
      <Footer />
    </div>
  );
}
