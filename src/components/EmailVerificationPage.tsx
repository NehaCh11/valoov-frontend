
import { useState, useEffect } from 'react';
import { ArrowLeft, Mail, RefreshCw } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AccountSetupPage from './AccountSetupPage';

interface EmailVerificationPageProps {
  email: string;
  onBack: () => void;
  onVerified: () => void;
}

const EmailVerificationPage = ({ email, onBack, onVerified }: EmailVerificationPageProps) => {
  const [verificationCode, setVerificationCode] = useState('');
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes
  const [isResending, setIsResending] = useState(false);
  const [showAccountSetup, setShowAccountSetup] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleVerification = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Verification code:', verificationCode);
    
    // Simulate verification
    if (verificationCode.length === 6) {
      alert('Email verified successfully!');
      setShowAccountSetup(true);
    } else {
      alert('Please enter a valid 6-digit code');
    }
  };

  const handleResendCode = async () => {
    setIsResending(true);
    console.log('Resending verification code to:', email);
    
    // Simulate API call
    setTimeout(() => {
      setIsResending(false);
      setTimeLeft(300); // Reset timer
      alert('Verification code sent!');
    }, 2000);
  };

  const handleAccountSetupComplete = () => {
    onVerified();
  };

  if (showAccountSetup) {
    return (
      <AccountSetupPage
        email={email}
        onBack={() => setShowAccountSetup(false)}
        onComplete={handleAccountSetupComplete}
      />
    );
  }

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
            Back to Registration
          </Button>

          <Card className="bg-card/30 backdrop-blur border-valoov-teal/30">
            <CardHeader className="text-center">
              <div className="flex justify-center mb-4">
                <img 
                  src="/lovable-uploads/17dd4d7d-77a4-46b2-8bcc-c7b2923ba0e5.png" 
                  alt="VALOOV Logo" 
                  className="h-16 w-auto"
                />
              </div>
              <CardTitle className="text-2xl text-white">Verify Your Email</CardTitle>
              <CardDescription>
                We've sent a 6-digit verification code to <br />
                <span className="text-valoov-teal font-medium">{email}</span>
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleVerification} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="verification-code">Verification Code</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="verification-code"
                      type="text"
                      placeholder="Enter 6-digit code"
                      value={verificationCode}
                      onChange={(e) => setVerificationCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
                      className="pl-10 text-center text-lg tracking-widest"
                      maxLength={6}
                      required
                    />
                  </div>
                </div>

                <div className="text-center text-sm text-muted-foreground">
                  {timeLeft > 0 ? (
                    <p>Code expires in {formatTime(timeLeft)}</p>
                  ) : (
                    <p className="text-destructive">Code has expired</p>
                  )}
                </div>

                <Button 
                  type="submit" 
                  className="w-full bg-valoov-teal hover:bg-valoov-teal/80"
                  disabled={verificationCode.length !== 6}
                >
                  Verify Email
                </Button>

                <div className="text-center">
                  <p className="text-sm text-muted-foreground mb-2">
                    Didn't receive the code?
                  </p>
                  <Button
                    type="button"
                    variant="ghost"
                    onClick={handleResendCode}
                    disabled={isResending || timeLeft > 240} // Allow resend after 1 minute
                    className="text-valoov-orange hover:text-valoov-orange/80"
                  >
                    {isResending ? (
                      <>
                        <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                        Sending...
                      </>
                    ) : (
                      'Resend Code'
                    )}
                  </Button>
                  {timeLeft > 240 && (
                    <p className="text-xs text-muted-foreground mt-1">
                      Available in {formatTime(timeLeft - 240)}
                    </p>
                  )}
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default EmailVerificationPage;
