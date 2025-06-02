
import { useState } from 'react';
import { ArrowLeft, Mail, Lock, User, Building, Eye, EyeOff, Globe, Factory, Shield } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import EmailVerificationPage from './EmailVerificationPage';

interface SignupFormProps {
  onBack: () => void;
  onSwitchToLogin: () => void;
  onAccountCreated?: () => void;
}

// Country data with CRP (Country Risk Premium)
const countryData = {
  'United States': { code: 'US', crp: 0.0 },
  'Germany': { code: 'DE', crp: 0.5 },
  'France': { code: 'FR', crp: 0.8 },
  'Spain': { code: 'ES', crp: 1.2 },
  'United Kingdom': { code: 'GB', crp: 0.6 },
  'Italy': { code: 'IT', crp: 1.5 },
  'Japan': { code: 'JP', crp: 0.4 },
  'Canada': { code: 'CA', crp: 0.3 },
  'Australia': { code: 'AU', crp: 0.5 },
  'Netherlands': { code: 'NL', crp: 0.4 },
  'Switzerland': { code: 'CH', crp: 0.2 },
  'Sweden': { code: 'SE', crp: 0.3 },
  'Brazil': { code: 'BR', crp: 2.8 },
  'Mexico': { code: 'MX', crp: 2.1 }
};

// Industry data with WACC (Weighted Average Cost of Capital) based on Damodaran data
const industryData = {
  'Technology': { wacc: 8.5, description: 'Software, Hardware, IT Services' },
  'Healthcare': { wacc: 7.2, description: 'Pharmaceuticals, Medical Devices, Healthcare Services' },
  'Financial Services': { wacc: 6.8, description: 'Banking, Insurance, Investment Management' },
  'Consumer Goods': { wacc: 7.8, description: 'Retail, Consumer Products, Food & Beverage' },
  'Manufacturing': { wacc: 8.2, description: 'Industrial Equipment, Automotive, Chemicals' },
  'Real Estate': { wacc: 7.5, description: 'REITs, Property Development, Construction' },
  'Energy': { wacc: 9.1, description: 'Oil & Gas, Renewable Energy, Utilities' },
  'Telecommunications': { wacc: 6.9, description: 'Telecom Services, Media, Entertainment' },
  'Transportation': { wacc: 8.7, description: 'Airlines, Shipping, Logistics' },
  'Retail': { wacc: 8.3, description: 'E-commerce, Traditional Retail, Hospitality' }
};

const SignupForm = ({ onBack, onSwitchToLogin, onAccountCreated }: SignupFormProps) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [showEmailVerification, setShowEmailVerification] = useState(false);
  
  // Account setup fields
  const [role, setRole] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [companyEmail, setCompanyEmail] = useState('');
  const [country, setCountry] = useState('');
  const [industry, setIndustry] = useState('');

  const selectedCountryData = country ? countryData[country as keyof typeof countryData] : null;
  const selectedIndustryData = industry ? industryData[industry as keyof typeof industryData] : null;

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
    console.log('Complete signup:', { 
      name, email, password, role, companyName, companyEmail, country, industry,
      crp: selectedCountryData?.crp,
      wacc: selectedIndustryData?.wacc
    });
    // Show email verification page
    setShowEmailVerification(true);
  };

  const handleEmailVerified = () => {
    console.log('Email verified successfully');
    // Complete account creation and redirect to AI chatbot
    if (onAccountCreated) {
      onAccountCreated();
    }
  };

  const isFormValid = name && email && password && confirmPassword && role && companyName && companyEmail && country && industry && agreeTerms;

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
        <div className="container mx-auto px-4 max-w-2xl">
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
                  className="h-32 w-auto"
                />
              </div>
              <CardTitle className="text-2xl">Join VALOOV</CardTitle>
              <CardDescription>
                Create your account and set up your company profile
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Personal Information */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-white">Personal Information</h3>
                  
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

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                  </div>
                </div>

                {/* Company Information */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-white">Company Information</h3>
                  
                  <div className="space-y-2">
                    <Label htmlFor="role">Role</Label>
                    <Select value={role} onValueChange={setRole}>
                      <SelectTrigger className="w-full">
                        <div className="flex items-center">
                          <User className="h-4 w-4 mr-2 text-muted-foreground" />
                          <SelectValue placeholder="Select your role" />
                        </div>
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="company">
                          <div className="flex items-center">
                            <Building className="h-4 w-4 mr-2" />
                            <span>Company</span>
                          </div>
                        </SelectItem>
                        <SelectItem value="admin">
                          <div className="flex items-center">
                            <Shield className="h-4 w-4 mr-2" />
                            <span>Admin</span>
                          </div>
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="companyName">Company Name</Label>
                      <div className="relative">
                        <Building className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="companyName"
                          type="text"
                          placeholder="Enter company name"
                          value={companyName}
                          onChange={(e) => setCompanyName(e.target.value)}
                          className="pl-10"
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="companyEmail">Company Email</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="companyEmail"
                          type="email"
                          placeholder="Enter company email"
                          value={companyEmail}
                          onChange={(e) => setCompanyEmail(e.target.value)}
                          className="pl-10"
                          required
                        />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="country">Country</Label>
                    <Select value={country} onValueChange={setCountry}>
                      <SelectTrigger className="w-full">
                        <div className="flex items-center">
                          <Globe className="h-4 w-4 mr-2 text-muted-foreground" />
                          <SelectValue placeholder="Select country" />
                        </div>
                      </SelectTrigger>
                      <SelectContent className="max-h-60">
                        {Object.entries(countryData).map(([countryName, data]) => (
                          <SelectItem key={countryName} value={countryName}>
                            <div className="flex items-center justify-between w-full">
                              <span>{countryName}</span>
                              <Badge variant="outline" className="ml-2 text-xs">
                                CRP: {data.crp}%
                              </Badge>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {selectedCountryData && (
                      <div className="text-sm text-muted-foreground">
                        Country Risk Premium: <span className="text-financial-cyan font-medium">{selectedCountryData.crp}%</span>
                      </div>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="industry">Industry</Label>
                    <Select value={industry} onValueChange={setIndustry}>
                      <SelectTrigger className="w-full">
                        <div className="flex items-center">
                          <Factory className="h-4 w-4 mr-2 text-muted-foreground" />
                          <SelectValue placeholder="Select industry" />
                        </div>
                      </SelectTrigger>
                      <SelectContent className="max-h-60">
                        {Object.entries(industryData).map(([industryName, data]) => (
                          <SelectItem key={industryName} value={industryName}>
                            <div className="flex flex-col items-start">
                              <div className="flex items-center justify-between w-full">
                                <span className="font-medium">{industryName}</span>
                                <Badge variant="outline" className="ml-2 text-xs">
                                  WACC: {data.wacc}%
                                </Badge>
                              </div>
                              <span className="text-xs text-muted-foreground">{data.description}</span>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {selectedIndustryData && (
                      <div className="text-sm text-muted-foreground">
                        Industry WACC: <span className="text-valoov-orange font-medium">{selectedIndustryData.wacc}%</span>
                      </div>
                    )}
                  </div>

                  {/* Summary */}
                  {selectedCountryData && selectedIndustryData && (
                    <Card className="bg-card/20 border-valoov-teal/20">
                      <CardContent className="p-4">
                        <h4 className="font-medium text-white mb-2">Auto-Detected Parameters</h4>
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <span className="text-muted-foreground">Country Risk Premium:</span>
                            <div className="text-financial-cyan font-medium">{selectedCountryData.crp}%</div>
                          </div>
                          <div>
                            <span className="text-muted-foreground">Industry WACC:</span>
                            <div className="text-valoov-orange font-medium">{selectedIndustryData.wacc}%</div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  )}
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
                  disabled={!isFormValid}
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
