import { useState, useEffect } from 'react';
import { ArrowLeft, Mail, RotateCcw, CheckCircle2, Clock } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp';
import { useToast } from '@/hooks/use-toast';

interface EmailVerificationPageProps {
  email: string;
  onBack: () => void;
  onVerified: () => void;
}

const EmailVerificationPage = ({ email, onBack, onVerified }: EmailVerificationPageProps) => {
  const [otp, setOtp] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes
  const [canResend, setCanResend] = useState(false);
  const { toast } = useToast();

  // Timer countdown
  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      setCanResend(true);
    }
  }, [timeLeft]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleVerifyOTP = async (value: string) => {
    if (value.length === 6) {
      setIsVerifying(true);
      console.log('Verifying OTP:', value);
      
      // Simulate API call
      try {
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        // For demo purposes, accept any 6-digit code
        toast({
          title: "Email Verified!",
          description: "Your account has been successfully verified.",
        });
        
        setTimeout(() => {
          onVerified();
        }, 1000);
      } catch (error) {
        toast({
          title: "Verification Failed",
          description: "Invalid verification code. Please try again.",
          variant: "destructive",
        });
        setOtp('');
      } finally {
        setIsVerifying(false);
      }
    }
  };

  const handleResendEmail = async () => {
    setIsResending(true);
    console.log('Resending verification email to:', email);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      toast({
        title: "Email Sent",
        description: "A new verification code has been sent to your email.",
      });
      
      setTimeLeft(300); // Reset timer
      setCanResend(false);
      setOtp('');
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to resend email. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsResending(false);
    }
  };

  const progressValue = ((300 - timeLeft) / 300) * 100;

  return (
    <div className="min-h-screen bg-valoov-dark-gray">
      <div className="valoov-gradient min-h-screen flex items-center justify-center">
        <div className="container mx-auto px-4 max-w-md">
          <Button 
            variant="ghost" 
            onClick={onBack}
            className="mb-6 text-valoov-teal hover:text-valoov-teal/80"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>

          <Card className="bg-card/30 backdrop-blur border-valoov-teal/30">
            <CardHeader className="text-center">
              <div className="flex justify-center mb-4">
                <img 
                  src="/lovable-uploads/8db935c6-3e63-4ea8-a51d-83cd746862c0.png" 
                  alt="VALOOV Logo" 
                  className="h-12 w-auto mb-2"
                />
              </div>
              <CardTitle className="text-2xl">Verify Your Email</CardTitle>
              <CardDescription>
                We've sent a 6-digit verification code to
                <br />
                <span className="font-medium text-valoov-teal">{email}</span>
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Progress Indicator */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Verification Progress</span>
                  <div className="flex items-center space-x-1">
                    <Clock className="h-3 w-3 text-muted-foreground" />
                    <span className="text-muted-foreground">{formatTime(timeLeft)}</span>
                  </div>
                </div>
                <Progress value={progressValue} className="h-2" />
              </div>

              {/* OTP Input */}
              <div className="space-y-4">
                <div className="text-center">
                  <label className="text-sm font-medium">Enter Verification Code</label>
                </div>
                <div className="flex justify-center">
                  <InputOTP
                    maxLength={6}
                    value={otp}
                    onChange={(value) => {
                      setOtp(value);
                      handleVerifyOTP(value);
                    }}
                    disabled={isVerifying}
                  >
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
              </div>

              {/* Status and Actions */}
              <div className="space-y-4">
                {isVerifying && (
                  <div className="flex items-center justify-center space-x-2 text-valoov-teal">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-valoov-teal"></div>
                    <span className="text-sm">Verifying...</span>
                  </div>
                )}

                <div className="text-center space-y-3">
                  <p className="text-sm text-muted-foreground">
                    Didn't receive the code?
                  </p>
                  
                  <Button
                    variant="outline"
                    onClick={handleResendEmail}
                    disabled={!canResend || isResending}
                    className="w-full border-valoov-orange text-valoov-orange hover:bg-valoov-orange/10"
                  >
                    {isResending ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-valoov-orange mr-2"></div>
                        Sending...
                      </>
                    ) : (
                      <>
                        <RotateCcw className="h-4 w-4 mr-2" />
                        {canResend ? 'Resend Code' : `Resend in ${formatTime(timeLeft)}`}
                      </>
                    )}
                  </Button>
                </div>

                {/* Verification Steps */}
                <div className="mt-6 space-y-3">
                  <h4 className="text-sm font-medium text-center">Verification Steps</h4>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-3 text-xs">
                      <CheckCircle2 className="h-4 w-4 text-valoov-teal" />
                      <span className="text-muted-foreground">Account created</span>
                    </div>
                    <div className="flex items-center space-x-3 text-xs">
                      <CheckCircle2 className="h-4 w-4 text-valoov-teal" />
                      <span className="text-muted-foreground">Email sent</span>
                    </div>
                    <div className="flex items-center space-x-3 text-xs">
                      <div className="h-4 w-4 rounded-full border-2 border-valoov-orange animate-pulse"></div>
                      <span className="text-valoov-orange">Email verification</span>
                    </div>
                    <div className="flex items-center space-x-3 text-xs">
                      <div className="h-4 w-4 rounded-full border-2 border-muted-foreground/30"></div>
                      <span className="text-muted-foreground">Complete setup</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default EmailVerificationPage;
