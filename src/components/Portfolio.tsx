
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, TrendingDown, DollarSign, Target } from 'lucide-react';

const Portfolio = () => {
  const portfolioData = [
    { name: 'Technology', value: 35, amount: 175000, change: '+12.5%' },
    { name: 'Healthcare', value: 25, amount: 125000, change: '+8.3%' },
    { name: 'Finance', value: 20, amount: 100000, change: '-2.1%' },
    { name: 'Energy', value: 15, amount: 75000, change: '+15.7%' },
    { name: 'Real Estate', value: 5, amount: 25000, change: '+5.2%' }
  ];

  const performanceData = [
    { month: 'Jan', value: 95000 },
    { month: 'Feb', value: 102000 },
    { month: 'Mar', value: 108000 },
    { month: 'Apr', value: 125000 },
    { month: 'May', value: 118000 },
    { month: 'Jun', value: 135000 }
  ];

  const COLORS = ['#06b6d4', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'];

  const totalValue = portfolioData.reduce((sum, item) => sum + item.amount, 0);
  const totalChange = '+8.7%';

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Portfolio Analysis</h2>
        <div className="flex items-center space-x-4">
          <div className="text-right">
            <p className="text-2xl font-bold">${totalValue.toLocaleString()}</p>
            <p className="text-sm text-financial-green flex items-center">
              <TrendingUp className="h-3 w-3 mr-1" />
              {totalChange}
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-card/50 backdrop-blur border-border/50">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Target className="h-5 w-5 text-financial-cyan" />
              <span>Asset Allocation</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={portfolioData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {portfolioData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => [`${value}%`, 'Allocation']} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-4 space-y-2">
              {portfolioData.map((item, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div 
                      className="w-3 h-3 rounded-full" 
                      style={{ backgroundColor: COLORS[index % COLORS.length] }}
                    />
                    <span className="text-sm">{item.name}</span>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium">${item.amount.toLocaleString()}</p>
                    <p className={`text-xs ${
                      item.change.startsWith('+') ? 'text-financial-green' : 'text-financial-red'
                    }`}>
                      {item.change}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card/50 backdrop-blur border-border/50">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <TrendingUp className="h-5 w-5 text-financial-green" />
              <span>Portfolio Performance</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={performanceData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis dataKey="month" stroke="#9ca3af" />
                  <YAxis stroke="#9ca3af" />
                  <Tooltip 
                    formatter={(value) => [`$${Number(value).toLocaleString()}`, 'Portfolio Value']}
                    contentStyle={{ 
                      backgroundColor: '#1f2937', 
                      border: '1px solid #374151',
                      borderRadius: '8px'
                    }}
                  />
                  <Bar dataKey="value" fill="#06b6d4" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-card/50 backdrop-blur border-border/50">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Return</p>
                <p className="text-2xl font-bold text-financial-green">+$43,250</p>
              </div>
              <DollarSign className="h-8 w-8 text-financial-green" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card/50 backdrop-blur border-border/50">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Annual Return</p>
                <p className="text-2xl font-bold text-financial-cyan">12.4%</p>
              </div>
              <TrendingUp className="h-8 w-8 text-financial-cyan" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card/50 backdrop-blur border-border/50">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Risk Score</p>
                <p className="text-2xl font-bold text-financial-gold">7.2/10</p>
              </div>
              <Target className="h-8 w-8 text-financial-gold" />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Portfolio;
