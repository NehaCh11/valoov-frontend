
import { useState } from 'react';
import { TrendingUp, Calculator, FileText, DollarSign, CheckCircle, ArrowRight } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import LoginForm from '@/components/LoginForm';
import SignupForm from '@/components/SignupForm';

const LandingPage = () => {
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);

  const benefits = [
    {
      icon: Calculator,
      title: "Automated Tax Calculations",
      description: "AI-powered calculations ensure accuracy and maximize your deductions"
    },
    {
      icon: FileText,
      title: "Smart Document Analysis",
      description: "Upload receipts and documents - our AI extracts relevant tax information automatically"
    },
    {
      icon: DollarSign,
      title: "Maximize Refunds",
      description: "Discover hidden deductions and credits you might have missed"
    }
  ];

  const features = [
    "Real-time tax law updates",
    "Expense categorization",
    "Audit protection assistance",
    "Multi-year tax planning",
    "Investment tax optimization",
    "Small business deductions"
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
                <TrendingUp className="h-12 w-12 text-financial-cyan animate-pulse-glow" />
              </div>
            </div>
            <h1 className="text-5xl font-bold text-glow mb-6">
              Valoov Financial Analyst AI
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              Revolutionary AI-powered platform that simplifies tax returns, maximizes deductions, 
              and ensures you never miss a credit. Get your taxes done faster and more accurately than ever before.
            </p>
            <div className="flex gap-4 justify-center">
              <Button 
                size="lg" 
                className="bg-financial-cyan hover:bg-financial-cyan/80 text-white px-8 py-3"
                onClick={() => setShowSignup(true)}
              >
                Get Started Free
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

          {/* Benefits Section */}
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon;
              return (
                <Card key={index} className="bg-card/30 backdrop-blur border-border/50 hover:bg-card/50 transition-all">
                  <CardHeader className="text-center">
                    <div className="flex justify-center mb-4">
                      <div className="p-3 rounded-lg bg-financial-green/20">
                        <Icon className="h-8 w-8 text-financial-green" />
                      </div>
                    </div>
                    <CardTitle className="text-xl">{benefit.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-center">
                      {benefit.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Features Section */}
          <Card className="bg-card/30 backdrop-blur border-border/50 mb-16">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl mb-4">Everything You Need for Tax Success</CardTitle>
              <CardDescription>
                Our AI handles the complexity so you can focus on what matters most
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
                <h2 className="text-3xl font-bold mb-4">Ready to Transform Your Tax Experience?</h2>
                <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                  Join thousands of users who have simplified their tax returns and maximized their refunds with Valoov AI.
                </p>
                <Button 
                  size="lg" 
                  className="bg-financial-cyan hover:bg-financial-cyan/80 text-white px-8 py-3"
                  onClick={() => setShowSignup(true)}
                >
                  Start Your Free Trial
                  <ArrowRight className="ml-2 h-4 w-4" />
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
