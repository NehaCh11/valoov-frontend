
import { useState } from 'react';
import { ArrowLeft, Mail, Lock, User, Building, Eye, EyeOff } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import EmailVerificationPage from './EmailVerificationPage';

interface SignupFormProps {
  onBack: () => void;
  onSwitchToLogin: () => void;
  onAccountCreated?: () => void;
}

const SignupForm = ({ onBack, onSwitchToLogin, onAccountCreated }: SignupFormProps) => {
  const [name, setName] = useState('');
  const [company, setCompany] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [showEmailVerification, setShowEmailVerification] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }
    if (!agreeTerms) {
      alert('Please agree to the terms and conditions');
      return;
    }
    console.log('Signup attempt:', { name, company, email, password });
    // Show email verification page
    setShowEmailVerification(true);
  };

  const handleEmailVerified = () => {
    console.log('Email verified successfully');
    // Redirect to AI chatbot after successful account creation
    if (onAccountCreated) {
      onAccountCreated();
    }
  };

  if (showEmailVerification) {
    return (
      <EmailVerificationPage
        email={email}
        onBack={() => setShowEmailVerification(false)}
        onVerified={handleEmailVerified}
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
            Back to Home
          </Button>

          <Card className="bg-card/30 backdrop-blur border-valoov-teal/30">
            <CardHeader className="text-center">
              <div className="flex justify-center mb-4">
                <img 
                  src="/lovable-uploads/17dd4d7d-77a4-46b2-8bcc-c7b2923ba0e5.png" 
                  alt="VALOOV Logo" 
                  className="h-64 w-auto"
                />
              </div>
              <CardTitle className="text-2xl">Join VALOOV</CardTitle>
              <CardDescription>
                Create your account to start professional company valuations
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="name"
                      type="text"
                      placeholder="Enter your full name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="pl-10"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="company">Company Name</Label>
                  <div className="relative">
                    <Building className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="company"
                      type="text"
                      placeholder="Enter your company name"
                      value={company}
                      onChange={(e) => setCompany(e.target.value)}
                      className="pl-10"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Business Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="Enter your business email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="pl-10"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Create a secure password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="pl-10 pr-10"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-3 text-muted-foreground hover:text-foreground"
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirm Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="confirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="Confirm your password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="pl-10 pr-10"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3 top-3 text-muted-foreground hover:text-foreground"
                    >
                      {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </div>

                <div className="flex items-start space-x-2">
                  <Checkbox 
                    id="terms" 
                    checked={agreeTerms}
                    onCheckedChange={(checked) => setAgreeTerms(checked as boolean)}
                    className="mt-1"
                  />
                  <Label htmlFor="terms" className="text-sm leading-relaxed">
                    I agree to the{' '}
                    <a href="#" className="text-financial-cyan hover:text-financial-cyan/80">
                      Terms of Service
                    </a>{' '}
                    and{' '}
                    <a href="#" className="text-financial-cyan hover:text-financial-cyan/80">
                      Privacy Policy
                    </a>
                  </Label>
                </div>

                <Button 
                  type="submit" 
                  className="w-full bg-valoov-teal hover:bg-valoov-teal/80"
                  disabled={!agreeTerms}
                >
                  Create Account
                </Button>
              </form>

              <div className="mt-6 text-center">
                <p className="text-sm text-muted-foreground">
                  Already have an account?{' '}
                  <button
                    onClick={onSwitchToLogin}
                    className="text-valoov-orange hover:text-valoov-orange/80 font-medium"
                  >
                    Sign in here
                  </button>
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default SignupForm;
