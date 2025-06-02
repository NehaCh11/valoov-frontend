
import { useState } from 'react';
import { ArrowLeft, Shield, Smartphone, Copy, Check } from 'lucide-react';
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
  const [step, setStep] = useState<'setup' | 'verify'>('setup');
  const [otpCode, setOtpCode] = useState('');
  const [secretKey] = useState('JBSWY3DPEHPK3PXP'); // In real app, this would come from backend
  const [qrCodeUrl] = useState(`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=otpauth://totp/VALOOV:${encodeURIComponent(email)}?secret=${secretKey}&issuer=VALOOV`);
  const [copied, setCopied] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);

  const handleCopySecret = async () => {
    try {
      await navigator.clipboard.writeText(secretKey);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const handleVerifyCode = async () => {
    if (otpCode.length !== 6) return;
    
    setIsVerifying(true);
    console.log('Verifying 2FA code:', otpCode);
    
    // Simulate verification
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // For demo purposes, any 6-digit code works
    console.log('2FA setup completed successfully');
    setIsVerifying(false);
    onComplete();
  };

  const handleSkip = () => {
    console.log('2FA setup skipped');
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
              <CardTitle className="text-2xl text-foreground">
                {step === 'setup' ? 'Secure Your Account' : 'Verify Your Setup'}
              </CardTitle>
              <CardDescription className="text-muted-foreground">
                {step === 'setup' 
                  ? 'Set up two-factor authentication to protect your account'
                  : 'Enter the code from your authenticator app to complete setup'
                }
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {step === 'setup' ? (
                <div className="space-y-6">
                  <div className="text-center space-y-4">
                    <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                      <Smartphone className="h-4 w-4" />
                      <span>Step 1: Install an authenticator app</span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Download Google Authenticator, Authy, or similar app on your phone
                    </p>
                  </div>

                  <div className="text-center space-y-4">
                    <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                      <span>Step 2: Scan QR code or enter secret key</span>
                    </div>
                    
                    <div className="flex justify-center">
                      <img 
                        src={qrCodeUrl} 
                        alt="QR Code for 2FA setup" 
                        className="border border-border/50 rounded-lg"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label className="text-sm">Or enter this secret key manually:</Label>
                      <div className="flex items-center space-x-2 p-3 bg-muted/50 rounded-lg">
                        <code className="flex-1 text-sm font-mono">{secretKey}</code>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={handleCopySecret}
                          className="h-8 w-8 p-0"
                        >
                          {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                        </Button>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <Button 
                      onClick={() => setStep('verify')}
                      className="w-full bg-valoov-teal hover:bg-valoov-teal/80"
                    >
                      Continue to Verification
                    </Button>
                    
                    <Button 
                      variant="outline" 
                      onClick={handleSkip}
                      className="w-full"
                    >
                      Skip for Now
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="space-y-6">
                  <div className="space-y-4">
                    <Label htmlFor="verification-code" className="text-center block">
                      Enter the 6-digit code from your authenticator app
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
                        'Verify & Complete Setup'
                      )}
                    </Button>
                    
                    <Button 
                      variant="ghost" 
                      onClick={() => setStep('setup')}
                      className="w-full"
                    >
                      Back to Setup
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default TwoFactorSetup;
