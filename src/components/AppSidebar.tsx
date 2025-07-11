
import { Home, Users, Clock, FileText, ClipboardList, BarChart3, Settings } from "lucide-react"
import { NavLink } from "react-router-dom"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
} from "@/components/ui/sidebar"

const items = [
  {
    title: "Dashboard",
    url: "/",
    icon: Home,
  },
  {
    title: "Employees",
    url: "/employees",
    icon: Users,
  },
  {
    title: "Attendance",
    url: "/attendance",
    icon: Clock,
  },
  {
    title: "Leave Requests",
    url: "/leave-requests",
    icon: ClipboardList,
  },
  {
    title: "Reports",
    url: "/reports",
    icon: BarChart3,
  },
  {
    title: "Payroll",
    url: "/payroll",
    icon: FileText,
  },
  {
    title: "Settings",
    url: "/settings",
    icon: Settings,
  },
]

export function AppSidebar() {
  return (
    <Sidebar className="border-r border-border">
      <SidebarHeader className="p-6">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 flex items-center justify-center">
            <img 
              src="/lovable-uploads/6dfd7a45-214e-4ad9-aae0-64cebb3d63e3.png" 
              alt="CiD Logo" 
              className="w-8 h-8 object-contain"
            />
          </div>
          <span className="text-xl font-semibold text-foreground">CiD</span>
        </div>
      </SidebarHeader>

      <SidebarContent className="px-4 pb-4">
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1">
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild className="w-full">
                    <NavLink 
                      to={item.url}
                      className={({ isActive }) =>
                        `flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition-all ${
                          isActive 
                            ? "bg-primary text-primary-foreground"
                            : "text-muted-foreground hover:bg-[hsl(174,77%,56%)] hover:bg-opacity-10 hover:text-[hsl(174,77%,56%)]"
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
