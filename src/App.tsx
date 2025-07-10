
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { Search, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Index from "./pages/Index";
import EmployeesPage from "./pages/EmployeesPage";
import AttendancePage from "./pages/AttendancePage";
import ReportsPage from "./pages/ReportsPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <SidebarProvider>
          <div className="min-h-screen flex w-full bg-background">
            <AppSidebar />
            <main className="flex-1 flex flex-col">
              <header className="h-16 flex items-center justify-between border-b border-border bg-background px-6">
                <div className="flex items-center gap-4">
                  <SidebarTrigger />
                  <h1 className="text-2xl font-semibold text-foreground">Dashboard</h1>
                </div>
                
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                    <Input 
                      placeholder="Search employees, attendance..." 
                      className="pl-10 w-80 bg-input border-border"
                    />
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                      <span className="text-primary-foreground font-medium text-sm">AU</span>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-medium text-foreground">Admin User</div>
                      <div className="text-xs text-muted-foreground">Administrator</div>
                    </div>
                    <Button variant="ghost" size="sm" className="text-primary hover:bg-primary/10">
                      <LogOut className="h-4 w-4 mr-2" />
                      Logout
                    </Button>
                  </div>
                </div>
              </header>
              
              <div className="flex-1 p-6">
                <Routes>
                  <Route path="/" element={<Index />} />
                  <Route path="/employees" element={<EmployeesPage />} />
                  <Route path="/attendance" element={<AttendancePage />} />
                  <Route path="/reports" element={<ReportsPage />} />
                  {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </div>
            </main>
          </div>
        </SidebarProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
