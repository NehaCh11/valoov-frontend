
import { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { SidebarProvider } from "@/components/SidebarProvider";
import { MainLayout } from "@/layouts/MainLayout";
import Index from '@/pages/Index';
import NotFound from "@/pages/NotFound";
import ValuationOverview from "@/pages/ValuationOverview";
import ChatbotQuestionnaire from "@/pages/ChatbotQuestionnaire";
import { GenerateValuationReport } from "@/pages/GenerateValuationReport";
import ValuationReport from "@/pages/ValuationReport";
import History from "@/pages/History";
import RevenueProjections from "@/pages/RevenueProjections";
import Portfolio from "@/pages/Portfolio";
import CompanyProfilePage from "@/pages/CompanyProfile";
import NotificationSettingsPage from "@/pages/NotificationSettings";
import LoginPage from '@/pages/Login';
import SignupPage from '@/pages/Signup';
import Dashboard from '@/pages/Dashboard';

// Admin imports
import AdminDashboard from '@/pages/admin/AdminDashboard';
import AdminCompanies from '@/pages/admin/AdminCompanies';
import AdminSupport from '@/pages/admin/AdminSupport';
import AdminSubscriptions from '@/pages/admin/AdminSubscriptions';
import AdminSettings from '@/pages/admin/AdminSettings';

const queryClient = new QueryClient();

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  return (
    <QueryClientProvider client={queryClient}>
      <Toaster />
      <Router>
        <Routes>
          {/* Landing Page */}
          <Route path="/" element={<Index />} />
          
          {/* Authentication Pages */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          
          {/* Admin Routes */}
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/companies" element={<AdminCompanies />} />
          <Route path="/admin/support" element={<AdminSupport />} />
          <Route path="/admin/subscriptions" element={<AdminSubscriptions />} />
          <Route path="/admin/settings" element={<AdminSettings />} />
          
          {/* Protected Dashboard Routes */}
          <Route path="/dashboard" element={
            <div className="min-h-screen bg-background">
              <SidebarProvider>
                <MainLayout>
                  <Dashboard />
                </MainLayout>
              </SidebarProvider>
            </div>
          } />
          <Route path="/valuation-overview" element={
            <div className="min-h-screen bg-background">
              <SidebarProvider>
                <MainLayout>
                  <ValuationOverview />
                </MainLayout>
              </SidebarProvider>
            </div>
          } />
          <Route path="/chatbot-questionnaire" element={
            <div className="min-h-screen bg-background">
              <SidebarProvider>
                <MainLayout>
                  <ChatbotQuestionnaire />
                </MainLayout>
              </SidebarProvider>
            </div>
          } />
          <Route path="/generate-valuation-report" element={
            <div className="min-h-screen bg-background">
              <SidebarProvider>
                <MainLayout>
                  <GenerateValuationReport />
                </MainLayout>
              </SidebarProvider>
            </div>
          } />
          <Route path="/valuation-report" element={
            <div className="min-h-screen bg-background">
              <SidebarProvider>
                <MainLayout>
                  <ValuationReport />
                </MainLayout>
              </SidebarProvider>
            </div>
          } />
          <Route path="/history" element={
            <div className="min-h-screen bg-background">
              <SidebarProvider>
                <MainLayout>
                  <History setActiveView={() => {}} />
                </MainLayout>
              </SidebarProvider>
            </div>
          } />
          <Route path="/revenue-projections" element={
            <div className="min-h-screen bg-background">
              <SidebarProvider>
                <MainLayout>
                  <RevenueProjections />
                </MainLayout>
              </SidebarProvider>
            </div>
          } />
          <Route path="/portfolio" element={
            <div className="min-h-screen bg-background">
              <SidebarProvider>
                <MainLayout>
                  <Portfolio />
                </MainLayout>
              </SidebarProvider>
            </div>
          } />
          <Route path="/company-profile" element={
            <div className="min-h-screen bg-background">
              <SidebarProvider>
                <MainLayout>
                  <CompanyProfilePage />
                </MainLayout>
              </SidebarProvider>
            </div>
          } />
          <Route path="/notification-settings" element={
            <div className="min-h-screen bg-background">
              <SidebarProvider>
                <MainLayout>
                  <NotificationSettingsPage />
                </MainLayout>
              </SidebarProvider>
            </div>
          } />
          
          {/* 404 Page */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </QueryClientProvider>
  );
}

export default App;
