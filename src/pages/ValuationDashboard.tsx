/**
 * Valuation Dashboard Page
 * 
 * Main dashboard showing valuation overview, charts, and key metrics.
 * Features:
 * - Valuation range display
 * - Interactive charts (pie chart, bar chart)
 * - Key metrics cards
 * - Quick access to questionnaire
 */

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { TrendingUp, FileText, Building2, Calculator, DollarSign, BarChart3 } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import ChatbotQuestionnaire from '@/pages/ChatbotQuestionnaire';

const ValuationDashboard = () => {
  const [isQuestionnaireOpen, setIsQuestionnaireOpen] = useState(false);

  const valuationData = [
    { name: 'Scorecard Method', value: 2.5, color: '#8b5cf6' },
    { name: 'DCF Method', value: 3.2, color: '#06b6d4' },
    { name: 'Market Comp', value: 2.8, color: '#f59e0b' },
    { name: 'VC Method', value: 2.1, color: '#ef4444' },
  ];

  const trendData = [
    { month: 'Jan', value: 2.1 },
    { month: 'Feb', value: 2.3 },
    { month: 'Mar', value: 2.5 },
    { month: 'Apr', value: 2.8 },
    { month: 'May', value: 3.0 },
    { month: 'Jun', value: 3.2 },
  ];

  const COLORS = ['#8b5cf6', '#06b6d4', '#f59e0b', '#ef4444'];

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-black">Valuation Dashboard</h1>
          <p className="text-gray-600 mt-1">Real-time overview of your company valuation</p>
        </div>
        <Dialog open={isQuestionnaireOpen} onOpenChange={setIsQuestionnaireOpen}>
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

      {/* Key Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-card/30 backdrop-blur border-border/50">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-black">Current Valuation</CardTitle>
            <TrendingUp className="h-4 w-4 text-valoov-orange" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-black">€2.8M</div>
            <p className="text-xs text-gray-600">
              +12% from last month
            </p>
          </CardContent>
        </Card>

        <Card className="bg-card/30 backdrop-blur border-border/50">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-black">Confidence Score</CardTitle>
            <BarChart3 className="h-4 w-4 text-financial-cyan" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-black">87%</div>
            <p className="text-xs text-gray-600">
              High confidence level
            </p>
          </CardContent>
        </Card>

        <Card className="bg-card/30 backdrop-blur border-border/50">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-black">Methods Used</CardTitle>
            <Building2 className="h-4 w-4 text-valoov-teal" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-black">4</div>
            <p className="text-xs text-gray-600">
              Industry standard methods
            </p>
          </CardContent>
        </Card>

        <Card className="bg-card/30 backdrop-blur border-border/50">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-black">Last Updated</CardTitle>
            <FileText className="h-4 w-4 text-gray-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-black">Today</div>
            <p className="text-xs text-gray-600">
              Real-time data
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Valuation Methods Breakdown */}
        <Card className="bg-card/30 backdrop-blur border-border/50">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <BarChart3 className="h-5 w-5 text-financial-cyan" />
              <span>Valuation Methods</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={valuationData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, value }) => `${name}: €${value}M`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {valuationData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Valuation Trend */}
        <Card className="bg-card/30 backdrop-blur border-border/50">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <TrendingUp className="h-5 w-5 text-valoov-orange" />
              <span>6-Month Trend</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={trendData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" fill="#06b6d4" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card className="bg-card/30 backdrop-blur border-border/50">
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button variant="outline" className="h-20 flex flex-col space-y-2">
              <FileText className="h-6 w-6" />
              <span>Generate Report</span>
            </Button>
            <Button variant="outline" className="h-20 flex flex-col space-y-2">
              <TrendingUp className="h-6 w-6" />
              <span>Update Projections</span>
            </Button>
            <Button variant="outline" className="h-20 flex flex-col space-y-2">
              <DollarSign className="h-6 w-6" />
              <span>Export Data</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ValuationDashboard;
