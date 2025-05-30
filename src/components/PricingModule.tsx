
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Check, Star, Crown, Shield } from 'lucide-react';

interface PricingModuleProps {
  onPlanSelect: (plan: string) => void;
  currentStep?: number;
}

export function PricingModule({ onPlanSelect, currentStep = 1 }: PricingModuleProps) {
  const [selectedPlan, setSelectedPlan] = useState<string>('');

  const plans = [
    {
      id: 'basic',
      name: 'Basic Report',
      price: '€49',
      description: 'Professional valuation report',
      icon: Shield,
      features: [
        'Complete 5-methodology valuation',
        '20+ page professional report',
        'PDF download & sharing',
        'Basic charts & visualizations',
        'Email support'
      ],
      popular: false,
      color: 'border-gray-300'
    },
    {
      id: 'premium',
      name: 'Premium + Review',
      price: '€199',
      description: 'Report + analyst validation',
      icon: Star,
      features: [
        'Everything in Basic Report',
        'Certified analyst review',
        'Market comparison analysis',
        'Investment readiness assessment',
        'Priority support',
        'Revision guarantee'
      ],
      popular: true,
      color: 'border-valoov-orange'
    },
    {
      id: 'enterprise',
      name: 'Enterprise',
      price: '€499',
      description: 'White-label & custom features',
      icon: Crown,
      features: [
        'Everything in Premium',
        'White-label branding',
        'Custom methodology weights',
        'Multiple company valuations',
        'Dedicated account manager',
        'API access'
      ],
      popular: false,
      color: 'border-financial-cyan'
    }
  ];

  const handlePlanSelect = (planId: string) => {
    setSelectedPlan(planId);
    onPlanSelect(planId);
  };

  return (
    <div className="space-y-6 bg-white min-h-screen p-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-slate-800 mb-2">
          Step {currentStep}: Choose Your Valuation Plan
        </h1>
        <p className="text-slate-600">
          Select a plan to generate your professional valuation report
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {plans.map((plan) => {
          const Icon = plan.icon;
          const isSelected = selectedPlan === plan.id;
          
          return (
            <Card 
              key={plan.id}
              className={`bg-white border-2 transition-all cursor-pointer relative shadow-sm ${
                plan.popular ? 'border-valoov-orange scale-105' : 'border-slate-200'
              } ${isSelected ? 'ring-2 ring-valoov-teal' : ''}`}
              onClick={() => handlePlanSelect(plan.id)}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <Badge className="bg-valoov-orange text-white px-4 py-1">
                    Most Popular
                  </Badge>
                </div>
              )}
              
              <CardHeader className="text-center pb-4">
                <div className="flex justify-center mb-4">
                  <div className={`p-3 rounded-full ${
                    plan.popular ? 'bg-valoov-orange' : 'bg-slate-600'
                  }`}>
                    <Icon className="h-6 w-6 text-white" />
                  </div>
                </div>
                <CardTitle className="text-xl text-slate-800">{plan.name}</CardTitle>
                <p className="text-slate-600 text-sm">{plan.description}</p>
                <div className="mt-4">
                  <span className="text-4xl font-bold text-slate-800">{plan.price}</span>
                  <span className="text-slate-600 text-sm ml-1">one-time</span>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <ul className="space-y-3">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-start space-x-2">
                      <Check className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="text-slate-700 text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <Button 
                  className={`w-full ${
                    plan.popular 
                      ? 'bg-valoov-orange hover:bg-valoov-orange/90' 
                      : isSelected
                      ? 'bg-valoov-teal hover:bg-valoov-teal/90'
                      : 'bg-slate-600 hover:bg-slate-500'
                  }`}
                  onClick={() => handlePlanSelect(plan.id)}
                >
                  {isSelected ? 'Selected' : 'Select Plan'}
                </Button>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="bg-slate-50 p-6 rounded-lg border border-slate-200">
        <h3 className="text-lg font-semibold text-slate-800 mb-3">Why Choose VALOOV?</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-slate-700">
          <div className="flex items-center space-x-2">
            <Check className="h-4 w-4 text-green-500" />
            <span>5 Industry-standard methodologies</span>
          </div>
          <div className="flex items-center space-x-2">
            <Check className="h-4 w-4 text-green-500" />
            <span>Investor-ready documentation</span>
          </div>
          <div className="flex items-center space-x-2">
            <Check className="h-4 w-4 text-green-500" />
            <span>Secure data processing</span>
          </div>
          <div className="flex items-center space-x-2">
            <Check className="h-4 w-4 text-green-500" />
            <span>Instant PDF generation</span>
          </div>
        </div>
      </div>
    </div>
  );
}
