
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Users, Clock, Calendar, TrendingUp, UserCheck, UserX, DollarSign, FileText } from "lucide-react"

export function Dashboard() {
  const stats = [
    {
      title: "Total Employees",
      value: "247",
      change: "+12%",
      changeType: "positive" as const,
      icon: Users,
      color: "text-blue-600"
    },
    {
      title: "Present Today",
      value: "234",
      change: "94.7%",
      changeType: "positive" as const,
      icon: UserCheck,
      color: "text-green-600"
    },
    {
      title: "On Leave",
      value: "13",
      change: "-2%",
      changeType: "negative" as const,
      icon: Calendar,
      color: "text-orange-600"
    },
    {
      title: "Pending Requests",
      value: "8",
      change: "+3",
      changeType: "neutral" as const,
      icon: Clock,
      color: "text-purple-600"
    }
  ]

  const recentActivities = [
    { name: "John Smith", action: "submitted leave request", time: "2 hours ago", type: "leave" },
    { name: "Sarah Johnson", action: "checked in", time: "3 hours ago", type: "attendance" },
    { name: "Mike Brown", action: "updated profile", time: "5 hours ago", type: "profile" },
    { name: "Emily Davis", action: "submitted timesheet", time: "1 day ago", type: "timesheet" },
  ]

  const upcomingEvents = [
    { title: "Team Meeting", date: "Today, 2:00 PM", type: "meeting" },
    { title: "Performance Reviews", date: "Tomorrow", type: "review" },
    { title: "Training Session", date: "Friday, 10:00 AM", type: "training" },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">Welcome back! Here's what's happening in your organization.</p>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.title} className="hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <stat.icon className={`h-4 w-4 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">
                <Badge 
                  variant={stat.changeType === 'positive' ? 'default' : stat.changeType === 'negative' ? 'destructive' : 'secondary'}
                  className="text-xs"
                >
                  {stat.change}
                </Badge>
                {" "}from last month
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        {/* Recent Activities */}
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Recent Activities</CardTitle>
            <CardDescription>Latest updates from your team</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivities.map((activity, index) => (
                <div key={index} className="flex items-center space-x-4">
                  <div className="flex-shrink-0">
                    <div className={`w-2 h-2 rounded-full ${
                      activity.type === 'leave' ? 'bg-orange-500' :
                      activity.type === 'attendance' ? 'bg-green-500' :
                      activity.type === 'profile' ? 'bg-blue-500' :
                      'bg-purple-500'
                    }`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900">
                      <span className="font-semibold">{activity.name}</span> {activity.action}
                    </p>
                    <p className="text-sm text-gray-500">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Upcoming Events */}
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Upcoming Events</CardTitle>
            <CardDescription>Don't miss these important events</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {upcomingEvents.map((event, index) => (
                <div key={index} className="flex items-center space-x-4">
                  <div className="flex-shrink-0">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium">{event.title}</p>
                    <p className="text-xs text-muted-foreground">{event.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Department Overview */}
      <Card>
        <CardHeader>
          <CardTitle>Department Overview</CardTitle>
          <CardDescription>Employee distribution across departments</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {[
              { name: "Engineering", count: 78, total: 85, color: "bg-blue-500" },
              { name: "Sales", count: 45, total: 50, color: "bg-green-500" },
              { name: "Marketing", count: 32, total: 35, color: "bg-purple-500" },
              { name: "HR", count: 12, total: 15, color: "bg-orange-500" },
            ].map((dept) => (
              <div key={dept.name} className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="font-medium">{dept.name}</span>
                  <span className="text-muted-foreground">{dept.count}/{dept.total}</span>
                </div>
                <Progress value={(dept.count / dept.total) * 100} className="h-2" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
