
import { useState } from 'react';
import Header from '@/components/Header';
import MarketOverview from '@/components/MarketOverview';
import AIAnalysis from '@/components/AIAnalysis';
import Portfolio from '@/components/Portfolio';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { BarChart3, Bot, TrendingUp, PieChart } from 'lucide-react';

const Index = () => {
  const [activeTab, setActiveTab] = useState('overview');

  const tabs = [
    { id: 'overview', label: 'Market Overview', icon: BarChart3 },
    { id: 'ai', label: 'AI Analysis', icon: Bot },
    { id: 'portfolio', label: 'Portfolio', icon: PieChart }
  ];

  return (
    <div className="min-h-screen bg-financial-dark">
      <div className="financial-gradient min-h-screen">
        <Header />
        
        <main className="container mx-auto px-4 py-8">
          {/* Navigation Tabs */}
          <Card className="mb-8 bg-card/30 backdrop-blur border-border/50">
            <CardContent className="p-4">
              <div className="flex space-x-1">
                {tabs.map((tab) => {
                  const Icon = tab.icon;
                  return (
                    <Button
                      key={tab.id}
                      variant={activeTab === tab.id ? "default" : "ghost"}
                      onClick={() => setActiveTab(tab.id)}
                      className={`flex items-center space-x-2 ${
                        activeTab === tab.id 
                          ? 'bg-financial-cyan text-white' 
                          : 'hover:bg-card/50'
                      }`}
                    >
                      <Icon className="h-4 w-4" />
                      <span>{tab.label}</span>
                    </Button>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          {/* Content Area */}
          <div className="space-y-8">
            {activeTab === 'overview' && <MarketOverview />}
            {activeTab === 'ai' && <AIAnalysis />}
            {activeTab === 'portfolio' && <Portfolio />}
          </div>

          {/* Footer */}
          <footer className="mt-16 text-center text-muted-foreground">
            <p className="text-sm">
              Financial Analyst AI - Professional Trading Platform
            </p>
            <p className="text-xs mt-1">
              Real-time data and AI-powered insights for informed financial decisions
            </p>
          </footer>
        </main>
      </div>
    </div>
  );
};

export default Index;
