
import { useState } from 'react';
import { Building2, Upload, FileText, BarChart3, CheckCircle, ArrowRight, Globe, Calculator } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import LoginForm from '@/components/LoginForm';
import SignupForm from '@/components/SignupForm';

const LandingPage = () => {
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);

  const services = [
    {
      icon: Upload,
      title: "Upload Tax Documents",
      description: "Securely upload your standardized tax return documents for accurate analysis"
    },
    {
      icon: FileText,
      title: "Dynamic Questionnaire",
      description: "Complete our intelligent questionnaire tailored to your business sector"
    },
    {
      icon: BarChart3,
      title: "Multi-Model Valuation",
      description: "Receive comprehensive valuation reports using multiple proven financial models"
    }
  ];

  const features = [
    "Compliant with French & Spanish regulations",
    "Multiple valuation methodologies (DCF, Comparable, Asset-based)",
    "Sector-specific analysis",
    "Professional PDF reports",
    "Secure document processing",
    "Expert review available"
  ];

  const regions = [
    { country: "France", flag: "🇫🇷", status: "Available" },
    { country: "Spain", flag: "🇪🇸", status: "Available" }
  ];

  if (showLogin) {
    return <LoginForm onBack={() => setShowLogin(false)} onSwitchToSignup={() => { setShowLogin(false); setShowSignup(true); }} />;
  }

  if (showSignup) {
    return <SignupForm onBack={() => setShowSignup(false)} onSwitchToLogin={() => { setShowSignup(false); setShowLogin(true); }} />;
  }

  return (
    <div className="min-h-screen bg-financial-dark">
      <div className="financial-gradient min-h-screen">
        {/* Hero Section */}
        <div className="container mx-auto px-4 pt-16 pb-8">
          <div className="text-center mb-16">
            <div className="flex justify-center mb-6">
              <div className="p-4 rounded-full bg-financial-blue/20">
                <Building2 className="h-12 w-12 text-financial-cyan animate-pulse-glow" />
              </div>
            </div>
            <h1 className="text-5xl font-bold text-glow mb-6">
              VALOOV
            </h1>
            <p className="text-2xl text-financial-cyan mb-4">
              Professional Company Valuation Platform
            </p>
            <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              Get accurate company valuations in France and Spain. Upload your tax documents, 
              complete our expert questionnaire, and receive professional valuation reports 
              using multiple proven financial models.
            </p>
            
            {/* Region Availability */}
            <div className="flex justify-center gap-6 mb-8">
              {regions.map((region) => (
                <div key={region.country} className="flex items-center space-x-2 bg-card/30 backdrop-blur rounded-lg px-4 py-2 border border-border/50">
                  <span className="text-2xl">{region.flag}</span>
                  <div className="text-left">
                    <p className="font-semibold">{region.country}</p>
                    <p className="text-xs text-financial-green">{region.status}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex gap-4 justify-center">
              <Button 
                size="lg" 
                className="bg-financial-cyan hover:bg-financial-cyan/80 text-white px-8 py-3"
                onClick={() => setShowSignup(true)}
              >
                Start Valuation
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                className="border-financial-cyan text-financial-cyan hover:bg-financial-cyan/10 px-8 py-3"
                onClick={() => setShowLogin(true)}
              >
                Sign In
              </Button>
            </div>
          </div>

          {/* Services Section */}
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {services.map((service, index) => {
              const Icon = service.icon;
              return (
                <Card key={index} className="bg-card/30 backdrop-blur border-border/50 hover:bg-card/50 transition-all">
                  <CardHeader className="text-center">
                    <div className="flex justify-center mb-4">
                      <div className="p-3 rounded-lg bg-financial-green/20">
                        <Icon className="h-8 w-8 text-financial-green" />
                      </div>
                    </div>
                    <CardTitle className="text-xl">{service.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-center">
                      {service.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Process Steps */}
          <Card className="bg-card/30 backdrop-blur border-border/50 mb-16">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl mb-4">Simple 3-Step Process</CardTitle>
              <CardDescription>
                Professional company valuation made easy
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-8">
                <div className="text-center">
                  <div className="w-12 h-12 bg-financial-cyan text-white rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">1</div>
                  <h3 className="font-semibold mb-2">Upload Documents</h3>
                  <p className="text-sm text-muted-foreground">Upload your standardized tax return documents securely</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-financial-cyan text-white rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">2</div>
                  <h3 className="font-semibold mb-2">Complete Questionnaire</h3>
                  <p className="text-sm text-muted-foreground">Answer our dynamic, sector-specific questions</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-financial-cyan text-white rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">3</div>
                  <h3 className="font-semibold mb-2">Get Valuation Report</h3>
                  <p className="text-sm text-muted-foreground">Receive comprehensive reports with multiple valuation models</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Features Section */}
          <Card className="bg-card/30 backdrop-blur border-border/50 mb-16">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl mb-4">Professional Valuation Features</CardTitle>
              <CardDescription>
                Comprehensive analysis tools for accurate company valuations
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-4">
                {features.map((feature, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <CheckCircle className="h-5 w-5 text-financial-green flex-shrink-0" />
                    <span className="text-sm">{feature}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* CTA Section */}
          <div className="text-center">
            <Card className="bg-gradient-to-r from-financial-blue/20 to-financial-cyan/20 border-financial-cyan/30">
              <CardContent className="py-12">
                <h2 className="text-3xl font-bold mb-4">Ready to Value Your Company?</h2>
                <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                  Join businesses across France and Spain who trust VALOOV for accurate, 
                  professional company valuations with comprehensive reporting.
                </p>
                <Button 
                  size="lg" 
                  className="bg-financial-cyan hover:bg-financial-cyan/80 text-white px-8 py-3"
                  onClick={() => setShowSignup(true)}
                >
                  <Calculator className="mr-2 h-4 w-4" />
                  Start Your Valuation
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
