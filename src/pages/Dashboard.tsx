
import { FileText, Upload, ArrowUp, AlertTriangle } from "lucide-react";
import DashboardLayout from "../components/dashboard/DashboardLayout";
import DocumentCard from "../components/dashboard/DocumentCard";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Dashboard = () => {
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

  return (
    <DashboardLayout>
      <div className="mb-8">
        <h1 className="text-2xl font-serif font-bold text-gray-900 mb-2">Welcome back, John!</h1>
        <p className="text-gray-600">Here's an overview of your legal documents and recent activities.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-3 mb-8">
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-gray-500">Total Documents</p>
              <h3 className="text-3xl font-bold text-gray-900 mt-1">12</h3>
            </div>
            <div className="p-2 bg-blue-50 rounded-lg">
              <FileText className="h-6 w-6 text-legal-light-blue" />
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm">
            <ArrowUp className="h-4 w-4 text-green-500 mr-1" />
            <span className="text-green-500 font-medium">3 new</span>
            <span className="text-gray-500 ml-1">this week</span>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-gray-500">Documents Analyzed</p>
              <h3 className="text-3xl font-bold text-gray-900 mt-1">10</h3>
            </div>
            <div className="p-2 bg-green-50 rounded-lg">
              <FileText className="h-6 w-6 text-green-600" />
            </div>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2.5 mt-4">
            <div className="bg-green-600 h-2.5 rounded-full" style={{ width: '83%' }}></div>
          </div>
          <p className="text-xs text-gray-500 mt-1">83% of your uploads analyzed</p>
        </div>

        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-gray-500">Risk Alerts</p>
              <h3 className="text-3xl font-bold text-gray-900 mt-1">2</h3>
            </div>
            <div className="p-2 bg-red-50 rounded-lg">
              <AlertTriangle className="h-6 w-6 text-red-500" />
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm">
            <span className="text-red-500 font-medium">1 high risk</span>
            <span className="text-gray-500 ml-1">needs attention</span>
          </div>
        </div>
      </div>

      <div className="mb-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-900">Recent Documents</h2>
          <Button asChild variant="outline">
            <Link to="/dashboard/documents">View All</Link>
          </Button>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {recentDocuments.map((doc) => (
            <DocumentCard
              key={doc.id}
              id={doc.id}
              title={doc.title}
              type={doc.type}
              uploadDate={doc.uploadDate}
              status={doc.status}
              riskLevel={doc.riskLevel}
            />
          ))}
        </div>
      </div>

      <div className="bg-gradient-to-r from-legal-blue to-legal-light-blue rounded-xl p-6 md:p-8 text-white">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div className="mb-6 md:mb-0 md:mr-6">
            <h3 className="text-xl font-bold mb-2">Analyze a New Document</h3>
            <p className="text-white/80 max-w-md">
              Upload a contract, NDA, or legal agreement to get instant analysis with key terms highlighted and risks identified.
            </p>
          </div>
          <Button size="lg" className="bg-white text-legal-blue hover:bg-gray-100 shrink-0" asChild>
            <Link to="/dashboard/upload">
              <Upload className="mr-2 h-5 w-5" />
              Upload Document
            </Link>
          </Button>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
