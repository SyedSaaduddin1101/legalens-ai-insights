
import { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";

const pricingPlans = [
  {
    name: "Basic",
    price: "Free",
    description: "Get started with essential legal document analysis",
    features: [
      "5 document analyses per month",
      "Basic term extraction",
      "Simple risk identification",
      "Plain language summaries",
      "Email support"
    ],
    cta: "Start Free",
    link: "/signup",
    color: "from-purple-400 to-purple-500"
  },
  {
    name: "Professional",
    price: "$29",
    description: "Advanced features for legal professionals",
    features: [
      "25 document analyses per month",
      "Advanced term identification",
      "Comprehensive risk assessment",
      "Clause comparison",
      "Priority support",
      "Export to PDF/Word"
    ],
    cta: "Go Professional",
    link: "/signup",
    color: "from-purple-500 to-pink-500",
    popular: true
  },
  {
    name: "Enterprise",
    price: "$99",
    description: "Full-featured solution for legal teams",
    features: [
      "Unlimited document analyses",
      "Advanced AI insights",
      "Custom document templates",
      "Team collaboration",
      "API access",
      "Dedicated account manager",
      "Custom integrations"
    ],
    cta: "Contact Sales",
    link: "/contact",
    color: "from-pink-500 to-pink-600"
  }
];

const Pricing = () => {
  const [billing, setBilling] = useState<"monthly" | "annually">("monthly");

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-grow">
        <div className="py-16 md:py-24 bg-gradient-to-b from-purple-50 to-pink-50 animate-fade-in">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl md:text-5xl font-bold text-center mb-6 bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent">
              Simple, Transparent Pricing
            </h1>
            <p className="text-center text-gray-700 max-w-2xl mx-auto mb-12">
              Choose the plan that works best for you and your team. All plans include a 14-day free trial.
            </p>
            
            <div className="flex justify-center mb-12 animate-fade-in animate-delay-100">
              <div className="bg-white p-1 rounded-full shadow-sm flex">
                <button
                  className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                    billing === "monthly"
                      ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-md"
                      : "text-gray-600 hover:text-purple-600"
                  }`}
                  onClick={() => setBilling("monthly")}
                >
                  Monthly
                </button>
                <button
                  className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                    billing === "annually"
                      ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-md"
                      : "text-gray-600 hover:text-purple-600"
                  }`}
                  onClick={() => setBilling("annually")}
                >
                  Annually <span className="text-xs font-normal opacity-75">(Save 20%)</span>
                </button>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {pricingPlans.map((plan, index) => (
                <div
                  key={plan.name}
                  className={`bg-white rounded-xl shadow-lg overflow-hidden transform transition-all duration-300 hover:-translate-y-2 hover:shadow-xl animate-fade-in animate-delay-${(index + 1) * 100} border border-purple-100 ${
                    plan.popular ? "ring-2 ring-purple-500" : ""
                  }`}
                >
                  {plan.popular && (
                    <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white text-center py-1 text-xs font-medium">
                      MOST POPULAR
                    </div>
                  )}
                  <div className="p-6">
                    <h3 className="font-bold text-xl mb-2">{plan.name}</h3>
                    <div className="mb-4">
                      <span className="text-3xl font-bold">{plan.price}</span>
                      {plan.price !== "Free" && (
                        <span className="text-gray-500 text-sm ml-1">
                          /{billing === "monthly" ? "month" : "year"}
                        </span>
                      )}
                    </div>
                    <p className="text-gray-600 mb-6 text-sm">{plan.description}</p>
                    <Button
                      className={`w-full mb-6 bg-gradient-to-r ${plan.color} hover:opacity-90 transition-opacity`}
                      asChild
                    >
                      <Link to={plan.link}>{plan.cta}</Link>
                    </Button>
                    <ul className="space-y-3">
                      {plan.features.map((feature) => (
                        <li key={feature} className="flex items-start text-sm">
                          <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Pricing;
