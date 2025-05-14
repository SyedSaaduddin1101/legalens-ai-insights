import DashboardLayout from "../components/dashboard/DashboardLayout";
import LawyerToolbox from "../components/dashboard/LawyerToolbox";
import PrecedentSearch from "../components/dashboard/PrecedentSearch";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Card } from "@/components/ui/card";
import { Database } from "lucide-react";

const ProfessionalTools = () => {
  const [isConnected, setIsConnected] = useState<boolean>(false);

  useEffect(() => {
    // Simulate database connection check
    const checkDatabaseConnection = async () => {
      // In a real app, this would verify the actual database connection
      await new Promise(resolve => setTimeout(resolve, 1500));
      const fakeConnected = true; // Simulate successful connection
      setIsConnected(fakeConnected);
      
      if (fakeConnected) {
        toast.success("Connected to legal database", {
          description: "Your data is synchronized and secure"
        });
      } else {
        toast.error("Database connection failed", {
          description: "Please try again or contact support"
        });
      }
    };
    
    checkDatabaseConnection();
  }, []);

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <h1 className="text-2xl md:text-3xl font-bold">Professional Legal Tools</h1>
        
        {/* Database connection status */}
        <Card className={`p-4 border ${isConnected ? 'border-green-500' : 'border-orange-500'} flex items-center`}>
          <div className={`w-3 h-3 rounded-full ${isConnected ? 'bg-green-500' : 'bg-orange-500'} animate-pulse mr-3`}></div>
          <div className="flex-1">
            <h3 className="font-medium">Database Status</h3>
            <p className="text-sm text-gray-500">
              {isConnected 
                ? "Connected to LegaLens secure database" 
                : "Connecting to database..."}
            </p>
          </div>
          <Database className={`h-5 w-5 ${isConnected ? 'text-green-500' : 'text-orange-500'}`} />
        </Card>
        
        {/* Working precedent search tool */}
        <PrecedentSearch />
        
        {/* Other professional tools */}
        <LawyerToolbox />
      </div>
    </DashboardLayout>
  );
};

export default ProfessionalTools;
