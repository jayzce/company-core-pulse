
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Users, UserCheck, UserX, Building2, Filter, Download } from "lucide-react"

export function Dashboard() {
  const stats = [
    {
      title: "Total Employees",
      value: "24",
      change: "+2 this month",
      icon: Users,
      bgColor: "bg-purple-500/10",
      iconColor: "text-purple-400"
    },
    {
      title: "Present Today",
      value: "22",
      change: "91.7% attendance",
      icon: UserCheck,
      bgColor: "bg-green-500/10",
      iconColor: "text-green-400"
    },
    {
      title: "On Leave",
      value: "2",
      change: "3 pending requests",
      icon: UserX,
      bgColor: "bg-orange-500/10",
      iconColor: "text-orange-400"
    },
    {
      title: "Departments",
      value: "8",
      change: "Active teams",
      icon: Building2,
      bgColor: "bg-blue-500/10",
      iconColor: "text-blue-400"
    }
  ]

  const recentActivity = [
    {
      employee: "Alice Smith",
      position: "Senior Developer",
      department: "Engineering",
      status: "PRESENT",
      checkIn: "09:15 AM",
      checkOut: "--:--",
      avatar: "AS"
    },
    {
      employee: "Bob Johnson",
      position: "Project Manager",
      department: "Operations",
      status: "PRESENT",
      checkIn: "08:45 AM",
      checkOut: "--:--",
      avatar: "BJ"
    },
    {
      employee: "Carol Davis",
      position: "UX Designer",
      department: "Design",
      status: "ON LEAVE",
      checkIn: "--:--",
      checkOut: "--:--",
      avatar: "CD"
    },
  ]

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.title} className="bg-card border-border">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground mb-2">{stat.title}</p>
                  <p className="text-3xl font-bold text-foreground">{stat.value}</p>
                  <p className="text-sm text-primary mt-1">{stat.change}</p>
                </div>
                <div className={`p-3 rounded-lg ${stat.bgColor}`}>
                  <stat.icon className={`h-6 w-6 ${stat.iconColor}`} />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recent Activity */}
      <Card className="bg-card border-border">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-foreground">Recent Activity</CardTitle>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" className="border-border text-muted-foreground">
                <Filter className="h-4 w-4 mr-2" />
                Filter
              </Button>
              <Button variant="outline" size="sm" className="border-border text-muted-foreground">
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow className="border-border hover:bg-muted/50">
                <TableHead className="text-muted-foreground">EMPLOYEE</TableHead>
                <TableHead className="text-muted-foreground">DEPARTMENT</TableHead>
                <TableHead className="text-muted-foreground">STATUS</TableHead>
                <TableHead className="text-muted-foreground">CHECK IN</TableHead>
                <TableHead className="text-muted-foreground">CHECK OUT</TableHead>
                <TableHead className="text-muted-foreground">ACTIONS</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recentActivity.map((activity, index) => (
                <TableRow key={index} className="border-border hover:bg-muted/30">
                  <TableCell>
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                        <span className="text-primary-foreground text-xs font-medium">
                          {activity.avatar}
                        </span>
                      </div>
                      <div>
                        <div className="font-medium text-foreground">{activity.employee}</div>
                        <div className="text-sm text-muted-foreground">{activity.position}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="text-muted-foreground">{activity.department}</TableCell>
                  <TableCell>
                    <Badge 
                      variant={activity.status === 'PRESENT' ? 'default' : 'secondary'}
                      className={
                        activity.status === 'PRESENT' 
                          ? 'bg-green-500/20 text-green-400 border-green-500/30' 
                          : 'bg-orange-500/20 text-orange-400 border-orange-500/30'
                      }
                    >
                      {activity.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-foreground">{activity.checkIn}</TableCell>
                  <TableCell className="text-foreground">{activity.checkOut}</TableCell>
                  <TableCell>
                    <Button variant="ghost" size="sm" className="text-primary hover:bg-primary/10">
                      Edit
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
