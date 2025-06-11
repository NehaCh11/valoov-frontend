
/**
 * Main Application Index Page
 * 
 * This is the main entry point of the application that handles:
 * - User authentication state management
 * - Route navigation between different views
 * - Layout structure with sidebar and top navigation
 * - View switching logic based on user selection
 * 
 * The page manages the overall application flow from login/signup
 * through the various valuation process steps.
 */

import { useState } from 'react';
import { SidebarProvider, SidebarInset } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/AppSidebar';
import { TopNavigation } from '@/components/TopNavigation';
import { ValuationDashboard } from '@/components/ValuationDashboard';
import { ValuationOverview } from '@/components/ValuationOverview';
import { ValuationReport } from '@/components/ValuationReport';
import { NotificationSettings } from '@/components/NotificationSettings';
import { CompanyProfile } from '@/components/CompanyProfile';
import MarketOverview from '@/components/MarketOverview';
import RevenueProjections from '@/components/RevenueProjections';
import Portfolio from '@/components/Portfolio';
import LandingPage from '@/components/LandingPage';
import { History } from '@/components/History';
import ChatbotQuestionnaire from '@/pages/ChatbotQuestionnaire';
import { GenerateValuationReport } from '@/pages/GenerateValuationReport';

const Index = () => {
  // Authentication state management
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeView, setActiveView] = useState('questionnaire');

  /**
   * Handles user login and sets initial view
   */
  const handleLogin = () => {
    setIsLoggedIn(true);
    setActiveView('questionnaire'); // Ensure we go to questionnaire on login
  };

  /**
   * Handles account creation and sets initial view
   */
  const handleAccountCreated = () => {
    setIsLoggedIn(true);
    setActiveView('questionnaire'); // Ensure we go to questionnaire after account creation
  };

  /**
   * Handles user sign out and resets state
   */
  const handleSignOut = () => {
    setIsLoggedIn(false);
    setActiveView('questionnaire'); // Reset to questionnaire view
  };

  // Show landing page if user is not logged in
  if (!isLoggedIn) {
    return <LandingPage onLogin={handleLogin} onAccountCreated={handleAccountCreated} />;
  }

  /**
   * Renders the appropriate content based on active view
   */
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
      case 'questionnaire':
        return <ChatbotQuestionnaire />;
      case 'history':
        return <History setActiveView={setActiveView} />;
      case 'projections':
        return <RevenueProjections />;
      case 'reports':
        return <Portfolio />;
      case 'settings':
        return <NotificationSettings />;
      case 'profile':
        return <CompanyProfile />;
      default:
        return <ChatbotQuestionnaire />;
    }
  };

  return (
    <div className="min-h-screen bg-financial-dark">
      <div className="valoov-gradient min-h-screen">
        <SidebarProvider>
          <div className="min-h-screen flex w-full">
            {/* Sidebar Navigation */}
            <AppSidebar activeView={activeView} setActiveView={setActiveView} />
            
            {/* Main Content Area */}
            <SidebarInset>
              {/* Top Navigation Bar */}
              <TopNavigation onSignOut={handleSignOut} />
              
              {/* Page Content */}
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
