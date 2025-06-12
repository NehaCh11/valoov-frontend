
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
                  <div className="flex-1 pl-1">
                    <Dashboard />
                  </div>
                </div>
              </SidebarProvider>
            } />
            <Route path="/portfolio" element={
              <SidebarProvider>
                <div className="min-h-screen flex w-full">
                  <AppSidebar activeView="portfolio" setActiveView={() => {}} />
                  <div className="flex-1 pl-1">
                    <Portfolio />
                  </div>
                </div>
              </SidebarProvider>
            } />
            <Route path="/history" element={
              <SidebarProvider>
                <div className="min-h-screen flex w-full">
                  <AppSidebar activeView="history" setActiveView={() => {}} />
                  <div className="flex-1 pl-1">
                    <History setActiveView={() => {}} />
                  </div>
                </div>
              </SidebarProvider>
            } />
            <Route path="/company-profile" element={
              <SidebarProvider>
                <div className="min-h-screen flex w-full">
                  <AppSidebar activeView="company-profile" setActiveView={() => {}} />
                  <div className="flex-1 pl-1">
                    <CompanyProfile />
                  </div>
                </div>
              </SidebarProvider>
            } />
            <Route path="/notification-settings" element={
              <SidebarProvider>
                <div className="min-h-screen flex w-full">
                  <AppSidebar activeView="notification-settings" setActiveView={() => {}} />
                  <div className="flex-1 pl-1">
                    <NotificationSettings />
                  </div>
                </div>
              </SidebarProvider>
            } />
            <Route path="/revenue-projections" element={
              <SidebarProvider>
                <div className="min-h-screen flex w-full">
                  <AppSidebar activeView="revenue-projections" setActiveView={() => {}} />
                  <div className="flex-1 pl-1">
                    <RevenueProjections />
                  </div>
                </div>
              </SidebarProvider>
            } />
            <Route path="/questionnaire" element={
              <SidebarProvider>
                <div className="min-h-screen flex w-full">
                  <AppSidebar activeView="questionnaire" setActiveView={() => {}} />
                  <div className="flex-1 pl-1">
                    <ChatbotQuestionnaire />
                  </div>
                </div>
              </SidebarProvider>
            } />
            <Route path="/valuation-dashboard" element={
              <SidebarProvider>
                <div className="min-h-screen flex w-full">
                  <AppSidebar activeView="valuation-dashboard" setActiveView={() => {}} />
                  <div className="flex-1 pl-1">
                    <ValuationDashboard />
                  </div>
                </div>
              </SidebarProvider>
            } />
            <Route path="/valuation-overview" element={
              <SidebarProvider>
                <div className="min-h-screen flex w-full">
                  <AppSidebar activeView="valuation-overview" setActiveView={() => {}} />
                  <div className="flex-1 pl-1">
                    <ValuationOverview />
                  </div>
                </div>
              </SidebarProvider>
            } />
            <Route path="/valuation-report" element={
              <SidebarProvider>
                <div className="min-h-screen flex w-full">
                  <AppSidebar activeView="valuation-report" setActiveView={() => {}} />
                  <div className="flex-1 pl-1">
                    <ValuationReport />
                  </div>
                </div>
              </SidebarProvider>
            } />
            <Route path="/generate-valuation-report" element={
              <SidebarProvider>
                <div className="min-h-screen flex w-full">
                  <AppSidebar activeView="generate-valuation-report" setActiveView={() => {}} />
                  <div className="flex-1 pl-1">
                    <GenerateValuationReport />
                  </div>
                </div>
              </SidebarProvider>
            } />
            
            {/* Admin Routes - With Admin Sidebar */}
            <Route path="/admin/dashboard" element={
              <SidebarProvider>
                <div className="min-h-screen flex w-full">
                  <AdminSidebar />
                  <div className="flex-1 pl-1">
                    <AdminDashboard />
                  </div>
                </div>
              </SidebarProvider>
            } />
            <Route path="/admin/companies" element={
              <SidebarProvider>
                <div className="min-h-screen flex w-full">
                  <AdminSidebar />
                  <div className="flex-1 pl-1">
                    <AdminCompanies />
                  </div>
                </div>
              </SidebarProvider>
            } />
            <Route path="/admin/user-management" element={
              <SidebarProvider>
                <div className="min-h-screen flex w-full">
                  <AdminSidebar />
                  <div className="flex-1 pl-1">
                    <AdminUserManagement />
                  </div>
                </div>
              </SidebarProvider>
            } />
            <Route path="/admin/support" element={
              <SidebarProvider>
                <div className="min-h-screen flex w-full">
                  <AdminSidebar />
                  <div className="flex-1 pl-1">
                    <AdminSupport />
                  </div>
                </div>
              </SidebarProvider>
            } />
            <Route path="/admin/support/reply" element={
              <SidebarProvider>
                <div className="min-h-screen flex w-full">
                  <AdminSidebar />
                  <div className="flex-1 pl-1">
                    <AdminSupportReply />
                  </div>
                </div>
              </SidebarProvider>
            } />
            <Route path="/admin/subscriptions" element={
              <SidebarProvider>
                <div className="min-h-screen flex w-full">
                  <AdminSidebar />
                  <div className="flex-1 pl-1">
                    <AdminSubscriptions />
                  </div>
                </div>
              </SidebarProvider>
            } />
            <Route path="/admin/settings" element={
              <SidebarProvider>
                <div className="min-h-screen flex w-full">
                  <AdminSidebar />
                  <div className="flex-1 pl-1">
                    <AdminSettings />
                  </div>
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
