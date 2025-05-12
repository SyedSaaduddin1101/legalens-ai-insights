
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { 
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";

interface OtpVerificationProps {
  email: string;
  onVerify: (verified: boolean) => void;
}

const OtpVerification = ({ email, onVerify }: OtpVerificationProps) => {
  const [otp, setOtp] = useState("");
  const [isVerifying, setIsVerifying] = useState(false);
  const [resendDisabled, setResendDisabled] = useState(true);
  const [countdown, setCountdown] = useState(30);
  const { toast } = useToast();

  // Generate a fake OTP for demo purposes
  useEffect(() => {
    // In a real app, this would be sent via email/SMS
    console.log("DEMO MODE: Your verification code is 123456");
    toast({
      title: "DEMO MODE",
      description: "For demo purposes, use code: 123456",
    });
  }, [toast]);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (resendDisabled && countdown > 0) {
      timer = setTimeout(() => setCountdown(countdown - 1), 1000);
    } else if (countdown === 0) {
      setResendDisabled(false);
    }
    return () => clearTimeout(timer);
  }, [countdown, resendDisabled]);

  const handleVerify = () => {
    if (otp.length !== 6) {
      toast({
        variant: "destructive",
        title: "Invalid OTP",
        description: "Please enter the 6-digit verification code",
      });
      return;
    }

    setIsVerifying(true);

    // Simulate verification (in a real app, this would be an API call)
    setTimeout(() => {
      setIsVerifying(false);
      
      // Simulate successful verification (in a real app, this would check against a server)
      if (otp === "123456") { // For demo purposes
        toast({
          title: "Verification successful",
          description: "Your email has been verified",
        });
        onVerify(true);
      } else {
        toast({
          variant: "destructive",
          title: "Verification failed",
          description: "The code entered is incorrect. Please try again",
        });
      }
    }, 1500);
  };

  const handleResend = () => {
    setResendDisabled(true);
    setCountdown(30);
    
    // Simulate resending OTP (in a real app, this would be an API call)
    toast({
      title: "OTP resent",
      description: `A new verification code has been sent to ${email}`,
    });
    
    // In demo mode, remind the user of the code
    toast({
      title: "DEMO MODE",
      description: "For demo purposes, use code: 123456",
    });
  };

  return (
    <div className="animate-fade-in">
      <div className="text-center mb-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-2">Verify your email</h3>
        <p className="text-gray-600 text-sm">
          We've sent a 6-digit verification code to <span className="font-medium">{email}</span>
        </p>
        <div className="mt-2 p-3 bg-purple-50 border border-purple-100 rounded-md">
          <p className="text-purple-700 text-xs">
            <strong>DEMO MODE:</strong> For this demonstration, please use the code: <span className="font-mono font-bold">123456</span>
          </p>
          <p className="text-purple-600 text-xs mt-1">
            In a real application, this code would be sent to your email
          </p>
        </div>
      </div>

      <div className="flex justify-center mb-6">
        <InputOTP maxLength={6} value={otp} onChange={setOtp}>
          <InputOTPGroup>
            <InputOTPSlot index={0} />
            <InputOTPSlot index={1} />
            <InputOTPSlot index={2} />
            <InputOTPSlot index={3} />
            <InputOTPSlot index={4} />
            <InputOTPSlot index={5} />
          </InputOTPGroup>
        </InputOTP>
      </div>

      <Button 
        type="button" 
        disabled={isVerifying || otp.length !== 6} 
        className="w-full bg-gradient-to-r from-purple-600 to-pink-500 hover:opacity-90 transition-all duration-300"
        onClick={handleVerify}
      >
        {isVerifying ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Verifying...
          </>
        ) : (
          "Verify"
        )}
      </Button>

      <div className="text-center mt-4">
        <p className="text-sm text-gray-600">
          Didn't receive the code?{" "}
          {resendDisabled ? (
            <span className="text-purple-400">Resend in {countdown}s</span>
          ) : (
            <button
              type="button"
              className="text-purple-600 hover:text-purple-800 font-medium"
              onClick={handleResend}
            >
              Resend
            </button>
          )}
        </p>
      </div>
    </div>
  );
};

export default OtpVerification;
