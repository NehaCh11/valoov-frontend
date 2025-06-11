/**
 * Valuation Report Page
 * 
 * Displays the comprehensive valuation report with:
 * - Report history section at the top
 * - Detailed valuation analysis
 * - Multiple methodology results
 * - Export and sharing options
 */

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { FileText, Download, Share2, TrendingUp, BarChart3, DollarSign, Calendar, Eye, Archive } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, LineChart, Line } from 'recharts';

const ValuationReport = () => {
  // Mock data for report history
  const reportHistory = [
    {
      id: 1,
      name: 'Q4 2024 Valuation Report',
      date: '2024-12-15',
      status: 'completed',
      valuation: '€3.2M',
      type: 'Full Report'
    },
    {
      id: 2,
      name: 'Mid-Year Review 2024',
      date: '2024-06-30',
      status: 'completed',
      valuation: '€2.8M',
      type: 'Premium'
    },
    {
      id: 3,
      name: 'Initial Valuation 2024',
      date: '2024-01-15',
      status: 'archived',
      valuation: '€2.1M',
      type: 'Basic'
    }
  ];

  // Mock data for valuation methods
  const valuationMethodsData = [
    { name: 'Scorecard Method', value: 2500000, weight: 25, confidence: 85 },
    { name: 'DCF Method', value: 3200000, weight: 30, confidence: 90 },
    { name: 'Market Comparables', value: 2800000, weight: 25, confidence: 75 },
    { name: 'VC Method', value: 2100000, weight: 20, confidence: 80 },
  ];

  // Mock data for valuation trend
  const valuationTrendData = [
    { period: 'Q1 2023', valuation: 1.8 },
    { period: 'Q2 2023', valuation: 2.2 },
    { period: 'Q3 2023', valuation: 2.5 },
    { period: 'Q4 2023', valuation: 2.8 },
    { period: 'Q1 2024', valuation: 2.9 },
    { period: 'Q2 2024', valuation: 3.1 },
    { period: 'Q3 2024', valuation: 3.0 },
    { period: 'Q4 2024', valuation: 3.2 },
  ];

  const valuationMethods = [
    { name: 'Scorecard Method', value: 3200000, weight: 25, confidence: 85 },
    { name: 'DCF Method', value: 3500000, weight: 30, confidence: 90 },
    { name: 'Market Comparables', value: 2800000, weight: 25, confidence: 75 },
    { name: 'VC Method', value: 3000000, weight: 20, confidence: 80 },
  ];

  const chartData = valuationMethods.map(method => ({
    name: method.name,
    value: method.value / 1000000,
    weight: method.weight,
    confidence: method.confidence
  }));

  const trendData = [
    { period: 'Q1 2024', valuation: 2.1 },
    { period: 'Q2 2024', valuation: 2.5 },
    { period: 'Q3 2024', valuation: 2.8 },
    { period: 'Q4 2024', valuation: 3.2 },
  ];

  const COLORS = ['#8b5cf6', '#06b6d4', '#f59e0b', '#ef4444'];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-600';
      case 'archived': return 'bg-gray-600';
      default: return 'bg-blue-600';
    }
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-black">Valuation Report</h1>
          <p className="text-gray-600 mt-1">Comprehensive analysis of your company valuation</p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline">
            <Share2 className="h-4 w-4 mr-2" />
            Share
          </Button>
          <Button className="bg-valoov-teal hover:bg-valoov-teal/90">
            <Download className="h-4 w-4 mr-2" />
            Export PDF
          </Button>
        </div>
      </div>

      {/* Report History Section */}
      <Card className="bg-card/30 backdrop-blur border-border/50">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Archive className="h-5 w-5 text-valoov-teal" />
            <span>Report History</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {reportHistory.map((report) => (
              <div key={report.id} className="flex items-center justify-between p-4 bg-card/20 rounded-lg border border-border/30">
                <div className="flex items-center space-x-4">
                  <FileText className="h-8 w-8 text-gray-600" />
                  <div>
                    <h3 className="font-semibold text-black">{report.name}</h3>
                    <div className="flex items-center space-x-3 mt-1">
                      <span className="text-sm text-gray-600 flex items-center">
                        <Calendar className="h-3 w-3 mr-1" />
                        {new Date(report.date).toLocaleDateString()}
                      </span>
                      <Badge className={getStatusColor(report.status)}>
                        {report.status}
                      </Badge>
                      <span className="text-sm font-medium text-valoov-orange">{report.type}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="text-right">
                    <p className="text-lg font-bold text-black">{report.valuation}</p>
                    <p className="text-sm text-gray-600">Valuation</p>
                  </div>
                  <div className="flex space-x-2">
                    <Button size="sm" variant="outline">
                      <Eye className="h-3 w-3 mr-1" />
                      View
                    </Button>
                    <Button size="sm" variant="outline">
                      <Download className="h-3 w-3 mr-1" />
                      Download
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Current Report Content */}
      <Tabs defaultValue="summary" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="summary">Executive Summary</TabsTrigger>
          <TabsTrigger value="methods">Methodology</TabsTrigger>
          <TabsTrigger value="analysis">Detailed Analysis</TabsTrigger>
          <TabsTrigger value="trends">Historical Trends</TabsTrigger>
        </TabsList>

        <TabsContent value="summary" className="space-y-6">
          {/* Executive Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="bg-card/30 backdrop-blur border-border/50">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <DollarSign className="h-5 w-5 text-valoov-orange" />
                  <span>Final Valuation</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center">
                  <p className="text-3xl font-bold text-black">€3.2M</p>
                  <p className="text-gray-600">Pre-Money Valuation</p>
                  <Badge className="mt-2 bg-green-600">High Confidence</Badge>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card/30 backdrop-blur border-border/50">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <TrendingUp className="h-5 w-5 text-financial-cyan" />
                  <span>Growth Rate</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center">
                  <p className="text-3xl font-bold text-black">+52%</p>
                  <p className="text-gray-600">YoY Growth</p>
                  <Badge className="mt-2 bg-valoov-teal/20 text-valoov-teal border-valoov-teal/30">
                    Above Market
                  </Badge>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card/30 backdrop-blur border-border/50">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <BarChart3 className="h-5 w-5 text-valoov-teal" />
                  <span>Risk Score</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center">
                  <p className="text-3xl font-bold text-black">Medium</p>
                  <Progress value={65} className="mt-2" />
                  <p className="text-sm text-gray-600 mt-1">Investment Grade</p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Valuation Breakdown Chart */}
          <Card className="bg-card/30 backdrop-blur border-border/50">
            <CardHeader>
              <CardTitle>Valuation Method Breakdown</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <PieChart>
                  <Pie
                    data={chartData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, value }) => `${name}: €${value.toFixed(1)}M`}
                    outerRadius={120}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {chartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="methods" className="space-y-6">
          {/* Methodology Details */}
          <div className="space-y-4">
            {valuationMethods.map((method, index) => (
              <Card key={index} className="bg-card/30 backdrop-blur border-border/50">
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span>{method.name}</span>
                    <Badge className="bg-valoov-teal/20 text-valoov-teal border-valoov-teal/30">
                      {method.weight}% Weight
                    </Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <p className="text-sm text-gray-600">Valuation</p>
                      <p className="text-xl font-bold text-black">
                        €{(method.value / 1000000).toFixed(1)}M
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Confidence</p>
                      <div className="flex items-center space-x-2">
                        <Progress value={method.confidence} className="flex-1" />
                        <span className="text-sm font-medium">{method.confidence}%</span>
                      </div>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Weight</p>
                      <div className="flex items-center space-x-2">
                        <Progress value={method.weight * 4} className="flex-1" />
                        <span className="text-sm font-medium">{method.weight}%</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="analysis" className="space-y-6">
          {/* Detailed Analysis Content */}
          <Card className="bg-card/30 backdrop-blur border-border/50">
            <CardHeader>
              <CardTitle>Market Analysis</CardTitle>
            </CardHeader>
            <CardContent className="prose prose-sm max-w-none">
              <p className="text-gray-700">
                Based on comprehensive market analysis and financial projections, your company demonstrates strong growth potential 
                with revenue projections showing consistent upward trajectory. The valuation reflects current market conditions 
                and industry benchmarks.
              </p>
              <h4 className="font-semibold text-black mt-4">Key Findings:</h4>
              <ul className="text-gray-700">
                <li>Strong revenue growth trajectory (+52% YoY)</li>
                <li>Competitive market position</li>
                <li>Solid financial fundamentals</li>
                <li>Experienced management team</li>
              </ul>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="trends" className="space-y-6">
          {/* Historical Trends Chart */}
          <Card className="bg-card/30 backdrop-blur border-border/50">
            <CardHeader>
              <CardTitle>Valuation Trend Analysis</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <LineChart data={trendData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="period" />
                  <YAxis />
                  <Tooltip />
                  <Line 
                    type="monotone" 
                    dataKey="valuation" 
                    stroke="#06b6d4" 
                    strokeWidth={3}
                    dot={{ fill: '#06b6d4', strokeWidth: 2, r: 6 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ValuationReport;
