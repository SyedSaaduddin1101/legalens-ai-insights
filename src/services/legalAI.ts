
import { toast } from "sonner";

// The API key would be stored in Supabase secrets in a real application
// For demo purposes, we're using a mock implementation
const API_KEY = "YOUR_API_KEY_HERE";

/**
 * Get legal advice from the AI model for a given query
 * 
 * @param query The legal question from the user
 * @returns AI-generated legal advice response
 */
export const getLegalAdvice = async (query: string): Promise<string> => {
  try {
    const isLoggedIn = !!localStorage.getItem("legalens-user");
    
    if (!isLoggedIn) {
      toast.error("Please sign in to use the legal assistant");
      throw new Error("Authentication required");
    }
    
    console.log("Attempting to process legal query:", query);
    
    // In a real application, we would call the OpenAI API
    // For demo purposes, we'll use a mock response system with legal-focused responses
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Use this mock data until actual API integration
    return generateMockLegalResponse(query);
    
    /* 
    // In production, use actual API call to GPT-4
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${API_KEY}`
      },
      body: JSON.stringify({
        model: "gpt-4o",
        messages: [
          {
            role: "system",
            content: "You are a knowledgeable legal assistant providing guidance on legal matters. Always clarify that you're providing general information, not legal advice, and recommend consulting with a qualified attorney for specific situations."
          },
          {
            role: "user",
            content: query
          }
        ],
        temperature: 0.7,
        max_tokens: 500
      })
    });
    
    if (!response.ok) {
      console.error(`API error: ${response.status}`);
      throw new Error(`Legal AI API error: ${response.status}`);
    }
    
    const data = await response.json();
    return data.choices[0].message.content;
    */
  } catch (error) {
    console.error("Error getting legal advice:", error);
    throw error;
  }
};

/**
 * Generate mock legal responses until API integration is complete
 */
const generateMockLegalResponse = (query: string): string => {
  const normalizedQuery = query.toLowerCase();
  
  // Check for common legal topics in the query
  if (normalizedQuery.includes("contract") || normalizedQuery.includes("agreement")) {
    return `Regarding your contract question: Contracts require offer, acceptance, consideration, and legal purpose to be valid. Before signing any contract, ensure you understand all terms, especially clauses about termination, liability, and dispute resolution.\n\nRemember that verbal contracts can be enforceable in many cases, but certain agreements (like real estate) typically require written documentation. If a contract seems ambiguous or potentially unfair, consider having it reviewed by a qualified attorney who specializes in contract law before signing.`;
  }
  
  if (normalizedQuery.includes("divorce") || normalizedQuery.includes("custody")) {
    return `Family law matters like divorce and custody are highly specific to your jurisdiction and personal situation. Generally, divorce processes involve property division, potential spousal support, and child custody arrangements when applicable.\n\nMost jurisdictions now follow some form of "equitable distribution" for property and "best interests of the child" standard for custody decisions. Consider mediation as a less adversarial approach to resolving these matters, and always document all agreements formally through the court system.`;
  }
  
  if (normalizedQuery.includes("sue") || normalizedQuery.includes("lawsuit") || normalizedQuery.includes("litigation")) {
    return `Litigation can be time-consuming and expensive. Before filing a lawsuit, consider:\n\n1. Alternative dispute resolution methods like mediation or arbitration\n2. Statutes of limitations that may affect your claim\n3. Whether you have sufficient evidence to support your position\n4. The potential costs versus benefits of legal action\n\nMany jurisdictions also have small claims courts for disputes under certain dollar amounts, which can be navigated without an attorney.`;
  }
  
  if (normalizedQuery.includes("tenant") || normalizedQuery.includes("landlord") || normalizedQuery.includes("rent") || normalizedQuery.includes("lease")) {
    return `Landlord-tenant relationships are governed by both your lease agreement and local housing laws, which vary significantly by location. Generally, tenants have rights to habitable living conditions, proper notice before entry, and proper eviction procedures. Landlords typically have rights regarding rent collection, property maintenance requirements, and tenant selection (within anti-discrimination laws).\n\nDocument all communication with your landlord/tenant in writing and understand the specific notice requirements in your jurisdiction for issues like repairs, rent increases, or lease termination.`;
  }
  
  if (normalizedQuery.includes("will") || normalizedQuery.includes("estate") || normalizedQuery.includes("inherit")) {
    return `Estate planning is essential for ensuring your assets are distributed according to your wishes. A basic estate plan typically includes:\n\n1. A will documenting your asset distribution preferences\n2. Power of attorney designations for financial and healthcare decisions\n3. Advance healthcare directives\n\nWithout a will, your assets will be distributed according to your state's intestacy laws, which may not align with your preferences. Consider reviewing your estate plan after major life events like marriage, divorce, childbirth, or substantial changes in assets.`;
  }
  
  if (normalizedQuery.includes("employment") || normalizedQuery.includes("fired") || normalizedQuery.includes("workplace") || normalizedQuery.includes("job")) {
    return `Employment relationships are governed by a combination of federal and state laws, company policies, and any employment contracts. Most employment in the US is "at-will," meaning either party can terminate the relationship at any time, with some exceptions including discrimination and retaliation.\n\nWorkplace discrimination based on protected characteristics (race, gender, age, disability, etc.) is illegal under federal law. If you believe you've experienced discrimination, document all incidents and consider filing with the Equal Employment Opportunity Commission (EEOC) before pursuing private legal action.`;
  }
  
  // Default response for other legal questions
  return `Thank you for your legal question. While I can provide general information, each legal situation has unique aspects that may require personalized advice.\n\nGenerally speaking, legal matters require careful consideration of applicable laws, precedents, and your specific circumstances. Documentation is crucial in most legal matters - keep records of all relevant communications and agreements.\n\nConsider consulting with an attorney who specializes in this area of law for advice tailored to your specific situation. Many offer free initial consultations to help you understand your options.`;
};
