
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { CalendarDays, DollarSign, TrendingUp, Users, Download, Filter, Calendar } from "lucide-react"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from "recharts"

export function Reports() {
  const attendanceData = [
    { month: "Jan", present: 92, absent: 8 },
    { month: "Feb", present: 88, absent: 12 },
    { month: "Mar", present: 95, absent: 5 },
    { month: "Apr", present: 90, absent: 10 },
    { month: "May", present: 93, absent: 7 },
    { month: "Jun", present: 91, absent: 9 },
  ]

  const expenseData = [
    { month: "Jan", salaries: 245000, benefits: 49000, overhead: 25000 },
    { month: "Feb", salaries: 248000, benefits: 50000, overhead: 26000 },
    { month: "Mar", salaries: 252000, benefits: 51000, overhead: 27000 },
    { month: "Apr", salaries: 255000, benefits: 52000, overhead: 28000 },
    { month: "May", salaries: 258000, benefits: 53000, overhead: 29000 },
    { month: "Jun", salaries: 261000, benefits: 54000, overhead: 30000 },
  ]

  const departmentExpenses = [
    { name: "Engineering", value: 125000, color: "#8b5cf6" },
    { name: "Operations", value: 85000, color: "#06b6d4" },
    { name: "Design", value: 65000, color: "#10b981" },
    { name: "Marketing", value: 45000, color: "#f59e0b" },
    { name: "HR", value: 35000, color: "#ef4444" },
  ]

  const employeeExpenses = [
    {
      name: "Alice Smith",
      position: "Senior Developer",
      department: "Engineering",
      salary: 95000,
      benefits: 19000,
      attendance: 96,
      totalCost: 114000
    },
    {
      name: "Bob Johnson",
      position: "Project Manager",
      department: "Operations",
      salary: 78000,
      benefits: 15600,
      attendance: 98,
      totalCost: 93600
    },
    {
      name: "Carol Davis",
      position: "UX Designer",
      department: "Design",
      salary: 72000,
      benefits: 14400,
      attendance: 92,
      totalCost: 86400
    },
    {
      name: "David Wilson",
      position: "Marketing Lead",
      department: "Marketing",
      salary: 85000,
      benefits: 17000,
      attendance: 94,
      totalCost: 102000
    },
    {
      name: "Emma Brown",
      position: "HR Manager",
      department: "HR",
      salary: 68000,
      benefits: 13600,
      attendance: 97,
      totalCost: 81600
    },
  ]

  const stats = [
    {
      title: "Total Monthly Payroll",
      value: "$261,000",
      change: "+1.2% from last month",
      icon: DollarSign,
      bgColor: "bg-green-500/10",
      iconColor: "text-green-400"
    },
    {
      title: "Average Attendance",
      value: "91.7%",
      change: "-2.1% from last month",
      icon: CalendarDays,
      bgColor: "bg-blue-500/10",
      iconColor: "text-blue-400"
    },
    {
      title: "Cost Per Employee",
      value: "$10,875",
      change: "Including benefits",
      icon: Users,
      bgColor: "bg-purple-500/10",
      iconColor: "text-purple-400"
    },
    {
      title: "YTD Growth",
      value: "6.5%",
      change: "Operational expenses",
      icon: TrendingUp,
      bgColor: "bg-orange-500/10",
      iconColor: "text-orange-400"
    }
  ]

  const chartConfig = {
    present: { label: "Present", color: "hsl(var(--primary))" },
    absent: { label: "Absent", color: "hsl(var(--muted))" },
    salaries: { label: "Salaries", color: "hsl(var(--primary))" },
    benefits: { label: "Benefits", color: "hsl(var(--secondary))" },
    overhead: { label: "Overhead", color: "hsl(var(--muted))" },
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Reports</h1>
          <p className="text-muted-foreground">Attendance and operational expense analytics</p>
        </div>
        <div className="flex gap-2">
          <Select defaultValue="current-month">
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="current-month">Current Month</SelectItem>
              <SelectItem value="last-month">Last Month</SelectItem>
              <SelectItem value="quarter">This Quarter</SelectItem>
              <SelectItem value="year">This Year</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" className="border-border">
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </Button>
          <Button variant="outline" className="border-border">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.title} className="bg-card border-border">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground mb-2">{stat.title}</p>
                  <p className="text-2xl font-bold text-foreground">{stat.value}</p>
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

      {/* Main Reports */}
      <Tabs defaultValue="attendance" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="attendance">Attendance Reports</TabsTrigger>
          <TabsTrigger value="expenses">Expense Reports</TabsTrigger>
          <TabsTrigger value="employee">Employee Analysis</TabsTrigger>
        </TabsList>

        <TabsContent value="attendance" className="space-y-6">
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="text-foreground">Monthly Attendance Trends</CardTitle>
              <CardDescription>Employee attendance rates over the past 6 months</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ChartContainer config={chartConfig}>
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={attendanceData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Bar dataKey="present" fill="var(--color-present)" />
                      <Bar dataKey="absent" fill="var(--color-absent)" />
                    </BarChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="expenses" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="text-foreground">Monthly Expenses</CardTitle>
                <CardDescription>Breakdown of operational costs</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ChartContainer config={chartConfig}>
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={expenseData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <Line type="monotone" dataKey="salaries" stroke="var(--color-salaries)" strokeWidth={2} />
                        <Line type="monotone" dataKey="benefits" stroke="var(--color-benefits)" strokeWidth={2} />
                        <Line type="monotone" dataKey="overhead" stroke="var(--color-overhead)" strokeWidth={2} />
                      </LineChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="text-foreground">Department Expenses</CardTitle>
                <CardDescription>Current month expense distribution</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={departmentExpenses}
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {departmentExpenses.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <ChartTooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="mt-4 space-y-2">
                  {departmentExpenses.map((dept) => (
                    <div key={dept.name} className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: dept.color }} />
                        <span className="text-sm text-foreground">{dept.name}</span>
                      </div>
                      <span className="text-sm font-medium text-foreground">${dept.value.toLocaleString()}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="employee" className="space-y-6">
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="text-foreground">Employee Cost Analysis</CardTitle>
              <CardDescription>Individual employee costs including salary, benefits, and attendance</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow className="border-border">
                    <TableHead className="text-muted-foreground">EMPLOYEE</TableHead>
                    <TableHead className="text-muted-foreground">DEPARTMENT</TableHead>
                    <TableHead className="text-muted-foreground">BASE SALARY</TableHead>
                    <TableHead className="text-muted-foreground">BENEFITS</TableHead>
                    <TableHead className="text-muted-foreground">ATTENDANCE</TableHead>
                    <TableHead className="text-muted-foreground">TOTAL COST</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {employeeExpenses.map((employee, index) => (
                    <TableRow key={index} className="border-border hover:bg-muted/30">
                      <TableCell>
                        <div>
                          <div className="font-medium text-foreground">{employee.name}</div>
                          <div className="text-sm text-muted-foreground">{employee.position}</div>
                        </div>
                      </TableCell>
                      <TableCell className="text-foreground">{employee.department}</TableCell>
                      <TableCell className="text-foreground">${employee.salary.toLocaleString()}</TableCell>
                      <TableCell className="text-foreground">${employee.benefits.toLocaleString()}</TableCell>
                      <TableCell>
                        <Badge 
                          variant={employee.attendance >= 95 ? 'default' : employee.attendance >= 90 ? 'secondary' : 'destructive'}
                          className={
                            employee.attendance >= 95 
                              ? 'bg-green-500/20 text-green-400 border-green-500/30' 
                              : employee.attendance >= 90
                              ? 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30'
                              : 'bg-red-500/20 text-red-400 border-red-500/30'
                          }
                        >
                          {employee.attendance}%
                        </Badge>
                      </TableCell>
                      <TableCell className="font-medium text-foreground">${employee.totalCost.toLocaleString()}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
