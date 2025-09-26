import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Calendar } from "@/components/ui/calendar"
import { ChevronLeft, ChevronRight, Gift, MapPin, Calendar as CalendarIcon } from "lucide-react"
import { supabase } from "@/integrations/supabase/client"
import { useAuth } from "@/contexts/AuthContext"

interface DashboardStats {
  totalEmployees: number
  present: number
  late: number
  annualLeave: number
}

interface Employee {
  id: string
  first_name: string
  last_name: string
  position: string
  department: string
  status: string
}

export function Dashboard() {
  const { user } = useAuth()
  const [stats, setStats] = useState<DashboardStats>({
    totalEmployees: 350,
    present: 390,
    late: 40,
    annualLeave: 50
  })
  const [employees, setEmployees] = useState<Employee[]>([])
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date())

  useEffect(() => {
    fetchEmployees()
  }, [])

  const fetchEmployees = async () => {
    const { data, error } = await supabase
      .from('employees')
      .select('id, first_name, last_name, position, department, status')
      .limit(3)

    if (error) {
      console.error('Error fetching employees:', error)
    } else {
      setEmployees(data || [])
    }
  }

  const userName = user?.user_metadata?.first_name || user?.email?.split('@')[0] || 'User'

  return (
    <div className="min-h-screen bg-background">
      {/* Welcome Section with Calendar */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-2">
        {/* Welcome Card */}
        <div className="lg:col-span-2">
          <div className="relative bg-sidebar-background rounded-2xl p-8 overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 opacity-20">
              {/* Decorative lines */}
              <svg viewBox="0 0 100 100" className="w-full h-full">
                <path d="M20,20 Q80,10 90,80" stroke="currentColor" strokeWidth="2" fill="none" />
                <path d="M10,40 Q70,30 80,90" stroke="currentColor" strokeWidth="1" fill="none" />
              </svg>
            </div>
            <div className="flex items-center justify-between">
              <div className="text-sidebar-foreground">
                <h1 className="text-3xl font-bold mb-2">Welcome, {userName}!</h1>
                <p className="text-sidebar-foreground/90 mb-6">You have 5 Pending task, lets see what you can do today!</p>
                <Button className="bg-sidebar-foreground text-sidebar-background hover:bg-sidebar-foreground/90 rounded-lg px-6">
                  Check Now
                </Button>
              </div>
              <div className="hidden md:block">
                <img 
                  src="/assets/professional-person.jpg" 
                  alt="Welcome" 
                  className="w-48 h-48 object-cover rounded-full"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Calendar */}
        <div>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div className="flex items-center gap-2">
                <ChevronLeft className="w-4 h-4" />
                <ChevronRight className="w-4 h-4" />
              </div>
            </CardHeader>
            <CardContent>
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={setSelectedDate}
                className="rounded-md"
              />
              <Button className="w-full mt-4" variant="outline">
                <span className="mr-2">+</span>
                Add Schedule
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-2">
        {/* Left Section */}
        <div className="lg:col-span-2 space-y-8">
          {/* Statistics Cards */}
          <div className="grid grid-cols-4 gap-4">
            <Card className="bg-stat-blue/20 border-stat-blue/30">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Total Employees</p>
                    <p className="text-3xl font-bold text-primary">{stats.totalEmployees}</p>
                  </div>
                  <div className="w-12 h-12 bg-stat-blue rounded-full flex items-center justify-center">
                    <div className="w-6 h-6 bg-blue-500 rounded"></div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-stat-orange/20 border-stat-orange/30">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Present</p>
                    <p className="text-3xl font-bold text-orange-600">{stats.present}</p>
                  </div>
                  <div className="w-12 h-12 bg-stat-orange rounded-full flex items-center justify-center">
                    <div className="w-6 h-6 bg-orange-500 rounded"></div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-stat-pink/20 border-stat-pink/30">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Late</p>
                    <p className="text-3xl font-bold text-pink-600">{stats.late}</p>
                  </div>
                  <div className="w-12 h-12 bg-stat-pink rounded-full flex items-center justify-center">
                    <div className="w-6 h-6 bg-pink-500 rounded"></div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-stat-purple/20 border-stat-purple/30">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Annual Leave</p>
                    <p className="text-3xl font-bold text-purple-600">{stats.annualLeave}</p>
                  </div>
                  <div className="w-12 h-12 bg-stat-purple rounded-full flex items-center justify-center">
                    <div className="w-6 h-6 bg-purple-500 rounded"></div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Task Statistics and Star Employee */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Task Statistics Chart */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Task Statistic</CardTitle>
                <Button variant="ghost" size="icon">
                  <span className="sr-only">More options</span>
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
                  </svg>
                </Button>
              </CardHeader>
              <CardContent>
                <div className="relative w-48 h-48 mx-auto mb-6">
                  <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                    <circle cx="50" cy="50" r="40" fill="none" stroke="#e5e7eb" strokeWidth="8" />
                    <circle 
                      cx="50" 
                      cy="50" 
                      r="40" 
                      fill="none" 
                      stroke="url(#gradient)" 
                      strokeWidth="8"
                      strokeLinecap="round"
                      strokeDasharray={`${70 * 2.51} 251`}
                    />
                    <defs>
                      <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#10b981" />
                        <stop offset="25%" stopColor="#3b82f6" />
                        <stop offset="50%" stopColor="#f59e0b" />
                        <stop offset="75%" stopColor="#ef4444" />
                      </linearGradient>
                    </defs>
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-4xl font-bold text-foreground">70%</span>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <span className="text-sm text-muted-foreground">In Progress</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                    <span className="text-sm text-muted-foreground">Completed</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                    <span className="text-sm text-muted-foreground">On Hold</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    <span className="text-sm text-muted-foreground">Rejected</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Star Employee */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Star Employee</CardTitle>
                <Button variant="ghost" size="icon">
                  <span className="sr-only">More options</span>
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
                  </svg>
                </Button>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarImage src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face" />
                    <AvatarFallback>JD</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <h4 className="font-medium">John Doe</h4>
                    <p className="text-sm text-muted-foreground">Marcomm Senior Officer</p>
                    <p className="text-xs text-muted-foreground">50 Tasks finished this month</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarImage src="https://images.unsplash.com/photo-1494790108755-2616b612b786?w=40&h=40&fit=crop&crop=face" />
                    <AvatarFallback>AC</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <h4 className="font-medium">Arabella Chloe</h4>
                    <p className="text-sm text-muted-foreground">UI / UX Designer</p>
                    <p className="text-xs text-muted-foreground">25 Tasks finished this month</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

        </div>

        {/* Right Section */}
        <div className="space-y-6">

          {/* Schedule & Holidays */}
          <Card>
            <CardHeader>
              <CardTitle>Schedule & Holidays</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                  <CalendarIcon className="w-4 h-4 text-blue-600" />
                </div>
                <div className="flex-1">
                  <p className="font-medium">Huddle Meeting</p>
                  <p className="text-sm text-muted-foreground">Meeting Day</p>
                </div>
                <span className="text-xs text-muted-foreground">06/04/2022</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                  <CalendarIcon className="w-4 h-4 text-green-600" />
                </div>
                <div className="flex-1">
                  <p className="font-medium">Annual Meeting</p>
                  <p className="text-sm text-muted-foreground">Meeting Day</p>
                </div>
                <span className="text-xs text-muted-foreground">06/04/2022</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
                  <Gift className="w-4 h-4 text-red-600" />
                </div>
                <div className="flex-1">
                  <p className="font-medium">Good Friday</p>
                  <p className="text-sm text-muted-foreground">Public Holiday</p>
                </div>
                <span className="text-xs text-muted-foreground">02/04/2022</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                  <CalendarIcon className="w-4 h-4 text-purple-600" />
                </div>
                <div className="flex-1">
                  <p className="font-medium">Regional Meeting</p>
                  <p className="text-sm text-muted-foreground">Meeting Day</p>
                </div>
                <span className="text-xs text-muted-foreground">06/04/2022</span>
              </div>
            </CardContent>
          </Card>

          {/* Birthdays */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Birthdays</CardTitle>
              <select className="text-sm border rounded px-2 py-1">
                <option>This Month</option>
              </select>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-3">
                <Avatar>
                  <AvatarImage src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face" />
                  <AvatarFallback>DP</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <p className="font-medium">Dessy Path</p>
                  <p className="text-sm text-muted-foreground">Finance Specialist</p>
                </div>
                <Button size="sm" className="bg-primary text-primary-foreground">
                  Send Gift
                </Button>
              </div>
              <div className="flex items-center gap-3">
                <Avatar>
                  <AvatarImage src="https://images.unsplash.com/photo-1494790108755-2616b612b786?w=40&h=40&fit=crop&crop=face" />
                  <AvatarFallback>AD</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <p className="font-medium">Anastasia Dee</p>
                  <p className="text-sm text-muted-foreground">Graphic Designer</p>
                </div>
                <span className="text-xs text-muted-foreground">07/04/2022</span>
              </div>
              <div className="flex items-center gap-3">
                <Avatar>
                  <AvatarImage src="https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=40&h=40&fit=crop&crop=face" />
                  <AvatarFallback>AC</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <p className="font-medium">Arabella Chloe</p>
                  <p className="text-sm text-muted-foreground">UI / UX Designer</p>
                </div>
                <span className="text-xs text-muted-foreground">30/04/2022</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}