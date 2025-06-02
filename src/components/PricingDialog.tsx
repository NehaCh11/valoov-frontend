
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Check, Star, Crown, Shield, X, Mail } from 'lucide-react';

interface PricingDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onPlanSelect: (plan: string) => void;
}

export function PricingDialog({ isOpen, onClose, onPlanSelect }: PricingDialogProps) {
  const [selectedPlan, setSelectedPlan] = useState<string>('');

  const plans = [
    {
      id: 'single',
      name: 'Per Report',
      price: '$400',
      description: 'One professional valuation report',
      icon: Shield,
      features: [
        '1 valuation report included',
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
      id: 'multiple',
      name: 'Up to 5 Reports',
      price: '$1,200',
      description: 'Multiple reports with savings',
      icon: Star,
      features: [
        'Up to 5 valuation reports',
        'Complete 5-methodology valuation',
        '20+ page professional reports',
        'PDF download & sharing',
        'Advanced charts & visualizations',
        'Priority email support',
        'Bulk report management'
      ],
      popular: true,
      color: 'border-valoov-orange'
    },
    {
      id: 'custom',
      name: 'Custom Plan',
      price: 'Contact Us',
      description: 'Tailored solution for your needs',
      icon: Crown,
      features: [
        'Custom report quantity',
        'White-label branding options',
        'Custom methodology weights',
        'Dedicated account manager',
        'API access (if needed)',
        'Custom integrations',
        'Enterprise support'
      ],
      popular: false,
      color: 'border-financial-cyan'
    }
  ];

  const handlePlanSelect = (planId: string) => {
    setSelectedPlan(planId);
    if (planId === 'custom') {
      // For custom plan, we could open a contact form or redirect
      window.open('mailto:contact@valoov.com?subject=Custom Plan Inquiry', '_blank');
      return;
    }
    onPlanSelect(planId);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle className="text-2xl font-bold text-slate-800">
              Choose Your Valuation Plan
            </DialogTitle>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </div>
          <p className="text-slate-600">
            Select a plan to generate your professional valuation reports
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
                      plan.popular ? 'bg-valoov-orange' : plan.id === 'custom' ? 'bg-financial-cyan' : 'bg-slate-600'
                    }`}>
                      <Icon className="h-6 w-6 text-white" />
                    </div>
                  </div>
                  <CardTitle className="text-xl text-slate-800">{plan.name}</CardTitle>
                  <p className="text-slate-600 text-sm">{plan.description}</p>
                  <div className="mt-4">
                    <span className="text-4xl font-bold text-slate-800">{plan.price}</span>
                    {plan.id !== 'custom' && (
                      <span className="text-slate-600 text-sm ml-1">one-time</span>
                    )}
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
                      plan.id === 'custom'
                        ? 'bg-financial-cyan hover:bg-financial-cyan/90'
                        : plan.popular 
                        ? 'bg-valoov-orange hover:bg-valoov-orange/90' 
                        : isSelected
                        ? 'bg-valoov-teal hover:bg-valoov-teal/90'
                        : 'bg-slate-600 hover:bg-slate-500'
                    }`}
                    onClick={() => handlePlanSelect(plan.id)}
                  >
                    {plan.id === 'custom' ? (
                      <div className="flex items-center space-x-2">
                        <Mail className="h-4 w-4" />
                        <span>Contact Us</span>
                      </div>
                    ) : isSelected ? 'Selected' : 'Select Plan'}
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
