
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { ChevronRight, CheckCircle, Circle, FileText, Building2, Bot, TrendingUp, Upload } from 'lucide-react';

export function GenerateValuationReport() {
  const [currentStep, setCurrentStep] = useState(1);

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
      title: 'Questionnaire',
      description: '37-question qualitative assessment',
      icon: Bot,
      completed: true
    },
    {
      id: 3,
      title: 'Projections',
      description: '3-year financial forecast',
      icon: TrendingUp,
      completed: false
    },
    {
      id: 4,
      title: 'Upload Docs',
      description: 'Supporting financial documents',
      icon: Upload,
      completed: false
    },
    {
      id: 5,
      title: 'Review & Generate',
      description: 'Final review and report generation',
      icon: FileText,
      completed: false
    }
  ];

  const completedSteps = steps.filter(step => step.completed).length;
  const progressPercentage = (completedSteps / steps.length) * 100;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-white">Generate Valuation Report</h1>
        <p className="text-gray-400 mt-1">Complete all steps to generate your comprehensive valuation report</p>
      </div>

      {/* Progress Overview */}
      <Card className="bg-card/30 backdrop-blur border-border/50">
        <CardHeader>
          <CardTitle>Overall Progress</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Completion Status</span>
              <span className="text-sm text-gray-400">{completedSteps} of {steps.length} steps</span>
            </div>
            <Progress value={progressPercentage} className="h-3" />
            <p className="text-sm text-gray-400">
              Complete all steps to unlock your professional valuation report using 5 industry-standard methodologies
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Steps */}
      <div className="space-y-4">
        {steps.map((step, index) => {
          const Icon = step.icon;
          const isActive = step.id === currentStep;
          
          return (
            <Card 
              key={step.id} 
              className={`bg-card/30 backdrop-blur border-border/50 transition-all cursor-pointer ${
                isActive ? 'ring-2 ring-valoov-teal' : ''
              }`}
              onClick={() => setCurrentStep(step.id)}
            >
              <CardContent className="p-6">
                <div className="flex items-center space-x-4">
                  <div className={`p-3 rounded-full ${
                    step.completed ? 'bg-green-600' : 
                    isActive ? 'bg-valoov-teal' : 'bg-gray-600'
                  }`}>
                    {step.completed ? (
                      <CheckCircle className="h-6 w-6 text-white" />
                    ) : (
                      <Icon className="h-6 w-6 text-white" />
                    )}
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center space-x-2">
                      <h3 className="text-lg font-semibold text-white">
                        Step {step.id}: {step.title}
                      </h3>
                      {step.completed && (
                        <Badge className="bg-green-600">Complete</Badge>
                      )}
                      {isActive && !step.completed && (
                        <Badge className="bg-valoov-orange">Current</Badge>
                      )}
                    </div>
                    <p className="text-gray-400">{step.description}</p>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    {step.completed ? (
                      <Button variant="outline" size="sm">
                        Review
                      </Button>
                    ) : isActive ? (
                      <Button className="bg-valoov-teal hover:bg-valoov-teal/90" size="sm">
                        Continue
                      </Button>
                    ) : (
                      <Button variant="ghost" size="sm" disabled>
                        <Circle className="h-4 w-4" />
                      </Button>
                    )}
                    <ChevronRight className="h-4 w-4 text-gray-400" />
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Final Generation Card */}
      {completedSteps === steps.length && (
        <Card className="bg-gradient-to-r from-valoov-teal/20 to-valoov-orange/20 border-valoov-teal/30">
          <CardContent className="p-6 text-center">
            <h3 className="text-xl font-bold text-white mb-2">Ready to Generate Report!</h3>
            <p className="text-gray-300 mb-4">
              All steps completed. Generate your professional valuation report using 5 industry-standard methodologies.
            </p>
            <div className="space-y-3">
              <Button className="bg-valoov-teal hover:bg-valoov-teal/90 text-lg px-8 py-3">
                Generate Valuation Report
              </Button>
              <div className="text-sm text-gray-400">
                <p>✓ Uses 5 industry-standard methodologies</p>
                <p>Optional: Request Analyst Review (+€199)</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
