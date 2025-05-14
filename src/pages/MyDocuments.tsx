
import { useState } from "react";
import { FileText, Search, Filter, Download, Trash2, Plus } from "lucide-react";
import DashboardLayout from "../components/dashboard/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

interface Document {
  id: string;
  title: string;
  type: string;
  uploadDate: string;
  status: string;
  riskLevel: "Low" | "Medium" | "High";
}

const MyDocuments = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [documents, setDocuments] = useState<Document[]>([
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
    {
      id: "doc-5432198",
      title: "Lease Agreement - Office Space",
      type: "Lease",
      uploadDate: "May 3, 2025",
      status: "Analyzed",
      riskLevel: "Medium",
    },
    {
      id: "doc-3456789",
      title: "Partnership Agreement - Joint Venture",
      type: "Partnership",
      uploadDate: "April 28, 2025",
      status: "Analyzed",
      riskLevel: "Low",
    },
  ]);

  const filteredDocuments = documents.filter(doc => 
    doc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    doc.type.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getRiskBadgeColor = (riskLevel: string) => {
    switch (riskLevel) {
      case "Low":
        return "bg-green-100 text-green-800 hover:bg-green-200";
      case "Medium":
        return "bg-yellow-100 text-yellow-800 hover:bg-yellow-200";
      case "High":
        return "bg-red-100 text-red-800 hover:bg-red-200";
      default:
        return "";
    }
  };

  const deleteDocument = (id: string) => {
    setDocuments(documents.filter(doc => doc.id !== id));
  };

  return (
    <DashboardLayout>
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="mb-8"
      >
        <h1 className="text-2xl font-serif font-bold bg-gradient-to-r from-[#8E2DE2] to-[#4A00E0] bg-clip-text text-transparent mb-2">
          My Documents
        </h1>
        <p className="text-gray-600 dark:text-gray-400">Manage and analyze your legal documents</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="mb-6 flex flex-col sm:flex-row justify-between gap-4 items-center"
      >
        <div className="relative w-full sm:max-w-xs">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400" />
          <Input
            type="search"
            placeholder="Search documents..."
            className="pl-9 w-full"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex gap-2 w-full sm:w-auto">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="gap-2">
                <Filter className="h-4 w-4" />
                Filter
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>All Documents</DropdownMenuItem>
              <DropdownMenuItem>Contracts</DropdownMenuItem>
              <DropdownMenuItem>Agreements</DropdownMenuItem>
              <DropdownMenuItem>NDAs</DropdownMenuItem>
              <DropdownMenuItem>High Risk</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Link to="/try-now">
            <Button className="gap-2 bg-gradient-to-r from-[#8E2DE2] to-[#4A00E0]">
              <Plus className="h-4 w-4" />
              Upload New
            </Button>
          </Link>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="rounded-xl border bg-white dark:bg-[#1E293B] shadow-sm"
      >
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 dark:bg-[#1E1E2A] border-b">
                <th className="py-3 px-4 text-left font-medium text-gray-600 dark:text-gray-300">Document Name</th>
                <th className="py-3 px-4 text-left font-medium text-gray-600 dark:text-gray-300">Type</th>
                <th className="py-3 px-4 text-left font-medium text-gray-600 dark:text-gray-300">Upload Date</th>
                <th className="py-3 px-4 text-left font-medium text-gray-600 dark:text-gray-300">Risk Level</th>
                <th className="py-3 px-4 text-left font-medium text-gray-600 dark:text-gray-300">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredDocuments.length === 0 ? (
                <tr>
                  <td colSpan={5} className="py-8 text-center text-gray-500 dark:text-gray-400">
                    No documents found. Try adjusting your search.
                  </td>
                </tr>
              ) : (
                filteredDocuments.map((doc) => (
                  <tr key={doc.id} className="border-b hover:bg-gray-50 dark:hover:bg-[#1E1E3A] transition-colors">
                    <td className="py-3 px-4">
                      <Link to={`/dashboard/documents/${doc.id}`} className="flex items-center gap-2 hover:text-[#8E2DE2]">
                        <FileText className="h-4 w-4 text-gray-500" />
                        <span className="font-medium">{doc.title}</span>
                      </Link>
                    </td>
                    <td className="py-3 px-4 text-gray-600 dark:text-gray-300">{doc.type}</td>
                    <td className="py-3 px-4 text-gray-600 dark:text-gray-300">{doc.uploadDate}</td>
                    <td className="py-3 px-4">
                      <Badge className={getRiskBadgeColor(doc.riskLevel)}>
                        {doc.riskLevel}
                      </Badge>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex gap-2">
                        <Button variant="ghost" size="icon" title="Download">
                          <Download className="h-4 w-4" />
                        </Button>
                        <Link to={`/dashboard/documents/${doc.id}`}>
                          <Button variant="ghost" size="icon" title="View Details">
                            <FileText className="h-4 w-4" />
                          </Button>
                        </Link>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="text-red-500 hover:text-red-700 hover:bg-red-50" 
                          title="Delete"
                          onClick={() => deleteDocument(doc.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </motion.div>
    </DashboardLayout>
  );
};

export default MyDocuments;
