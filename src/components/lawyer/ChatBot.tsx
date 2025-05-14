
import { useState, useRef, useEffect } from 'react';
import { Send, X, MessageSquare, User, Bot } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'sonner';
import { getLegalAdvice } from '@/services/legalAI';

interface Message {
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: "Hello! I'm your AI legal assistant. How can I help with your legal questions today?",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const userLoggedIn = !!localStorage.getItem("legalens-user");
    setIsLoggedIn(userLoggedIn);
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = async () => {
    if (!input.trim()) return;
    
    if (!isLoggedIn) {
      toast.error("Please sign in to use the legal assistant", {
        description: "This feature requires authentication",
        action: {
          label: "Sign In",
          onClick: () => window.location.href = "/login"
        }
      });
      return;
    }

    // Add user message
    const userMessage: Message = {
      role: 'user',
      content: input.trim(),
      timestamp: new Date(),
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);
    
    try {
      // Call the legal AI service
      const response = await getLegalAdvice(input.trim());
      
      // Add AI response
      const aiMessage: Message = {
        role: 'assistant',
        content: response,
        timestamp: new Date(),
      };
      
      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      console.error('Error getting legal advice:', error);
      toast.error('Sorry, I encountered an error while processing your request.');
      
      // Add error message
      const errorMessage: Message = {
        role: 'assistant',
        content: 'I apologize, but I encountered an issue while processing your request. Please try again later.',
        timestamp: new Date(),
      };
      
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <>
      {/* Chat button */}
      <motion.div 
        className="fixed bottom-6 right-6 z-50"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 500, damping: 30 }}
      >
        <Button
          onClick={() => setIsOpen(true)}
          className="h-14 w-14 rounded-full bg-gradient-to-r from-[#8E2DE2] to-[#4A00E0] p-0 shadow-[0_0_15px_rgba(142,45,226,0.5)]"
          aria-label="Open chat"
        >
          <MessageSquare className="h-6 w-6 text-white" />
          <span className="sr-only">Open Legal Assistant</span>
        </Button>
      </motion.div>

      {/* Chat window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 500, damping: 30 }}
            className="fixed bottom-6 right-6 z-50 w-[90vw] max-w-md overflow-hidden rounded-2xl bg-white shadow-2xl dark:bg-[#1E1E1E] border border-[#8E2DE2]/20"
          >
            {/* Chat header */}
            <div className="flex items-center justify-between border-b border-gray-200 bg-gradient-to-r from-[#8E2DE2] to-[#4A00E0] p-4 dark:border-gray-700">
              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/20 text-white">
                  <Bot className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-medium text-white">Legal Assistant</h3>
                  <p className="text-xs text-white/80">Ask me any legal question</p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsOpen(false)}
                className="h-8 w-8 rounded-full bg-white/20 text-white hover:bg-white/30"
              >
                <X className="h-4 w-4" />
                <span className="sr-only">Close</span>
              </Button>
            </div>

            {/* Chat messages */}
            <div className="flex h-[400px] flex-col overflow-y-auto p-4">
              <div className="mb-4">
                {messages.map((message, index) => (
                  <div
                    key={index}
                    className={cn(
                      "mb-4 flex",
                      message.role === "user" ? "justify-end" : "justify-start"
                    )}
                  >
                    <div
                      className={cn(
                        "flex max-w-[80%] flex-col rounded-xl px-4 py-2",
                        message.role === "user"
                          ? "bg-gradient-to-r from-[#8E2DE2] to-[#4A00E0] text-white"
                          : "bg-gray-100 dark:bg-[#1E293B] dark:text-white"
                      )}
                    >
                      <div className="flex items-center gap-2 mb-1">
                        {message.role === "assistant" ? (
                          <Bot className="h-4 w-4 text-[#8E2DE2] dark:text-[#B9FF66]" />
                        ) : (
                          <User className="h-4 w-4" />
                        )}
                        <span className="text-xs opacity-70">
                          {formatTime(message.timestamp)}
                        </span>
                      </div>
                      <p className="text-sm whitespace-pre-wrap">
                        {message.content}
                      </p>
                    </div>
                  </div>
                ))}
                {isLoading && (
                  <div className="mb-4 flex justify-start">
                    <div className="flex max-w-[80%] flex-col rounded-xl bg-gray-100 px-4 py-3 dark:bg-[#1E293B]">
                      <div className="flex items-center space-x-2">
                        <div className="h-2 w-2 animate-pulse rounded-full bg-[#8E2DE2]"></div>
                        <div className="h-2 w-2 animate-pulse rounded-full bg-[#8E2DE2] animation-delay-200"></div>
                        <div className="h-2 w-2 animate-pulse rounded-full bg-[#8E2DE2] animation-delay-500"></div>
                      </div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>
            </div>

            {/* Chat input */}
            <div className="border-t border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-[#1E1E1E]">
              <div className="flex items-end gap-2">
                <div className="relative flex-1">
                  <Textarea
                    ref={textareaRef}
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Type your legal question..."
                    className="min-h-[60px] w-full resize-none rounded-xl border-gray-300 pr-12 text-sm focus:border-[#8E2DE2] focus:ring focus:ring-[#8E2DE2]/20 dark:border-gray-700 dark:bg-[#1E293B] dark:text-white"
                    disabled={isLoading}
                  />
                  <Button
                    onClick={handleSendMessage}
                    disabled={isLoading || !input.trim()}
                    className="absolute bottom-2 right-2 h-8 w-8 rounded-md bg-gradient-to-r from-[#8E2DE2] to-[#4A00E0] p-0"
                    aria-label="Send message"
                  >
                    <Send className="h-4 w-4 text-white" />
                  </Button>
                </div>
              </div>
              <p className="mt-2 text-center text-xs text-gray-500 dark:text-gray-400">
                Powered by GPT-4 legal assistant
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ChatBot;
