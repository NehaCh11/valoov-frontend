
import { BarChart3, Building2, Ticket, Package, Settings, Users } from "lucide-react";
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

// Admin menu items
const adminMenuItems = [
  {
    title: "Dashboard",
    url: "/admin/dashboard",
    icon: BarChart3,
  },
  {
    title: "Company Management",
    url: "/admin/companies",
    icon: Building2,
  },
  {
    title: "User Management",
    url: "/admin/user-management",
    icon: Users,
  },
  {
    title: "Support Tickets",
    url: "/admin/support",
    icon: Ticket,
  },
  {
    title: "Manage Subscription",
    url: "/admin/subscriptions",
    icon: Package,
  },
  {
    title: "Platform Settings",
    url: "/admin/settings",
    icon: Settings,
  },
];

export function AdminSidebar() {
  const location = useLocation();

  return (
    <Sidebar>
      <SidebarHeader className="p-4 h-16 flex items-center justify-center">
        <div className="flex items-center justify-center">
          <img 
            src="/lovable-uploads/ccbfeb8f-e488-4725-8c91-82d50190256a.png" 
            alt="VALOOV AI Logo" 
            className="h-12 w-auto object-contain"
          />
        </div>
      </SidebarHeader>
      
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Administration</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {adminMenuItems.map((item) => (
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
          © 2024 VALOOV Admin
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
