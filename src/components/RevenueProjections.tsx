
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { TrendingUp, Calculator, DollarSign } from 'lucide-react';

interface YearlyProjection {
  year: number;
  revenue: number;
  growth: number;
  expenses: number;
  netIncome: number;
}

const RevenueProjections = () => {
  const [currentRevenue, setCurrentRevenue] = useState<string>('');
  const [projections, setProjections] = useState<YearlyProjection[]>([]);
  const [isGenerated, setIsGenerated] = useState(false);

  const generateProjections = () => {
    if (!currentRevenue || parseFloat(currentRevenue) <= 0) return;

    const baseRevenue = parseFloat(currentRevenue);
    const newProjections: YearlyProjection[] = [];

    // Generate 5-year projections with varying growth rates
    const growthRates = [0.25, 0.20, 0.18, 0.15, 0.12]; // Decreasing growth rate over time
    
    for (let i = 0; i < 5; i++) {
      const year = new Date().getFullYear() + i + 1;
      const prevRevenue = i === 0 ? baseRevenue : newProjections[i - 1].revenue;
      const growth = growthRates[i];
      const revenue = prevRevenue * (1 + growth);
      const expenses = revenue * 0.7; // Assume 70% expense ratio
      const netIncome = revenue - expenses;

      newProjections.push({
        year,
        revenue: Math.round(revenue),
        growth: growth * 100,
        expenses: Math.round(expenses),
        netIncome: Math.round(netIncome)
      });
    }

    setProjections(newProjections);
    setIsGenerated(true);
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const calculateDCF = () => {
    if (projections.length === 0) return 0;

    const discountRate = 0.10; // 10% discount rate (WACC)
    const terminalGrowthRate = 0.03; // 3% terminal growth rate
    
    let dcfValue = 0;

    // Calculate present value of projected cash flows
    projections.forEach((projection, index) => {
      const cashFlow = projection.netIncome;
      const presentValue = cashFlow / Math.pow(1 + discountRate, index + 1);
      dcfValue += presentValue;
    });

    // Add terminal value
    const finalYearCashFlow = projections[projections.length - 1].netIncome;
    const terminalValue = (finalYearCashFlow * (1 + terminalGrowthRate)) / (discountRate - terminalGrowthRate);
    const terminalPresentValue = terminalValue / Math.pow(1 + discountRate, projections.length);
    
    dcfValue += terminalPresentValue;

    return Math.round(dcfValue);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <TrendingUp className="h-5 w-5" />
            <span>Revenue Projections</span>
          </CardTitle>
          <CardDescription>
            Generate 3-5 year revenue projections for DCF valuation
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Current Revenue Input */}
          <div className="space-y-2">
            <Label htmlFor="current-revenue">Current Annual Revenue (USD)</Label>
            <div className="flex space-x-2">
              <Input
                id="current-revenue"
                type="number"
                placeholder="Enter current annual revenue..."
                value={currentRevenue}
                onChange={(e) => setCurrentRevenue(e.target.value)}
                className="flex-1"
              />
              <Button onClick={generateProjections} disabled={!currentRevenue}>
                Generate Projections
              </Button>
            </div>
          </div>

          {/* Projections Table */}
          {isGenerated && projections.length > 0 && (
            <div className="space-y-4">
              <Separator />
              
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">5-Year Financial Projections</h3>
                
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left p-2 font-medium">Year</th>
                        <th className="text-right p-2 font-medium">Revenue</th>
                        <th className="text-right p-2 font-medium">Growth %</th>
                        <th className="text-right p-2 font-medium">Expenses</th>
                        <th className="text-right p-2 font-medium">Net Income</th>
                      </tr>
                    </thead>
                    <tbody>
                      {projections.map((projection, index) => (
                        <tr key={projection.year} className="border-b">
                          <td className="p-2 font-medium">{projection.year}</td>
                          <td className="p-2 text-right text-green-600 font-medium">
                            {formatCurrency(projection.revenue)}
                          </td>
                          <td className="p-2 text-right">
                            {projection.growth.toFixed(1)}%
                          </td>
                          <td className="p-2 text-right text-red-600">
                            {formatCurrency(projection.expenses)}
                          </td>
                          <td className="p-2 text-right text-blue-600 font-medium">
                            {formatCurrency(projection.netIncome)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* DCF Valuation */}
              <Card className="bg-primary/5 border-primary/20">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2 text-primary">
                    <Calculator className="h-5 w-5" />
                    <span>DCF Valuation Result</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Estimated Company Value</p>
                      <p className="text-3xl font-bold text-primary">
                        {formatCurrency(calculateDCF())}
                      </p>
                    </div>
                    <DollarSign className="h-12 w-12 text-primary/30" />
                  </div>
                  
                  <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-muted-foreground">Discount Rate (WACC)</p>
                      <p className="font-medium">10.0%</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Terminal Growth Rate</p>
                      <p className="font-medium">3.0%</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="flex justify-end space-x-2">
                <Button variant="outline">
                  Adjust Assumptions
                </Button>
                <Button>
                  Generate Full Report
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default RevenueProjections;
