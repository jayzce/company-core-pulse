
import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Calendar, Clock, CheckCircle, XCircle, AlertCircle, Users } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface AttendanceRecord {
  id: number
  employeeName: string
  date: string
  checkIn: string
  checkOut: string
  status: 'Present' | 'Late' | 'Absent' | 'Half Day'
  totalHours: number
  avatar?: string
}

const attendanceData: AttendanceRecord[] = [
  {
    id: 1,
    employeeName: "John Smith",
    date: "2024-07-10",
    checkIn: "09:00 AM",
    checkOut: "05:30 PM",
    status: "Present",
    totalHours: 8.5
  },
  {
    id: 2,
    employeeName: "Sarah Johnson",
    date: "2024-07-10",
    checkIn: "09:15 AM",
    checkOut: "05:45 PM",
    status: "Late",
    totalHours: 8.5
  },
  {
    id: 3,
    employeeName: "Mike Brown",
    date: "2024-07-10",
    checkIn: "-",
    checkOut: "-",
    status: "Absent",
    totalHours: 0
  },
  {
    id: 4,
    employeeName: "Emily Davis",
    date: "2024-07-10",
    checkIn: "09:00 AM",
    checkOut: "01:00 PM",
    status: "Half Day",
    totalHours: 4
  },
  {
    id: 5,
    employeeName: "David Wilson",
    date: "2024-07-10",
    checkIn: "08:45 AM",
    checkOut: "05:15 PM",
    status: "Present",
    totalHours: 8.5
  },
  {
    id: 6,
    employeeName: "Lisa Garcia",
    date: "2024-07-10",
    checkIn: "09:30 AM",
    checkOut: "05:45 PM",
    status: "Late",
    totalHours: 8.25
  }
]

export function AttendanceTracker() {
  const [selectedDate, setSelectedDate] = useState("2024-07-10")
  const [filterStatus, setFilterStatus] = useState("all")

  const filteredData = attendanceData.filter(record => {
    const matchesStatus = filterStatus === "all" || record.status === filterStatus
    return matchesStatus
  })

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Present': return <CheckCircle className="h-4 w-4 text-green-600" />
      case 'Late': return <AlertCircle className="h-4 w-4 text-yellow-600" />
      case 'Absent': return <XCircle className="h-4 w-4 text-red-600" />
      case 'Half Day': return <Clock className="h-4 w-4 text-blue-600" />
      default: return <Clock className="h-4 w-4 text-gray-600" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Present': return 'bg-green-100 text-green-800'
      case 'Late': return 'bg-yellow-100 text-yellow-800'
      case 'Absent': return 'bg-red-100 text-red-800'
      case 'Half Day': return 'bg-blue-100 text-blue-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase()
  }

  const attendanceStats = {
    present: filteredData.filter(r => r.status === 'Present').length,
    late: filteredData.filter(r => r.status === 'Late').length,
    absent: filteredData.filter(r => r.status === 'Absent').length,
    halfDay: filteredData.filter(r => r.status === 'Half Day').length,
    total: filteredData.length
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Attendance Tracker</h1>
          <p className="text-muted-foreground">Monitor daily attendance and working hours</p>
        </div>
        <div className="flex items-center space-x-2">
          <Calendar className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm text-muted-foreground">Today: {new Date().toLocaleDateString()}</span>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Present</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{attendanceStats.present}</div>
            <p className="text-xs text-muted-foreground">
              {((attendanceStats.present / attendanceStats.total) * 100).toFixed(1)}% of total
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Late</CardTitle>
            <AlertCircle className="h-4 w-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">{attendanceStats.late}</div>
            <p className="text-xs text-muted-foreground">
              {((attendanceStats.late / attendanceStats.total) * 100).toFixed(1)}% of total
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Absent</CardTitle>
            <XCircle className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{attendanceStats.absent}</div>
            <p className="text-xs text-muted-foreground">
              {((attendanceStats.absent / attendanceStats.total) * 100).toFixed(1)}% of total
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Half Day</CardTitle>
            <Clock className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{attendanceStats.halfDay}</div>
            <p className="text-xs text-muted-foreground">
              {((attendanceStats.halfDay / attendanceStats.total) * 100).toFixed(1)}% of total
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Filter Attendance</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4">
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Filter by Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="Present">Present</SelectItem>
                <SelectItem value="Late">Late</SelectItem>
                <SelectItem value="Absent">Absent</SelectItem>
                <SelectItem value="Half Day">Half Day</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Attendance List */}
      <Card>
        <CardHeader>
          <CardTitle>Daily Attendance</CardTitle>
          <CardDescription>Employee attendance for {new Date(selectedDate).toLocaleDateString()}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredData.map((record) => (
              <div key={record.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                <div className="flex items-center space-x-4">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={record.avatar} />
                    <AvatarFallback className="bg-primary text-primary-foreground">
                      {getInitials(record.employeeName)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-medium">{record.employeeName}</h3>
                    <p className="text-sm text-muted-foreground">
                      {record.checkIn !== '-' ? `${record.checkIn} - ${record.checkOut}` : 'No check-in recorded'}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="text-right">
                    <p className="text-sm font-medium">{record.totalHours}h</p>
                    <p className="text-xs text-muted-foreground">Total Hours</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    {getStatusIcon(record.status)}
                    <Badge className={getStatusColor(record.status)}>
                      {record.status}
                    </Badge>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
