
import { Upload, FileText, ArrowUp, AlertTriangle } from "lucide-react";
import { useState, useEffect } from "react";
import DashboardLayout from "../components/dashboard/DashboardLayout";
import DocumentCard from "../components/dashboard/DocumentCard";
import LawyerToolbox from "../components/dashboard/LawyerToolbox";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { analyzeDocument } from "../services/ai";
import DocumentUpload from "../components/DocumentUpload";
import { motion } from "framer-motion";

const Dashboard = () => {
  const { toast } = useToast();
  const [isUploading, setIsUploading] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [showUploadSection, setShowUploadSection] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Check if user is logged in 
  useEffect(() => {
    const userLoggedIn = localStorage.getItem("legalens-user");
    setIsLoggedIn(!!userLoggedIn);
    
    if (!userLoggedIn) {
      toast({
        title: "Authentication required",
        description: "Please sign in to access the dashboard",
        variant: "destructive",
      });
      setTimeout(() => {
        window.location.href = "/login";
      }, 2000);
    }
  }, [toast]);

  const recentDocuments = [
    {
      id: "doc-1234567",
      title: "Employment Agreement - TechCorp",
      type: "Agreement",
      uploadDate: "May 10, 2025",
      status: "Analyzed",
      riskLevel: "Low",
    },
    {
      id: "doc-7654321",
      title: "Non-Disclosure Agreement - Project Falcon",
      type: "NDA",
      uploadDate: "May 8, 2025",
      status: "Analyzed",
      riskLevel: "Medium",
    },
    {
      id: "doc-9876543",
      title: "Service Contract - Marketing Services",
      type: "Contract",
      uploadDate: "May 5, 2025",
      status: "Analyzed",
      riskLevel: "High",
    },
  ] as const;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setShowUploadSection(true);
      toast({
        title: "File selected",
        description: `${file.name} is ready to upload`,
      });
    }
  };

  const handleUploadClick = async () => {
    if (!selectedFile) {
      document.getElementById('document-upload')?.click();
    } else {
      setShowUploadSection(true);
    }
  };
  
  if (!isLoggedIn) {
    return null; // Don't render anything while redirecting
  }

  return (
    <DashboardLayout>
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="mb-8"
      >
        <h1 className="text-2xl font-serif font-bold bg-gradient-to-r from-[#8E2DE2] to-[#4A00E0] bg-clip-text text-transparent mb-2">
          Welcome back, John!
        </h1>
        <p className="text-gray-600 dark:text-gray-400">Here's an overview of your legal documents and recent activities.</p>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="grid gap-6 md:grid-cols-3 mb-8"
      >
        <motion.div 
          whileHover={{ y: -5, boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)' }}
          className="bg-white dark:bg-[#1E293B] p-6 rounded-xl border border-[#8E2DE2]/20 shadow-sm hover:shadow-md transition-all"
        >
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Total Documents</p>
              <h3 className="text-3xl font-bold bg-gradient-to-r from-[#8E2DE2] to-[#4A00E0] bg-clip-text text-transparent mt-1">12</h3>
            </div>
            <div className="p-2 bg-[#4A00E0]/10 rounded-lg">
              <FileText className="h-6 w-6 text-[#4A00E0]" />
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm">
            <ArrowUp className="h-4 w-4 text-green-500 mr-1" />
            <span className="text-green-500 font-medium">3 new</span>
            <span className="text-gray-500 ml-1">this week</span>
          </div>
        </motion.div>

        <motion.div 
          whileHover={{ y: -5, boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)' }}
          className="bg-white dark:bg-[#1E293B] p-6 rounded-xl border border-[#8E2DE2]/20 shadow-sm hover:shadow-md transition-all"
        >
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Documents Analyzed</p>
              <h3 className="text-3xl font-bold bg-gradient-to-r from-[#8E2DE2] to-[#4A00E0] bg-clip-text text-transparent mt-1">10</h3>
            </div>
            <div className="p-2 bg-green-50 dark:bg-green-900/20 rounded-lg">
              <FileText className="h-6 w-6 text-green-600 dark:text-green-400" />
            </div>
          </div>
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5 mt-4">
            <div className="bg-gradient-to-r from-[#4A00E0] to-[#8E2DE2] h-2.5 rounded-full" style={{ width: '83%' }}></div>
          </div>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">83% of your uploads analyzed</p>
        </motion.div>

        <motion.div 
          whileHover={{ y: -5, boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)' }}
          className="bg-white dark:bg-[#1E293B] p-6 rounded-xl border border-[#8E2DE2]/20 shadow-sm hover:shadow-md transition-all"
        >
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Risk Alerts</p>
              <h3 className="text-3xl font-bold text-red-500 dark:text-red-400 mt-1">2</h3>
            </div>
            <div className="p-2 bg-red-50 dark:bg-red-900/20 rounded-lg">
              <AlertTriangle className="h-6 w-6 text-red-500 dark:text-red-400" />
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm">
            <span className="text-red-500 dark:text-red-400 font-medium">1 high risk</span>
            <span className="text-gray-500 dark:text-gray-400 ml-1">needs attention</span>
          </div>
        </motion.div>
      </motion.div>

      {/* Document Upload Section */}
      {!showUploadSection ? (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-8 relative overflow-hidden rounded-xl shadow-[0_5px_20px_rgba(142,45,226,0.2)]"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-[#4A00E0] to-[#8E2DE2] opacity-100"></div>
          <div className="absolute inset-0 opacity-50">
            <div className="absolute top-0 left-0 w-32 h-32 bg-white rounded-full filter blur-3xl opacity-10 animate-pulse"></div>
            <div className="absolute bottom-0 right-0 w-32 h-32 bg-[#00FFFF] rounded-full filter blur-3xl opacity-10 animate-pulse"></div>
          </div>
          
          <div className="relative z-10 p-6 md:p-8 text-white">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
              <div className="mb-6 md:mb-0 md:mr-6">
                <motion.h3 
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 }}
                  className="text-xl font-bold mb-2"
                >
                  Analyze a New Document
                </motion.h3>
                <motion.p 
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 }}
                  className="text-white/80 max-w-md"
                >
                  Upload a contract, NDA, or legal agreement to get instant analysis with key terms highlighted and risks identified.
                </motion.p>
              </div>
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.6, type: "spring" }}
                className="flex flex-col sm:flex-row gap-4"
              >
                <input
                  id="document-upload"
                  type="file"
                  className="hidden"
                  accept=".pdf,.doc,.docx,.txt"
                  onChange={handleFileChange}
                />
                <Button 
                  size="lg" 
                  className="bg-white text-[#4A00E0] hover:bg-gray-100 shrink-0 border-white hover:shadow-[0_0_15px_rgba(255,255,255,0.5)] transition-all transform hover:scale-105 hover:translate-y-[-2px]"
                  onClick={handleUploadClick}
                >
                  <Upload className="mr-2 h-5 w-5" />
                  Upload Document
                </Button>
              </motion.div>
            </div>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="text-center mt-4 text-white/70 text-sm"
            >
              Supported formats: PDF, DOC, DOCX, and TXT up to 20MB
            </motion.div>
          </div>
        </motion.div>
      ) : (
        <motion.div 
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          className="mb-8"
        >
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-bold bg-gradient-to-r from-[#8E2DE2] to-[#4A00E0] bg-clip-text text-transparent">Document Analysis</h3>
            <Button 
              variant="outline" 
              className="border-[#8E2DE2] text-[#8E2DE2] hover:bg-[#8E2DE2]/10"
              onClick={() => setShowUploadSection(false)}
            >
              Cancel
            </Button>
          </div>
          <div className="bg-white dark:bg-[#1E293B] rounded-xl border border-[#8E2DE2]/20 shadow-md p-6">
            <DocumentUpload />
          </div>
        </motion.div>
      )}
      
      {/* Lawyer Toolbox */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="mb-8"
      >
        <LawyerToolbox />
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="mb-8"
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold bg-gradient-to-r from-[#8E2DE2] to-[#4A00E0] bg-clip-text text-transparent">Recent Documents</h2>
          <Button asChild variant="outline" className="border-[#8E2DE2] text-[#8E2DE2] hover:bg-[#8E2DE2]/10">
            <Link to="/dashboard/documents">View All</Link>
          </Button>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {recentDocuments.map((doc, index) => (
            <motion.div
              key={doc.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 + index * 0.1 }}
            >
              <DocumentCard
                id={doc.id}
                title={doc.title}
                type={doc.type}
                uploadDate={doc.uploadDate}
                status={doc.status}
                riskLevel={doc.riskLevel}
              />
            </motion.div>
          ))}
        </div>
      </motion.div>
    </DashboardLayout>
  );
};

export default Dashboard;
