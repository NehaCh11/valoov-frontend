import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { TrendingUp, FileText, Building2, Calculator, DollarSign, BarChart3 } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import ChatbotQuestionnaire from '@/pages/ChatbotQuestionnaire';

export function ValuationDashboard() {
  const [isQuestionnaireOpen, setIsQuestionnaireOpen] = useState(false);

  const valuationMethods = [
    { name: 'Scorecard Method', weight: 6, status: 'completed' },
    { name: 'Checklist Method', weight: 6, status: 'completed' },
    { name: 'DCF/LTG', weight: 16, status: 'in-progress' },
    { name: 'DCF w/ Multiple', weight: 36, status: 'pending' },
    { name: 'Venture Capital Method', weight: 36, status: 'pending' },
  ];

  const methodsBreakdownData = [
    { name: 'Scorecard', value: 3762247, weight: 6 },
    { name: 'Check-List', value: 4639414, weight: 6 },
    { name: 'Venture Capital', value: 5426838, weight: 16 },
    { name: 'DCF Long Term Growth', value: 10603457, weight: 36 },
    { name: 'DCF with Multiples', value: 13195718, weight: 36 },
  ];

  const COLORS = ['#06b6d4', '#06b6d4', '#06b6d4', '#06b6d4', '#06b6d4'];

  // Calculate percentage for the circular chart (capital needed / pre-money valuation)
  const capitalNeeded = 2000000; // €2M
  const premoneyValuation = 9940096; // €9,940,096
  const percentage = (capitalNeeded / premoneyValuation) * 100;

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-black">Valuation Dashboard</h1>
          <p className="text-sm text-gray-600 mt-1">Track your company valuation progress</p>
        </div>
        <Dialog open={isQuestionnaireOpen} onOpenChange={setIsQuestionnaireOpen}>
          <DialogTrigger asChild>
            <Button className="bg-valoov-teal hover:bg-valoov-teal/90 text-sm">
              <Calculator className="h-4 w-4 mr-2" />
              Start New Valuation
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>AI Valuation Questionnaire</DialogTitle>
            </DialogHeader>
            <ChatbotQuestionnaire />
          </DialogContent>
        </Dialog>
      </div>

      {/* Pre-money Valuation and Methods Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Pre-money Valuation */}
        <Card className="bg-card/30 backdrop-blur border-border/50">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg text-slate-800">Pre-money Valuation</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {/* Main valuation display */}
              <div className="text-center">
                <p className="text-sm text-gray-600 mb-1">Pre-money Valuation</p>
                <p className="text-2xl font-bold text-valoov-teal">€ 9,940,096</p>
              </div>

              {/* Circular Progress Chart */}
              <div className="flex justify-center">
                <div className="relative w-32 h-32">
                  <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 120 120">
                    {/* Background circle */}
                    <circle
                      cx="60"
                      cy="60"
                      r="54"
                      stroke="#e5e7eb"
                      strokeWidth="8"
                      fill="transparent"
                    />
                    {/* Progress arc */}
                    <circle
                      cx="60"
                      cy="60"
                      r="54"
                      stroke="#06b6d4"
                      strokeWidth="8"
                      fill="transparent"
                      strokeDasharray={`${(percentage / 100) * 339.292} 339.292`}
                      strokeLinecap="round"
                    />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <p className="text-xs text-gray-600">Capital needed</p>
                    <p className="text-lg font-bold text-black">€ 2M</p>
                    <p className="text-sm font-bold text-valoov-teal">{percentage.toFixed(2)}%</p>
                  </div>
                </div>
              </div>

              {/* Bounds */}
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Low bound</span>
                  <span className="text-sm font-semibold text-black">€9,053,000</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">High bound</span>
                  <span className="text-sm font-semibold text-black">€10,827,000</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Methods Breakdown */}
        <Card className="bg-card/30 backdrop-blur border-border/50">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg text-slate-800">Methods Breakdown</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {/* Bar Chart */}
              <div className="h-48">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={methodsBreakdownData} margin={{ top: 10, right: 10, left: 10, bottom: 40 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                    <XAxis 
                      dataKey="name" 
                      stroke="#6b7280" 
                      fontSize={10}
                      angle={-45}
                      textAnchor="end"
                      height={60}
                      interval={0}
                    />
                    <YAxis 
                      stroke="#6b7280"
                      fontSize={10}
                      tickFormatter={(value) => `${(value / 1000000).toFixed(0)}M`}
                    />
                    <Tooltip 
                      formatter={(value) => [`€${Number(value).toLocaleString()}`, 'Valuation']}
                      contentStyle={{ 
                        backgroundColor: '#ffffff', 
                        border: '1px solid #e5e7eb',
                        borderRadius: '8px',
                        color: '#374151',
                        fontSize: '12px'
                      }}
                    />
                    <Bar dataKey="value" fill="#06b6d4" radius={[2, 2, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              {/* Weight of the methods */}
              <div>
                <div className="flex justify-between items-center mb-3">
                  <h4 className="text-sm font-semibold text-slate-800">Weight of the methods</h4>
                  <button className="text-xs text-gray-500 hover:text-gray-700">CUSTOMIZE ↗</button>
                </div>
                
                <div className="flex justify-between">
                  {methodsBreakdownData.map((method, index) => (
                    <div key={index} className="flex flex-col items-center">
                      <div className="relative w-12 h-12 mb-1">
                        <svg className="w-12 h-12 transform -rotate-90" viewBox="0 0 48 48">
                          <circle
                            cx="24"
                            cy="24"
                            r="20"
                            stroke="#e5e7eb"
                            strokeWidth="4"
                            fill="transparent"
                          />
                          <circle
                            cx="24"
                            cy="24"
                            r="20"
                            stroke="#06b6d4"
                            strokeWidth="4"
                            fill="transparent"
                            strokeDasharray={`${(method.weight / 100) * 125.664} 125.664`}
                            strokeLinecap="round"
                          />
                        </svg>
                        <div className="absolute inset-0 flex items-center justify-center">
                          <span className="text-xs font-bold text-black">{method.weight}%</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Company Static Data */}
      <Card className="bg-card/30 backdrop-blur border-border/50">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center space-x-2 text-lg">
            <Building2 className="h-4 w-4 text-valoov-teal" />
            <span className="text-slate-800">About Company</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div>
              <p className="text-xs text-gray-600">Company Name</p>
              <p className="text-sm font-semibold text-black">TechCorp Solutions</p>
            </div>
            <div>
              <p className="text-xs text-gray-600">Industry</p>
              <p className="text-sm font-semibold text-black">Financial Technology</p>
            </div>
            <div>
              <p className="text-xs text-gray-600">Type</p>
              <p className="text-sm font-semibold text-black">Startup</p>
            </div>
            <div>
              <p className="text-xs text-gray-600">Country</p>
              <p className="text-sm font-semibold text-black">Spain</p>
            </div>
            <div>
              <p className="text-xs text-gray-600">Founded</p>
              <p className="text-sm font-semibold text-black">2020</p>
            </div>
            <div>
              <p className="text-xs text-gray-600">Stage</p>
              <Badge variant="outline" className="bg-valoov-teal/20 text-valoov-teal border-valoov-teal/30 text-xs">
                Series A
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Valuation Engine Status */}
      <Card className="bg-card/30 backdrop-blur border-border/50">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center space-x-2 text-lg">
            <TrendingUp className="h-4 w-4 text-valoov-orange" />
            <span className="text-slate-800">Valuation Engine Status</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-black">Overall Progress</span>
                <span className="text-sm text-gray-600">65%</span>
              </div>
              <Progress value={65} className="h-2 mb-3" />
              
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-black">Company Info</span>
                  <Badge variant="default" className="bg-green-600 text-xs">Complete</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-black">Questionnaire</span>
                  <Badge variant="default" className="bg-green-600 text-xs">Complete</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-black">Financial Projections</span>
                  <Badge variant="default" className="bg-yellow-600 text-xs">In Progress</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-black">Document Upload</span>
                  <Badge variant="outline" className="text-xs">Pending</Badge>
                </div>
              </div>
            </div>
            
            <div>
              <h4 className="text-sm font-semibold text-black mb-3">Current Valuation Range</h4>
              <div className="bg-gradient-to-r from-valoov-teal/20 to-valoov-orange/20 p-3 rounded-lg">
                <div className="text-center">
                  <p className="text-xl font-bold text-black">€2.8M - €4.2M</p>
                  <p className="text-xs text-gray-600 mt-1">Pre-Money Valuation</p>
                </div>
              </div>
              <Button className="w-full mt-3 bg-valoov-orange hover:bg-valoov-orange/90 text-sm">
                View Detailed Valuation
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Method Breakdown */}
      <Card className="bg-card/30 backdrop-blur border-border/50">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center space-x-2 text-lg">
            <FileText className="h-4 w-4 text-financial-cyan" />
            <span className="text-slate-800">5 Valuation Methodologies</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {valuationMethods.map((method, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-card/20 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 rounded-full bg-valoov-teal"></div>
                  <span className="text-sm font-medium text-black">{method.name}</span>
                </div>
                <div className="flex items-center space-x-4">
                  <span className="text-xs text-gray-600">{method.weight}% weight</span>
                  <Badge 
                    variant={method.status === 'completed' ? 'default' : method.status === 'in-progress' ? 'secondary' : 'outline'}
                    className={`text-xs ${
                      method.status === 'completed' ? 'bg-green-600' :
                      method.status === 'in-progress' ? 'bg-yellow-600' : ''
                    }`}
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
