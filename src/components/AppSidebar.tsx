
import { 
  LayoutDashboard, 
  Users, 
  Clock, 
  ClipboardList, 
  FileText, 
  Wallet,
  TrendingUp,
  BarChart3,
  Building2,
  User,
  Settings,
  LogOut,
  Grid3X3
} from "lucide-react"
import { NavLink } from "react-router-dom"
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
} from "@/components/ui/sidebar"

const mainMenuItems = [
  {
    title: "Dashboard",
    url: "/",
    icon: Grid3X3,
  },
  {
    title: "Employee",
    url: "/employees",
    icon: Users,
  },
  {
    title: "Time Attendance",
    url: "/attendance",
    icon: Clock,
  },
  {
    title: "Task",
    url: "/leave-requests",
    icon: ClipboardList,
  },
  {
    title: "Payroll",
    url: "/payroll",
    icon: Wallet,
  },
  {
    title: "Performance",
    url: "/performance",
    icon: TrendingUp,
  },
  {
    title: "Report",
    url: "/reports",
    icon: BarChart3,
  },
  {
    title: "Organization",
    url: "/organization",
    icon: Building2,
  },
]

const bottomMenuItems = [
  {
    title: "Profile",
    url: "/profile",
    icon: User,
  },
  {
    title: "Setting",
    url: "/settings",
    icon: Settings,
  },
  {
    title: "Logout",
    url: "/logout",
    icon: LogOut,
  },
]

export function AppSidebar() {
  return (
    <Sidebar className="bg-sidebar-background border-none">
      <SidebarHeader className="p-6 border-b border-sidebar-border">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
            <Grid3X3 className="w-6 h-6 text-sidebar-background" />
          </div>
          <div>
            <div className="text-sidebar-foreground font-bold text-lg">HRIS</div>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent className="px-4">
        <SidebarGroup className="mt-4">
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1">
              {mainMenuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild className="w-full">
                    <NavLink 
                      to={item.url}
                      className={({ isActive }) =>
                        `flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition-all ${
                          isActive 
                            ? "bg-sidebar-accent text-sidebar-foreground shadow-sm"
                            : "text-sidebar-foreground/80 hover:bg-sidebar-accent/50 hover:text-sidebar-foreground"
                        }`
                      }
                    >
                      <item.icon className="h-5 w-5" />
                      {item.title}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup className="mt-8">
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1">
              {bottomMenuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild className="w-full">
                    <NavLink 
                      to={item.url}
                      className={({ isActive }) =>
                        `flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition-all ${
                          isActive 
                            ? "bg-sidebar-accent text-sidebar-foreground shadow-sm"
                            : "text-sidebar-foreground/80 hover:bg-sidebar-accent/50 hover:text-sidebar-foreground"
                        }`
                      }
                    >
                      <item.icon className="h-5 w-5" />
                      {item.title}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}
