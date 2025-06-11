
import { SidebarProvider as UISidebarProvider } from "@/components/ui/sidebar";

interface SidebarProviderProps {
  children: React.ReactNode;
}

export function SidebarProvider({ children }: SidebarProviderProps) {
  return (
    <UISidebarProvider>
      {children}
    </UISidebarProvider>
  );
}
