
import { useState, useEffect } from "react";
import { Loader2, Users, FileText, Shield } from "lucide-react";
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";

const Admin = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalDocuments: 0,
    activeUsers: 0
  });

  useEffect(() => {
    // Simulate data loading
    setTimeout(() => {
      setStats({
        totalUsers: 256,
        totalDocuments: 1247,
        activeUsers: 42
      });
      setIsLoading(false);
    }, 1500);
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-purple-50 to-pink-50">
        <Loader2 className="h-12 w-12 animate-spin text-purple-500 mb-4" />
        <p className="text-lg text-purple-700">Loading admin panel...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50">
      <div className="flex flex-col">
        {/* Admin Header */}
        <header className="bg-white/80 backdrop-blur-md border-b border-purple-100 shadow-sm sticky top-0 z-50">
          <div className="container mx-auto px-4 py-4 flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-purple-600 to-pink-500 flex items-center justify-center">
                <Shield className="h-5 w-5 text-white" />
              </div>
              <span className="font-serif text-xl font-bold text-gray-800">
                LegaLens <span className="bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent">Admin</span>
              </span>
            </div>
            
            <a href="/" className="text-sm text-purple-600 hover:text-purple-800">
              Back to Website
            </a>
          </div>
        </header>

        {/* Admin Content */}
        <main className="container mx-auto px-4 py-8">
          {/* Dashboard Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card className="p-6 shadow-md hover:shadow-lg transition-all border-purple-100 bg-white/80 backdrop-blur-md animate-fade-in">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">Total Users</p>
                  <h3 className="text-3xl font-bold text-purple-700 mt-1">{stats.totalUsers}</h3>
                </div>
                <div className="bg-purple-100 p-3 rounded-full">
                  <Users className="h-6 w-6 text-purple-500" />
                </div>
              </div>
              <p className="text-sm mt-4 text-green-600">+12% from last month</p>
            </Card>
            
            <Card className="p-6 shadow-md hover:shadow-lg transition-all border-purple-100 bg-white/80 backdrop-blur-md animate-fade-in animate-delay-100">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">Documents Analyzed</p>
                  <h3 className="text-3xl font-bold text-purple-700 mt-1">{stats.totalDocuments}</h3>
                </div>
                <div className="bg-pink-100 p-3 rounded-full">
                  <FileText className="h-6 w-6 text-pink-500" />
                </div>
              </div>
              <p className="text-sm mt-4 text-green-600">+27% from last month</p>
            </Card>
            
            <Card className="p-6 shadow-md hover:shadow-lg transition-all border-purple-100 bg-white/80 backdrop-blur-md animate-fade-in animate-delay-200">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">Active Users Now</p>
                  <h3 className="text-3xl font-bold text-purple-700 mt-1">{stats.activeUsers}</h3>
                </div>
                <div className="bg-blue-100 p-3 rounded-full">
                  <Users className="h-6 w-6 text-blue-500" />
                </div>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-1.5 mt-4">
                <div className="bg-gradient-to-r from-purple-500 to-pink-500 h-1.5 rounded-full" style={{width: '42%'}}></div>
              </div>
              <p className="text-xs text-gray-500 mt-1">42% of capacity</p>
            </Card>
          </div>
          
          {/* Main Admin Interface */}
          <Tabs defaultValue="users" className="w-full">
            <TabsList className="mb-6 bg-white/50 backdrop-blur-md border border-purple-100">
              <TabsTrigger value="users">Users</TabsTrigger>
              <TabsTrigger value="documents">Documents</TabsTrigger>
              <TabsTrigger value="settings">System Settings</TabsTrigger>
              <TabsTrigger value="logs">Activity Logs</TabsTrigger>
            </TabsList>
            
            <TabsContent value="users" className="bg-white/80 backdrop-blur-md p-6 rounded-lg border border-purple-100 shadow-md animate-fade-in">
              <h2 className="text-xl font-semibold mb-4">User Management</h2>
              <p className="text-gray-600 mb-4">View, edit, and manage user accounts.</p>
              
              <div className="overflow-x-auto">
                <table className="w-full table-auto">
                  <thead>
                    <tr className="bg-purple-50">
                      <th className="px-4 py-2 text-left text-sm font-medium text-purple-700">ID</th>
                      <th className="px-4 py-2 text-left text-sm font-medium text-purple-700">Name</th>
                      <th className="px-4 py-2 text-left text-sm font-medium text-purple-700">Email</th>
                      <th className="px-4 py-2 text-left text-sm font-medium text-purple-700">Documents</th>
                      <th className="px-4 py-2 text-left text-sm font-medium text-purple-700">Last Active</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[1, 2, 3, 4, 5].map((i) => (
                      <tr key={i} className="border-t border-gray-100 hover:bg-purple-50 transition-colors">
                        <td className="px-4 py-3 text-sm">user-{i}23ab4</td>
                        <td className="px-4 py-3 text-sm">User {i}</td>
                        <td className="px-4 py-3 text-sm">user{i}@example.com</td>
                        <td className="px-4 py-3 text-sm">{Math.floor(Math.random() * 50)}</td>
                        <td className="px-4 py-3 text-sm">2 hours ago</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </TabsContent>
            
            <TabsContent value="documents" className="bg-white/80 backdrop-blur-md p-6 rounded-lg border border-purple-100 shadow-md animate-fade-in">
              <h2 className="text-xl font-semibold mb-4">Document Analytics</h2>
              <p className="text-gray-600 mb-6">View statistics and manage document analysis data.</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="p-4 bg-white shadow border border-purple-50">
                  <h3 className="font-semibold text-purple-700">Most Common Document Types</h3>
                  <ul className="mt-4 space-y-2">
                    <li className="flex justify-between">
                      <span>NDAs</span>
                      <span className="font-medium">34%</span>
                    </li>
                    <li className="flex justify-between">
                      <span>Employment Contracts</span>
                      <span className="font-medium">27%</span>
                    </li>
                    <li className="flex justify-between">
                      <span>Service Agreements</span>
                      <span className="font-medium">18%</span>
                    </li>
                    <li className="flex justify-between">
                      <span>Lease Agreements</span>
                      <span className="font-medium">12%</span>
                    </li>
                    <li className="flex justify-between">
                      <span>Other</span>
                      <span className="font-medium">9%</span>
                    </li>
                  </ul>
                </Card>
                
                <Card className="p-4 bg-white shadow border border-purple-50">
                  <h3 className="font-semibold text-purple-700">Average Analysis Time</h3>
                  <div className="flex items-baseline mt-4">
                    <span className="text-3xl font-bold text-purple-700">3.2</span>
                    <span className="ml-1 text-gray-500">seconds</span>
                  </div>
                  <p className="text-sm text-green-600 mt-2">12% faster than last month</p>
                </Card>
              </div>
            </TabsContent>
            
            <TabsContent value="settings" className="bg-white/80 backdrop-blur-md p-6 rounded-lg border border-purple-100 shadow-md animate-fade-in">
              <h2 className="text-xl font-semibold mb-4">System Settings</h2>
              <p className="text-gray-600 mb-6">Configure API keys, system parameters, and preferences.</p>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium mb-2">API Configuration</h3>
                  <div className="bg-gray-50 p-4 rounded border border-gray-200">
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-700 mb-1">OpenAI API Key</label>
                      <input 
                        type="password" 
                        value="sk-•••••••••••••••••••••••••••••••••••••••••••••••••••" 
                        readOnly 
                        className="w-full p-2 border border-gray-300 rounded-md bg-gray-100"
                      />
                      <p className="text-xs text-gray-500 mt-1">Last updated: 3 days ago</p>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Email Service API Key</label>
                      <input 
                        type="password" 
                        value="SG.•••••••••••••••••••••••••••••••••••••••••••••••" 
                        readOnly 
                        className="w-full p-2 border border-gray-300 rounded-md bg-gray-100"
                      />
                      <p className="text-xs text-gray-500 mt-1">Last updated: 1 week ago</p>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium mb-2">System Parameters</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Maximum File Size</label>
                      <select className="w-full p-2 border border-gray-300 rounded-md">
                        <option>5 MB</option>
                        <option selected>10 MB</option>
                        <option>15 MB</option>
                        <option>20 MB</option>
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Analysis Timeout</label>
                      <select className="w-full p-2 border border-gray-300 rounded-md">
                        <option>30 seconds</option>
                        <option selected>1 minute</option>
                        <option>2 minutes</option>
                        <option>5 minutes</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="logs" className="bg-white/80 backdrop-blur-md p-6 rounded-lg border border-purple-100 shadow-md animate-fade-in">
              <h2 className="text-xl font-semibold mb-4">Activity Logs</h2>
              <p className="text-gray-600 mb-6">View system activity and user actions.</p>
              
              <div className="space-y-4">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="border-l-4 border-purple-400 pl-4 py-2">
                    <p className="text-sm text-gray-600">
                      <span className="font-medium text-purple-700">user{i + 1}@example.com</span> uploaded a new document
                    </p>
                    <p className="text-xs text-gray-500">{i === 0 ? 'Just now' : `${i * 15} minutes ago`}</p>
                  </div>
                ))}
                
                <div className="border-l-4 border-blue-400 pl-4 py-2">
                  <p className="text-sm text-gray-600">
                    <span className="font-medium text-blue-700">System</span> performed scheduled backup
                  </p>
                  <p className="text-xs text-gray-500">1 hour ago</p>
                </div>
                
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="border-l-4 border-purple-400 pl-4 py-2">
                    <p className="text-sm text-gray-600">
                      <span className="font-medium text-purple-700">admin@legalens.ai</span> updated system settings
                    </p>
                    <p className="text-xs text-gray-500">{`${i + 2} hours ago`}</p>
                  </div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  );
};

export default Admin;
