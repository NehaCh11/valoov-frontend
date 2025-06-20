
import { useState } from 'react';
import { AppSidebar } from '@/components/AppSidebar';

interface MainLayoutProps {
  children: React.ReactNode;
}

export function MainLayout({ children }: MainLayoutProps) {
  const [activeView, setActiveView] = useState('dashboard');

  return (
    <div className="min-h-screen flex w-full">
      <AppSidebar activeView={activeView} setActiveView={setActiveView} />
      <main className="flex-1 p-6">
        {children}
      </main>
    </div>
  );
}
