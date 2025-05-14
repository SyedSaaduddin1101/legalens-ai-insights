
import { useState } from 'react';
import { 
  Scale, Briefcase, FileCog, FileSearch, 
  CalendarClock, Gavel, MessageSquareQuote, BookOpen,
  FileText, ClipboardCheck, UsersRound, FileWarning
} from 'lucide-react';
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { motion } from 'framer-motion';
import { toast } from "sonner";

const LawyerToolbox = () => {
  const [activeTab, setActiveTab] = useState<string>('');
  
  const handleToolClick = (toolId: string) => {
    setActiveTab(toolId);
    
    // Show a message to the user
    toast.info(`${tools.find(t => t.id === toolId)?.name} feature will be available soon`, {
      description: "We're currently working on this feature"
    });
  };
  
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
    },
    {
      id: 'contracts',
      name: 'Contract Review',
      icon: FileText,
      description: 'AI-assisted contract review and risk analysis'
    },
    {
      id: 'compliance',
      name: 'Compliance Checker',
      icon: ClipboardCheck,
      description: 'Verify regulatory compliance requirements'
    },
    {
      id: 'clients',
      name: 'Client Management',
      icon: UsersRound,
      description: 'Organize client information and case details'
    },
    {
      id: 'risk',
      name: 'Risk Assessment',
      icon: FileWarning,
      description: 'Evaluate potential legal risks and exposure'
    },
    {
      id: 'billing',
      name: 'Time & Billing',
      icon: Briefcase,
      description: 'Track billable hours and generate invoices'
    },
    {
      id: 'ethics',
      name: 'Ethics Advisor',
      icon: Scale,
      description: 'Get guidance on professional ethics questions'
    }
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full bg-white dark:bg-[#1E1E1E] rounded-xl overflow-hidden shadow-lg border border-[#8E2DE2]/20"
    >
      <motion.div 
        className="p-6 border-b border-[#8E2DE2]/10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <h3 className="text-xl font-bold bg-gradient-to-r from-[#8E2DE2] to-[#4A00E0] bg-clip-text text-transparent">
          Legal Professional Tools
        </h3>
      </motion.div>
      
      <div className="p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {tools.map((tool, index) => (
          <motion.div 
            key={tool.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 * index, duration: 0.5 }}
            onClick={() => handleToolClick(tool.id)}
            className={cn(
              "relative p-5 rounded-lg cursor-pointer transition-all duration-300 overflow-hidden group hover:scale-[1.02]",
              activeTab === tool.id 
                ? "border-2 border-[#8E2DE2] shadow-[0_0_15px_rgba(74,0,224,0.3)]" 
                : "border border-[#8E2DE2]/10 hover:border-[#8E2DE2]/30 hover:bg-gradient-to-br hover:from-white hover:to-[#F3F4F6] dark:hover:from-[#1E1E1E] dark:hover:to-[#0F0F0F]"
            )}
          >
            {/* Animated Gradient Background */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#8E2DE2]/0 via-[#8E2DE2]/5 to-[#4A00E0]/0 opacity-0 group-hover:opacity-100 group-hover:animate-shimmer transition-opacity"></div>
            
            {/* Sparkle Effects */}
            <motion.div 
              className="absolute top-1/4 right-1/4 sparkle"
              animate={{ scale: [0.8, 1.2, 0.8], opacity: [0, 1, 0] }}
              transition={{ duration: 2, repeat: Infinity, delay: index * 0.3 }}
            />
            
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
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1 line-clamp-2">{tool.description}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
      
      <motion.div 
        className="p-6 border-t border-[#8E2DE2]/10 flex justify-end"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <Button 
          className="bg-gradient-to-r from-[#8E2DE2] to-[#4A00E0] hover:opacity-90 transition-all duration-300 shadow-[0_0_10px_rgba(74,0,224,0.3)] hover:shadow-[0_0_15px_rgba(74,0,224,0.5)]"
          onClick={() => toast.info("Full legal toolbox coming soon", { 
            description: "We're expanding our professional legal tools"
          })}
        >
          <Scale className="mr-2 h-4 w-4" /> 
          Access Legal Tools
        </Button>
      </motion.div>
    </motion.div>
  );
};

export default LawyerToolbox;
