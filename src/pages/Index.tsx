
import { useState } from 'react';
import Header from '@/components/Header';
import MarketOverview from '@/components/MarketOverview';
import AIAnalysis from '@/components/AIAnalysis';
import Portfolio from '@/components/Portfolio';
import LandingPage from '@/components/LandingPage';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Upload, FileText, BarChart3 } from 'lucide-react';

const Index = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');

  // Show landing page if not logged in
  if (!isLoggedIn) {
    return <LandingPage />;
  }

  // Show main app if logged in - updated for valuation platform
  const tabs = [
    { id: 'overview', label: 'Dashboard', icon: BarChart3 },
    { id: 'upload', label: 'Upload Documents', icon: Upload },
    { id: 'reports', label: 'Valuation Reports', icon: FileText }
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

          {/* Content Area - temporarily showing existing components */}
          <div className="space-y-8">
            {activeTab === 'overview' && <MarketOverview />}
            {activeTab === 'upload' && <AIAnalysis />}
            {activeTab === 'reports' && <Portfolio />}
          </div>

          {/* Footer */}
          <footer className="mt-16 text-center text-muted-foreground">
            <p className="text-sm">
              VALOOV - Professional Company Valuation Platform
            </p>
            <p className="text-xs mt-1">
              Accurate valuations for businesses in France and Spain
            </p>
          </footer>
        </main>
      </div>
    </div>
  );
};

export default Index;
