
import { useState } from 'react';
import { SidebarProvider, SidebarInset } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/AppSidebar';
import { TopNavigation } from '@/components/TopNavigation';
import { ValuationDashboard } from '@/components/ValuationDashboard';
import { ValuationOverview } from '@/components/ValuationOverview';
import { GenerateValuationReport } from '@/components/GenerateValuationReport';
import { ValuationReport } from '@/components/ValuationReport';
import { NotificationSettings } from '@/components/NotificationSettings';
import { CompanyProfile } from '@/components/CompanyProfile';
import MarketOverview from '@/components/MarketOverview';
import DocumentUpload from '@/components/DocumentUpload';
import ChatbotQuestionnaire from '@/components/ChatbotQuestionnaire';
import RevenueProjections from '@/components/RevenueProjections';
import Portfolio from '@/components/Portfolio';
import LandingPage from '@/components/LandingPage';

const Index = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeView, setActiveView] = useState('dashboard');

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleSignOut = () => {
    setIsLoggedIn(false);
    setActiveView('dashboard'); // Reset to default view
  };

  if (!isLoggedIn) {
    return <LandingPage onLogin={handleLogin} />;
  }

  const renderContent = () => {
    switch (activeView) {
      case 'dashboard':
        return <ValuationDashboard />;
      case 'valuation-overview':
        return <ValuationOverview />;
      case 'generate-report':
        return <GenerateValuationReport />;
      case 'valuation-report':
        return <ValuationReport />;
      case 'upload':
        return <DocumentUpload />;
      case 'questionnaire':
        return <ChatbotQuestionnaire />;
      case 'projections':
        return <RevenueProjections />;
      case 'reports':
        return <Portfolio />;
      case 'notifications':
        return <NotificationSettings />;
      case 'profile':
        return <CompanyProfile />;
      default:
        return <ValuationDashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-financial-dark">
      <div className="valoov-gradient min-h-screen">
        <SidebarProvider>
          <div className="min-h-screen flex w-full">
            <AppSidebar activeView={activeView} setActiveView={setActiveView} />
            <SidebarInset>
              <TopNavigation onSignOut={handleSignOut} />
              <main className="flex-1 p-6">
                {renderContent()}
              </main>
            </SidebarInset>
          </div>
        </SidebarProvider>
      </div>
    </div>
  );
};

export default Index;
