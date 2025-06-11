
import { BarChart3, FileText, History, Settings, User, PieChart, TrendingUp, Home } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter,
} from "@/components/ui/sidebar";

// Menu items matching our actual routes
const navigationItems = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: Home,
  },
  {
    title: "Valuation Overview",
    url: "/valuation-overview",
    icon: BarChart3,
  },
  {
    title: "Start Questionnaire",
    url: "/chatbot-questionnaire",
    icon: FileText,
  },
  {
    title: "Generate Report",
    url: "/generate-valuation-report",
    icon: TrendingUp,
  },
  {
    title: "View Report",
    url: "/valuation-report",
    icon: FileText,
  },
  {
    title: "History",
    url: "/history",
    icon: History,
  },
  {
    title: "Revenue Projections",
    url: "/revenue-projections",
    icon: PieChart,
  },
  {
    title: "Portfolio",
    url: "/portfolio",
    icon: BarChart3,
  },
];

const settingsItems = [
  {
    title: "Company Profile",
    url: "/company-profile",
    icon: User,
  },
  {
    title: "Notifications",
    url: "/notification-settings",
    icon: Settings,
  },
];

interface AppSidebarProps {
  activeView: string;
  setActiveView: (view: string) => void;
}

export function AppSidebar({ activeView, setActiveView }: AppSidebarProps) {
  const location = useLocation();

  return (
    <Sidebar>
      <SidebarHeader className="p-4">
        <div className="flex items-center justify-center space-x-2">
          <img 
            src="/lovable-uploads/ccbfeb8f-e488-4725-8c91-82d50190256a.png" 
            alt="VALOOV AI Logo" 
            className="h-8 w-auto object-contain"
          />
        </div>
      </SidebarHeader>
      
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navigationItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild isActive={location.pathname === item.url}>
                    <Link to={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>Settings</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {settingsItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild isActive={location.pathname === item.url}>
                    <Link to={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="p-4">
        <div className="text-xs text-muted-foreground">
          © 2024 VALOOV
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
