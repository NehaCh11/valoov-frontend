
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { TrendingUp, FileText, Calculator, BarChart3, Lock } from 'lucide-react';
import ChatbotQuestionnaire from '@/components/ChatbotQuestionnaire';
import { PricingModule } from '@/components/PricingModule';
import { useState } from 'react';

export function ValuationOverview() {
  const [showQuestionnaire, setShowQuestionnaire] = useState(false);
  const [showPricing, setShowPricing] = useState(false);
  
  // Mock payment status - replace with actual payment check
  const hasCompletedPayment = false;

  const methodsProgress = [
    { name: 'Scorecard Method', progress: 100, weight: 25 },
    { name: 'Checklist Method', progress: 100, weight: 20 },
    { name: 'DCF/LTG', progress: 75, weight: 20 },
    { name: 'DCF w/ Multiple', progress: 0, weight: 20 },
    { name: 'Venture Capital Method', progress: 0, weight: 15 },
  ];

  const handlePlanSelect = (plan: string) => {
    console.log('Selected plan:', plan);
    // Handle payment plan selection
    setShowPricing(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-black">Valuation Overview</h1>
          <p className="text-gray-600 mt-1">Comprehensive view of your valuation process</p>
        </div>
        <Dialog open={showQuestionnaire} onOpenChange={setShowQuestionnaire}>
          <DialogTrigger asChild>
            <Button className="bg-valoov-teal hover:bg-valoov-teal/90">
              <Calculator className="h-4 w-4 mr-2" />
              Continue Valuation
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Continue Your Valuation</DialogTitle>
            </DialogHeader>
            <ChatbotQuestionnaire />
          </DialogContent>
        </Dialog>
      </div>

      {/* Current Valuation Range - Always Blurred */}
      <Card className="bg-card/30 backdrop-blur border-border/50 relative">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <TrendingUp className="h-5 w-5 text-valoov-orange" />
            <span>Current Valuation Range</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-6 relative">
            <div className="absolute inset-0 bg-white/80 backdrop-blur-sm flex items-center justify-center z-10 rounded-lg">
              <div className="text-center space-y-4">
                <Lock className="h-12 w-12 text-gray-400 mx-auto" />
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">Unlock Your Valuation</h3>
                  <p className="text-gray-600">Complete payment to view your detailed valuation range</p>
                </div>
                <Button 
                  onClick={() => setShowPricing(true)}
                  className="bg-valoov-orange hover:bg-valoov-orange/90"
                >
                  Unlock with Payment
                </Button>
              </div>
            </div>
            <div className="filter blur-sm">
              <p className="text-4xl font-bold text-black mb-2">€•.•M - €•.•M</p>
              <p className="text-gray-600">Pre-Money Valuation</p>
              <Badge className="mt-3 bg-valoov-teal/20 text-valoov-teal border-valoov-teal/30">
                ••% Complete
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Method Breakdown - Always Blurred */}
      <Card className="bg-card/30 backdrop-blur border-border/50 relative">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <BarChart3 className="h-5 w-5 text-financial-cyan" />
            <span>Valuation Methods Progress</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="absolute inset-0 bg-white/80 backdrop-blur-sm flex items-center justify-center z-10 rounded-lg">
            <div className="text-center space-y-4">
              <Lock className="h-12 w-12 text-gray-400 mx-auto" />
              <div>
                <h3 className="text-lg font-semibold text-gray-800">Detailed Analysis Locked</h3>
                <p className="text-gray-600">Access comprehensive methodology breakdown</p>
              </div>
              <Button 
                onClick={() => setShowPricing(true)}
                className="bg-valoov-orange hover:bg-valoov-orange/90"
              >
                Unlock Full Report
              </Button>
            </div>
          </div>
          <div className="space-y-4 filter blur-sm">
            {methodsProgress.map((method, index) => (
              <div key={index} className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-medium text-black">{method.name}</span>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-gray-600">••% weight</span>
                    <Badge 
                      variant={method.progress === 100 ? 'default' : method.progress > 0 ? 'secondary' : 'outline'}
                      className={
                        method.progress === 100 ? 'bg-green-600' :
                        method.progress > 0 ? 'bg-yellow-600' : ''
                      }
                    >
                      ••%
                    </Badge>
                  </div>
                </div>
                <Progress value={method.progress} className="h-2" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Next Steps - Always visible */}
      <Card className="bg-card/30 backdrop-blur border-border/50">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <FileText className="h-5 w-5 text-valoov-teal" />
            <span>Next Steps</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-card/20 rounded-lg">
              <span className="text-black">Complete Financial Projections</span>
              <Button size="sm" className="bg-valoov-orange hover:bg-valoov-orange/90">
                Continue
              </Button>
            </div>
            <div className="flex items-center justify-between p-3 bg-card/20 rounded-lg">
              <span className="text-black">Upload Supporting Documents</span>
              <Button size="sm" variant="outline">
                Start
              </Button>
            </div>
            <div className="flex items-center justify-between p-3 bg-card/20 rounded-lg">
              <span className="text-black">Review & Generate Report</span>
              <Button 
                size="sm" 
                variant="outline" 
                disabled={!hasCompletedPayment}
                onClick={() => !hasCompletedPayment && setShowPricing(true)}
              >
                {hasCompletedPayment ? 'Generate' : 'Unlock'}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Pricing Dialog */}
      <Dialog open={showPricing} onOpenChange={setShowPricing}>
        <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Unlock Your Professional Valuation Report</DialogTitle>
          </DialogHeader>
          <PricingModule onPlanSelect={handlePlanSelect} currentStep={1} />
        </DialogContent>
      </Dialog>
    </div>
  );
}
