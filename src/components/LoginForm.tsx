
import { useState } from 'react';
import { ArrowLeft, Mail, Lock, Eye, EyeOff } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';

interface LoginFormProps {
  onBack: () => void;
  onSwitchToSignup: () => void;
  onLoginSuccess: () => void;
  onAdminLoginSuccess?: () => void;
}

const LoginForm = ({ onBack, onSwitchToSignup, onLoginSuccess, onAdminLoginSuccess }: LoginFormProps) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Check for admin credentials first
    if (email === 'admin@valoov.com' && password === 'admin123') {
      console.log('Admin login successful');
      localStorage.setItem('adminToken', 'demo-admin-token');
      if (onAdminLoginSuccess) {
        onAdminLoginSuccess();
      }
      setIsLoading(false);
      return;
    }
    
    // Regular user authentication - for demo purposes, any valid email/password combo works
    await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call
    
    if (email && password.length >= 6) {
      console.log('User login credentials validated:', { email, rememberMe });
      console.log('User login successful, redirecting to dashboard');
      onLoginSuccess(); // Direct login without 2FA
    } else {
      alert('Please enter a valid email and password (min 6 characters)');
    }
    
    setIsLoading(false);
  };

  const handleForgotPassword = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Password reset for:', email);
    // TODO: Implement password reset logic
    alert('Password reset link sent to your email!');
    setShowForgotPassword(false);
  };

  return (
    <div className="fixed inset-0 w-full h-full">
      <div className="valoov-gradient w-full h-full flex items-center justify-center px-4">
        <div className="w-full max-w-md mx-auto">
          <Button 
            variant="ghost" 
            onClick={onBack}
            className="mb-4 text-valoov-teal hover:text-valoov-teal/80"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Home
          </Button>

          <Card className="bg-card/30 backdrop-blur border-valoov-teal/30 w-full">
            <CardHeader className="text-center space-y-4">
              <div className="flex justify-center">
                <img 
                  src="/lovable-uploads/10986bb1-03cf-4cef-b5a2-8a61c6dfd7a1.png" 
                  alt="VALOOV AI Logo" 
                  className="h-24 w-auto object-contain"
                />
              </div>
              <CardTitle className="text-2xl text-foreground">
                {showForgotPassword ? 'Reset Password' : 'Welcome Back to VALOOV'}
              </CardTitle>
              <CardDescription className="text-muted-foreground">
                {showForgotPassword 
                  ? 'Enter your email to receive a password reset link'
                  : 'Sign in to access your dashboard'
                }
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {showForgotPassword ? (
                <form onSubmit={handleForgotPassword} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="reset-email">Email Address</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="reset-email"
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>

                  <Button 
                    type="submit" 
                    className="w-full bg-valoov-teal hover:bg-valoov-teal/80"
                  >
                    Send Reset Link
                  </Button>

                  <div className="text-center">
                    <button
                      type="button"
                      onClick={() => setShowForgotPassword(false)}
                      className="text-sm text-valoov-orange hover:text-valoov-orange/80"
                    >
                      Back to Sign In
                    </button>
                  </div>
                </form>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="email"
                        type="email"
                        placeholder="Enter your email"
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
                        placeholder="Enter your password"
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

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id="remember" 
                        checked={rememberMe}
                        onCheckedChange={(checked) => setRememberMe(checked as boolean)}
                      />
                      <Label htmlFor="remember" className="text-sm">Remember me</Label>
                    </div>
                    <button
                      type="button"
                      onClick={() => setShowForgotPassword(true)}
                      className="text-sm text-valoov-orange hover:text-valoov-orange/80"
                    >
                      Forgot Password?
                    </button>
                  </div>

                  <Button 
                    type="submit" 
                    className="w-full bg-valoov-teal hover:bg-valoov-teal/80"
                    disabled={isLoading}
                  >
                    {isLoading ? 'Signing In...' : 'Sign In'}
                  </Button>

                  <div className="text-center text-xs text-muted-foreground">
                    Demo admin: admin@valoov.com / admin123
                  </div>
                </form>
              )}

              {!showForgotPassword && (
                <div className="text-center border-t pt-4">
                  <p className="text-sm text-muted-foreground">
                    Don't have an account?{' '}
                    <button
                      onClick={onSwitchToSignup}
                      className="text-valoov-orange hover:text-valoov-orange/80 font-medium"
                    >
                      Create one here
                    </button>
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
