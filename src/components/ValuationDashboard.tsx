
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { TrendingUp, FileText, Building2, Calculator, DollarSign, BarChart3 } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';

export function ValuationDashboard() {
  const valuationMethods = [
    { name: 'Scorecard Method', weight: 25, status: 'completed' },
    { name: 'Checklist Method', weight: 20, status: 'completed' },
    { name: 'DCF/LTG', weight: 20, status: 'in-progress' },
    { name: 'DCF w/ Multiple', weight: 20, status: 'pending' },
    { name: 'Venture Capital Method', weight: 15, status: 'pending' },
  ];

  const methodsBreakdownData = [
    { name: 'Scorecard', value: 3762247, percentage: 25 },
    { name: 'Checklist', value: 4639414, percentage: 20 },
    { name: 'DCF/LTG', value: 5426348, percentage: 20 },
    { name: 'DCF Multiple', value: 10694367, percentage: 20 },
    { name: 'VC Method', value: 11940096, percentage: 15 },
  ];

  const COLORS = ['#06b6d4', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-black">Valuation Dashboard</h1>
          <p className="text-gray-600 mt-1">Track your company valuation progress</p>
        </div>
        <Button className="bg-valoov-teal hover:bg-valoov-teal/90">
          <Calculator className="h-4 w-4 mr-2" />
          Start New Valuation
        </Button>
      </div>

      {/* Pre-money Valuation and Methods Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Pre-money Valuation */}
        <Card className="bg-card/30 backdrop-blur border-border/50">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <DollarSign className="h-5 w-5 text-valoov-teal" />
              <span>Pre-money Valuation</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="relative">
              <div className="text-center mb-4">
                <p className="text-3xl font-bold text-valoov-teal">€ 9,940,096</p>
                <p className="text-sm text-gray-600 mt-1">Pre-money Valuation</p>
              </div>
              <div className="relative h-48 flex items-center justify-center">
                <div className="relative w-40 h-40">
                  <div className="absolute inset-0 rounded-full border-8 border-gray-200"></div>
                  <div 
                    className="absolute inset-0 rounded-full border-8 border-valoov-teal"
                    style={{
                      borderTopColor: 'transparent',
                      borderRightColor: 'transparent',
                      borderBottomColor: 'transparent',
                      transform: 'rotate(270deg)',
                      borderRadius: '50%',
                      clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)'
                    }}
                  ></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <p className="text-sm text-gray-600">Capital needed</p>
                      <p className="text-xl font-bold text-black">€ 2M</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="text-center mt-4">
                <p className="text-sm text-gray-600">Low bound</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Methods Breakdown */}
        <Card className="bg-card/30 backdrop-blur border-border/50">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <BarChart3 className="h-5 w-5 text-valoov-orange" />
              <span>Methods Breakdown</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={methodsBreakdownData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis 
                    dataKey="name" 
                    stroke="#9ca3af" 
                    fontSize={10}
                    angle={-45}
                    textAnchor="end"
                    height={60}
                  />
                  <YAxis 
                    stroke="#9ca3af"
                    fontSize={10}
                    tickFormatter={(value) => `${(value / 1000000).toFixed(0)}M`}
                  />
                  <Tooltip 
                    formatter={(value) => [`€${Number(value).toLocaleString()}`, 'Valuation']}
                    contentStyle={{ 
                      backgroundColor: '#1f2937', 
                      border: '1px solid #374151',
                      borderRadius: '8px',
                      color: '#fff'
                    }}
                  />
                  <Bar dataKey="value" fill="#06b6d4" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
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
              <p className="text-sm text-gray-600">Company Name</p>
              <p className="font-semibold text-black">TechCorp Solutions</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Industry</p>
              <p className="font-semibold text-black">Financial Technology</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Type</p>
              <p className="font-semibold text-black">Startup</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Country</p>
              <p className="font-semibold text-black">Spain</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Founded</p>
              <p className="font-semibold text-black">2020</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Stage</p>
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
                <span className="text-sm font-medium text-black">Overall Progress</span>
                <span className="text-sm text-gray-600">65%</span>
              </div>
              <Progress value={65} className="h-2 mb-4" />
              
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-black">Company Info</span>
                  <Badge variant="default" className="bg-green-600">Complete</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-black">Questionnaire</span>
                  <Badge variant="default" className="bg-green-600">Complete</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-black">Financial Projections</span>
                  <Badge variant="default" className="bg-yellow-600">In Progress</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-black">Document Upload</span>
                  <Badge variant="outline">Pending</Badge>
                </div>
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold text-black mb-4">Current Valuation Range</h4>
              <div className="bg-gradient-to-r from-valoov-teal/20 to-valoov-orange/20 p-4 rounded-lg">
                <div className="text-center">
                  <p className="text-2xl font-bold text-black">€2.8M - €4.2M</p>
                  <p className="text-sm text-gray-600 mt-1">Pre-Money Valuation</p>
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
                  <span className="font-medium text-black">{method.name}</span>
                </div>
                <div className="flex items-center space-x-4">
                  <span className="text-sm text-gray-600">{method.weight}% weight</span>
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
