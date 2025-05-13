
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import DashboardLayout from "../components/dashboard/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileText, Download, ArrowLeft, AlertTriangle, CheckCircle } from "lucide-react";
import { analyzeDocument } from "../services/ai";
import { useToast } from "@/hooks/use-toast";
import { motion, AnimatePresence } from "framer-motion";

const DocumentDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [loading, setLoading] = useState(true);
  const [analyzing, setAnalyzing] = useState(false);
  const [document, setDocument] = useState<any>(null);
  const [analysis, setAnalysis] = useState<any>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { toast } = useToast();

  // Check if user is logged in
  useEffect(() => {
    const userLoggedIn = localStorage.getItem("legalens-user");
    setIsLoggedIn(!!userLoggedIn);
    
    if (!userLoggedIn) {
      toast({
        title: "Authentication required",
        description: "Please sign in to view document details",
        variant: "destructive",
      });
      setTimeout(() => {
        window.location.href = "/login";
      }, 2000);
    }
  }, [toast]);

  // Simulating document fetch
  useEffect(() => {
    if (!isLoggedIn) return;
    
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
  }, [id, toast, isLoggedIn]);

  const handleAnalyze = async () => {
    if (!isLoggedIn) {
      toast({
        title: "Authentication required",
        description: "Please sign in to analyze documents",
        variant: "destructive"
      });
      return;
    }
    
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
  
  if (!isLoggedIn) {
    return null; // Don't render anything while redirecting
  }

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-64">
          <div className="relative">
            <div className="absolute inset-0 rounded-full bg-[#8E2DE2]/20 filter blur-xl animate-pulse"></div>
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#8E2DE2] relative"></div>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <motion.div 
        className="mb-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Link to="/dashboard" className="inline-flex items-center text-[#8E2DE2] hover:text-[#4A00E0] mb-4 transition-colors">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Dashboard
        </Link>
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div className="mb-4 md:mb-0">
            <div className="flex items-center">
              <motion.div 
                className="mr-3 p-3 bg-[#4A00E0]/10 rounded-lg"
                whileHover={{ scale: 1.1 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <FileText className="h-6 w-6 text-[#4A00E0]" />
              </motion.div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-[#8E2DE2] to-[#4A00E0] bg-clip-text text-transparent">
                  {document.title}
                </h1>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {document.type} • {document.id} • Uploaded on {document.uploadDate}
                </p>
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <Button variant="outline" onClick={handleDownload} className="border-[#8E2DE2]/30 hover:bg-[#8E2DE2]/10 hover:border-[#8E2DE2] transition-all">
              <Download className="mr-2 h-4 w-4" />
              Download
            </Button>
            <Button 
              onClick={handleAnalyze} 
              disabled={analyzing}
              className="bg-gradient-to-r from-[#8E2DE2] to-[#4A00E0] hover:opacity-90 transition-all duration-300 shadow-[0_5px_15px_rgba(74,0,224,0.25)] hover:shadow-[0_5px_20px_rgba(74,0,224,0.4)]"
            >
              {analyzing ? "Analyzing..." : "Analyze Document"}
            </Button>
          </div>
        </div>
      </motion.div>

      <motion.div 
        className="bg-white dark:bg-[#1E293B] rounded-lg shadow-sm border border-[#8E2DE2]/20"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        <Tabs defaultValue="summary" className="w-full">
          <TabsList className="grid grid-cols-4 w-full rounded-none border-b border-[#8E2DE2]/10">
            <TabsTrigger value="summary">Summary</TabsTrigger>
            <TabsTrigger value="keyTerms">Key Terms</TabsTrigger>
            <TabsTrigger value="risks">Risks</TabsTrigger>
            <TabsTrigger value="fullText">Full Text</TabsTrigger>
          </TabsList>
          
          <div className="p-6">
            <AnimatePresence mode="wait">
              {analysis ? (
                <>
                  <TabsContent value="summary">
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.3 }}
                    >
                      <h3 className="text-xl font-semibold bg-gradient-to-r from-[#8E2DE2] to-[#4A00E0] bg-clip-text text-transparent mb-4">Plain Language Summary</h3>
                      <p className="text-gray-700 dark:text-gray-300 whitespace-pre-line">{analysis.plainLanguage}</p>
                      <motion.div 
                        className="mt-6 p-4 bg-gray-50 dark:bg-[#0F0F0F]/50 rounded-lg border border-[#8E2DE2]/20 shadow-sm"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2, duration: 0.3 }}
                      >
                        <h4 className="font-medium text-gray-900 dark:text-gray-100 mb-2">Executive Summary</h4>
                        <p className="text-gray-700 dark:text-gray-300">{analysis.summary}</p>
                      </motion.div>
                    </motion.div>
                  </TabsContent>
                  
                  <TabsContent value="keyTerms">
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <h3 className="text-xl font-semibold bg-gradient-to-r from-[#8E2DE2] to-[#4A00E0] bg-clip-text text-transparent mb-4">Key Terms & Conditions</h3>
                      <div className="grid gap-4">
                        {analysis.keyTerms.map((term: any, index: number) => (
                          <motion.div 
                            key={index} 
                            className="p-4 rounded-lg border border-[#8E2DE2]/20 hover:border-[#8E2DE2]/40 bg-white dark:bg-[#0F0F0F]/50 hover:bg-gray-50 dark:hover:bg-[#0F0F0F]/70 transition-colors shadow-sm hover:shadow"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1, duration: 0.3 }}
                            whileHover={{ y: -2, boxShadow: '0 10px 25px -5px rgba(142, 45, 226, 0.1)' }}
                          >
                            <h4 className="font-semibold text-[#8E2DE2]">{term.term}</h4>
                            <p className="mt-1 text-gray-700 dark:text-gray-300">{term.explanation}</p>
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>
                  </TabsContent>
                  
                  <TabsContent value="risks">
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <h3 className="text-xl font-semibold bg-gradient-to-r from-[#8E2DE2] to-[#4A00E0] bg-clip-text text-transparent mb-4">Risk Analysis</h3>
                      <div className="grid gap-4">
                        {analysis.risks.map((risk: any, index: number) => {
                          const getBgColor = () => {
                            switch (risk.severity) {
                              case "low": return "bg-green-50 border-green-200 dark:bg-green-900/20 dark:border-green-700/30";
                              case "medium": return "bg-yellow-50 border-yellow-200 dark:bg-yellow-900/20 dark:border-yellow-700/30";
                              case "high": return "bg-red-50 border-red-200 dark:bg-red-900/20 dark:border-red-700/30";
                              default: return "bg-gray-50 border-gray-200 dark:bg-gray-900/20 dark:border-gray-700/30";
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
                            <motion.div 
                              key={index} 
                              className={`p-4 rounded-lg border ${getBgColor()}`}
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: index * 0.1, duration: 0.3 }}
                              whileHover={{ scale: 1.01, boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)' }}
                            >
                              <div className="flex items-center">
                                {getIcon()}
                                <h4 className="font-semibold ml-2">{risk.title}</h4>
                                <span className={`ml-auto text-xs px-2 py-1 rounded-full ${
                                  risk.severity === "high" ? "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300" :
                                  risk.severity === "medium" ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300" :
                                  "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300"
                                }`}>
                                  {risk.severity.charAt(0).toUpperCase() + risk.severity.slice(1)} Risk
                                </span>
                              </div>
                              <p className="mt-2 text-gray-700 dark:text-gray-300">{risk.description}</p>
                            </motion.div>
                          );
                        })}
                      </div>
                    </motion.div>
                  </TabsContent>
                  
                  <TabsContent value="fullText">
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <h3 className="text-xl font-semibold bg-gradient-to-r from-[#8E2DE2] to-[#4A00E0] bg-clip-text text-transparent mb-4">Full Document Text</h3>
                      <motion.div 
                        className="p-4 bg-gray-50 dark:bg-[#0F0F0F]/50 rounded-lg border border-[#8E2DE2]/20 shadow-sm whitespace-pre-line font-mono text-sm"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                      >
                        {document.content}
                      </motion.div>
                    </motion.div>
                  </TabsContent>
                </>
              ) : (
                <motion.div 
                  className="text-center py-12"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ type: "spring", stiffness: 400, damping: 17, delay: 0.2 }}
                  >
                    <FileText className="mx-auto h-16 w-16 text-gray-300 dark:text-gray-600 mb-4" />
                  </motion.div>
                  <motion.h3 
                    className="text-xl font-medium text-gray-900 dark:text-gray-100 mb-2"
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.3 }}
                  >
                    Document not yet analyzed
                  </motion.h3>
                  <motion.p 
                    className="text-gray-500 dark:text-gray-400 mb-6 max-w-md mx-auto"
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.4 }}
                  >
                    Click the "Analyze Document" button to perform AI analysis on this document
                  </motion.p>
                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    whileHover={{ scale: 1.05 }}
                  >
                    <Button 
                      onClick={handleAnalyze} 
                      disabled={analyzing}
                      className="bg-gradient-to-r from-[#8E2DE2] to-[#4A00E0] hover:opacity-90 transition-all duration-300 shadow-[0_5px_15px_rgba(74,0,224,0.25)] hover:shadow-[0_5px_20px_rgba(74,0,224,0.4)]"
                    >
                      {analyzing ? "Analyzing..." : "Analyze Document"}
                    </Button>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </Tabs>
      </motion.div>
    </DashboardLayout>
  );
};

export default DocumentDetails;
