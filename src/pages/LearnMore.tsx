
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const LearnMore = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-grow">
        <div className="py-16 md:py-24 bg-gradient-to-b from-purple-50 to-pink-50 animate-fade-in">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl md:text-5xl font-bold text-center mb-6 bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent">
              How LegaLens Works
            </h1>
            <p className="text-center text-gray-700 max-w-3xl mx-auto mb-16">
              Discover how our AI-powered platform helps you understand and navigate complex legal documents with ease.
            </p>
            
            <div className="max-w-4xl mx-auto">
              {/* Step 1 */}
              <div className="flex flex-col md:flex-row items-center mb-20 animate-fade-in animate-delay-100">
                <div className="md:w-1/2 mb-8 md:mb-0 md:pr-8">
                  <div className="bg-white rounded-xl shadow-lg p-6 relative border border-purple-100">
                    <div className="bg-gradient-to-r from-purple-500 to-pink-500 w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-xl absolute -top-6 -left-6 shadow-lg">
                      1
                    </div>
                    <h3 className="text-2xl font-bold mb-4 mt-2">Upload Your Document</h3>
                    <p className="text-gray-600 mb-4">
                      Simply upload your contract, NDA, or any legal document. Our system supports various formats including PDF, DOCX, and plain text.
                    </p>
                    <div className="bg-purple-50 p-4 rounded-lg border border-purple-100">
                      <p className="text-sm text-purple-800">
                        <strong>Security Note:</strong> All documents are encrypted and processed securely. Your data privacy is our priority.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="md:w-1/2">
                  <div className="bg-gradient-to-br from-purple-100 to-pink-100 rounded-xl p-6 flex items-center justify-center h-64">
                    <div className="text-center">
                      <div className="w-20 h-20 bg-white rounded-full shadow-md flex items-center justify-center mx-auto mb-4">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                        </svg>
                      </div>
                      <p className="text-purple-800 font-medium">Drag and drop your file here, or click to browse</p>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Step 2 */}
              <div className="flex flex-col md:flex-row-reverse items-center mb-20 animate-fade-in animate-delay-200">
                <div className="md:w-1/2 mb-8 md:mb-0 md:pl-8">
                  <div className="bg-white rounded-xl shadow-lg p-6 relative border border-purple-100">
                    <div className="bg-gradient-to-r from-purple-500 to-pink-500 w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-xl absolute -top-6 -right-6 shadow-lg">
                      2
                    </div>
                    <h3 className="text-2xl font-bold mb-4 mt-2">AI Analysis</h3>
                    <p className="text-gray-600 mb-4">
                      Our advanced GPT-4 powered engine analyzes your document, identifying key terms, obligations, risks, and summarizing complex legal language.
                    </p>
                    <div className="flex items-center space-x-2 mb-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <p className="text-sm">Term identification</p>
                    </div>
                    <div className="flex items-center space-x-2 mb-2">
                      <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                      <p className="text-sm">Risk assessment</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <p className="text-sm">Language simplification</p>
                    </div>
                  </div>
                </div>
                <div className="md:w-1/2">
                  <div className="bg-gradient-to-br from-purple-100 to-pink-100 rounded-xl p-6 h-64 flex items-center justify-center">
                    <div className="relative w-full h-full">
                      <div className="animate-pulse bg-white/50 rounded-lg h-4 w-3/4 absolute top-6 left-4"></div>
                      <div className="animate-pulse bg-white/50 rounded-lg h-4 w-1/2 absolute top-14 left-4"></div>
                      <div className="animate-pulse bg-white/50 rounded-lg h-4 w-5/6 absolute top-22 left-4"></div>
                      <div className="animate-pulse bg-purple-300/50 rounded-lg h-6 w-1/3 absolute top-32 left-4"></div>
                      <div className="animate-pulse bg-yellow-300/50 rounded-lg h-6 w-1/4 absolute top-32 left-40"></div>
                      <div className="animate-pulse bg-white/50 rounded-lg h-4 w-2/3 absolute top-42 left-4"></div>
                      <div className="animate-pulse bg-white/50 rounded-lg h-4 w-1/2 absolute top-50 left-4"></div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Step 3 */}
              <div className="flex flex-col md:flex-row items-center mb-20 animate-fade-in animate-delay-300">
                <div className="md:w-1/2 mb-8 md:mb-0 md:pr-8">
                  <div className="bg-white rounded-xl shadow-lg p-6 relative border border-purple-100">
                    <div className="bg-gradient-to-r from-purple-500 to-pink-500 w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-xl absolute -top-6 -left-6 shadow-lg">
                      3
                    </div>
                    <h3 className="text-2xl font-bold mb-4 mt-2">Review Results</h3>
                    <p className="text-gray-600 mb-4">
                      Get an interactive, easy-to-understand breakdown of your document. Click on terms to see explanations or potential issues.
                    </p>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-start">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        <span>Plain English explanations of complex clauses</span>
                      </li>
                      <li className="flex items-start">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        <span>Highlighted key terms and definitions</span>
                      </li>
                      <li className="flex items-start">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        <span>Risk assessment with recommendations</span>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="md:w-1/2">
                  <div className="bg-gradient-to-br from-purple-100 to-pink-100 rounded-xl p-6 h-64 flex items-center justify-center">
                    <div className="bg-white/80 backdrop-blur-sm rounded-lg shadow-sm p-4 w-full">
                      <div className="flex items-center mb-4">
                        <div className="w-6 h-6 bg-purple-500 rounded-full mr-3"></div>
                        <div className="text-lg font-medium">Document Summary</div>
                      </div>
                      <div className="h-2 bg-gray-200 rounded w-full mb-3"></div>
                      <div className="h-2 bg-gray-200 rounded w-5/6 mb-3"></div>
                      <div className="flex items-center mt-4">
                        <div className="flex-grow">
                          <div className="h-6 bg-green-100 rounded w-20 mb-1"></div>
                          <div className="h-2 bg-gray-200 rounded w-full"></div>
                        </div>
                        <div className="ml-4 flex-grow">
                          <div className="h-6 bg-yellow-100 rounded w-20 mb-1"></div>
                          <div className="h-2 bg-gray-200 rounded w-full"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Step 4 */}
              <div className="flex flex-col md:flex-row-reverse items-center animate-fade-in animate-delay-400">
                <div className="md:w-1/2 mb-8 md:mb-0 md:pl-8">
                  <div className="bg-white rounded-xl shadow-lg p-6 relative border border-purple-100">
                    <div className="bg-gradient-to-r from-purple-500 to-pink-500 w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-xl absolute -top-6 -right-6 shadow-lg">
                      4
                    </div>
                    <h3 className="text-2xl font-bold mb-4 mt-2">Take Action</h3>
                    <p className="text-gray-600 mb-4">
                      Download summaries, share insights with colleagues, or use our recommendations to make informed decisions.
                    </p>
                    <div className="flex flex-wrap gap-3">
                      <div className="bg-purple-50 px-4 py-2 rounded-full text-sm font-medium text-purple-700 flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                        </svg>
                        Download PDF
                      </div>
                      <div className="bg-purple-50 px-4 py-2 rounded-full text-sm font-medium text-purple-700 flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                        </svg>
                        Share
                      </div>
                      <div className="bg-purple-50 px-4 py-2 rounded-full text-sm font-medium text-purple-700 flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                        </svg>
                        Annotate
                      </div>
                    </div>
                  </div>
                </div>
                <div className="md:w-1/2">
                  <div className="bg-gradient-to-br from-purple-100 to-pink-100 rounded-xl p-6 h-64 flex items-center justify-center">
                    <div className="grid grid-cols-2 gap-4 w-full">
                      <div className="bg-white rounded-lg shadow-sm p-4 flex flex-col items-center">
                        <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center mb-2">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                          </svg>
                        </div>
                        <span className="text-sm text-center">Summary Report</span>
                      </div>
                      <div className="bg-white rounded-lg shadow-sm p-4 flex flex-col items-center">
                        <div className="w-10 h-10 rounded-full bg-pink-100 flex items-center justify-center mb-2">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-pink-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        </div>
                        <span className="text-sm text-center">Risk Report</span>
                      </div>
                      <div className="bg-white rounded-lg shadow-sm p-4 flex flex-col items-center">
                        <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center mb-2">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                        </div>
                        <span className="text-sm text-center">Timeline</span>
                      </div>
                      <div className="bg-white rounded-lg shadow-sm p-4 flex flex-col items-center">
                        <div className="w-10 h-10 rounded-full bg-pink-100 flex items-center justify-center mb-2">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-pink-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                          </svg>
                        </div>
                        <span className="text-sm text-center">Feedback</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="text-center mt-12">
                <Button className="bg-gradient-to-r from-purple-500 to-pink-500 hover:opacity-90 transition-opacity animate-bounce" size="lg" asChild>
                  <Link to="/try-now">
                    Try LegaLens Now <ArrowRight className="ml-2" size={16} />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default LearnMore;
