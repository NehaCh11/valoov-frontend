
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { FileText, Download, Eye, BarChart3, PieChart, AlertTriangle, Star, Lock } from 'lucide-react';

interface ValuationReportProps {
  hasPaidAccess?: boolean;
}

export function ValuationReport({ hasPaidAccess = false }: ValuationReportProps) {
  const [showFullReport, setShowFullReport] = useState(hasPaidAccess);

  const valuationMethods = [
    { name: 'Scorecard Method', value: '€3.2M', weight: '25%', status: 'complete' },
    { name: 'Checklist Method', value: '€3.8M', weight: '20%', status: 'complete' },
    { name: 'DCF/LTG', value: '€4.1M', weight: '20%', status: 'complete' },
    { name: 'DCF w/ Multiple', value: '€3.5M', weight: '20%', status: 'complete' },
    { name: 'Venture Capital Method', value: '€2.9M', weight: '15%', status: 'complete' },
  ];

  if (!showFullReport) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-slate-800">Valuation Report</h1>
          <p className="text-slate-600 mt-1">Purchase required to access the complete report</p>
        </div>

        {/* Access Required Notice */}
        <Card className="bg-gradient-to-r from-red-900/20 to-orange-900/20 border-red-500/30">
          <CardContent className="p-6 text-center">
            <div className="flex items-center justify-center mb-4">
              <Lock className="h-12 w-12 text-red-400" />
            </div>
            <h3 className="text-2xl font-bold text-slate-800 mb-2">Premium Report Access Required</h3>
            <p className="text-slate-600 mb-6">
              To view the complete valuation report, you need to purchase one of our professional packages.
              This ensures you receive a comprehensive, investor-ready valuation document.
            </p>
            <Button 
              className="bg-valoov-orange hover:bg-valoov-orange/90 text-lg px-8 py-3"
              onClick={() => window.location.href = '/#/generate-report'}
            >
              Purchase Valuation Report
            </Button>
          </CardContent>
        </Card>

        {/* Preview Card */}
        <Card className="bg-card/30 backdrop-blur border-border/50">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Eye className="h-5 w-5 text-valoov-teal" />
              <span className="text-slate-800">Limited Preview</span>
              <Badge className="bg-valoov-orange/20 text-valoov-orange border-valoov-orange/30">
                Preview Only
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {/* Valuation Summary */}
              <div className="text-center p-6 bg-gradient-to-r from-valoov-teal/20 to-valoov-orange/20 rounded-lg">
                <h3 className="text-xl font-semibold text-slate-800 mb-2">Company Valuation Range</h3>
                <p className="text-3xl font-bold text-slate-800">€2.8M - €4.2M</p>
                <p className="text-slate-600 mt-1">Pre-Money Valuation</p>
              </div>

              {/* Limited Method Preview */}
              <div className="space-y-3">
                <h4 className="font-semibold text-slate-800">Valuation Methods (Preview)</h4>
                {valuationMethods.slice(0, 2).map((method, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-card/20 rounded-lg">
                    <span className="text-slate-800">{method.name}</span>
                    <div className="flex items-center space-x-2">
                      <span className="font-semibold text-valoov-teal">{method.value}</span>
                      <span className="text-sm text-slate-600">({method.weight})</span>
                    </div>
                  </div>
                ))}
                <div className="p-4 bg-card/10 rounded-lg border-2 border-dashed border-gray-600 text-center">
                  <Lock className="h-8 w-8 mx-auto mb-2 text-gray-400" />
                  <p className="text-gray-400">+ 3 more valuation methods</p>
                  <p className="text-sm text-gray-500">Available in full report</p>
                </div>
              </div>

              {/* Blur Overlay Effect */}
              <div className="relative">
                <div className="filter blur-sm opacity-50">
                  <h4 className="font-semibold text-slate-800 mb-3">Detailed Analysis</h4>
                  <div className="space-y-2">
                    <div className="h-4 bg-gray-600 rounded w-full"></div>
                    <div className="h-4 bg-gray-600 rounded w-3/4"></div>
                    <div className="h-4 bg-gray-600 rounded w-1/2"></div>
                  </div>
                </div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <Badge className="bg-red-600 px-4 py-2">
                    <Lock className="h-4 w-4 mr-2" />
                    Purchase Required
                  </Badge>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Upgrade Prompt */}
        <Card className="bg-gradient-to-r from-valoov-teal/20 to-valoov-orange/20 border-valoov-teal/30">
          <CardContent className="p-6 text-center">
            <div className="flex items-center justify-center mb-4">
              <Star className="h-8 w-8 text-valoov-orange mr-2" />
              <h3 className="text-2xl font-bold text-slate-800">Unlock Full Valuation Report</h3>
            </div>
            <p className="text-slate-600 mb-6">
              Get access to the complete 20+ page professional valuation report with all 5 methodologies, 
              detailed analysis, charts, and investor-ready documentation.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="text-center">
                <h4 className="font-semibold text-slate-800">Professional Report</h4>
                <p className="text-3xl font-bold text-valoov-teal">€49</p>
                <p className="text-sm text-slate-600">One-time payment</p>
              </div>
              <div className="text-center border border-valoov-orange rounded-lg p-4">
                <Badge className="bg-valoov-orange mb-2">Most Popular</Badge>
                <h4 className="font-semibold text-slate-800">Pro + Analyst Review</h4>
                <p className="text-3xl font-bold text-valoov-orange">€199</p>
                <p className="text-sm text-slate-600">Professional validation</p>
              </div>
              <div className="text-center">
                <h4 className="font-semibold text-slate-800">Enterprise</h4>
                <p className="text-3xl font-bold text-financial-cyan">€499</p>
                <p className="text-sm text-slate-600">White-label options</p>
              </div>
            </div>
            <Button 
              className="bg-valoov-orange hover:bg-valoov-orange/90 text-lg px-8 py-3"
              onClick={() => window.location.href = '/#/generate-report'}
            >
              Purchase Full Report Access
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-800">Valuation Report</h1>
          <p className="text-slate-600 mt-1">Complete professional valuation analysis</p>
        </div>
        <div className="flex items-center space-x-3">
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export PDF
          </Button>
          {!hasPaidAccess && (
            <Button 
              variant="ghost" 
              onClick={() => setShowFullReport(false)}
            >
              Back to Preview
            </Button>
          )}
        </div>
      </div>

      {/* Valuation Summary Header */}
      <Card className="bg-card/30 backdrop-blur border-border/50">
        <CardContent className="p-6">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-slate-800 mb-2">TechCorp Solutions</h2>
            <div className="flex items-center justify-center space-x-4 mb-4">
              <Badge className="bg-valoov-teal/20 text-valoov-teal border-valoov-teal/30">
                Series A Startup
              </Badge>
              <Badge variant="outline">FinTech</Badge>
              <Badge variant="outline">Spain</Badge>
            </div>
            <div className="bg-gradient-to-r from-valoov-teal/20 to-valoov-orange/20 p-6 rounded-lg">
              <p className="text-4xl font-bold text-slate-800">€3.5M</p>
              <p className="text-slate-600">Weighted Average Pre-Money Valuation</p>
              <p className="text-sm text-slate-500 mt-2">Range: €2.8M - €4.2M</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tabbed Report Content */}
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="methods">Method Breakdown</TabsTrigger>
          <TabsTrigger value="charts">Charts & Visuals</TabsTrigger>
          <TabsTrigger value="disclaimers">Disclaimers</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <Card className="bg-card/30 backdrop-blur border-border/50">
            <CardHeader>
              <CardTitle className="text-slate-800">Executive Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-slate-700 leading-relaxed">
                This valuation report provides a comprehensive analysis of TechCorp Solutions using five 
                industry-standard methodologies. The company operates in the Financial Technology sector 
                with a focus on B2B SaaS solutions. Based on current market conditions, financial projections, 
                and qualitative factors, the weighted average valuation is €3.5M.
              </p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="methods" className="space-y-4">
          <Card className="bg-card/30 backdrop-blur border-border/50">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <BarChart3 className="h-5 w-5 text-financial-cyan" />
                <span className="text-slate-800">Detailed Method Breakdown</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {valuationMethods.map((method, index) => (
                  <div key={index} className="p-4 bg-card/20 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold text-slate-800">{method.name}</h4>
                      <div className="flex items-center space-x-2">
                        <span className="text-xl font-bold text-valoov-teal">{method.value}</span>
                        <Badge variant="outline">{method.weight}</Badge>
                      </div>
                    </div>
                    <p className="text-sm text-slate-600">
                      Detailed methodology explanation and calculations would be shown here.
                    </p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="charts" className="space-y-4">
          <Card className="bg-card/30 backdrop-blur border-border/50">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <PieChart className="h-5 w-5 text-valoov-orange" />
                <span className="text-slate-800">Visual Analysis</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <p className="text-slate-600">Interactive charts and graphs would be displayed here</p>
                <p className="text-sm text-slate-500 mt-2">Including method weightings, trend analysis, and market comparisons</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="disclaimers" className="space-y-4">
          <Card className="bg-card/30 backdrop-blur border-border/50">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <AlertTriangle className="h-5 w-5 text-yellow-500" />
                <span className="text-slate-800">Legal Disclaimers</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4 text-sm text-slate-700">
                <p>
                  This valuation report is prepared for informational purposes only and should not be considered 
                  as investment advice or a recommendation to buy or sell securities.
                </p>
                <p>
                  The valuation estimates are based on information provided by the company and publicly available 
                  market data. Actual transaction values may differ significantly from these estimates.
                </p>
                <p>
                  VALOOV disclaims any liability for decisions made based on this report. Users should consult 
                  with qualified financial advisors before making investment decisions.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
