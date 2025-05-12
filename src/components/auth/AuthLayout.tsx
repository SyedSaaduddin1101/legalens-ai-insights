
import { ReactNode } from "react";

interface AuthLayoutProps {
  children: ReactNode;
  title: string;
  subtitle: string;
}

const AuthLayout = ({ children, title, subtitle }: AuthLayoutProps) => {
  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Sidebar/Banner */}
      <div className="md:w-1/2 bg-gradient-to-br from-legal-blue to-legal-light-blue hidden md:flex md:flex-col md:justify-center md:items-center text-white p-10">
        <div className="max-w-md">
          <h1 className="text-3xl font-serif font-bold mb-6">LegaLens</h1>
          <h2 className="text-2xl font-medium mb-4">AI-Powered Legal Document Assistant</h2>
          <p className="text-lg opacity-90">
            Upload contracts, agreements, or any legal document to get instant analysis, key term highlighting, and plain language explanations.
          </p>
          
          <div className="mt-12 bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
            <blockquote className="italic text-lg">
              "LegaLens has saved our legal team countless hours reviewing routine contracts. The AI analysis is remarkably accurate."
            </blockquote>
            <p className="mt-4 font-medium">— Legal Director, Fortune 500 Company</p>
          </div>
        </div>
      </div>
      
      {/* Form Area */}
      <div className="md:w-1/2 flex flex-col justify-center items-center p-6 md:p-10">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4 md:hidden">
              <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-legal-blue to-legal-electric-blue flex items-center justify-center">
                <span className="text-white font-serif font-bold text-xl">L</span>
              </div>
            </div>
            <h2 className="text-2xl font-serif font-bold text-gray-900">{title}</h2>
            <p className="text-gray-600 mt-2">{subtitle}</p>
          </div>
          
          {children}
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
