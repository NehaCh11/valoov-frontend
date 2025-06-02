
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { FileText, Download, Lock } from 'lucide-react';
import { PricingDialog } from './PricingDialog';

interface ValuationReportProps {
  hasPaidAccess?: boolean;
}

export function ValuationReport({ hasPaidAccess = false }: ValuationReportProps) {
  const [showPricingDialog, setShowPricingDialog] = useState(false);

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
          <p className="text-slate-600 mt-1">Benchmarked Business Valuation</p>
        </div>
        <div className="flex items-center space-x-3">
          <Button onClick={handleDownloadClick} className="bg-blue-600 hover:bg-blue-700">
            <Download className="h-4 w-4 mr-2" />
            Download PDF Report
          </Button>
        </div>
      </div>

      {/* PDF Preview Section */}
      <Card className="bg-white border-slate-200">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <FileText className="h-5 w-5 text-blue-600" />
            <span className="text-slate-800">Report Preview</span>
            {!hasPaidAccess && (
              <Badge className="bg-orange-100 text-orange-700 border-orange-200">
                Preview Only
              </Badge>
            )}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-8">
            {/* Page 1 - Cover Page - Numbers Hidden */}
            <div className="border border-gray-300 rounded-lg overflow-hidden bg-white shadow-sm p-8 min-h-[700px]">
              <div className="text-center space-y-8">
                {/* Header Logo Area */}
                <div className="mb-12">
                  <div className="w-16 h-16 bg-blue-600 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <span className="text-white font-bold text-xl">E</span>
                  </div>
                  <h1 className="text-2xl font-bold text-gray-800">BENCHMARKED</h1>
                  <h2 className="text-3xl font-bold text-gray-800 mb-2">VALUATION REPORT</h2>
                </div>

                {/* Company Info Box - Numbers Hidden */}
                <div className="bg-gray-50 p-8 rounded-lg mx-auto max-w-md">
                  <h3 className="text-xl font-bold text-gray-800 mb-6">InnovateTech Solutions</h3>
                  <div className="space-y-3 text-left">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Industry:</span>
                      <span className="text-gray-800 font-medium">SaaS - B2B Software</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Stage:</span>
                      <span className="text-gray-800 font-medium">Series A</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Revenue:</span>
                      <span className="text-gray-800 font-medium filter blur-sm">€•.•M ARR</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Employees:</span>
                      <span className="text-gray-800 font-medium filter blur-sm">••-••</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Location:</span>
                      <span className="text-gray-800 font-medium">Berlin, Germany</span>
                    </div>
                  </div>
                </div>

                {/* Bottom Info */}
                <div className="mt-16">
                  <p className="text-gray-600 mb-2">Valuation Date: December 2024</p>
                  <p className="text-gray-600 mb-8">Report prepared by Equidam</p>
                  
                  <div className="border-t border-gray-200 pt-4">
                    <p className="text-sm text-gray-500">This report contains confidential and proprietary information.</p>
                    <p className="text-sm text-gray-500">Distribution is restricted to authorized parties only.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Page 2 - Executive Summary - All Numbers Hidden */}
            <div className="border border-gray-300 rounded-lg overflow-hidden bg-white shadow-sm p-8 min-h-[700px]">
              <h2 className="text-2xl font-bold text-gray-800 mb-8 border-b border-gray-200 pb-4">EXECUTIVE SUMMARY</h2>
              
              {/* Valuation Box - Numbers Hidden */}
              <div className="bg-blue-50 border border-blue-200 p-6 rounded-lg mb-8 text-center">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">COMPANY VALUATION</h3>
                <p className="text-4xl font-bold text-blue-600 mb-2 filter blur-sm">€•,•••,•••</p>
                <p className="text-gray-600">Pre-money valuation (most likely scenario)</p>
              </div>

              {/* Valuation Range - Numbers Hidden */}
              <div className="grid grid-cols-3 gap-4 mb-8">
                <div className="text-center p-4 bg-gray-50 rounded">
                  <p className="text-xl font-bold text-gray-800 filter blur-sm">€•,•••,•••</p>
                  <p className="text-sm text-gray-600">Conservative</p>
                </div>
                <div className="text-center p-4 bg-blue-50 rounded border border-blue-200">
                  <p className="text-xl font-bold text-blue-600 filter blur-sm">€•,•••,•••</p>
                  <p className="text-sm text-gray-600">Most Likely</p>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded">
                  <p className="text-xl font-bold text-gray-800 filter blur-sm">€•,•••,•••</p>
                  <p className="text-sm text-gray-600">Optimistic</p>
                </div>
              </div>

              {/* Key Metrics - Numbers Hidden */}
              <div className="space-y-6">
                <div>
                  <h4 className="font-semibold text-gray-800 mb-3">KEY BUSINESS METRICS</h4>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Annual Recurring Revenue:</span>
                      <span className="font-medium filter blur-sm">€•.•M</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Revenue Growth (YoY):</span>
                      <span className="font-medium filter blur-sm">•••%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Gross Margin:</span>
                      <span className="font-medium filter blur-sm">••%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Customer Acquisition Cost:</span>
                      <span className="font-medium filter blur-sm">€•••</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Monthly Churn Rate:</span>
                      <span className="font-medium filter blur-sm">•.•%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Lifetime Value:</span>
                      <span className="font-medium filter blur-sm">€••,•••</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-800 mb-3">METHODOLOGY OVERVIEW</h4>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    This valuation was conducted using five industry-standard methodologies: 
                    Scorecard Method, Checklist Method, Discounted Cash Flow with Long-term Growth, 
                    DCF with Market Multiple, and Venture Capital Method. Each method was weighted 
                    based on its applicability to the company's stage and industry characteristics.
                  </p>
                </div>
              </div>
            </div>

            {/* Page 3 - Valuation Methods - Numbers Hidden */}
            <div className="border border-gray-300 rounded-lg overflow-hidden bg-white shadow-sm p-8 min-h-[700px]">
              <h2 className="text-2xl font-bold text-gray-800 mb-8 border-b border-gray-200 pb-4">VALUATION METHODOLOGIES</h2>
              
              <div className="space-y-6">
                <div className="bg-white border border-gray-200 rounded-lg p-6">
                  <div className="flex justify-between items-center mb-4">
                    <div>
                      <h4 className="text-lg font-semibold text-gray-800">Scorecard Method</h4>
                      <p className="text-sm text-gray-600">Risk-adjusted pre-money valuation</p>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-blue-600 filter blur-sm">€•,•••,•••</p>
                      <p className="text-sm text-gray-600 filter blur-sm">Weight: ••%</p>
                    </div>
                  </div>
                  <div className="text-sm text-gray-600">
                    <p>Based on comparison with similar companies in the same region, stage, and industry, 
                    adjusted for management quality, market opportunity, product/technology, and competitive environment.</p>
                  </div>
                </div>

                <div className="bg-white border border-gray-200 rounded-lg p-6">
                  <div className="flex justify-between items-center mb-4">
                    <div>
                      <h4 className="text-lg font-semibold text-gray-800">Checklist Method</h4>
                      <p className="text-sm text-gray-600">Qualitative risk assessment</p>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-blue-600 filter blur-sm">€•,•••,•••</p>
                      <p className="text-sm text-gray-600 filter blur-sm">Weight: ••%</p>
                    </div>
                  </div>
                  <div className="text-sm text-gray-600">
                    <p>Systematic evaluation of company-specific risk factors including management team, 
                    market size, product differentiation, and financial performance.</p>
                  </div>
                </div>

                <div className="bg-white border border-gray-200 rounded-lg p-6">
                  <div className="flex justify-between items-center mb-4">
                    <div>
                      <h4 className="text-lg font-semibold text-gray-800">DCF / Long-term Growth</h4>
                      <p className="text-sm text-gray-600">Discounted cash flow with terminal value</p>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-blue-600 filter blur-sm">€•,•••,•••</p>
                      <p className="text-sm text-gray-600 filter blur-sm">Weight: ••%</p>
                    </div>
                  </div>
                  <div className="text-sm text-gray-600">
                    <p>5-year financial projections discounted at ••% WACC with •% terminal growth rate, 
                    based on market expansion and customer acquisition projections.</p>
                  </div>
                </div>

                <div className="bg-white border border-gray-200 rounded-lg p-6">
                  <div className="flex justify-between items-center mb-4">
                    <div>
                      <h4 className="text-lg font-semibold text-gray-800">DCF with Market Multiple</h4>
                      <p className="text-sm text-gray-600">DCF with industry exit multiple</p>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-blue-600 filter blur-sm">€•,•••,•••</p>
                      <p className="text-sm text-gray-600 filter blur-sm">Weight: ••%</p>
                    </div>
                  </div>
                  <div className="text-sm text-gray-600">
                    <p>Cash flow projections with terminal value based on industry average 
                    revenue multiple of •.•x for B2B SaaS companies.</p>
                  </div>
                </div>

                <div className="bg-white border border-gray-200 rounded-lg p-6">
                  <div className="flex justify-between items-center mb-4">
                    <div>
                      <h4 className="text-lg font-semibold text-gray-800">Venture Capital Method</h4>
                      <p className="text-sm text-gray-600">Return-based valuation</p>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-blue-600 filter blur-sm">€•,•••,•••</p>
                      <p className="text-sm text-gray-600 filter blur-sm">Weight: ••%</p>
                    </div>
                  </div>
                  <div className="text-sm text-gray-600">
                    <p>Based on expected exit value of €••M in • years with ••x target return, 
                    accounting for dilution through future funding rounds.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Locked/Blurred Content Preview */}
            {!hasPaidAccess && (
              <>
                {/* Page 4 - Blurred Market Analysis */}
                <div className="relative border border-gray-300 rounded-lg overflow-hidden">
                  <div className="filter blur-sm bg-white p-8 opacity-50 min-h-[600px]">
                    <h2 className="text-2xl font-bold text-gray-800 mb-6">MARKET ANALYSIS</h2>
                    <div className="space-y-4">
                      <div className="h-6 bg-gray-300 rounded w-full"></div>
                      <div className="h-6 bg-gray-300 rounded w-3/4"></div>
                      <div className="h-32 bg-gray-200 rounded mt-6"></div>
                      <div className="grid grid-cols-2 gap-4 mt-4">
                        <div className="h-20 bg-gray-200 rounded"></div>
                        <div className="h-20 bg-gray-200 rounded"></div>
                      </div>
                    </div>
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="bg-white p-8 rounded-lg shadow-lg text-center border-2 border-orange-300 max-w-md">
                      <Lock className="h-12 w-12 mx-auto mb-4 text-orange-500" />
                      <h3 className="text-xl font-bold text-gray-800 mb-2">Unlock Full Report</h3>
                      <p className="text-gray-600 mb-4">
                        Get access to the complete 15+ page report including:
                      </p>
                      <ul className="text-sm text-gray-600 text-left mb-6 space-y-1">
                        <li>• Detailed market analysis & sizing</li>
                        <li>• Competitive landscape assessment</li>
                        <li>• Financial projections & scenarios</li>
                        <li>• Risk analysis & recommendations</li>
                        <li>• Investment readiness evaluation</li>
                      </ul>
                      <Button 
                        className="bg-orange-500 hover:bg-orange-600 w-full"
                        onClick={handleDownloadClick}
                      >
                        View Pricing Options
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Additional blurred pages preview */}
                <div className="grid grid-cols-2 gap-4">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="border border-gray-300 rounded-lg overflow-hidden filter blur-sm opacity-30">
                      <div className="bg-white p-6 min-h-[300px]">
                        <div className="h-4 bg-gray-300 rounded w-3/4 mb-4"></div>
                        <div className="h-24 bg-gray-200 rounded mb-4"></div>
                        <div className="space-y-2">
                          <div className="h-3 bg-gray-300 rounded w-full"></div>
                          <div className="h-3 bg-gray-300 rounded w-2/3"></div>
                          <div className="h-3 bg-gray-300 rounded w-4/5"></div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}

            {hasPaidAccess && (
              <div className="text-center p-8 bg-green-50 rounded-lg">
                <div className="flex items-center justify-center space-x-2 mb-4">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <p className="font-semibold text-green-800">Full Report Access Granted</p>
                </div>
                <p className="text-green-700">
                  You have access to the complete professional valuation report.
                </p>
              </div>
            )}

            {!hasPaidAccess && (
              <div className="text-center p-6 bg-blue-50 rounded-lg border-2 border-dashed border-blue-300">
                <p className="text-gray-700 mb-4">
                  <strong>Preview shows 3 of 15+ pages.</strong> Purchase full access to download the complete professional report.
                </p>
                <Button 
                  onClick={handleDownloadClick}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  Download Complete Report
                </Button>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Pricing Dialog */}
      <PricingDialog
        isOpen={showPricingDialog}
        onClose={() => setShowPricingDialog(false)}
        onPlanSelect={handlePlanSelect}
      />
    </div>
  );
}
