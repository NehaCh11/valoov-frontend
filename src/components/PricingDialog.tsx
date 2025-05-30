
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Check, Star, Crown, Shield, X } from 'lucide-react';

interface PricingDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onPlanSelect: (plan: string) => void;
}

export function PricingDialog({ isOpen, onClose, onPlanSelect }: PricingDialogProps) {
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
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle className="text-2xl font-bold text-slate-800">
              Unlock Full Valuation Report
            </DialogTitle>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </div>
          <p className="text-slate-600">
            Choose a plan to download your complete professional valuation report
          </p>
        </DialogHeader>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
          {plans.map((plan) => {
            const Icon = plan.icon;
            const isSelected = selectedPlan === plan.id;
            
            return (
              <Card 
                key={plan.id}
                className={`border-2 transition-all cursor-pointer relative ${
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
      </DialogContent>
    </Dialog>
  );
}
