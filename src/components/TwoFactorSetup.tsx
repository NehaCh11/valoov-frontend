
import { useState } from 'react';
import { ArrowLeft, Shield, Mail, RefreshCw } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp';

interface TwoFactorSetupProps {
  onBack: () => void;
  onComplete: () => void;
  email: string;
}

const TwoFactorSetup = ({ onBack, onComplete, email }: TwoFactorSetupProps) => {
  const [otpCode, setOtpCode] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const [codeSent, setCodeSent] = useState(true); // Assume code was already sent

  const handleResendCode = async () => {
    setIsResending(true);
    console.log('Resending verification code to:', email);
    
    // Simulate sending email
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    console.log('Verification code resent successfully');
    setIsResending(false);
    setCodeSent(true);
  };

  const handleVerifyCode = async () => {
    if (otpCode.length !== 6) return;
    
    setIsVerifying(true);
    console.log('Verifying email 2FA code:', otpCode);
    
    // Simulate verification
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // For demo purposes, any 6-digit code works
    console.log('Email 2FA verification completed successfully');
    setIsVerifying(false);
    onComplete();
  };

  return (
    <div className="min-h-screen bg-valoov-dark-gray">
      <div className="valoov-gradient min-h-screen flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <Button 
            variant="ghost" 
            onClick={onBack}
            className="mb-4 text-valoov-teal hover:text-valoov-teal/80"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>

          <Card className="bg-card/30 backdrop-blur border-valoov-teal/30">
            <CardHeader className="text-center space-y-4">
              <div className="flex justify-center">
                <div className="p-3 bg-valoov-teal/20 rounded-full">
                  <Shield className="h-8 w-8 text-valoov-teal" />
                </div>
              </div>
              <CardTitle className="text-2xl text-slate-800">
                Verify Your Email
              </CardTitle>
              <CardDescription className="text-slate-600">
                Enter the 6-digit code we sent to your email address
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="text-center space-y-4">
                <div className="flex items-center justify-center space-x-2 text-sm text-slate-600">
                  <Mail className="h-4 w-4" />
                  <span>Code sent to: {email}</span>
                </div>
                
                <div className="space-y-4">
                  <Label htmlFor="verification-code" className="text-center block text-slate-700">
                    Enter verification code
                  </Label>
                  
                  <div className="flex justify-center">
                    <InputOTP
                      value={otpCode}
                      onChange={setOtpCode}
                      maxLength={6}
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

                <div className="text-center">
                  <p className="text-sm text-slate-600 mb-2">
                    Didn't receive the code?
                  </p>
                  <Button
                    variant="ghost"
                    onClick={handleResendCode}
                    disabled={isResending}
                    className="text-valoov-teal hover:text-valoov-teal/80"
                  >
                    {isResending ? (
                      <>
                        <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                        Resending...
                      </>
                    ) : (
                      <>
                        <RefreshCw className="h-4 w-4 mr-2" />
                        Resend Code
                      </>
                    )}
                  </Button>
                </div>
              </div>

              <div className="space-y-3">
                <Button 
                  onClick={handleVerifyCode}
                  disabled={otpCode.length !== 6 || isVerifying}
                  className="w-full bg-valoov-teal hover:bg-valoov-teal/80"
                >
                  {isVerifying ? (
                    <>
                      <svg className="animate-spin h-5 w-5 mr-2" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                        <path className="opacity-75" fill="currentColor" d="m4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Verifying...
                    </>
                  ) : (
                    'Verify Code'
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default TwoFactorSetup;
