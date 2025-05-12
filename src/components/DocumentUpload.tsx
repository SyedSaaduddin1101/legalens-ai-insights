
import { useState, ChangeEvent } from "react";
import { Upload, File, Loader2, X, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

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
  
  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0] || null;
    if (selectedFile) {
      // Check if file is a PDF or document
      const validTypes = ["application/pdf", "application/msword", "application/vnd.openxmlformats-officedocument.wordprocessingml.document"];
      if (validTypes.includes(selectedFile.type)) {
        setFile(selectedFile);
        setAnalysisResult(null);
      } else {
        toast({
          variant: "destructive",
          title: "Invalid file format",
          description: "Please upload a PDF or Word document.",
        });
      }
    }
  };
  
  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const droppedFile = event.dataTransfer.files[0];
    if (droppedFile) {
      const validTypes = ["application/pdf", "application/msword", "application/vnd.openxmlformats-officedocument.wordprocessingml.document"];
      if (validTypes.includes(droppedFile.type)) {
        setFile(droppedFile);
        setAnalysisResult(null);
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
  };
  
  const analyzeDocument = () => {
    if (!file) return;
    
    setIsAnalyzing(true);
    
    // Simulate analysis (in a real app, this would be an API call)
    setTimeout(() => {
      // Mock result
      setAnalysisResult({
        plainLanguage: "This contract establishes a partnership between Company A and Company B for the development of software products. The agreement is valid for 3 years and includes provisions for intellectual property rights, confidentiality, and termination conditions.",
        keyTerms: [
          {
            term: "Intellectual Property Rights",
            explanation: "All software developed under this agreement will be jointly owned by both parties, with equal rights to use and modify."
          },
          {
            term: "Confidentiality Clause",
            explanation: "Both parties must keep all shared information confidential for 5 years after termination."
          },
          {
            term: "Termination Conditions",
            explanation: "Either party can terminate with 60 days written notice. Early termination requires compensation."
          }
        ],
        risks: [
          {
            title: "Ambiguous Liability Clause",
            description: "Section 8.2 contains vague language about liability limits that could lead to disputes.",
            severity: "high"
          },
          {
            title: "Missing Payment Terms",
            description: "The contract doesn't specify clear payment schedules or late payment penalties.",
            severity: "medium"
          }
        ],
        summary: "This is a 3-year partnership agreement between Company A and B for software development with joint IP ownership, 5-year confidentiality terms, and 60-day termination notice. Key concerns include ambiguous liability language and incomplete payment terms."
      });
      setIsAnalyzing(false);
      
      toast({
        title: "Analysis Complete",
        description: "Your document has been successfully analyzed.",
      });
    }, 3000);
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
  
  return (
    <section className="section-padding" id="try-now">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-legal-navy">Analyze Your Document</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Upload a contract or legal document to receive an instant AI-powered analysis including plain language explanation, key terms, and risk identification.
          </p>
        </div>
        
        <div className="max-w-4xl mx-auto">
          {!file ? (
            <div
              className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center glass-card cursor-pointer hover:border-legal-light-blue transition-colors"
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              onClick={() => document.getElementById("file-upload")?.click()}
            >
              <input
                id="file-upload"
                type="file"
                className="hidden"
                accept=".pdf,.doc,.docx"
                onChange={handleFileChange}
              />
              <Upload size={48} className="mx-auto mb-4 text-legal-light-blue" />
              <h3 className="text-xl font-semibold mb-2">Upload Your Document</h3>
              <p className="text-gray-500 mb-4">
                Drag and drop your file here, or click to browse
              </p>
              <p className="text-gray-400 text-sm">
                Supports PDF, DOC, DOCX (Max 10MB)
              </p>
            </div>
          ) : (
            <div className="glass-card p-6">
              <div className="flex justify-between items-center mb-6">
                <div className="flex items-center">
                  <div className="bg-blue-100 p-2 rounded mr-4">
                    <File size={24} className="text-legal-light-blue" />
                  </div>
                  <div>
                    <p className="font-medium">{file.name}</p>
                    <p className="text-sm text-gray-500">
                      {(file.size / 1024 / 1024).toFixed(2)} MB
                    </p>
                  </div>
                </div>
                <Button variant="ghost" size="icon" onClick={clearFile}>
                  <X size={20} />
                </Button>
              </div>
              
              {!analysisResult && !isAnalyzing && (
                <Button 
                  className="w-full bg-legal-light-blue hover:bg-legal-blue" 
                  onClick={analyzeDocument}
                >
                  Analyze Document
                </Button>
              )}
              
              {isAnalyzing && (
                <div className="text-center py-8">
                  <Loader2 size={40} className="animate-spin mx-auto mb-4 text-legal-light-blue" />
                  <p className="text-gray-600">Analyzing your document...</p>
                  <p className="text-sm text-gray-500 mt-2">This may take a minute</p>
                </div>
              )}
              
              {analysisResult && (
                <div className="mt-6 animate-fade-in">
                  <div className="mb-8">
                    <h3 className="font-semibold text-lg mb-3 text-legal-navy">Plain Language Explanation</h3>
                    <div className="bg-white rounded-lg p-4 border border-gray-100">
                      <p className="text-gray-700">{analysisResult.plainLanguage}</p>
                    </div>
                  </div>
                  
                  <div className="mb-8">
                    <h3 className="font-semibold text-lg mb-3 text-legal-navy">Key Terms</h3>
                    <div className="bg-white rounded-lg border border-gray-100 divide-y divide-gray-100">
                      {analysisResult.keyTerms.map((term, index) => (
                        <div key={index} className="p-4">
                          <h4 className="font-medium text-legal-light-blue">{term.term}</h4>
                          <p className="text-gray-700 mt-1">{term.explanation}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="mb-8">
                    <h3 className="font-semibold text-lg mb-3 text-legal-navy">Risk Identification</h3>
                    <div className="bg-white rounded-lg border border-gray-100 divide-y divide-gray-100">
                      {analysisResult.risks.map((risk, index) => (
                        <div key={index} className="p-4">
                          <div className="flex items-center justify-between mb-1">
                            <h4 className="font-medium">{risk.title}</h4>
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
                    <h3 className="font-semibold text-lg mb-3 text-legal-navy">Summary</h3>
                    <div className="bg-white rounded-lg p-4 border border-gray-100">
                      <p className="text-gray-700">{analysisResult.summary}</p>
                    </div>
                  </div>
                  
                  <Button onClick={downloadSummary} className="w-full">
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
