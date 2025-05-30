import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { FileText, Download, Eye, BarChart3, PieChart, AlertTriangle, Star, Lock } from 'lucide-react';
import { PricingDialog } from './PricingDialog';

interface ValuationReportProps {
  hasPaidAccess?: boolean;
}

export function ValuationReport({ hasPaidAccess = false }: ValuationReportProps) {
  const [showPricingDialog, setShowPricingDialog] = useState(false);

  const valuationMethods = [
    { name: 'Scorecard Method', value: '€3.2M', weight: '25%', status: 'complete' },
    { name: 'Checklist Method', value: '€3.8M', weight: '20%', status: 'complete' },
    { name: 'DCF/LTG', value: '€4.1M', weight: '20%', status: 'complete' },
    { name: 'DCF w/ Multiple', value: '€3.5M', weight: '20%', status: 'complete' },
    { name: 'Venture Capital Method', value: '€2.9M', weight: '15%', status: 'complete' },
  ];

  const handleDownloadClick = () => {
    if (!hasPaidAccess) {
      setShowPricingDialog(true);
    } else {
      // Handle actual download
      console.log('Downloading full report...');
    }
  };

  const handlePlanSelect = (plan: string) => {
    console.log('Selected plan:', plan);
    // Handle plan selection and payment
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-800">Valuation Report</h1>
          <p className="text-slate-600 mt-1">Professional valuation analysis preview</p>
        </div>
        <div className="flex items-center space-x-3">
          <Button onClick={handleDownloadClick}>
            <Download className="h-4 w-4 mr-2" />
            {hasPaidAccess ? 'Download PDF' : 'Unlock Full Report'}
          </Button>
        </div>
      </div>

      {/* PDF Preview Section */}
      <Card className="bg-card/30 backdrop-blur border-border/50">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <FileText className="h-5 w-5 text-valoov-teal" />
            <span className="text-slate-800">Report Preview</span>
            {!hasPaidAccess && (
              <Badge className="bg-valoov-orange/20 text-valoov-orange border-valoov-orange/30">
                Preview Only
              </Badge>
            )}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {/* Placeholder for PDF pages - will be replaced when you provide the sample */}
            <div className="border border-gray-300 rounded-lg overflow-hidden">
              {/* Page 1 - Visible */}
              <div className="bg-white p-8 border-b">
                <div className="text-center mb-6">
                  <h2 className="text-2xl font-bold text-slate-800 mb-2">VALUATION REPORT</h2>
                  <h3 className="text-xl text-slate-700">TechCorp Solutions</h3>
                  <p className="text-slate-600">Professional Business Valuation</p>
                </div>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="font-semibold text-slate-800">Company:</p>
                    <p className="text-slate-700">TechCorp Solutions</p>
                  </div>
                  <div>
                    <p className="font-semibold text-slate-800">Industry:</p>
                    <p className="text-slate-700">Financial Technology</p>
                  </div>
                  <div>
                    <p className="font-semibold text-slate-800">Valuation Date:</p>
                    <p className="text-slate-700">December 2024</p>
                  </div>
                  <div>
                    <p className="font-semibold text-slate-800">Report Type:</p>
                    <p className="text-slate-700">Pre-Money Valuation</p>
                  </div>
                </div>
              </div>

              {/* Page 2 - Visible */}
              <div className="bg-white p-8 border-b">
                <h3 className="text-lg font-bold text-slate-800 mb-4">Executive Summary</h3>
                <div className="space-y-4 text-sm text-slate-700">
                  <p>
                    This valuation report provides a comprehensive analysis of TechCorp Solutions 
                    using five industry-standard methodologies.
                  </p>
                  <div className="bg-gradient-to-r from-valoov-teal/20 to-valoov-orange/20 p-4 rounded-lg text-center">
                    <p className="text-2xl font-bold text-slate-800">€3.5M</p>
                    <p className="text-slate-600">Weighted Average Valuation</p>
                  </div>
                </div>
              </div>

              {/* Blurred pages if no access */}
              {!hasPaidAccess && (
                <div className="relative">
                  <div className="filter blur-sm bg-white p-8 opacity-50">
                    <h3 className="text-lg font-bold text-slate-800 mb-4">Detailed Methodology</h3>
                    <div className="space-y-3">
                      <div className="h-4 bg-gray-300 rounded w-full"></div>
                      <div className="h-4 bg-gray-300 rounded w-3/4"></div>
                      <div className="h-4 bg-gray-300 rounded w-1/2"></div>
                      <div className="h-20 bg-gray-200 rounded mt-4"></div>
                    </div>
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="bg-white p-6 rounded-lg shadow-lg text-center border-2 border-valoov-orange">
                      <Lock className="h-8 w-8 mx-auto mb-2 text-valoov-orange" />
                      <p className="font-semibold text-slate-800 mb-2">Unlock Full Report</p>
                      <p className="text-sm text-slate-600 mb-4">15+ additional pages with detailed analysis</p>
                      <Button 
                        className="bg-valoov-orange hover:bg-valoov-orange/90"
                        onClick={handleDownloadClick}
                      >
                        View Pricing
                      </Button>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {!hasPaidAccess && (
              <div className="text-center p-4 bg-slate-50 rounded-lg">
                <p className="text-sm text-slate-600">
                  This is a preview of your valuation report. Purchase a plan to download the complete 20+ page document.
                </p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Existing tabbed content */}
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

      {/* Pricing Dialog */}
      <PricingDialog
        isOpen={showPricingDialog}
        onClose={() => setShowPricingDialog(false)}
        onPlanSelect={handlePlanSelect}
      />
    </div>
  );
}
