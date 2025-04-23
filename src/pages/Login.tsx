
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/contexts/AuthContext";

export default function LoginPage() {
  const navigate = useNavigate();
  const { login, sendOTP, verifyOTP, isLoading: authLoading } = useAuth();
  
  // Password login state
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  
  // OTP login state
  const [otpEmail, setOtpEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otpIsLoading, setOtpIsLoading] = useState(false);
  const [otpError, setOtpError] = useState("");
  
  // Handle password login
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);
    
    try {
      await login(email, password);
      navigate("/");
    } catch (err) {
      setError("Invalid email or password. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };
  
  // Handle OTP send
  const handleSendOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    setOtpError("");
    setOtpIsLoading(true);
    
    try {
      await sendOTP(otpEmail);
      setOtpSent(true);
    } catch (err) {
      setOtpError("Failed to send OTP. Please try again.");
    } finally {
      setOtpIsLoading(false);
    }
  };
  
  // Handle OTP verification
  const handleVerifyOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    setOtpError("");
    setOtpIsLoading(true);
    
    try {
      await verifyOTP(otpEmail, otp);
      navigate("/");
    } catch (err) {
      setOtpError("Invalid OTP. Please try again.");
    } finally {
      setOtpIsLoading(false);
    }
  };
  
  return (
    <div className="container mx-auto px-4 py-16 max-w-md">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-serif font-bold text-brand-black">Welcome Back</h1>
        <p className="text-gray-500 mt-2">Sign in to continue to RentThreads India</p>
      </div>
      
      <Tabs defaultValue="password" className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-6">
          <TabsTrigger value="password">Password</TabsTrigger>
          <TabsTrigger value="otp">OTP</TabsTrigger>
        </TabsList>
        
        <TabsContent value="password">
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-2 rounded-md mb-4 text-sm">
                {error}
              </div>
            )}
            
            <form onSubmit={handleLogin}>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                
                <div>
                  <div className="flex justify-between items-center">
                    <Label htmlFor="password">Password</Label>
                    <Link to="/forgot-password" className="text-xs text-brand-red hover:underline">
                      Forgot Password?
                    </Link>
                  </div>
                  <Input
                    id="password"
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                
                <Button 
                  type="submit" 
                  className="w-full bg-brand-red hover:bg-brand-red/90"
                  disabled={isLoading || authLoading}
                >
                  {isLoading || authLoading ? "Signing in..." : "Sign In"}
                </Button>
              </div>
            </form>
          </div>
        </TabsContent>
        
        <TabsContent value="otp">
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            {otpError && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-2 rounded-md mb-4 text-sm">
                {otpError}
              </div>
            )}
            
            {!otpSent ? (
              <form onSubmit={handleSendOTP}>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="otpEmail">Email</Label>
                    <Input
                      id="otpEmail"
                      type="email"
                      placeholder="Enter your email"
                      value={otpEmail}
                      onChange={(e) => setOtpEmail(e.target.value)}
                      required
                    />
                  </div>
                  
                  <Button 
                    type="submit" 
                    className="w-full bg-brand-red hover:bg-brand-red/90"
                    disabled={otpIsLoading || authLoading}
                  >
                    {otpIsLoading || authLoading ? "Sending OTP..." : "Send OTP"}
                  </Button>
                </div>
              </form>
            ) : (
              <form onSubmit={handleVerifyOTP}>
                <div className="space-y-4">
                  <p className="text-sm text-gray-600">
                    OTP has been sent to <strong>{otpEmail}</strong>
                  </p>
                  <div>
                    <Label htmlFor="otp">Enter OTP</Label>
                    <Input
                      id="otp"
                      type="text"
                      placeholder="Enter 6-digit OTP"
                      value={otp}
                      onChange={(e) => setOtp(e.target.value)}
                      maxLength={6}
                      required
                    />
                  </div>
                  
                  <Button 
                    type="submit" 
                    className="w-full bg-brand-red hover:bg-brand-red/90"
                    disabled={otpIsLoading || authLoading}
                  >
                    {otpIsLoading || authLoading ? "Verifying..." : "Verify OTP"}
                  </Button>
                  
                  <div className="text-center">
                    <button
                      type="button"
                      className="text-sm text-brand-red hover:underline"
                      onClick={() => {
                        setOtpSent(false);
                        setOtp("");
                      }}
                    >
                      Change Email
                    </button>
                    {" | "}
                    <button
                      type="button"
                      className="text-sm text-brand-red hover:underline"
                      onClick={() => handleSendOTP}
                      disabled={otpIsLoading || authLoading}
                    >
                      Resend OTP
                    </button>
                  </div>
                </div>
              </form>
            )}
          </div>
        </TabsContent>
      </Tabs>
      
      <div className="mt-6 text-center">
        <p className="text-gray-600">
          Don't have an account?{" "}
          <Link to="/register" className="text-brand-red hover:underline">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
}
