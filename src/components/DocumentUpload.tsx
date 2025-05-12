
import { useState, ChangeEvent, useRef } from "react";
import { Upload, File, Loader2, X, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { analyzeDocument } from "../services/ai";
import { Navigate, useLocation } from "react-router-dom";

interface AnalysisResult {
  plainLanguage: string;
  keyTerms: { term: string; explanation: string }[];
  risks: { title: string; description: string; severity: "low" | "medium" | "high" }[];
  summary: string;
}

const DocumentUpload = () => {
  const { toast } = useToast();
  const [file, setFile] = useState<File | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
  const [documentText, setDocumentText] = useState<string>("");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const location = useLocation();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [checkingAuth, setCheckingAuth] = useState(true);

  // Check authentication
  useState(() => {
    const userLoggedIn = localStorage.getItem("legalens-user");
    setIsAuthenticated(!!userLoggedIn);
    setCheckingAuth(false);
  });
  
  const handleFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0] || null;
    if (selectedFile) {
      // Check if file is a PDF or document
      const validTypes = ["application/pdf", "application/msword", "application/vnd.openxmlformats-officedocument.wordprocessingml.document", "text/plain"];
      if (validTypes.includes(selectedFile.type)) {
        setFile(selectedFile);
        setAnalysisResult(null);
        
        // If text file, read content
        if (selectedFile.type === "text/plain") {
          const text = await selectedFile.text();
          setDocumentText(text);
        } else {
          // In a real app, we would use PDF.js or a similar library to extract text
          setDocumentText("Sample extracted text from document for demonstration purposes.");
        }
      } else {
        toast({
          variant: "destructive",
          title: "Invalid file format",
          description: "Please upload a PDF or Word document.",
        });
      }
    }
  };
  
  const handleDrop = async (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const droppedFile = event.dataTransfer.files[0];
    if (droppedFile) {
      const validTypes = ["application/pdf", "application/msword", "application/vnd.openxmlformats-officedocument.wordprocessingml.document", "text/plain"];
      if (validTypes.includes(droppedFile.type)) {
        setFile(droppedFile);
        setAnalysisResult(null);
        
        // If text file, read content
        if (droppedFile.type === "text/plain") {
          const text = await droppedFile.text();
          setDocumentText(text);
        } else {
          // In a real app, we would use PDF.js or similar to extract text
          setDocumentText("Sample extracted text from document for demonstration purposes.");
        }
      } else {
        toast({
          variant: "destructive",
          title: "Invalid file format",
          description: "Please upload a PDF or Word document.",
        });
      }
    }
  };
  
  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };
  
  const clearFile = () => {
    setFile(null);
    setAnalysisResult(null);
    setDocumentText("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };
  
  const analyzeDocumentHandler = async () => {
    if (!file) return;
    
    setIsAnalyzing(true);
    
    try {
      // Use the AI service to analyze the document
      const result = await analyzeDocument(
        documentText, 
        file.name.endsWith('.pdf') ? 'PDF contract' : 'legal document'
      );
      
      setAnalysisResult(result);
      
      toast({
        title: "Analysis Complete",
        description: "Your document has been successfully analyzed.",
      });
    } catch (error) {
      console.error("Error during analysis:", error);
      toast({
        variant: "destructive",
        title: "Analysis Failed",
        description: "An error occurred during analysis. Please try again.",
      });
    } finally {
      setIsAnalyzing(false);
    }
  };
  
  const downloadSummary = () => {
    if (!analysisResult) return;
    
    // Create a text version of the analysis
    let summaryText = "LEGALENS DOCUMENT ANALYSIS SUMMARY\n\n";
    summaryText += "PLAIN LANGUAGE EXPLANATION:\n";
    summaryText += analysisResult.plainLanguage + "\n\n";
    
    summaryText += "KEY TERMS:\n";
    analysisResult.keyTerms.forEach(term => {
      summaryText += `- ${term.term}: ${term.explanation}\n`;
    });
    summaryText += "\n";
    
    summaryText += "IDENTIFIED RISKS:\n";
    analysisResult.risks.forEach(risk => {
      summaryText += `- ${risk.title} (${risk.severity.toUpperCase()} RISK): ${risk.description}\n`;
    });
    summaryText += "\n";
    
    summaryText += "SUMMARY:\n";
    summaryText += analysisResult.summary;
    
    // Create a download link for the text file
    const blob = new Blob([summaryText], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "LegaLens_Analysis_Summary.txt";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };
  
  // Show login prompt for non-authenticated users
  const renderLoginPrompt = () => (
    <div className="text-center py-10">
      <div className="bg-white/80 backdrop-blur-md p-8 rounded-lg border border-purple-100 shadow-lg max-w-lg mx-auto animate-fade-in">
        <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent">
          Sign in to Analyze Documents
        </h3>
        <p className="text-gray-600 mb-6">
          Create an account or sign in to access our AI-powered legal document analysis features.
        </p>
        <div className="flex flex-col space-y-3 sm:flex-row sm:space-y-0 sm:space-x-4 justify-center">
          <Button 
            className="bg-gradient-to-r from-purple-600 to-pink-500 hover:opacity-90 transition-all duration-300 transform hover:scale-105"
            onClick={() => window.location.href = "/login"}
          >
            Sign In
          </Button>
          <Button 
            variant="outline" 
            className="border-purple-200 hover:bg-purple-50 hover:text-purple-700 transition-all duration-300"
            onClick={() => window.location.href = "/signup"}
          >
            Create Account
          </Button>
        </div>
      </div>
    </div>
  );
  
  // If on index page and not authenticated, show login prompt
  if (location.pathname === "/" && isAuthenticated === false && !checkingAuth) {
    return renderLoginPrompt();
  }

  // If on try-now page but not authenticated, redirect happens via ProtectedRoute
  
  return (
    <section className="section-padding animate-fade-in" id="document-upload">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent">
            Analyze Your Document
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Upload a contract or legal document to receive an instant AI-powered analysis including plain language explanation, key terms, and risk identification.
          </p>
        </div>
        
        <div className="max-w-4xl mx-auto">
          {!file ? (
            <div
              className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center glass-card cursor-pointer hover:border-purple-400 transition-colors relative overflow-hidden group"
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              onClick={() => document.getElementById("file-upload")?.click()}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="absolute -inset-full bg-gradient-to-r from-purple-200/0 via-purple-200/10 to-pink-200/0 top-1/2 group-hover:animate-[shimmer_2s_ease-in-out_infinite] z-0"></div>
              
              <input
                id="file-upload"
                ref={fileInputRef}
                type="file"
                className="hidden"
                accept=".pdf,.doc,.docx,.txt"
                onChange={handleFileChange}
              />
              <div className="relative z-10">
                <Upload size={48} className="mx-auto mb-4 text-purple-500" />
                <h3 className="text-xl font-semibold mb-2 bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent">Upload Your Document</h3>
                <p className="text-gray-500 mb-4">
                  Drag and drop your file here, or click to browse
                </p>
                <p className="text-gray-400 text-sm">
                  Supports PDF, DOC, DOCX, TXT (Max 10MB)
                </p>
              </div>
            </div>
          ) : (
            <div className="glass-card p-6 border border-purple-100 shadow-lg rounded-lg bg-white/80 backdrop-blur-md animate-fade-in">
              <div className="flex justify-between items-center mb-6">
                <div className="flex items-center">
                  <div className="bg-purple-100 p-2 rounded-lg mr-4">
                    <File size={24} className="text-purple-500" />
                  </div>
                  <div>
                    <p className="font-medium">{file.name}</p>
                    <p className="text-sm text-gray-500">
                      {(file.size / 1024 / 1024).toFixed(2)} MB
                    </p>
                  </div>
                </div>
                <Button variant="ghost" size="icon" onClick={clearFile} className="hover:bg-purple-50">
                  <X size={20} />
                </Button>
              </div>
              
              {!analysisResult && !isAnalyzing && (
                <Button 
                  className="w-full bg-gradient-to-r from-purple-600 to-pink-500 hover:opacity-90 transition-all duration-300 transform hover:scale-105" 
                  onClick={analyzeDocumentHandler}
                >
                  Analyze Document
                </Button>
              )}
              
              {isAnalyzing && (
                <div className="text-center py-8">
                  <div className="relative mx-auto w-16 h-16 mb-4">
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full blur-xl opacity-70 animate-pulse"></div>
                    <Loader2 size={40} className="animate-spin mx-auto relative z-10 text-purple-600" />
                  </div>
                  <p className="text-gray-600">Analyzing your document...</p>
                  <p className="text-sm text-gray-500 mt-2">This may take a minute</p>
                </div>
              )}
              
              {analysisResult && (
                <div className="mt-6 animate-fade-in">
                  <div className="mb-8">
                    <h3 className="font-semibold text-lg mb-3 bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent">Plain Language Explanation</h3>
                    <div className="bg-white rounded-lg p-4 border border-purple-100 shadow-sm">
                      <p className="text-gray-700">{analysisResult.plainLanguage}</p>
                    </div>
                  </div>
                  
                  <div className="mb-8">
                    <h3 className="font-semibold text-lg mb-3 bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent">Key Terms</h3>
                    <div className="bg-white rounded-lg border border-purple-100 shadow-sm divide-y divide-purple-50">
                      {analysisResult.keyTerms.map((term, index) => (
                        <div key={index} className="p-4 hover:bg-purple-50/50 transition-colors">
                          <h4 className="font-medium text-purple-700">{term.term}</h4>
                          <p className="text-gray-700 mt-1">{term.explanation}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="mb-8">
                    <h3 className="font-semibold text-lg mb-3 bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent">Risk Identification</h3>
                    <div className="bg-white rounded-lg border border-purple-100 shadow-sm divide-y divide-purple-50">
                      {analysisResult.risks.map((risk, index) => (
                        <div key={index} className="p-4 hover:bg-purple-50/50 transition-colors">
                          <div className="flex items-center justify-between mb-1">
                            <h4 className="font-medium text-gray-800">{risk.title}</h4>
                            <span 
                              className={`px-2 py-1 text-xs font-medium rounded-full ${
                                risk.severity === 'high' ? 'bg-red-100 text-red-800' :
                                risk.severity === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                                'bg-green-100 text-green-800'
                              }`}
                            >
                              {risk.severity === 'high' ? 'High Risk' :
                               risk.severity === 'medium' ? 'Medium Risk' :
                               'Low Risk'}
                            </span>
                          </div>
                          <p className="text-gray-700">{risk.description}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="mb-6">
                    <h3 className="font-semibold text-lg mb-3 bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent">Summary</h3>
                    <div className="bg-white rounded-lg p-4 border border-purple-100 shadow-sm">
                      <p className="text-gray-700">{analysisResult.summary}</p>
                    </div>
                  </div>
                  
                  <Button 
                    onClick={downloadSummary} 
                    className="w-full bg-gradient-to-r from-purple-600 to-pink-500 hover:opacity-90 transition-all duration-300 transform hover:scale-105"
                  >
                    <Download size={16} className="mr-2" />
                    Download Summary
                  </Button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default DocumentUpload;
