
import { FileText, FileSearch, Key, AlertTriangle, Download, Upload } from 'lucide-react';

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const FeatureCard = ({ icon, title, description }: FeatureCardProps) => (
  <div className="glass-card p-6 transition-all duration-300 hover:shadow-xl group">
    <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-legal-blue to-legal-light-blue flex items-center justify-center text-white mb-4 group-hover:scale-110 transition-transform">
      {icon}
    </div>
    <h3 className="text-xl font-medium text-gray-800 mb-2">{title}</h3>
    <p className="text-gray-600">{description}</p>
  </div>
);

const FeatureSection = () => {
  const features = [
    {
      icon: <Upload size={24} />,
      title: "Easy Document Upload",
      description: "Upload contracts, agreements, or any legal document in seconds with our intuitive interface."
    },
    {
      icon: <FileText size={24} />,
      title: "Plain English Explanations",
      description: "Get complex legal documents translated into simple, understandable language."
    },
    {
      icon: <Key size={24} />,
      title: "Key Term Highlighting",
      description: "Automatically identify and highlight important terms, clauses, and conditions."
    },
    {
      icon: <AlertTriangle size={24} />,
      title: "Risk Identification",
      description: "Detect potential legal risks and red flags that might be hidden in the fine print."
    },
    {
      icon: <FileSearch size={24} />,
      title: "Advanced Analysis",
      description: "Powered by GPT-4, our system provides deep insights into legal documents."
    },
    {
      icon: <Download size={24} />,
      title: "Exportable Summaries",
      description: "Download comprehensive summaries of your analyzed documents for future reference."
    }
  ];

  return (
    <section className="section-padding" id="features">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-legal-navy">Powerful Features</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            LegaLens provides cutting-edge AI analysis for your legal documents, making complex legal language accessible and understandable.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="animate-slide-up" style={{ animationDelay: `${index * 100}ms` }}>
              <FeatureCard 
                icon={feature.icon}
                title={feature.title}
                description={feature.description}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeatureSection;
