
/**
 * Generate Valuation Report Page
 * 
 * This page displays the step-by-step progress for generating a valuation report.
 * Features:
 * - Progress tracking for all valuation steps
 * - Step completion status visualization
 * - Report generation functionality
 * - Plan selection and billing integration
 * - Payment processing workflow
 * 
 * Steps:
 * 1. Company Info - Basic company information setup
 * 2. Upload Docs - Supporting financial documents
 * 3. Questionnaire - 37-question qualitative assessment
 * 4. Projections - 3-year financial forecast
 * 5. Generate Report - Create professional valuation
 * 6. Choose Plan - Select valuation package
 */

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { ChevronRight, CheckCircle, Circle, FileText, Building2, Bot, TrendingUp, Upload, CreditCard } from 'lucide-react';
import { PricingModule } from '@/components/PricingModule';
import { BillingForm } from '@/components/BillingForm';

export function GenerateValuationReport() {
  // State management for report generation flow
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedPlan, setSelectedPlan] = useState<string>('');
  const [showBilling, setShowBilling] = useState(false);
  const [paymentCompleted, setPaymentCompleted] = useState(false);
  const [reportGenerated, setReportGenerated] = useState(false);

  // Step configuration with completion status
  const steps = [
    {
      id: 1,
      title: 'Company Info',
      description: 'Basic company information and setup',
      icon: Building2,
      completed: true
    },
    {
      id: 2,
      title: 'Upload Docs',
      description: 'Supporting financial documents',
      icon: Upload,
      completed: true
    },
    {
      id: 3,
      title: 'Questionnaire',
      description: '37-question qualitative assessment',
      icon: Bot,
      completed: true
    },
    {
      id: 4,
      title: 'Projections',
      description: '3-year financial forecast',
      icon: TrendingUp,
      completed: true
    },
    {
      id: 5,
      title: 'Generate Report',
      description: 'Create professional valuation',
      icon: FileText,
      completed: reportGenerated
    },
    {
      id: 6,
      title: 'Choose Plan',
      description: 'Select valuation package',
      icon: CreditCard,
      completed: paymentCompleted
    }
  ];

  // Calculate completion progress
  const completedSteps = steps.filter(step => step.completed).length;
  const progressPercentage = (completedSteps / steps.length) * 100;

  // Available pricing plans
  const plans = {
    basic: { name: 'Basic Report', price: '€49', id: 'basic' },
    premium: { name: 'Premium + Review', price: '€199', id: 'premium' },
    enterprise: { name: 'Enterprise', price: '€499', id: 'enterprise' }
  };

  /**
   * Handles plan selection and navigates to billing
   */
  const handlePlanSelect = (planId: string) => {
    setSelectedPlan(planId);
    setShowBilling(true);
  };

  /**
   * Handles payment completion
   */
  const handlePaymentComplete = () => {
    setPaymentCompleted(true);
    setShowBilling(false);
  };

  /**
   * Generates the valuation report
   */
  const handleGenerateReport = () => {
    setReportGenerated(true);
    setCurrentStep(6);
  };

  // Show billing form if a plan is selected
  if (showBilling && selectedPlan) {
    return (
      <BillingForm
        selectedPlan={plans[selectedPlan as keyof typeof plans]}
        onBack={() => setShowBilling(false)}
        onPayment={handlePaymentComplete}
      />
    );
  }

  // Show pricing module if step 6 is active and payment not completed
  if (currentStep === 6 && !paymentCompleted) {
    return (
      <PricingModule 
        onPlanSelect={handlePlanSelect}
        currentStep={6}
      />
    );
  }

  return (
    <div className="space-y-6 bg-white min-h-screen p-6">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold text-slate-800">Generate Valuation Report</h1>
        <p className="text-slate-600 mt-1">Complete all steps to generate your comprehensive valuation report</p>
      </div>

      {/* Progress Overview Card */}
      <Card className="bg-white border-slate-200 shadow-sm">
        <CardHeader>
          <CardTitle className="text-slate-800">Overall Progress</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-slate-800">Completion Status</span>
              <span className="text-sm text-slate-600">{completedSteps} of {steps.length} steps</span>
            </div>
            <Progress value={progressPercentage} className="h-3" />
            <p className="text-sm text-slate-600">
              Complete all steps to unlock your professional valuation report using 5 industry-standard methodologies
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Step Cards */}
      <div className="space-y-4">
        {steps.map((step, index) => {
          const Icon = step.icon;
          const isActive = step.id === currentStep;
          
          return (
            <Card 
              key={step.id} 
              className={`bg-white border-slate-200 transition-all cursor-pointer shadow-sm ${
                isActive ? 'ring-2 ring-valoov-teal' : ''
              }`}
              onClick={() => {
                if (step.id === 5 && !reportGenerated) {
                  setCurrentStep(5);
                } else if (step.id === 6 && reportGenerated && !paymentCompleted) {
                  setCurrentStep(6);
                } else if (step.completed || step.id <= 4) {
                  setCurrentStep(step.id);
                }
              }}
            >
              <CardContent className="p-6">
                <div className="flex items-center space-x-4">
                  {/* Step Icon */}
                  <div className={`p-3 rounded-full ${
                    step.completed ? 'bg-green-600' : 
                    isActive ? 'bg-valoov-teal' : 'bg-slate-600'
                  }`}>
                    {step.completed ? (
                      <CheckCircle className="h-6 w-6 text-white" />
                    ) : (
                      <Icon className="h-6 w-6 text-white" />
                    )}
                  </div>
                  
                  {/* Step Content */}
                  <div className="flex-1">
                    <div className="flex items-center space-x-2">
                      <h3 className="text-lg font-semibold text-slate-800">
                        Step {step.id}: {step.title}
                      </h3>
                      {step.completed && (
                        <Badge className="bg-green-600">Complete</Badge>
                      )}
                      {isActive && !step.completed && (
                        <Badge className="bg-valoov-orange">Current</Badge>
                      )}
                    </div>
                    <p className="text-slate-600">{step.description}</p>
                  </div>
                  
                  {/* Step Actions */}
                  <div className="flex items-center space-x-2">
                    {step.completed ? (
                      <Button variant="outline" size="sm">
                        Review
                      </Button>
                    ) : step.id === 5 && !reportGenerated ? (
                      <Button 
                        className="bg-valoov-teal hover:bg-valoov-teal/90" 
                        size="sm"
                        onClick={handleGenerateReport}
                      >
                        Generate
                      </Button>
                    ) : step.id === 6 && reportGenerated && !paymentCompleted ? (
                      <Button 
                        className="bg-valoov-orange hover:bg-valoov-orange/90" 
                        size="sm"
                        onClick={() => setCurrentStep(6)}
                      >
                        Choose Plan
                      </Button>
                    ) : (
                      <Button variant="ghost" size="sm" disabled>
                        <Circle className="h-4 w-4" />
                      </Button>
                    )}
                    <ChevronRight className="h-4 w-4 text-slate-400" />
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Report Generated Success Card */}
      {reportGenerated && !paymentCompleted && currentStep === 6 && (
        <Card className="bg-gradient-to-r from-valoov-teal/20 to-valoov-orange/20 border-valoov-teal/30">
          <CardContent className="p-6 text-center">
            <h3 className="text-xl font-bold text-slate-800 mb-2">Report Generated Successfully!</h3>
            <p className="text-slate-700 mb-4">
              Your valuation report has been created. Choose a plan to download the complete professional report.
            </p>
            <div className="space-y-3">
              <Button 
                className="bg-valoov-orange hover:bg-valoov-orange/90 text-lg px-8 py-3"
                onClick={() => setCurrentStep(6)}
              >
                Choose Download Plan
              </Button>
              <div className="text-sm text-slate-600">
                <p>✓ Report generated using 5 industry-standard methodologies</p>
                <p>✓ All data processed and ready for download</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Final Completion Card */}
      {paymentCompleted && (
        <Card className="bg-gradient-to-r from-green-100 to-blue-100 border-green-300">
          <CardContent className="p-6 text-center">
            <h3 className="text-xl font-bold text-slate-800 mb-2">All Steps Complete!</h3>
            <p className="text-slate-700 mb-4">
              Payment confirmed. Your professional valuation report is ready for download.
            </p>
            <div className="space-y-3">
              <Button className="bg-green-600 hover:bg-green-700 text-lg px-8 py-3">
                Download Full Report
              </Button>
              <div className="text-sm text-slate-600">
                <p>✓ Payment confirmed - {selectedPlan ? plans[selectedPlan as keyof typeof plans].name : 'Plan selected'}</p>
                <p>✓ Complete access to professional valuation report</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
