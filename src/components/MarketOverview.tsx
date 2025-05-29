
import { TrendingUp, TrendingDown, DollarSign, BarChart3 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const MarketOverview = () => {
  const marketData = [
    {
      symbol: 'S&P 500',
      value: '4,567.89',
      change: '+1.23%',
      changeValue: '+55.67',
      trend: 'up'
    },
    {
      symbol: 'NASDAQ',
      value: '14,321.56',
      change: '+2.45%',
      changeValue: '+342.11',
      trend: 'up'
    },
    {
      symbol: 'DOW JONES',
      value: '35,789.12',
      change: '-0.87%',
      changeValue: '-314.23',
      trend: 'down'
    },
    {
      symbol: 'VIX',
      value: '18.45',
      change: '-5.23%',
      changeValue: '-1.02',
      trend: 'down'
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Market Overview</h2>
        <Badge variant="outline" className="bg-financial-blue/20 text-financial-cyan border-financial-cyan/30">
          Live Data
        </Badge>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {marketData.map((item, index) => (
          <Card key={index} className="bg-card/50 backdrop-blur border-border/50 hover:bg-card/70 transition-all duration-300 animate-slide-up" 
                style={{ animationDelay: `${index * 100}ms` }}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{item.symbol}</CardTitle>
              {item.trend === 'up' ? (
                <TrendingUp className="h-4 w-4 text-financial-green" />
              ) : (
                <TrendingDown className="h-4 w-4 text-financial-red" />
              )}
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{item.value}</div>
              <div className="flex items-center space-x-2 mt-1">
                <span className={`text-sm font-medium ${
                  item.trend === 'up' ? 'text-financial-green' : 'text-financial-red'
                }`}>
                  {item.change}
                </span>
                <span className={`text-xs ${
                  item.trend === 'up' ? 'text-financial-green' : 'text-financial-red'
                }`}>
                  {item.changeValue}
                </span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default MarketOverview;
