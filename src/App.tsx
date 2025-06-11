
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from '@/components/ui/toaster';
import { SidebarProvider } from '@/components/SidebarProvider';
import { AppSidebar } from '@/components/AppSidebar';
import { AdminSidebar } from '@/components/admin/AdminSidebar';

// Pages
import Index from '@/pages/Index';
import Login from '@/pages/Login';
import Signup from '@/pages/Signup';
import Dashboard from '@/pages/Dashboard';
import Portfolio from '@/pages/Portfolio';
import History from '@/pages/History';
import CompanyProfile from '@/pages/CompanyProfile';
import NotificationSettings from '@/pages/NotificationSettings';
import RevenueProjections from '@/pages/RevenueProjections';
import ChatbotQuestionnaire from '@/pages/ChatbotQuestionnaire';
import ValuationDashboard from '@/pages/ValuationDashboard';
import ValuationOverview from '@/pages/ValuationOverview';
import ValuationReport from '@/pages/ValuationReport';
import GenerateValuationReport from '@/pages/GenerateValuationReport';
import NotFound from '@/pages/NotFound';

// Admin Pages
import AdminDashboard from '@/pages/admin/AdminDashboard';
import AdminCompanies from '@/pages/admin/AdminCompanies';
import AdminSupport from '@/pages/admin/AdminSupport';
import AdminSupportReply from '@/pages/admin/AdminSupportReply';
import AdminSubscriptions from '@/pages/admin/AdminSubscriptions';
import AdminSettings from '@/pages/admin/AdminSettings';
import AdminUserManagement from '@/pages/admin/AdminUserManagement';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <div className="min-h-screen bg-background">
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Index />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            
            {/* Protected Routes - With User Sidebar */}
            <Route path="/dashboard" element={
              <SidebarProvider>
                <div className="min-h-screen flex w-full">
                  <AppSidebar activeView="dashboard" setActiveView={() => {}} />
                  <Dashboard />
                </div>
              </SidebarProvider>
            } />
            <Route path="/portfolio" element={
              <SidebarProvider>
                <div className="min-h-screen flex w-full">
                  <AppSidebar activeView="portfolio" setActiveView={() => {}} />
                  <Portfolio />
                </div>
              </SidebarProvider>
            } />
            <Route path="/history" element={
              <SidebarProvider>
                <div className="min-h-screen flex w-full">
                  <AppSidebar activeView="history" setActiveView={() => {}} />
                  <History setActiveView={() => {}} />
                </div>
              </SidebarProvider>
            } />
            <Route path="/company-profile" element={
              <SidebarProvider>
                <div className="min-h-screen flex w-full">
                  <AppSidebar activeView="company-profile" setActiveView={() => {}} />
                  <CompanyProfile />
                </div>
              </SidebarProvider>
            } />
            <Route path="/notification-settings" element={
              <SidebarProvider>
                <div className="min-h-screen flex w-full">
                  <AppSidebar activeView="notification-settings" setActiveView={() => {}} />
                  <NotificationSettings />
                </div>
              </SidebarProvider>
            } />
            <Route path="/revenue-projections" element={
              <SidebarProvider>
                <div className="min-h-screen flex w-full">
                  <AppSidebar activeView="revenue-projections" setActiveView={() => {}} />
                  <RevenueProjections />
                </div>
              </SidebarProvider>
            } />
            <Route path="/questionnaire" element={
              <SidebarProvider>
                <div className="min-h-screen flex w-full">
                  <AppSidebar activeView="questionnaire" setActiveView={() => {}} />
                  <ChatbotQuestionnaire />
                </div>
              </SidebarProvider>
            } />
            <Route path="/valuation-dashboard" element={
              <SidebarProvider>
                <div className="min-h-screen flex w-full">
                  <AppSidebar activeView="valuation-dashboard" setActiveView={() => {}} />
                  <ValuationDashboard />
                </div>
              </SidebarProvider>
            } />
            <Route path="/valuation-overview" element={
              <SidebarProvider>
                <div className="min-h-screen flex w-full">
                  <AppSidebar activeView="valuation-overview" setActiveView={() => {}} />
                  <ValuationOverview />
                </div>
              </SidebarProvider>
            } />
            <Route path="/valuation-report" element={
              <SidebarProvider>
                <div className="min-h-screen flex w-full">
                  <AppSidebar activeView="valuation-report" setActiveView={() => {}} />
                  <ValuationReport />
                </div>
              </SidebarProvider>
            } />
            <Route path="/generate-valuation-report" element={
              <SidebarProvider>
                <div className="min-h-screen flex w-full">
                  <AppSidebar activeView="generate-valuation-report" setActiveView={() => {}} />
                  <GenerateValuationReport />
                </div>
              </SidebarProvider>
            } />
            
            {/* Admin Routes - With Admin Sidebar */}
            <Route path="/admin/dashboard" element={
              <SidebarProvider>
                <div className="min-h-screen flex w-full">
                  <AdminSidebar />
                  <AdminDashboard />
                </div>
              </SidebarProvider>
            } />
            <Route path="/admin/companies" element={
              <SidebarProvider>
                <div className="min-h-screen flex w-full">
                  <AdminSidebar />
                  <AdminCompanies />
                </div>
              </SidebarProvider>
            } />
            <Route path="/admin/user-management" element={
              <SidebarProvider>
                <div className="min-h-screen flex w-full">
                  <AdminSidebar />
                  <AdminUserManagement />
                </div>
              </SidebarProvider>
            } />
            <Route path="/admin/support" element={
              <SidebarProvider>
                <div className="min-h-screen flex w-full">
                  <AdminSidebar />
                  <AdminSupport />
                </div>
              </SidebarProvider>
            } />
            <Route path="/admin/support/reply" element={
              <SidebarProvider>
                <div className="min-h-screen flex w-full">
                  <AdminSidebar />
                  <AdminSupportReply />
                </div>
              </SidebarProvider>
            } />
            <Route path="/admin/subscriptions" element={
              <SidebarProvider>
                <div className="min-h-screen flex w-full">
                  <AdminSidebar />
                  <AdminSubscriptions />
                </div>
              </SidebarProvider>
            } />
            <Route path="/admin/settings" element={
              <SidebarProvider>
                <div className="min-h-screen flex w-full">
                  <AdminSidebar />
                  <AdminSettings />
                </div>
              </SidebarProvider>
            } />
            
            {/* 404 Route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
        <Toaster />
      </Router>
    </QueryClientProvider>
  );
}

export default App;
