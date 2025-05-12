
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Eye, EyeOff, Check } from "lucide-react";

const SignupForm = () => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    agreeTerms: false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, checked, type } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API request
    setTimeout(() => {
      setIsLoading(false);
      
      // For demo purposes, we're using a mock successful signup
      toast({
        title: "Account created successfully",
        description: "Welcome to LegaLens!",
      });
      
      // In a real app, we would redirect to dashboard after successful signup
      // navigate("/dashboard");
    }, 1500);
  };

  // Password strength
  const getPasswordStrength = (password: string) => {
    if (!password) return { strength: 0, text: "" };
    if (password.length < 6) return { strength: 1, text: "Weak" };
    if (password.length < 10) return { strength: 2, text: "Medium" };
    return { strength: 3, text: "Strong" };
  };

  const passwordStrength = getPasswordStrength(formData.password);

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
              First name
            </label>
            <Input
              id="firstName"
              name="firstName"
              type="text"
              required
              placeholder="John"
              value={formData.firstName}
              onChange={handleChange}
            />
          </div>

          <div>
            <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
              Last name
            </label>
            <Input
              id="lastName"
              name="lastName"
              type="text"
              required
              placeholder="Doe"
              value={formData.lastName}
              onChange={handleChange}
            />
          </div>
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
            Email address
          </label>
          <Input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            placeholder="name@example.com"
            value={formData.email}
            onChange={handleChange}
          />
        </div>

        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
            Password
          </label>
          <div className="relative">
            <Input
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              autoComplete="new-password"
              required
              placeholder="••••••••"
              value={formData.password}
              onChange={handleChange}
              className="pr-10"
            />
            <button
              type="button"
              className="absolute inset-y-0 right-0 flex items-center pr-3"
              onClick={togglePasswordVisibility}
            >
              {showPassword ? (
                <EyeOff className="h-5 w-5 text-gray-400" />
              ) : (
                <Eye className="h-5 w-5 text-gray-400" />
              )}
            </button>
          </div>
          
          {formData.password && (
            <div className="mt-2">
              <div className="flex items-center">
                <div className="w-full bg-gray-200 rounded-full h-2 mr-2">
                  <div
                    className={`h-2 rounded-full ${
                      passwordStrength.strength === 1
                        ? "bg-red-500 w-1/3"
                        : passwordStrength.strength === 2
                        ? "bg-yellow-500 w-2/3"
                        : "bg-green-500 w-full"
                    }`}
                  ></div>
                </div>
                <span className="text-xs text-gray-500">{passwordStrength.text}</span>
              </div>
              <ul className="text-xs text-gray-500 mt-2 space-y-1">
                <li className="flex items-center">
                  <Check size={12} className={formData.password.length >= 8 ? "text-green-500 mr-1" : "text-gray-300 mr-1"} />
                  At least 8 characters
                </li>
                <li className="flex items-center">
                  <Check size={12} className={/[A-Z]/.test(formData.password) ? "text-green-500 mr-1" : "text-gray-300 mr-1"} />
                  At least one uppercase letter
                </li>
                <li className="flex items-center">
                  <Check size={12} className={/[0-9]/.test(formData.password) ? "text-green-500 mr-1" : "text-gray-300 mr-1"} />
                  At least one number
                </li>
              </ul>
            </div>
          )}
        </div>

        <div className="flex items-center">
          <input
            id="agreeTerms"
            name="agreeTerms"
            type="checkbox"
            required
            checked={formData.agreeTerms}
            onChange={handleChange}
            className="h-4 w-4 rounded border-gray-300 text-legal-light-blue focus:ring-legal-light-blue"
          />
          <label htmlFor="agreeTerms" className="ml-2 block text-sm text-gray-700">
            I agree to the{" "}
            <Link to="/terms" className="text-legal-light-blue hover:text-legal-blue">
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link to="/privacy" className="text-legal-light-blue hover:text-legal-blue">
              Privacy Policy
            </Link>
          </label>
        </div>
      </div>

      <Button type="submit" disabled={isLoading} className="w-full bg-legal-light-blue hover:bg-legal-blue">
        {isLoading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Creating account...
          </>
        ) : (
          "Create account"
        )}
      </Button>

      <div className="text-center text-sm text-gray-600">
        Already have an account?{" "}
        <Link to="/login" className="font-medium text-legal-light-blue hover:text-legal-blue">
          Sign in
        </Link>
      </div>
    </form>
  );
};

export default SignupForm;
