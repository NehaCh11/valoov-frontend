
import {
  BarChart3,
  TrendingUp,
  FileText,
  Bot,
  Settings,
  Building2,
  Eye,
  PlusCircle,
  History,
  Home
} from 'lucide-react';
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
} from '@/components/ui/sidebar';

interface AppSidebarProps {
  activeView: string;
  setActiveView: (view: string) => void;
}

const mainItems = [
  {
    title: "Dashboard",
    icon: Home,
    id: "dashboard"
  },
  {
    title: "AI Questionnaire",
    icon: Bot,
    id: "questionnaire"
  }
];

const valuationItems = [
  {
    title: "Valuation Overview",
    icon: Eye,
    id: "valuation-overview"
  },
  {
    title: "Generate Report",
    icon: PlusCircle,
    id: "generate-report"
  },
  {
    title: "Valuation Report",
    icon: FileText,
    id: "valuation-report"
  }
];

const reportsItems = [
  {
    title: "History",
    icon: History,
    id: "history"
  }
];

const accountItems = [
  {
    title: "Company Profile",
    icon: Building2,
    id: "profile"
  },
  {
    title: "Settings",
    icon: Settings,
    id: "settings"
  }
];

export function AppSidebar({ activeView, setActiveView }: AppSidebarProps) {
  return (
    <Sidebar>
      <SidebarHeader className="p-4">
        <div className="flex items-center space-x-3">
          <img 
            src="/lovable-uploads/ccbfeb8f-e488-4725-8c91-82d50190256a.png" 
            alt="VALOOV AI Logo" 
            className="h-48 w-auto object-contain"
          />
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Main</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {mainItems.map((item) => {
                const Icon = item.icon;
                return (
                  <SidebarMenuItem key={item.id}>
                    <SidebarMenuButton 
                      onClick={() => setActiveView(item.id)}
                      isActive={activeView === item.id}
                      className="w-full"
                    >
                      <Icon className="h-4 w-4" />
                      <span>{item.title}</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>Valuation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {valuationItems.map((item) => {
                const Icon = item.icon;
                return (
                  <SidebarMenuItem key={item.id}>
                    <SidebarMenuButton 
                      onClick={() => setActiveView(item.id)}
                      isActive={activeView === item.id}
                      className="w-full"
                    >
                      <Icon className="h-4 w-4" />
                      <span>{item.title}</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>Reports</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {reportsItems.map((item) => {
                const Icon = item.icon;
                return (
                  <SidebarMenuItem key={item.id}>
                    <SidebarMenuButton 
                      onClick={() => setActiveView(item.id)}
                      isActive={activeView === item.id}
                      className="w-full"
                    >
                      <Icon className="h-4 w-4" />
                      <span>{item.title}</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>Account</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {accountItems.map((item) => {
                const Icon = item.icon;
                return (
                  <SidebarMenuItem key={item.id}>
                    <SidebarMenuButton 
                      onClick={() => setActiveView(item.id)}
                      isActive={activeView === item.id}
                      className="w-full"
                    >
                      <Icon className="h-4 w-4" />
                      <span>{item.title}</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="p-4">
        <div className="text-xs text-gray-400 text-center">
          <p>© 2024 VALOOV</p>
          <p>Professional Valuations</p>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
