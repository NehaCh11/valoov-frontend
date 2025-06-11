
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from '@/components/ui/toaster';
import { SidebarProvider } from '@/components/SidebarProvider';

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
            
            {/* Protected Routes - No Sidebar */}
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/portfolio" element={<Portfolio />} />
            <Route path="/history" element={<History setActiveView={() => {}} />} />
            <Route path="/company-profile" element={<CompanyProfile />} />
            <Route path="/notification-settings" element={<NotificationSettings />} />
            <Route path="/revenue-projections" element={<RevenueProjections />} />
            <Route path="/questionnaire" element={<ChatbotQuestionnaire />} />
            <Route path="/valuation-dashboard" element={<ValuationDashboard />} />
            <Route path="/valuation-overview" element={<ValuationOverview />} />
            <Route path="/valuation-report" element={<ValuationReport />} />
            <Route path="/generate-valuation-report" element={<GenerateValuationReport />} />
            
            {/* Admin Routes - With Sidebar */}
            <Route path="/admin/dashboard" element={
              <SidebarProvider>
                <AdminDashboard />
              </SidebarProvider>
            } />
            <Route path="/admin/companies" element={
              <SidebarProvider>
                <AdminCompanies />
              </SidebarProvider>
            } />
            <Route path="/admin/user-management" element={
              <SidebarProvider>
                <AdminUserManagement />
              </SidebarProvider>
            } />
            <Route path="/admin/support" element={
              <SidebarProvider>
                <AdminSupport />
              </SidebarProvider>
            } />
            <Route path="/admin/support/reply" element={
              <SidebarProvider>
                <AdminSupportReply />
              </SidebarProvider>
            } />
            <Route path="/admin/subscriptions" element={
              <SidebarProvider>
                <AdminSubscriptions />
              </SidebarProvider>
            } />
            <Route path="/admin/settings" element={
              <SidebarProvider>
                <AdminSettings />
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
