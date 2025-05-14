
import { useState } from 'react';
import { FileSearch, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { motion } from 'framer-motion';
import { toast } from "sonner";
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { Skeleton } from '@/components/ui/skeleton';

interface SearchResult {
  id: string;
  title: string;
  court: string;
  date: string;
  summary: string;
  relevance: number;
}

const PrecedentSearch = () => {
  const [query, setQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState<SearchResult[]>([]);
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = async () => {
    if (!query.trim()) {
      toast.warning("Please enter a search term");
      return;
    }

    setIsLoading(true);
    setHasSearched(true);

    // Simulate API call to legal database
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Mock results based on query
    const mockResults = generateMockResults(query);
    setResults(mockResults);
    setIsLoading(false);

    if (mockResults.length === 0) {
      toast.info("No matching precedents found", {
        description: "Try different keywords or a broader search term"
      });
    } else {
      toast.success(`Found ${mockResults.length} relevant precedents`);
    }
  };

  const generateMockResults = (query: string): SearchResult[] => {
    const normalizedQuery = query.toLowerCase();
    const results: SearchResult[] = [];

    if (normalizedQuery.includes("contract") || normalizedQuery.includes("agreement")) {
      results.push(
        {
          id: "1",
          title: "Smith v. Jones",
          court: "Supreme Court",
          date: "2021-06-15",
          summary: "The court held that ambiguous terms in a contract should be interpreted against the drafter.",
          relevance: 95
        },
        {
          id: "2",
          title: "ABC Corp v. XYZ Inc",
          court: "Federal Court of Appeals",
          date: "2020-11-03",
          summary: "Verbal agreements can constitute binding contracts if all essential elements are present.",
          relevance: 87
        }
      );
    }

    if (normalizedQuery.includes("property") || normalizedQuery.includes("real estate")) {
      results.push(
        {
          id: "3",
          title: "Johnson v. Property Management LLC",
          court: "State Supreme Court",
          date: "2022-03-29",
          summary: "Landlords must maintain habitability standards regardless of lease terms to the contrary.",
          relevance: 92
        }
      );
    }

    if (normalizedQuery.includes("compensation") || normalizedQuery.includes("damages")) {
      results.push(
        {
          id: "4",
          title: "Roberts v. MegaCorp Industries",
          court: "District Court",
          date: "2023-01-18",
          summary: "Compensatory damages must be reasonably foreseeable at the time the contract was formed.",
          relevance: 89
        }
      );
    }

    return results;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full bg-white dark:bg-[#1E1E1E] rounded-xl overflow-hidden shadow-lg border border-[#8E2DE2]/20 p-6"
    >
      <div className="mb-6">
        <h3 className="text-xl font-bold bg-gradient-to-r from-[#8E2DE2] to-[#4A00E0] bg-clip-text text-transparent mb-2">
          Precedent Search
        </h3>
        <p className="text-gray-500 dark:text-gray-400 text-sm">
          Search for relevant legal cases and precedents to support your arguments
        </p>
      </div>

      <div className="flex space-x-3 mb-6">
        <div className="flex-1">
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search legal precedents (e.g., contract breach, property dispute)"
            className="w-full"
            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
          />
        </div>
        <Button
          onClick={handleSearch}
          disabled={isLoading}
          className="bg-gradient-to-r from-[#8E2DE2] to-[#4A00E0] hover:opacity-90"
        >
          <FileSearch className="h-4 w-4 mr-2" />
          Search
        </Button>
      </div>

      {isLoading ? (
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <Card key={i} className="p-4">
              <Skeleton className="h-6 w-3/4 mb-2" />
              <Skeleton className="h-4 w-1/4 mb-4" />
              <Skeleton className="h-16 w-full" />
            </Card>
          ))}
        </div>
      ) : (
        <>
          {hasSearched && results.length === 0 && (
            <div className="text-center py-8">
              <AspectRatio ratio={4/3} className="w-1/3 mx-auto mb-4">
                <div className="flex items-center justify-center h-full">
                  <AlertCircle className="h-16 w-16 text-gray-300" />
                </div>
              </AspectRatio>
              <h4 className="text-lg font-medium text-gray-500">No precedents found</h4>
              <p className="text-gray-400 text-sm mt-1">Try different search terms or browse by category</p>
            </div>
          )}

          {results.length > 0 && (
            <div className="space-y-4">
              {results.map((result) => (
                <motion.div
                  key={result.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <Card className="p-4 hover:border-[#8E2DE2]/30 cursor-pointer transition-all">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-medium text-lg">{result.title}</h4>
                        <p className="text-sm text-gray-500">{result.court} • {result.date}</p>
                      </div>
                      <div className="bg-[#8E2DE2]/10 text-[#8E2DE2] text-sm font-medium px-2 py-1 rounded">
                        {result.relevance}% match
                      </div>
                    </div>
                    <p className="mt-3 text-gray-700 dark:text-gray-300">{result.summary}</p>
                    <div className="mt-3 flex justify-end">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => toast.info("Full case details coming soon", { 
                          description: "This feature will be available in the next update"
                        })}
                      >
                        View Full Case
                      </Button>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          )}
        </>
      )}
    </motion.div>
  );
};

export default PrecedentSearch;
