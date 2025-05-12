
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import FeatureSection from "../components/FeatureSection";
import CTASection from "../components/CTASection";

const Features = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="pt-24 pb-10 bg-gradient-to-b from-purple-50 to-pink-50 animate-fade-in">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold text-center mb-6 bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent">
            Our Powerful Features
          </h1>
          <p className="text-center text-gray-700 max-w-3xl mx-auto">
            LegaLens leverages cutting-edge AI technology to simplify and analyze complex legal documents.
          </p>
        </div>
      </div>
      <FeatureSection />
      <CTASection />
      <Footer />
    </div>
  );
};

export default Features;
