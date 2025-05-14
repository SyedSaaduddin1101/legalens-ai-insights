
import React from "react";
import { Link } from "react-router-dom";
import { FileText, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface DocumentCardProps {
  id: string;
  title: string;
  type: string;
  uploadDate: string;
  status: string;
  riskLevel: "Low" | "Medium" | "High";
}

const DocumentCard = ({
  id,
  title,
  type,
  uploadDate,
  status,
  riskLevel,
}: DocumentCardProps) => {
  const getRiskColor = (risk: string) => {
    switch (risk) {
      case "Low":
        return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400";
      case "Medium":
        return "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400";
      case "High":
        return "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400";
      default:
        return "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400";
    }
  };

  return (
    <motion.div
      whileHover={{ 
        y: -5, 
        boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)' 
      }}
      className="bg-white dark:bg-[#1E293B] rounded-xl border border-[#8E2DE2]/20 shadow-sm overflow-hidden transition-all duration-300"
    >
      <div className="p-6">
        <div className="flex items-start mb-4">
          <div className="p-2 bg-[#4A00E0]/10 rounded-lg mr-3">
            <FileText className="h-6 w-6 text-[#4A00E0]" />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-medium text-gray-900 dark:text-white text-lg mb-1 truncate">
              {title}
            </h3>
            <div className="flex flex-wrap gap-2">
              <span className="inline-flex items-center text-xs font-medium text-gray-600 dark:text-gray-300 bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">
                {type}
              </span>
              <span className={cn("inline-flex items-center text-xs font-medium px-2 py-1 rounded", getRiskColor(riskLevel))}>
                {riskLevel} Risk
              </span>
            </div>
          </div>
        </div>

        <div className="text-sm text-gray-500 dark:text-gray-400 flex justify-between items-center mt-6">
          <div>
            <p>Uploaded: {uploadDate}</p>
            <p>Status: {status}</p>
          </div>
          <Link
            to={`/dashboard/documents/${id}`}
            className="inline-flex items-center text-sm font-medium text-[#8E2DE2] hover:text-[#4A00E0] dark:text-[#B9FF66] dark:hover:text-[#99FF33] transition-colors"
          >
            View
            <ChevronRight className="ml-1 h-4 w-4" />
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default DocumentCard;
