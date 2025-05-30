
import { useState } from 'react';
import { Upload, FileText, BarChart3, CheckCircle, ArrowRight, Calculator, Star, Eye } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import LoginForm from '@/components/LoginForm';
import SignupForm from '@/components/SignupForm';

interface LandingPageProps {
  onLogin?: () => void;
}

const LandingPage = ({ onLogin }: LandingPageProps) => {
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);

  const handleLoginSuccess = () => {
    setShowLogin(false);
    if (onLogin) {
      onLogin();
    }
  };

  const howItWorksSteps = [
    {
      step: 1,
      title: "Upload Tax Documents",
      description: "Securely upload your standardized tax return documents. Our AI processes French and Spanish tax formats automatically.",
      icon: Upload
    },
    {
      step: 2,
      title: "Complete Dynamic Questionnaire",
      description: "Answer our intelligent questionnaire tailored to your business sector and region for more accurate valuation.",
      icon: FileText
    },
    {
      step: 3,
      title: "Receive Comprehensive Report",
      description: "Get your professional valuation report using multiple proven financial models (DCF, Comparable, Asset-based).",
      icon: BarChart3
    }
  ];

  const testimonials = [
    {
      name: "Marie Dubois",
      company: "Tech Solutions SA",
      location: "Paris, France",
      text: "VALOOV helped us get an accurate valuation for our tech startup. The process was seamless and the report was incredibly detailed.",
      rating: 5
    },
    {
      name: "Carlos Rodriguez",
      company: "Innovate Consulting",
      location: "Madrid, Spain",
      text: "The AI-powered analysis saved us weeks of work. The multi-model approach gave us confidence in our company's valuation.",
      rating: 5
    },
    {
      name: "Jean-Pierre Martin",
      company: "Green Energy Corp",
      location: "Lyon, France",
      text: "Professional service with excellent attention to regulatory compliance. Highly recommend for any business valuation needs.",
      rating: 5
    }
  ];

  const regions = [
    { country: "France", flag: "🇫🇷", status: "Available" },
    { country: "Spain", flag: "🇪🇸", status: "Available" }
  ];

  if (showLogin) {
    return (
      <LoginForm 
        onBack={() => setShowLogin(false)} 
        onSwitchToSignup={() => { setShowLogin(false); setShowSignup(true); }} 
        onLoginSuccess={handleLoginSuccess}
      />
    );
  }

  if (showSignup) {
    return <SignupForm onBack={() => setShowSignup(false)} onSwitchToLogin={() => { setShowSignup(false); setShowLogin(true); }} />;
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="bg-white min-h-screen">
        {/* Header with Logo and Sign In/Sign Up */}
        <header className="container mx-auto px-4 pt-6 pb-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <img 
                src="/lovable-uploads/7878429c-0ab4-4ecf-936b-2947dc0eac7f.png" 
                alt="VALOOV Logo" 
                className="h-48 w-auto object-contain"
              />
            </div>
            <div className="flex gap-3">
              <Button 
                variant="outline" 
                className="border-financial-cyan text-financial-cyan hover:bg-financial-cyan/10 font-medium"
                onClick={() => setShowLogin(true)}
              >
                Sign In
              </Button>
              <Button 
                className="bg-valoov-orange hover:bg-valoov-orange/80 text-white font-medium"
                onClick={() => setShowSignup(true)}
              >
                Sign Up
              </Button>
            </div>
          </div>
        </header>

        {/* Hero Section */}
        <div className="container mx-auto px-4 pt-12 pb-16">
          <div className="text-center mb-16">
            <h1 className="text-6xl font-bold text-slate-800 mb-6" style={{ textShadow: '0 0 15px rgba(30, 41, 59, 0.1)' }}>
              Professional Company Valuation Platform
            </h1>
            <p className="text-2xl text-financial-cyan mb-4 font-medium">
              Get accurate valuations for businesses in France and Spain
            </p>
            <p className="text-xl text-slate-600 mb-8 max-w-4xl mx-auto leading-relaxed">
              Upload your tax documents, complete our expert questionnaire, and receive professional 
              valuation reports using multiple proven financial models. Trusted by businesses across Europe.
            </p>
            
            {/* Region Availability */}
            <div className="flex justify-center gap-6 mb-8">
              {regions.map((region) => (
                <div key={region.country} className="flex items-center space-x-2 bg-white/80 backdrop-blur rounded-lg px-4 py-2 border border-slate-200 shadow-sm">
                  <span className="text-2xl">{region.flag}</span>
                  <div className="text-left">
                    <p className="font-semibold text-slate-800">{region.country}</p>
                    <p className="text-xs text-valoov-teal">{region.status}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex gap-4 justify-center">
              <Button 
                size="lg" 
                className="bg-financial-cyan hover:bg-financial-cyan/80 text-white px-8 py-4 text-lg font-semibold"
                onClick={() => setShowSignup(true)}
              >
                Start Your Valuation
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                className="border-valoov-orange text-valoov-orange hover:bg-valoov-orange/10 px-8 py-4 text-lg font-medium"
              >
                View Sample Report
              </Button>
            </div>
          </div>

          {/* How It Works Section */}
          <section className="mb-20">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold mb-4 text-slate-800">How It Works</h2>
              <p className="text-xl text-slate-600">Simple 3-step process to get your professional valuation</p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              {howItWorksSteps.map((step) => {
                const Icon = step.icon;
                return (
                  <Card key={step.step} className="bg-white/80 backdrop-blur border-slate-200 hover:bg-white transition-all text-center shadow-sm">
                    <CardHeader>
                      <div className="flex justify-center mb-4">
                        <div className="w-16 h-16 bg-valoov-teal text-white rounded-full flex items-center justify-center text-2xl font-bold mb-4">
                          {step.step}
                        </div>
                      </div>
                      <div className="flex justify-center mb-4">
                        <div className="p-3 rounded-lg bg-valoov-orange/20">
                          <Icon className="h-8 w-8 text-valoov-orange" />
                        </div>
                      </div>
                      <CardTitle className="text-xl text-slate-800">{step.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="text-center text-base text-slate-600">
                        {step.description}
                      </CardDescription>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </section>

          {/* Sample Report Preview Section */}
          <section className="mb-20">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold mb-4 text-slate-800">Sample Report Preview</h2>
              <p className="text-xl text-slate-600">See what you'll receive with our comprehensive valuation reports</p>
            </div>
            
            <Card className="bg-white/80 backdrop-blur border-slate-200 shadow-sm">
              <CardContent className="p-8">
                <div className="grid md:grid-cols-2 gap-8 items-center">
                  <div>
                    <h3 className="text-2xl font-bold mb-4 text-slate-800">Comprehensive Analysis</h3>
                    <ul className="space-y-3 text-lg text-slate-700">
                      <li className="flex items-center space-x-3">
                        <CheckCircle className="h-5 w-5 text-valoov-teal flex-shrink-0" />
                        <span>Multiple valuation methodologies</span>
                      </li>
                      <li className="flex items-center space-x-3">
                        <CheckCircle className="h-5 w-5 text-valoov-teal flex-shrink-0" />
                        <span>Sector-specific benchmarking</span>
                      </li>
                      <li className="flex items-center space-x-3">
                        <CheckCircle className="h-5 w-5 text-valoov-teal flex-shrink-0" />
                        <span>Risk assessment analysis</span>
                      </li>
                      <li className="flex items-center space-x-3">
                        <CheckCircle className="h-5 w-5 text-valoov-teal flex-shrink-0" />
                        <span>Professional PDF format</span>
                      </li>
                    </ul>
                    <Button className="mt-6 bg-valoov-orange hover:bg-valoov-orange/80">
                      <Eye className="mr-2 h-4 w-4" />
                      View Full Sample
                    </Button>
                  </div>
                  <div className="relative">
                    <div className="valoov-gradient-alt rounded-lg p-6 backdrop-blur">
                      <div className="bg-white/10 rounded-lg p-4 mb-4">
                        <div className="h-4 bg-valoov-teal/50 rounded mb-2"></div>
                        <div className="h-3 bg-valoov-orange/50 rounded mb-2"></div>
                        <div className="h-3 bg-valoov-teal/30 rounded w-3/4"></div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="bg-white/10 rounded-lg p-3">
                          <div className="h-2 bg-valoov-teal/50 rounded mb-2"></div>
                          <div className="h-6 bg-valoov-teal/30 rounded"></div>
                        </div>
                        <div className="bg-white/10 rounded-lg p-3">
                          <div className="h-2 bg-valoov-orange/50 rounded mb-2"></div>
                          <div className="h-6 bg-valoov-orange/30 rounded"></div>
                        </div>
                      </div>
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent backdrop-blur-sm rounded-lg"></div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>

          {/* Testimonials Section */}
          <section className="mb-20">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold mb-4 text-slate-800">Trusted by Businesses Across Europe</h2>
              <p className="text-xl text-slate-600">See what our clients say about VALOOV</p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <Card key={index} className="bg-white/80 backdrop-blur border-slate-200 hover:bg-white transition-all shadow-sm">
                  <CardHeader>
                    <div className="flex items-center space-x-1 mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 text-valoov-orange fill-current" />
                      ))}
                    </div>
                    <CardTitle className="text-lg text-slate-800">{testimonial.name}</CardTitle>
                    <CardDescription className="text-slate-600">
                      {testimonial.company} • {testimonial.location}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-slate-600 italic">"{testimonial.text}"</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* CTA Section */}
          <div className="text-center">
            <Card className="valoov-gradient-alt border-valoov-teal/30 shadow-lg">
              <CardContent className="py-16">
                <h2 className="text-4xl font-bold mb-6 text-white">Ready to Value Your Company?</h2>
                <p className="text-xl text-white/90 mb-8 max-w-3xl mx-auto">
                  Join hundreds of businesses across France and Spain who trust VALOOV for accurate, 
                  professional company valuations with comprehensive reporting.
                </p>
                <div className="flex gap-4 justify-center">
                  <Button 
                    size="lg" 
                    className="bg-white text-valoov-teal hover:bg-white/90 px-8 py-4 text-lg font-semibold"
                    onClick={() => setShowSignup(true)}
                  >
                    <Calculator className="mr-2 h-5 w-5" />
                    Start Your Valuation
                  </Button>
                  <Button 
                    variant="outline" 
                    size="lg" 
                    className="border-white text-white hover:bg-white/10 px-8 py-4 text-lg"
                  >
                    Schedule Demo
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
