
import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

interface FAQItem {
  question: string;
  answer: string;
}

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  
  const faqs: FAQItem[] = [
    {
      question: "How accurate is LegaLens's analysis?",
      answer: "LegaLens utilizes GPT-4, the most advanced AI language model available, achieving over 95% accuracy in legal document analysis. Our system is continuously trained on diverse legal documents to ensure high-quality results across various document types."
    },
    {
      question: "Is my data secure and confidential?",
      answer: "Absolutely. We take data security and confidentiality extremely seriously. All documents are encrypted in transit and at rest. We do not store your documents longer than necessary for analysis, and our systems comply with industry standards for data protection. We also offer enterprise plans with additional security features."
    },
    {
      question: "What types of documents can LegaLens analyze?",
      answer: "LegaLens can analyze a wide range of legal documents including contracts, NDAs, employment agreements, terms of service, privacy policies, lease agreements, and more. Our AI is trained on diverse legal texts and can adapt to various formats and structures."
    },
    {
      question: "How long does the analysis take?",
      answer: "The analysis time depends on the document length and complexity. Most standard documents (up to 20 pages) are analyzed within 30-60 seconds. Longer or more complex documents may take a few minutes. Our system prioritizes accuracy over speed to ensure high-quality results."
    },
    {
      question: "Can I use LegaLens for documents in languages other than English?",
      answer: "Currently, LegaLens primarily supports English-language documents. However, we're working on expanding our capabilities to include other major languages. If you have specific language requirements, please contact us to discuss potential solutions."
    },
    {
      question: "Do I need a subscription to use LegaLens?",
      answer: "We offer both one-time use options and subscription plans. New users can analyze one document for free to experience the service. For regular usage, our subscription plans offer the best value with features like document history, advanced analysis options, and priority processing."
    }
  ];
  
  const toggleFAQ = (index: number) => {
    if (openIndex === index) {
      setOpenIndex(null);
    } else {
      setOpenIndex(index);
    }
  };
  
  return (
    <section className="section-padding" id="faq">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-legal-navy">Frequently Asked Questions</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Find answers to common questions about LegaLens and our AI-powered legal document analysis.
          </p>
        </div>
        
        <div className="max-w-3xl mx-auto">
          {faqs.map((faq, index) => (
            <div 
              key={index} 
              className={`mb-4 glass-card transition-all duration-300 ${openIndex === index ? 'shadow-lg' : ''}`}
            >
              <button
                className="w-full text-left p-6 flex justify-between items-center focus:outline-none"
                onClick={() => toggleFAQ(index)}
              >
                <h3 className="font-semibold text-lg text-gray-800">{faq.question}</h3>
                {openIndex === index ? (
                  <ChevronUp size={20} className="text-legal-light-blue" />
                ) : (
                  <ChevronDown size={20} className="text-gray-500" />
                )}
              </button>
              
              {openIndex === index && (
                <div className="px-6 pb-6 pt-0 animate-slide-up">
                  <p className="text-gray-600">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
