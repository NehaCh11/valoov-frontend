
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { TrendingUp, FileText, Building2, Calculator } from 'lucide-react';

export function ValuationDashboard() {
  const valuationMethods = [
    { name: 'Scorecard Method', weight: 25, status: 'completed' },
    { name: 'Checklist Method', weight: 20, status: 'completed' },
    { name: 'DCF/LTG', weight: 20, status: 'in-progress' },
    { name: 'DCF w/ Multiple', weight: 20, status: 'pending' },
    { name: 'Venture Capital Method', weight: 15, status: 'pending' },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Valuation Dashboard</h1>
          <p className="text-gray-400 mt-1">Track your company valuation progress</p>
        </div>
        <Button className="bg-valoov-teal hover:bg-valoov-teal/90">
          <Calculator className="h-4 w-4 mr-2" />
          Start New Valuation
        </Button>
      </div>

      {/* Company Static Data */}
      <Card className="bg-card/30 backdrop-blur border-border/50">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Building2 className="h-5 w-5 text-valoov-teal" />
            <span>About Company</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <p className="text-sm text-gray-400">Company Name</p>
              <p className="font-semibold text-white">TechCorp Solutions</p>
            </div>
            <div>
              <p className="text-sm text-gray-400">Industry</p>
              <p className="font-semibold text-white">Financial Technology</p>
            </div>
            <div>
              <p className="text-sm text-gray-400">Type</p>
              <p className="font-semibold text-white">Startup</p>
            </div>
            <div>
              <p className="text-sm text-gray-400">Country</p>
              <p className="font-semibold text-white">Spain</p>
            </div>
            <div>
              <p className="text-sm text-gray-400">Founded</p>
              <p className="font-semibold text-white">2020</p>
            </div>
            <div>
              <p className="text-sm text-gray-400">Stage</p>
              <Badge variant="outline" className="bg-valoov-teal/20 text-valoov-teal border-valoov-teal/30">
                Series A
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Valuation Engine Status */}
      <Card className="bg-card/30 backdrop-blur border-border/50">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <TrendingUp className="h-5 w-5 text-valoov-orange" />
            <span>Valuation Engine Status</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">Overall Progress</span>
                <span className="text-sm text-gray-400">65%</span>
              </div>
              <Progress value={65} className="h-2 mb-4" />
              
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Company Info</span>
                  <Badge variant="default" className="bg-green-600">Complete</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Questionnaire</span>
                  <Badge variant="default" className="bg-green-600">Complete</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Financial Projections</span>
                  <Badge variant="default" className="bg-yellow-600">In Progress</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Document Upload</span>
                  <Badge variant="outline">Pending</Badge>
                </div>
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold text-white mb-4">Current Valuation Range</h4>
              <div className="bg-gradient-to-r from-valoov-teal/20 to-valoov-orange/20 p-4 rounded-lg">
                <div className="text-center">
                  <p className="text-2xl font-bold text-white">€2.8M - €4.2M</p>
                  <p className="text-sm text-gray-400 mt-1">Pre-Money Valuation</p>
                </div>
              </div>
              <Button className="w-full mt-4 bg-valoov-orange hover:bg-valoov-orange/90">
                View Detailed Valuation
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Method Breakdown */}
      <Card className="bg-card/30 backdrop-blur border-border/50">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <FileText className="h-5 w-5 text-financial-cyan" />
            <span>5 Valuation Methodologies</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {valuationMethods.map((method, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-card/20 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 rounded-full bg-valoov-teal"></div>
                  <span className="font-medium text-white">{method.name}</span>
                </div>
                <div className="flex items-center space-x-4">
                  <span className="text-sm text-gray-400">{method.weight}% weight</span>
                  <Badge 
                    variant={method.status === 'completed' ? 'default' : method.status === 'in-progress' ? 'secondary' : 'outline'}
                    className={
                      method.status === 'completed' ? 'bg-green-600' :
                      method.status === 'in-progress' ? 'bg-yellow-600' : ''
                    }
                  >
                    {method.status === 'completed' ? 'Complete' :
                     method.status === 'in-progress' ? 'In Progress' : 'Pending'}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
