
import { useState } from 'react';
import { 
  Scale, Briefcase, FileCog, FileSearch, 
  CalendarClock, Gavel, MessageSquareQuote, BookOpen 
} from 'lucide-react';
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const LawyerToolbox = () => {
  const [activeTab, setActiveTab] = useState<string>('');
  
  const tools = [
    {
      id: 'precedent',
      name: 'Precedent Search',
      icon: FileSearch,
      description: 'Search for relevant case precedents and legal decisions'
    },
    {
      id: 'template',
      name: 'Document Templates',
      icon: FileCog,
      description: 'Access and customize legal document templates'
    },
    {
      id: 'calendar',
      name: 'Case Calendar',
      icon: CalendarClock,
      description: 'Manage deadlines, court dates and client meetings'
    },
    {
      id: 'citation',
      name: 'Citation Generator',
      icon: BookOpen,
      description: 'Properly format legal citations for documents'
    },
    {
      id: 'argument',
      name: 'Argument Builder',
      icon: MessageSquareQuote,
      description: 'Structure and strengthen legal arguments'
    },
    {
      id: 'statutes',
      name: 'Statute Library',
      icon: Gavel,
      description: 'Browse updated statutes and regulations'
    }
  ];

  return (
    <div className="w-full bg-white dark:bg-[#1E1E1E] rounded-xl overflow-hidden shadow-lg border border-[#8E2DE2]/20 animate-fade-in">
      <div className="p-6 border-b border-[#8E2DE2]/10">
        <h3 className="text-xl font-bold bg-gradient-to-r from-[#8E2DE2] to-[#4A00E0] bg-clip-text text-transparent">
          Legal Professional Tools
        </h3>
      </div>
      
      <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {tools.map((tool) => (
          <div 
            key={tool.id}
            onClick={() => setActiveTab(tool.id)}
            className={cn(
              "relative p-5 rounded-lg cursor-pointer transition-all duration-300 overflow-hidden group hover:scale-[1.02]",
              activeTab === tool.id 
                ? "border-2 border-[#8E2DE2] shadow-[0_0_15px_rgba(74,0,224,0.3)]" 
                : "border border-[#8E2DE2]/10 hover:border-[#8E2DE2]/30 hover:bg-gradient-to-br hover:from-white hover:to-[#F3F4F6] dark:hover:from-[#1E1E1E] dark:hover:to-[#0F0F0F]"
            )}
          >
            {/* Animated Gradient Background */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#8E2DE2]/0 via-[#8E2DE2]/5 to-[#4A00E0]/0 opacity-0 group-hover:opacity-100 group-hover:animate-shimmer transition-opacity"></div>
            
            <div className="flex items-start space-x-4 relative z-10">
              <div className={cn(
                "p-3 rounded-lg transition-colors",
                activeTab === tool.id 
                  ? "bg-[#8E2DE2] text-white" 
                  : "bg-[#8E2DE2]/10 text-[#8E2DE2] group-hover:bg-[#8E2DE2]/20"
              )}>
                <tool.icon size={20} className="transition-transform group-hover:scale-110" />
              </div>
              <div>
                <h4 className="font-medium text-gray-900 dark:text-[#F8FAFC]">{tool.name}</h4>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{tool.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="p-6 border-t border-[#8E2DE2]/10 flex justify-end">
        <Button className="bg-gradient-to-r from-[#8E2DE2] to-[#4A00E0] hover:opacity-90 transition-all duration-300 shadow-[0_0_10px_rgba(74,0,224,0.3)]">
          <Scale className="mr-2 h-4 w-4" /> 
          Access Legal Tools
        </Button>
      </div>
    </div>
  );
};

export default LawyerToolbox;
