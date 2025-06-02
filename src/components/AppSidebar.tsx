import {
  BarChart3,
  TrendingUp,
  FileText,
  Bot,
  Settings,
  Building2,
  Eye,
  PlusCircle
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

const menuItems = [
  {
    title: "Dashboard",
    icon: BarChart3,
    id: "dashboard"
  },
  {
    title: "Valuation Overview",
    icon: Eye,
    id: "valuation-overview"
  },
  {
    title: "Generate Valuation Report",
    icon: PlusCircle,
    id: "generate-report"
  },
  {
    title: "Valuation Report",
    icon: FileText,
    id: "valuation-report"
  }
];

const toolsItems = [
  {
    title: "AI Questionnaire",
    icon: Bot,
    id: "questionnaire"
  }
];

const settingsItems = [
  {
    title: "Settings",
    icon: Settings,
    id: "settings"
  },
  {
    title: "Company Profile",
    icon: Building2,
    id: "profile"
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
          <SidebarGroupLabel>Valuation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => {
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
          <SidebarGroupLabel>Tools</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {toolsItems.map((item) => {
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
              {settingsItems.map((item) => {
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
