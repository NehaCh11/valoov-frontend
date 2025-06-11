
import React from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SidebarProvider, SidebarInset } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/AppSidebar';
import { TopNavigation } from '@/components/TopNavigation';
import { useState } from 'react';

// Import all page components
import LandingPage from '@/components/LandingPage';
import ValuationDashboard from '@/pages/ValuationDashboard';
import ValuationOverview from '@/pages/ValuationOverview';
import ValuationReport from '@/pages/ValuationReport';
import ChatbotQuestionnaire from '@/pages/ChatbotQuestionnaire';
import { GenerateValuationReport } from '@/pages/GenerateValuationReport';
import History from '@/pages/History';
import RevenueProjections from '@/pages/RevenueProjections';
import Portfolio from '@/pages/Portfolio';
import NotificationSettings from '@/pages/NotificationSettings';
import CompanyProfile from '@/pages/CompanyProfile';
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => {
  // Authentication state management
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeView, setActiveView] = useState('questionnaire');

  /**
   * Handles user login and sets initial view
   */
  const handleLogin = () => {
    setIsLoggedIn(true);
    setActiveView('questionnaire');
  };

  /**
   * Handles account creation and sets initial view
   */
  const handleAccountCreated = () => {
    setIsLoggedIn(true);
    setActiveView('questionnaire');
  };

  /**
   * Handles user sign out and resets state
   */
  const handleSignOut = () => {
    setIsLoggedIn(false);
    setActiveView('questionnaire');
  };

  /**
   * Layout wrapper for authenticated pages
   */
  const AuthenticatedLayout = ({ children }: { children: React.ReactNode }) => (
    <div className="min-h-screen bg-financial-dark">
      <div className="valoov-gradient min-h-screen">
        <SidebarProvider>
          <div className="min-h-screen flex w-full">
            <AppSidebar activeView={activeView} setActiveView={setActiveView} />
            <SidebarInset>
              <TopNavigation onSignOut={handleSignOut} />
              <main className="flex-1 p-6">
                {children}
              </main>
            </SidebarInset>
          </div>
        </SidebarProvider>
      </div>
    </div>
  );

  return (
    <QueryClientProvider client={queryClient}>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* Landing page route */}
          <Route 
            path="/" 
            element={
              !isLoggedIn ? (
                <LandingPage onLogin={handleLogin} onAccountCreated={handleAccountCreated} />
              ) : (
                <AuthenticatedLayout>
                  <ChatbotQuestionnaire />
                </AuthenticatedLayout>
              )
            } 
          />
          
          {/* Protected routes - only accessible when logged in */}
          {isLoggedIn && (
            <>
              <Route 
                path="/dashboard" 
                element={
                  <AuthenticatedLayout>
                    <ValuationDashboard />
                  </AuthenticatedLayout>
                } 
              />
              <Route 
                path="/valuation-overview" 
                element={
                  <AuthenticatedLayout>
                    <ValuationOverview />
                  </AuthenticatedLayout>
                } 
              />
              <Route 
                path="/valuation-report" 
                element={
                  <AuthenticatedLayout>
                    <ValuationReport />
                  </AuthenticatedLayout>
                } 
              />
              <Route 
                path="/questionnaire" 
                element={
                  <AuthenticatedLayout>
                    <ChatbotQuestionnaire />
                  </AuthenticatedLayout>
                } 
              />
              <Route 
                path="/generate-report" 
                element={
                  <AuthenticatedLayout>
                    <GenerateValuationReport />
                  </AuthenticatedLayout>
                } 
              />
              <Route 
                path="/history" 
                element={
                  <AuthenticatedLayout>
                    <History setActiveView={setActiveView} />
                  </AuthenticatedLayout>
                } 
              />
              <Route 
                path="/projections" 
                element={
                  <AuthenticatedLayout>
                    <RevenueProjections />
                  </AuthenticatedLayout>
                } 
              />
              <Route 
                path="/reports" 
                element={
                  <AuthenticatedLayout>
                    <Portfolio />
                  </AuthenticatedLayout>
                } 
              />
              <Route 
                path="/settings" 
                element={
                  <AuthenticatedLayout>
                    <NotificationSettings />
                  </AuthenticatedLayout>
                } 
              />
              <Route 
                path="/profile" 
                element={
                  <AuthenticatedLayout>
                    <CompanyProfile />
                  </AuthenticatedLayout>
                } 
              />
            </>
          )}
          
          {/* Catch-all route for 404 */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
};

export default App;
