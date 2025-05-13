
import React from 'react';
import { Link } from 'react-router-dom';
import { FileText, ExternalLink, AlertTriangle, CheckCircle, AlertCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from "@/lib/utils";

interface DocumentCardProps {
  id: string;
  title: string;
  type: string;
  uploadDate: string;
  status: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}

const DocumentCard = ({ id, title, type, uploadDate, status, riskLevel }: DocumentCardProps) => {
  const getRiskBadgeClass = () => {
    switch (riskLevel) {
      case 'Low':
        return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300';
      case 'Medium':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300';
      case 'High':
        return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300';
    }
  };

  const getRiskIcon = () => {
    switch (riskLevel) {
      case 'Low':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'Medium':
        return <AlertCircle className="h-5 w-5 text-yellow-500" />;
      case 'High':
        return <AlertTriangle className="h-5 w-5 text-red-500" />;
      default:
        return null;
    }
  };

  return (
    <motion.div
      whileHover={{ y: -5, boxShadow: '0 10px 25px -5px rgba(74, 0, 224, 0.1), 0 8px 10px -6px rgba(74, 0, 224, 0.1)' }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
      className="relative bg-white dark:bg-[#1E1E1E] rounded-lg overflow-hidden group border border-[#8E2DE2]/10 hover:border-[#8E2DE2]/30 shadow-sm"
    >
      {/* Animated gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#8E2DE2]/5 to-transparent opacity-0 group-hover:opacity-100 transform -translate-x-full group-hover:translate-x-full transition-all duration-1000 ease-out"></div>
      
      {/* Card Content */}
      <div className="p-5">
        <div className="flex items-center mb-4">
          <div className="p-2 bg-[#4A00E0]/10 rounded-lg mr-3">
            <FileText className="h-5 w-5 text-[#4A00E0]" />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-gray-900 dark:text-gray-100 font-medium truncate">
              {title}
            </h3>
            <p className="text-xs text-gray-500 mt-0.5 truncate">
              {type} • {uploadDate}
            </p>
          </div>
        </div>
        
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-2">
            {getRiskIcon()}
            <span className={cn(
              "text-xs px-2 py-0.5 rounded-full", 
              getRiskBadgeClass()
            )}>
              {riskLevel} Risk
            </span>
            <span className="text-xs px-2 py-0.5 bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300 rounded-full">
              {status}
            </span>
          </div>
          
          <Link 
            to={`/dashboard/documents/${id}`}
            className="text-[#4A00E0] hover:text-[#8E2DE2] transition-colors flex items-center"
          >
            <span className="text-sm mr-1">View</span>
            <ExternalLink className="h-4 w-4" />
          </Link>
        </div>
      </div>
      
      {/* Animated border bottom effect */}
      <div className="h-1 w-0 bg-gradient-to-r from-[#4A00E0] to-[#8E2DE2] group-hover:w-full transition-all duration-300"></div>
    </motion.div>
  );
};

export default DocumentCard;
