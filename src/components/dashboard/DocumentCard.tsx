
import { FileText, Calendar, Download, Eye } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

interface DocumentCardProps {
  id: string;
  title: string;
  type: string;
  uploadDate: string;
  status: "Analyzed" | "Processing" | "Failed";
  riskLevel?: "Low" | "Medium" | "High";
}

const DocumentCard = ({ id, title, type, uploadDate, status, riskLevel }: DocumentCardProps) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "Analyzed":
        return "bg-green-100 text-green-800";
      case "Processing":
        return "bg-yellow-100 text-yellow-800";
      case "Failed":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getRiskColor = (risk?: string) => {
    switch (risk) {
      case "Low":
        return "bg-green-100 text-green-800";
      case "Medium":
        return "bg-yellow-100 text-yellow-800";
      case "High":
        return "bg-red-100 text-red-800";
      default:
        return "";
    }
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
      <div className="p-5">
        <div className="flex items-start justify-between">
          <div className="flex items-center">
            <div className="mr-3 p-2 bg-blue-50 rounded-lg">
              <FileText className="h-6 w-6 text-legal-light-blue" />
            </div>
            <div>
              <h3 className="text-lg font-medium text-gray-900 truncate">
                {title}
              </h3>
              <p className="text-sm text-gray-500">
                {type} • {id.slice(0, 8)}
              </p>
            </div>
          </div>
          <div className="flex space-x-2">
            <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(status)}`}>
              {status}
            </span>
            {riskLevel && (
              <span className={`text-xs px-2 py-1 rounded-full ${getRiskColor(riskLevel)}`}>
                {riskLevel} Risk
              </span>
            )}
          </div>
        </div>

        <div className="mt-4 flex items-center text-sm text-gray-500">
          <Calendar className="h-4 w-4 mr-1" />
          <span>Uploaded on {uploadDate}</span>
        </div>

        <div className="mt-6 flex justify-between">
          <Button variant="outline" size="sm" className="text-gray-700" asChild>
            <Link to={`/dashboard/documents/${id}`}>
              <Eye className="h-4 w-4 mr-1" /> View
            </Link>
          </Button>
          <Button variant="outline" size="sm" className="text-gray-700">
            <Download className="h-4 w-4 mr-1" /> Download
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DocumentCard;
