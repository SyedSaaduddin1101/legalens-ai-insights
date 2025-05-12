
import { toast } from "sonner";

// The API key for GPT-4
const API_KEY = "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";

interface AnalysisResult {
  plainLanguage: string;
  keyTerms: { term: string; explanation: string }[];
  risks: { title: string; description: string; severity: "low" | "medium" | "high" }[];
  summary: string;
}

export const analyzeDocument = async (
  documentText: string,
  documentType: string
): Promise<AnalysisResult> => {
  try {
    // In production, we would extract text from the document using a PDF parser or OCR
    // For demo purposes, we'll simulate this with a mock text
    const text = documentText || "This is a sample legal document text for analysis.";
    
    // This should be a server-side API call in production
    // Client-side API calls with API keys are not secure
    try {
      console.log("Attempting to analyze document with GPT-4...");
      
      const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${API_KEY}`,
        },
        body: JSON.stringify({
          model: "gpt-4o-mini", // Using a more available model that's less likely to have quota issues
          messages: [
            {
              role: "system",
              content: `You are a legal document analyzer. Analyze the following ${documentType || "legal document"} and provide: 
                1. A plain language explanation
                2. Key terms with explanations
                3. Risk identification with severity levels (low, medium, high)
                4. A brief summary
                
                Format your response as JSON with the following structure:
                {
                  "plainLanguage": "string",
                  "keyTerms": [{"term": "string", "explanation": "string"}],
                  "risks": [{"title": "string", "description": "string", "severity": "low|medium|high"}],
                  "summary": "string"
                }
                
                Only return the JSON with no additional text.`,
            },
            {
              role: "user",
              content: text,
            },
          ],
          temperature: 0.2,
        }),
      });

      if (!response.ok) {
        console.error(`API error: ${response.status}`);
        throw new Error(`API error: ${response.status}`);
      }

      const data = await response.json();
      console.log("GPT-4 analysis completed successfully");
      
      // Parse the JSON from the response
      const content = data.choices[0].message.content;
      const result = JSON.parse(content);
      return result;
    } catch (apiError) {
      console.error("Error with OpenAI API:", apiError);
      throw new Error("Failed to connect to AI service. Using fallback data.");
    }
  } catch (error) {
    console.error("Error analyzing document:", error);
    toast.error("Failed to analyze document. Using demo data.");
    
    // Return mock data in case of error for demo purposes
    return {
      plainLanguage: "This contract establishes a partnership between Company A and Company B for the development of software products. The agreement is valid for 3 years and includes provisions for intellectual property rights, confidentiality, and termination conditions.",
      keyTerms: [
        {
          term: "Intellectual Property Rights",
          explanation: "All software developed under this agreement will be jointly owned by both parties, with equal rights to use and modify."
        },
        {
          term: "Confidentiality Clause",
          explanation: "Both parties must keep all shared information confidential for 5 years after termination."
        },
        {
          term: "Termination Conditions",
          explanation: "Either party can terminate with 60 days written notice. Early termination requires compensation."
        }
      ],
      risks: [
        {
          title: "Ambiguous Liability Clause",
          description: "Section 8.2 contains vague language about liability limits that could lead to disputes.",
          severity: "high"
        },
        {
          title: "Missing Payment Terms",
          description: "The contract doesn't specify clear payment schedules or late payment penalties.",
          severity: "medium"
        }
      ],
      summary: "This is a 3-year partnership agreement between Company A and B for software development with joint IP ownership, 5-year confidentiality terms, and 60-day termination notice. Key concerns include ambiguous liability language and incomplete payment terms."
    };
  }
};
