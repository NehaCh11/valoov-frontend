import { Upload, FileText, BarChart3, CheckCircle, ArrowRight, Calculator, Star, Eye, Play, X, TrendingUp, Zap, BarChart2, Facebook, Linkedin, Youtube, Twitter } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { SampleReportDialog } from './SampleReportDialog';

interface LandingPageProps {
  onLogin?: () => void;
  onAccountCreated?: () => void;
}

const LandingPage = ({ onLogin, onAccountCreated }: LandingPageProps) => {
  const navigate = useNavigate();
  const [showSampleReportDialog, setShowSampleReportDialog] = useState(false);

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

  const comparisonData = [
    {
      feature: "AI-powered analysis",
      valoov: true,
      traditional: false,
      competitors: true
    },
    {
      feature: "Multiple valuation methods",
      valoov: true,
      traditional: true,
      competitors: true
    },
    {
      feature: "Investor-ready reports",
      valoov: true,
      traditional: true,
      competitors: true
    },
    {
      feature: "Real-time data updates",
      valoov: true,
      traditional: false,
      competitors: false
    },
    {
      feature: "Industry benchmarking",
      valoov: true,
      traditional: true,
      competitors: true
    },
    {
      feature: "Time to complete",
      valoov: "Minutes",
      traditional: "Weeks",
      competitors: "Days"
    },
    {
      feature: "Cost",
      valoov: "Affordable",
      traditional: "Expensive",
      competitors: "Moderate"
    },
    {
      feature: "Value confidence score",
      valoov: true,
      traditional: false,
      competitors: false
    },
    {
      feature: "ESOP compliance tools",
      valoov: true,
      traditional: true,
      competitors: false
    }
  ];

  const techStack = [
    {
      name: "Google Cloud",
      description: "Enterprise-grade cloud infrastructure for scalable, secure data processing",
      icon: "google-logo"
    },
    {
      name: "Dialogflow CX",
      description: "Advanced conversational AI for intelligent questionnaire interactions",
      icon: "dialogflow-logo"
    },
    {
      name: "Vertex AI",
      description: "Machine learning platform powering our valuation analysis algorithms",
      icon: "vertex-ai-logo"
    },
    {
      name: "Python",
      description: "Robust programming foundation for financial modeling and data analysis",
      icon: "python-logo"
    }
  ];

  const renderComparisonValue = (value: boolean | string, column: 'valoov' | 'traditional' | 'competitors') => {
    if (typeof value === 'boolean') {
      return value ? (
        <CheckCircle className="h-5 w-5 text-green-500 mx-auto" />
      ) : (
        <X className="h-5 w-5 text-red-500 mx-auto" />
      );
    }
    
    // Handle text values with specific colors
    let textColor = 'text-slate-600';
    if (column === 'valoov' && (value === 'Minutes' || value === 'Affordable')) {
      textColor = 'text-blue-500 font-medium';
    }
    
    return (
      <span className={textColor}>
        {value}
      </span>
    );
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="bg-white min-h-screen">
        {/* Header with Logo and Sign In/Sign Up */}
        <header className="container mx-auto px-4 pt-6 pb-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <img 
                src="/lovable-uploads/ccbfeb8f-e488-4725-8c91-82d50190256a.png" 
                alt="VALOOV AI Logo" 
                className="h-16 w-auto object-contain"
              />
            </div>
            <div className="flex gap-3">
              <Button 
                variant="outline" 
                className="border-financial-cyan text-financial-cyan hover:bg-financial-cyan/10 font-medium"
                onClick={() => navigate('/login')}
              >
                Sign In
              </Button>
              <Button 
                className="bg-valoov-orange hover:bg-valoov-orange/80 text-white font-medium"
                onClick={() => navigate('/signup')}
              >
                Sign Up
              </Button>
            </div>
          </div>
        </header>

        {/* Hero Section */}
        <div className="container mx-auto px-4 pt-12 pb-16">
          <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
            {/* Left side - Text content */}
            <div className="text-center lg:text-left">
              <h1 className="text-5xl lg:text-6xl font-bold text-black mb-6" style={{ textShadow: '0 0 15px rgba(30, 41, 59, 0.1)' }}>
                Professional Company Valuation Platform
              </h1>
              <p className="text-2xl text-financial-cyan mb-4 font-medium">
                Get accurate valuations for businesses in France and Spain
              </p>
              <p className="text-xl text-slate-600 mb-8 leading-relaxed">
                Upload your tax documents, complete our expert questionnaire, and receive professional 
                valuation reports using multiple proven financial models. Trusted by businesses across Europe.
              </p>
              
              {/* Region Availability */}
              <div className="flex justify-center lg:justify-start gap-6 mb-8">
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

              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Button 
                  size="lg" 
                  className="bg-financial-cyan hover:bg-financial-cyan/80 text-white px-8 py-4 text-lg font-semibold"
                  onClick={() => navigate('/signup')}
                >
                  Start Your Valuation
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Button 
                  variant="outline" 
                  size="lg" 
                  className="border-valoov-orange text-valoov-orange hover:bg-valoov-orange/10 px-8 py-4 text-lg font-medium"
                  onClick={() => setShowSampleReportDialog(true)}
                >
                  View Sample Report
                </Button>
              </div>
            </div>

            {/* Right side - Demo video placeholder with exact red rectangle dimensions */}
            <div className="flex justify-center lg:justify-end">
              <div className="relative w-[520px] h-[340px] bg-gradient-to-br from-financial-cyan/20 to-valoov-orange/20 rounded-lg shadow-lg overflow-hidden border border-slate-200">
                <img 
                  src="https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&w=600&h=400" 
                  alt="Demo video thumbnail" 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                  <Button 
                    size="lg" 
                    className="bg-white/90 text-valoov-teal hover:bg-white h-16 w-16 rounded-full p-0"
                  >
                    <Play className="h-8 w-8 ml-1" fill="currentColor" />
                  </Button>
                </div>
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="bg-white/90 backdrop-blur rounded-lg p-3">
                    <p className="text-sm font-semibold text-slate-800">Watch Demo</p>
                    <p className="text-xs text-slate-600">See how VALOOV works in 2 minutes</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* How It Works Section */}
          <section className="mb-20">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold mb-4 text-black">How It Works</h2>
              <p className="text-xl text-slate-600">Simple 3-step process to get your professional valuation</p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              {howItWorksSteps.map((step) => {
                const Icon = step.icon;
                return (
                  <Card key={step.step} className="bg-white/80 backdrop-blur border-slate-200 hover:bg-white transition-all text-center shadow-sm">
                    <CardHeader>
                      <div className="flex justify-center mb-4">
                        <div className="w-16 h-16 bg-valoov-teal text-white rounded-full flex items-center justify-center text-sm font-bold mb-4">
                          Step {step.step}
                        </div>
                      </div>
                      <div className="flex justify-center mb-4">
                        <div className="p-3 rounded-lg bg-valoov-orange/20">
                          <Icon className="h-8 w-8 text-valoov-orange" />
                        </div>
                      </div>
                      <CardTitle className="text-xl text-black">{step.title}</CardTitle>
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
              <h2 className="text-4xl font-bold mb-4 text-black">Sample Report Preview</h2>
              <p className="text-xl text-slate-600">See what you'll receive with our comprehensive valuation reports</p>
            </div>
            
            <Card className="bg-white/80 backdrop-blur border-slate-200 shadow-sm">
              <CardContent className="p-8">
                <div className="grid md:grid-cols-2 gap-8 items-center">
                  <div>
                    <h3 className="text-2xl font-bold mb-4 text-black">Comprehensive Analysis</h3>
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
                    <Button 
                      className="mt-6 bg-valoov-orange hover:bg-valoov-orange/80"
                      onClick={() => setShowSampleReportDialog(true)}
                    >
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

        {/* How We Compare Section */}
        <section className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4 text-black">How We Compare</h2>
            <p className="text-lg text-slate-600">See how Valoov stacks up against traditional valuation methods and competitors.</p>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <Table className="bg-white rounded-lg overflow-hidden shadow-sm border border-slate-200">
              <TableHeader>
                <TableRow className="border-none">
                  <TableHead className="w-1/4 p-0"></TableHead>
                  <TableHead className="w-1/4 p-0">
                    <div className="bg-sky-400 text-white text-center py-4 px-6 font-semibold text-base flex items-center justify-center">
                      <span className="text-xl mr-2">📊</span>
                      Valoov
                    </div>
                  </TableHead>
                  <TableHead className="w-1/4 p-0">
                    <div className="bg-slate-600 text-white text-center py-4 px-6 font-semibold text-base">
                      Traditional Valuator
                    </div>
                  </TableHead>
                  <TableHead className="w-1/4 p-0">
                    <div className="bg-slate-400 text-white text-center py-4 px-6 font-semibold text-base">
                      Competitors
                    </div>
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {comparisonData.map((row, index) => (
                  <TableRow key={index} className="border-b border-slate-100 hover:bg-slate-50">
                    <TableCell className="font-medium text-slate-700 py-4 px-6 text-left">
                      {row.feature}
                    </TableCell>
                    <TableCell className="text-center py-4 px-6">
                      {renderComparisonValue(row.valoov, 'valoov')}
                    </TableCell>
                    <TableCell className="text-center py-4 px-6">
                      {renderComparisonValue(row.traditional, 'traditional')}
                    </TableCell>
                    <TableCell className="text-center py-4 px-6">
                      {renderComparisonValue(row.competitors, 'competitors')}
                    </TableCell>
                  </TableRow>
                ))}
                <TableRow className="border-none">
                  <TableCell className="font-semibold text-slate-700 py-6 px-6 text-left text-base">
                    Overall value
                  </TableCell>
                  <TableCell className="text-center py-6 px-6">
                    <div className="flex justify-center">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                      ))}
                    </div>
                  </TableCell>
                  <TableCell className="text-center py-6 px-6">
                    <div className="flex justify-center">
                      {[...Array(3)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                      ))}
                      {[...Array(2)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 text-slate-300" />
                      ))}
                    </div>
                  </TableCell>
                  <TableCell className="text-center py-6 px-6">
                    <div className="flex justify-center">
                      {[...Array(4)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                      ))}
                      <Star className="h-4 w-4 text-slate-300" />
                    </div>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </section>

        {/* Data Sources & Methodology Section */}
        <section className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4 text-black">Data Sources & Methodology</h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Our AI combines multiple valuation methods with real-time global data for comprehensive analysis.
            </p>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-8 mb-12">
            {/* Valuation Methods */}
            <Card className="bg-white border-slate-200 shadow-sm">
              <CardHeader>
                <div className="flex items-center space-x-3 mb-4">
                  <div className="p-2 rounded-lg bg-blue-100">
                    <FileText className="h-6 w-6 text-blue-600" />
                  </div>
                  <CardTitle className="text-xl text-black">Valuation Methods</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-start space-x-3">
                  <div className="p-2 rounded-lg bg-green-100 mt-1">
                    <BarChart3 className="h-4 w-4 text-green-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-black mb-1">Discounted Cash Flow (DCF)</h4>
                    <p className="text-sm text-slate-600">Projects future cash flows and discounts them to present value.</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <div className="p-2 rounded-lg bg-orange-100 mt-1">
                    <TrendingUp className="h-4 w-4 text-orange-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-black mb-1">Venture Capital Method</h4>
                    <p className="text-sm text-slate-600">Calculates post-money valuation based on projected exit value and required returns.</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <div className="p-2 rounded-lg bg-purple-100 mt-1">
                    <BarChart2 className="h-4 w-4 text-purple-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-black mb-1">Comparable Company Analysis</h4>
                    <p className="text-sm text-slate-600">Benchmarks against similar companies in your industry.</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <div className="p-2 rounded-lg bg-blue-100 mt-1">
                    <Calculator className="h-4 w-4 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-black mb-1">First Chicago Method</h4>
                    <p className="text-sm text-slate-600">Weights multiple scenarios for early-stage companies.</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Global Data Sources */}
            <Card className="bg-white border-slate-200 shadow-sm">
              <CardHeader>
                <div className="flex items-center space-x-3 mb-4">
                  <div className="p-2 rounded-lg bg-orange-100">
                    <BarChart3 className="h-6 w-6 text-orange-600" />
                  </div>
                  <CardTitle className="text-xl text-black">Global Data Sources</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                    <span className="text-sm text-slate-700">Global Market Intelligence</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                    <span className="text-sm text-slate-700">Industry Benchmarks</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                    <span className="text-sm text-slate-700">Financial Databases</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                    <span className="text-sm text-slate-700">Startup Funding Data</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                    <span className="text-sm text-slate-700">M&A Transactions</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                    <span className="text-sm text-slate-700">Public Company Financials</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                    <span className="text-sm text-slate-700">Economic Indicators</span>
                  </div>
                </div>

                <div className="mt-6 pt-6 border-t border-slate-200">
                  <h4 className="font-semibold text-black mb-2">Data Transparency</h4>
                  <p className="text-sm text-slate-600">
                    We believe in complete transparency in our valuation process. Every data point used in your valuation is documented and traceable to its source.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* The Valoov Advantage */}
          <Card className="bg-slate-50 border-slate-200 shadow-sm">
            <CardContent className="py-12">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-black mb-2">The Valoov Advantage</h3>
              </div>
              
              <div className="grid md:grid-cols-3 gap-8">
                <div className="text-center">
                  <div className="flex justify-center mb-4">
                    <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                      <CheckCircle className="h-8 w-8 text-blue-600" />
                    </div>
                  </div>
                  <h4 className="text-lg font-semibold text-black mb-2">Accuracy</h4>
                  <p className="text-sm text-slate-600">
                    Our multi-method approach reduces variance and increases confidence in valuation results.
                  </p>
                </div>
                
                <div className="text-center">
                  <div className="flex justify-center mb-4">
                    <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center">
                      <Zap className="h-8 w-8 text-orange-600" />
                    </div>
                  </div>
                  <h4 className="text-lg font-semibold text-black mb-2">Speed</h4>
                  <p className="text-sm text-slate-600">
                    Get results in minutes instead of weeks with traditional valuation services.
                  </p>
                </div>
                
                <div className="text-center">
                  <div className="flex justify-center mb-4">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                      <TrendingUp className="h-8 w-8 text-green-600" />
                    </div>
                  </div>
                  <h4 className="text-lg font-semibold text-black mb-2">Continuous Updates</h4>
                  <p className="text-sm text-slate-600">
                    Valuations stay current with market conditions and your business performance.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Powered By Advanced Technology Section */}
        <section className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4 text-black">Powered By Advanced Technology</h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Our platform leverages cutting-edge cloud technologies and AI to deliver accurate, 
              reliable valuations with enterprise-grade security and performance.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {techStack.map((tech, index) => {
              return (
                <Card key={index} className="bg-white/80 backdrop-blur border-slate-200 hover:bg-white transition-all text-center shadow-sm">
                  <CardHeader>
                    <div className="flex justify-center mb-4">
                      {tech.icon === "google-logo" ? (
                        <img 
                          src="/lovable-uploads/b877c169-a0f0-4b2a-b3be-df374a7ff1a6.png" 
                          alt="Google Cloud Logo" 
                          className="h-8 w-8 object-contain"
                        />
                      ) : tech.icon === "dialogflow-logo" ? (
                        <img 
                          src="/lovable-uploads/17a79a69-36c7-4c94-877b-eef8769d4d75.png" 
                          alt="Dialogflow CX Logo" 
                          className="h-8 w-8 object-contain"
                        />
                      ) : tech.icon === "vertex-ai-logo" ? (
                        <img 
                          src="/lovable-uploads/ffa54c5b-1af2-4612-8e5d-e9e831c4775a.png" 
                          alt="Vertex AI Logo" 
                          className="h-8 w-8 object-contain"
                        />
                      ) : tech.icon === "python-logo" ? (
                        <img 
                          src="/lovable-uploads/c15db171-d90b-469e-9240-0b374c26c27c.png" 
                          alt="Python Logo" 
                          className="h-8 w-8 object-contain"
                        />
                      ) : null}
                    </div>
                    <CardTitle className="text-lg text-black">{tech.name}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-center text-sm text-slate-600">
                      {tech.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </section>

          {/* Testimonials Section */}
          <section className="mb-20">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold mb-4 text-black">Trusted by Businesses Across Europe</h2>
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
                    <CardTitle className="text-lg text-black">{testimonial.name}</CardTitle>
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
                <h2 className="text-4xl font-bold mb-6 text-black">Ready to Value Your Company?</h2>
                <p className="text-xl text-slate-800 mb-8 max-w-3xl mx-auto">
                  Join hundreds of businesses across France and Spain who trust VALOOV for accurate, 
                  professional company valuations with comprehensive reporting.
                </p>
                <div className="flex gap-4 justify-center">
                  <Button 
                    size="lg" 
                    className="bg-white text-valoov-teal hover:bg-white/90 px-8 py-4 text-lg font-semibold"
                    onClick={() => navigate('/signup')}
                  >
                    <Calculator className="mr-2 h-5 w-5" />
                    Start Your Valuation
                  </Button>
                  <Button 
                    variant="outline" 
                    size="lg" 
                    className="border-white text-black bg-white hover:bg-white/90 px-8 py-4 text-lg"
                  >
                    Schedule Demo
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-slate-900 text-white">
        <div className="container mx-auto px-4 py-12">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Company Info */}
            <div className="space-y-4">
              <img 
                src="/lovable-uploads/324db3e0-4f76-45f5-80fd-11deb3389a14.png" 
                alt="VALOOV AI Logo" 
                className="h-12 w-auto object-contain"
              />
              <div className="text-slate-300 text-sm">
                <div>Professional company valuation platform</div>
                <div>for businesses in France and Spain.</div>
                <div>Get accurate valuations</div>
                <div>with AI-powered analysis.</div>
              </div>
              <div className="flex space-x-4">
                <div className="w-8 h-8 bg-slate-800 rounded-full flex items-center justify-center hover:bg-slate-700 transition-colors cursor-pointer">
                  <Facebook className="h-4 w-4" />
                </div>
                <div className="w-8 h-8 bg-slate-800 rounded-full flex items-center justify-center hover:bg-slate-700 transition-colors cursor-pointer">
                  <Linkedin className="h-4 w-4" />
                </div>
                <div className="w-8 h-8 bg-slate-800 rounded-full flex items-center justify-center hover:bg-slate-700 transition-colors cursor-pointer">
                  <Youtube className="h-4 w-4" />
                </div>
                <div className="w-8 h-8 bg-slate-800 rounded-full flex items-center justify-center hover:bg-slate-700 transition-colors cursor-pointer">
                  <Twitter className="h-4 w-4" />
                </div>
              </div>
            </div>

            {/* Legal Links */}
            <div>
              <h3 className="font-semibold mb-4">Legal</h3>
              <ul className="space-y-2 text-sm text-slate-300">
                <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Terms and Conditions</a></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-slate-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
            <div className="text-sm text-slate-400 mb-4 md:mb-0">
              © 2024 VALOOV. All rights reserved.
            </div>
          </div>
        </div>
      </footer>

      {/* Sample Report Dialog */}
      <SampleReportDialog
        isOpen={showSampleReportDialog}
        onClose={() => setShowSampleReportDialog(false)}
      />
    </div>
  );
};

export default LandingPage;
