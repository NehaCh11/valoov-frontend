
import { AdminSidebar } from '@/components/admin/AdminSidebar';
import { SidebarProvider } from '@/components/ui/sidebar';
import { TopNavigation } from '@/components/TopNavigation';

interface AdminLayoutProps {
  children: React.ReactNode;
}

export function AdminLayout({ children }: AdminLayoutProps) {
  const handleSignOut = () => {
    localStorage.removeItem('adminToken');
    window.location.href = '/admin/login';
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex flex-col w-full">
        <div style={{ backgroundColor: '#FAFAFA' }} className="border-b border-border/40 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <TopNavigation onSignOut={handleSignOut} />
        </div>
        <div className="flex flex-1">
          <AdminSidebar />
          <main className="flex-1 overflow-hidden mr-[200px]">
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
