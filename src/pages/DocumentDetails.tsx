
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import DashboardLayout from "../components/dashboard/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileText, Download, ArrowLeft, AlertTriangle, CheckCircle } from "lucide-react";
import { analyzeDocument } from "../services/ai";
import { useToast } from "@/hooks/use-toast";

const DocumentDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [loading, setLoading] = useState(true);
  const [analyzing, setAnalyzing] = useState(false);
  const [document, setDocument] = useState<any>(null);
  const [analysis, setAnalysis] = useState<any>(null);
  const { toast } = useToast();

  // Simulating document fetch
  useEffect(() => {
    const getDocument = async () => {
      try {
        // In a real app, fetch from API
        setTimeout(() => {
          setDocument({
            id,
            title: "Service Contract - Marketing Services",
            type: "Contract",
            uploadDate: "May 5, 2025",
            status: "Analyzed",
            riskLevel: "High",
            content: "This Service Agreement is entered into as of May 1, 2025 between Client and Service Provider..."
          });
          setLoading(false);
        }, 1000);
      } catch (error) {
        console.error("Error fetching document:", error);
        toast({
          title: "Error",
          description: "Failed to load document.",
          variant: "destructive"
        });
        setLoading(false);
      }
    };

    getDocument();
  }, [id, toast]);

  const handleAnalyze = async () => {
    setAnalyzing(true);
    try {
      const result = await analyzeDocument(
        document.content,
        document.type
      );
      setAnalysis(result);
      toast({
        title: "Analysis complete",
        description: "Document has been analyzed successfully"
      });
    } catch (error) {
      console.error("Analysis error:", error);
      toast({
        title: "Analysis failed",
        description: "Could not complete document analysis",
        variant: "destructive"
      });
    } finally {
      setAnalyzing(false);
    }
  };

  const handleDownload = () => {
    toast({
      title: "Download started",
      description: `Downloading ${document?.title}`
    });
  };

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-legal-blue"></div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="mb-6">
        <Link to="/dashboard" className="inline-flex items-center text-legal-blue hover:text-legal-light-blue mb-4">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Dashboard
        </Link>
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div className="mb-4 md:mb-0">
            <div className="flex items-center">
              <div className="mr-3 p-2 bg-blue-50 rounded-lg">
                <FileText className="h-6 w-6 text-legal-light-blue" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">{document.title}</h1>
                <p className="text-sm text-gray-500">
                  {document.type} • {document.id} • Uploaded on {document.uploadDate}
                </p>
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <Button variant="outline" onClick={handleDownload}>
              <Download className="mr-2 h-4 w-4" />
              Download
            </Button>
            <Button 
              onClick={handleAnalyze} 
              disabled={analyzing}
              className="bg-legal-blue hover:bg-legal-light-blue"
            >
              {analyzing ? "Analyzing..." : "Analyze Document"}
            </Button>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <Tabs defaultValue="summary" className="w-full">
          <TabsList className="grid grid-cols-4 w-full rounded-none border-b border-gray-200">
            <TabsTrigger value="summary">Summary</TabsTrigger>
            <TabsTrigger value="keyTerms">Key Terms</TabsTrigger>
            <TabsTrigger value="risks">Risks</TabsTrigger>
            <TabsTrigger value="fullText">Full Text</TabsTrigger>
          </TabsList>
          
          <div className="p-6">
            {analysis ? (
              <>
                <TabsContent value="summary" className="animate-fade-in">
                  <h3 className="text-xl font-semibold mb-4">Plain Language Summary</h3>
                  <p className="text-gray-700 whitespace-pre-line">{analysis.plainLanguage}</p>
                  <div className="mt-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
                    <h4 className="font-medium text-gray-900 mb-2">Executive Summary</h4>
                    <p>{analysis.summary}</p>
                  </div>
                </TabsContent>
                
                <TabsContent value="keyTerms" className="animate-fade-in">
                  <h3 className="text-xl font-semibold mb-4">Key Terms & Conditions</h3>
                  <div className="grid gap-4">
                    {analysis.keyTerms.map((term: any, index: number) => (
                      <div key={index} className="p-4 rounded-lg border border-gray-200">
                        <h4 className="font-semibold text-legal-blue">{term.term}</h4>
                        <p className="mt-1 text-gray-700">{term.explanation}</p>
                      </div>
                    ))}
                  </div>
                </TabsContent>
                
                <TabsContent value="risks" className="animate-fade-in">
                  <h3 className="text-xl font-semibold mb-4">Risk Analysis</h3>
                  <div className="grid gap-4">
                    {analysis.risks.map((risk: any, index: number) => {
                      const getBgColor = () => {
                        switch (risk.severity) {
                          case "low": return "bg-green-50 border-green-200";
                          case "medium": return "bg-yellow-50 border-yellow-200";
                          case "high": return "bg-red-50 border-red-200";
                          default: return "bg-gray-50 border-gray-200";
                        }
                      };
                      
                      const getIcon = () => {
                        switch (risk.severity) {
                          case "high": 
                            return <AlertTriangle className="h-5 w-5 text-red-500" />;
                          default:
                            return <CheckCircle className="h-5 w-5 text-green-500" />;
                        }
                      };
                      
                      return (
                        <div 
                          key={index} 
                          className={`p-4 rounded-lg border ${getBgColor()}`}
                        >
                          <div className="flex items-center">
                            {getIcon()}
                            <h4 className="font-semibold ml-2">{risk.title}</h4>
                            <span className={`ml-auto text-xs px-2 py-1 rounded-full ${
                              risk.severity === "high" ? "bg-red-100 text-red-800" :
                              risk.severity === "medium" ? "bg-yellow-100 text-yellow-800" :
                              "bg-green-100 text-green-800"
                            }`}>
                              {risk.severity.charAt(0).toUpperCase() + risk.severity.slice(1)} Risk
                            </span>
                          </div>
                          <p className="mt-2 text-gray-700">{risk.description}</p>
                        </div>
                      );
                    })}
                  </div>
                </TabsContent>
                
                <TabsContent value="fullText" className="animate-fade-in">
                  <h3 className="text-xl font-semibold mb-4">Full Document Text</h3>
                  <div className="p-4 bg-gray-50 rounded-lg border border-gray-200 whitespace-pre-line font-mono text-sm">
                    {document.content}
                  </div>
                </TabsContent>
              </>
            ) : (
              <div className="text-center py-12">
                <FileText className="mx-auto h-16 w-16 text-gray-300 mb-4" />
                <h3 className="text-xl font-medium text-gray-900 mb-2">Document not yet analyzed</h3>
                <p className="text-gray-500 mb-6 max-w-md mx-auto">
                  Click the "Analyze Document" button to perform AI analysis on this document
                </p>
                <Button 
                  onClick={handleAnalyze} 
                  disabled={analyzing}
                  className="bg-legal-blue hover:bg-legal-light-blue"
                >
                  {analyzing ? "Analyzing..." : "Analyze Document"}
                </Button>
              </div>
            )}
          </div>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default DocumentDetails;
