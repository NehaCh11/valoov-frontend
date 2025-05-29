
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { TrendingUp, FileText, Calculator, BarChart3 } from 'lucide-react';

export function ValuationOverview() {
  const methodsProgress = [
    { name: 'Scorecard Method', progress: 100, weight: 25 },
    { name: 'Checklist Method', progress: 100, weight: 20 },
    { name: 'DCF/LTG', progress: 75, weight: 20 },
    { name: 'DCF w/ Multiple', progress: 0, weight: 20 },
    { name: 'Venture Capital Method', progress: 0, weight: 15 },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Valuation Overview</h1>
          <p className="text-gray-400 mt-1">Comprehensive view of your valuation process</p>
        </div>
        <Button className="bg-valoov-teal hover:bg-valoov-teal/90">
          <Calculator className="h-4 w-4 mr-2" />
          Continue Valuation
        </Button>
      </div>

      {/* Current Valuation Range */}
      <Card className="bg-card/30 backdrop-blur border-border/50">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <TrendingUp className="h-5 w-5 text-valoov-orange" />
            <span>Current Valuation Range</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-6">
            <p className="text-4xl font-bold text-white mb-2">€2.8M - €4.2M</p>
            <p className="text-gray-400">Pre-Money Valuation</p>
            <Badge className="mt-3 bg-valoov-teal/20 text-valoov-teal border-valoov-teal/30">
              65% Complete
            </Badge>
          </div>
        </CardContent>
      </Card>

      {/* Method Breakdown */}
      <Card className="bg-card/30 backdrop-blur border-border/50">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <BarChart3 className="h-5 w-5 text-financial-cyan" />
            <span>Valuation Methods Progress</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {methodsProgress.map((method, index) => (
              <div key={index} className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-medium text-white">{method.name}</span>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-gray-400">{method.weight}% weight</span>
                    <Badge 
                      variant={method.progress === 100 ? 'default' : method.progress > 0 ? 'secondary' : 'outline'}
                      className={
                        method.progress === 100 ? 'bg-green-600' :
                        method.progress > 0 ? 'bg-yellow-600' : ''
                      }
                    >
                      {method.progress}%
                    </Badge>
                  </div>
                </div>
                <Progress value={method.progress} className="h-2" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Next Steps */}
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
              <span className="text-white">Complete Financial Projections</span>
              <Button size="sm" className="bg-valoov-orange hover:bg-valoov-orange/90">
                Continue
              </Button>
            </div>
            <div className="flex items-center justify-between p-3 bg-card/20 rounded-lg">
              <span className="text-white">Upload Supporting Documents</span>
              <Button size="sm" variant="outline">
                Start
              </Button>
            </div>
            <div className="flex items-center justify-between p-3 bg-card/20 rounded-lg">
              <span className="text-white">Review & Generate Report</span>
              <Button size="sm" variant="outline" disabled>
                Pending
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
