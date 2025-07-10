
import { Building2, Users, Calendar, ClipboardList, BarChart3, Settings, Home, UserPlus, Clock, FileText } from "lucide-react"
import { NavLink, useLocation } from "react-router-dom"

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
  useSidebar,
} from "@/components/ui/sidebar"

const items = [
  { title: "Dashboard", url: "/", icon: Home },
  { title: "Employees", url: "/employees", icon: Users },
  { title: "Add Employee", url: "/add-employee", icon: UserPlus },
  { title: "Attendance", url: "/attendance", icon: Clock },
  { title: "Leave Management", url: "/leave", icon: Calendar },
  { title: "Payroll", url: "/payroll", icon: FileText },
  { title: "Reports", url: "/reports", icon: BarChart3 },
  { title: "Settings", url: "/settings", icon: Settings },
]

export function AppSidebar() {
  const { collapsed } = useSidebar()
  const location = useLocation()
  const currentPath = location.pathname

  const isActive = (path: string) => currentPath === path
  const getNavCls = ({ isActive }: { isActive: boolean }) =>
    isActive ? "bg-sidebar-accent text-sidebar-accent-foreground font-medium" : "hover:bg-sidebar-accent/50 text-sidebar-foreground"

  return (
    <Sidebar
      className={collapsed ? "w-14" : "w-64"}
      collapsible
    >
      <SidebarHeader className="p-4">
        <div className="flex items-center space-x-2">
          <Building2 className="h-8 w-8 text-sidebar-primary" />
          {!collapsed && (
            <div>
              <h1 className="text-lg font-bold text-sidebar-foreground">HRIS</h1>
              <p className="text-xs text-sidebar-foreground/70">HR Management</p>
            </div>
          )}
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-sidebar-foreground/70">Menu</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink to={item.url} end className={getNavCls}>
                      <item.icon className="h-4 w-4" />
                      {!collapsed && <span>{item.title}</span>}
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
