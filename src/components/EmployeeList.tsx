
import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Search, Filter, Plus, Mail, Phone, MapPin, Edit, Trash2, Eye, Building, Calendar, User } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { AddEmployeeDialog } from "./AddEmployeeDialog"
import { EditEmployeeDialog } from "./EditEmployeeDialog"
import { useToast } from "@/hooks/use-toast"
import { supabase } from "@/integrations/supabase/client"

interface Employee {
  id: string
  employee_number?: string
  first_name: string
  last_name: string
  email: string
  department: string
  position: string
  status: string
  hire_date: string
  salary?: number
  home_address?: string
  emergency_contact_name?: string
  emergency_contact_relation?: string
  emergency_contact_phone?: string
  emergency_contact_address?: string
  previous_employer?: string
  previous_company_name?: string
  previous_company_address?: string
  contact_number?: string
  employment_details?: string
  immediate_supervisor?: string
}


export function EmployeeList() {
  const [employees, setEmployees] = useState<Employee[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [filterDepartment, setFilterDepartment] = useState("all")
  const [filterStatus, setFilterStatus] = useState("all")
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null)
  const [isDetailsDialogOpen, setIsDetailsDialogOpen] = useState(false)
  const [loading, setLoading] = useState(true)
  const { toast } = useToast()

  useEffect(() => {
    loadEmployees()
  }, [])

  const loadEmployees = async () => {
    try {
      const { data, error } = await supabase
        .from('employees')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) throw error
      setEmployees(data || [])
    } catch (error) {
      console.error('Error loading employees:', error)
      toast({
        title: "Error",
        description: "Failed to load employees",
        variant: "destructive"
      })
    } finally {
      setLoading(false)
    }
  }

  const filteredEmployees = employees.filter(employee => {
    const fullName = `${employee.first_name} ${employee.last_name}`
    const matchesSearch = fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         employee.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         employee.department.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesDepartment = filterDepartment === "all" || employee.department === filterDepartment
    const matchesStatus = filterStatus === "all" || employee.status === filterStatus

    return matchesSearch && matchesDepartment && matchesStatus
  })

  const handleAddEmployee = () => {
    loadEmployees() // Reload data after adding
    toast({ title: "Success", description: "Employee added successfully" })
  }

  const handleEditEmployee = (employee: Employee) => {
    setSelectedEmployee(employee)
    setIsEditDialogOpen(true)
  }

  const handleUpdateEmployee = () => {
    loadEmployees() // Reload data after updating
    toast({ title: "Success", description: "Employee updated successfully" })
  }

  const handleDeleteEmployee = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this employee?")) {
      try {
        const { error } = await supabase
          .from('employees')
          .delete()
          .eq('id', id)

        if (error) throw error
        
        setEmployees(prev => prev.filter(e => e.id !== id))
        toast({ title: "Success", description: "Employee deleted successfully" })
      } catch (error) {
        console.error('Error deleting employee:', error)
        toast({
          title: "Error",
          description: "Failed to delete employee",
          variant: "destructive"
        })
      }
    }
  }

  const handleViewDetails = (employee: Employee) => {
    setSelectedEmployee(employee)
    setIsDetailsDialogOpen(true)
  }

  const getStatusColor = (status: string) => {
    switch (status?.toLowerCase()) {
      case 'active': return 'bg-green-100 text-green-800'
      case 'inactive': return 'bg-red-100 text-red-800'
      case 'on leave': return 'bg-yellow-100 text-yellow-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getInitials = (firstName: string, lastName: string) => {
    return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase()
  }

  if (loading) {
    return <div className="text-center py-8">Loading employees...</div>
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Employees</h1>
          <p className="text-muted-foreground">Manage your organization's workforce</p>
        </div>
        <Button className="flex items-center gap-2" onClick={() => setIsAddDialogOpen(true)}>
          <Plus className="h-4 w-4" />
          Add Employee
        </Button>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Search & Filter</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search employees..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={filterDepartment} onValueChange={setFilterDepartment}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Filter by Department" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Departments</SelectItem>
                <SelectItem value="Engineering">Engineering</SelectItem>
                <SelectItem value="Marketing">Marketing</SelectItem>
                <SelectItem value="Sales">Sales</SelectItem>
                <SelectItem value="HR">HR</SelectItem>
                <SelectItem value="Finance">Finance</SelectItem>
              </SelectContent>
            </Select>
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Filter by Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="Active">Active</SelectItem>
                <SelectItem value="Inactive">Inactive</SelectItem>
                <SelectItem value="On Leave">On Leave</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Employee Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredEmployees.map((employee) => {
          const fullName = `${employee.first_name} ${employee.last_name}`
          return (
            <Card key={employee.id} className="hover:shadow-lg transition-shadow">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Avatar className="h-12 w-12">
                      <AvatarFallback className="bg-primary text-primary-foreground">
                        {getInitials(employee.first_name, employee.last_name)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="font-semibold text-lg">{fullName}</h3>
                      <p className="text-sm text-muted-foreground">{employee.position}</p>
                    </div>
                  </div>
                  <Badge className={getStatusColor(employee.status)}>
                    {employee.status}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center space-x-2 text-sm">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <span className="truncate">{employee.email}</span>
                </div>
                {employee.contact_number && (
                  <div className="flex items-center space-x-2 text-sm">
                    <Phone className="h-4 w-4 text-muted-foreground" />
                    <span>{employee.contact_number}</span>
                  </div>
                )}
                {employee.employee_number && (
                  <div className="flex items-center space-x-2 text-sm">
                    <User className="h-4 w-4 text-muted-foreground" />
                    <span>ID: {employee.employee_number}</span>
                  </div>
                )}
                <div className="pt-2 border-t">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-muted-foreground">Department:</span>
                    <Badge variant="outline">{employee.department}</Badge>
                  </div>
                  <div className="flex justify-between items-center text-sm mt-1">
                    <span className="text-muted-foreground">Hired:</span>
                    <span>{new Date(employee.hire_date).toLocaleDateString()}</span>
                  </div>
                  {employee.immediate_supervisor && (
                    <div className="flex justify-between items-center text-sm mt-1">
                      <span className="text-muted-foreground">Supervisor:</span>
                      <span className="truncate">{employee.immediate_supervisor}</span>
                    </div>
                  )}
                </div>
                <div className="flex justify-between space-x-2 pt-2">
                  <Button variant="outline" size="sm" onClick={() => handleViewDetails(employee)}>
                    <Eye className="h-4 w-4" />
                  </Button>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm" onClick={() => handleEditEmployee(employee)}>
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => handleDeleteEmployee(employee.id)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {filteredEmployees.length === 0 && (
        <Card>
          <CardContent className="text-center py-8">
            <p className="text-muted-foreground">No employees found matching your criteria.</p>
          </CardContent>
        </Card>
      )}

      <AddEmployeeDialog 
        open={isAddDialogOpen}
        onOpenChange={setIsAddDialogOpen}
        onEmployeeAdded={handleAddEmployee}
      />

      {selectedEmployee && (
        <EditEmployeeDialog
          employee={selectedEmployee}
          open={isEditDialogOpen}
          onOpenChange={setIsEditDialogOpen}
          onEmployeeUpdated={handleUpdateEmployee}
        />
      )}

      {selectedEmployee && (
        <Dialog open={isDetailsDialogOpen} onOpenChange={setIsDetailsDialogOpen}>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                Employee Details - {selectedEmployee.first_name} {selectedEmployee.last_name}
              </DialogTitle>
            </DialogHeader>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Basic Information */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Basic Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div>
                    <span className="font-medium">Employee ID:</span>
                    <p className="text-sm text-muted-foreground">{selectedEmployee.employee_number || 'N/A'}</p>
                  </div>
                  <div>
                    <span className="font-medium">Email:</span>
                    <p className="text-sm text-muted-foreground">{selectedEmployee.email}</p>
                  </div>
                  <div>
                    <span className="font-medium">Contact Number:</span>
                    <p className="text-sm text-muted-foreground">{selectedEmployee.contact_number || 'N/A'}</p>
                  </div>
                  <div>
                    <span className="font-medium">Home Address:</span>
                    <p className="text-sm text-muted-foreground">{selectedEmployee.home_address || 'N/A'}</p>
                  </div>
                  <div>
                    <span className="font-medium">Status:</span>
                    <Badge className={getStatusColor(selectedEmployee.status)}>{selectedEmployee.status}</Badge>
                  </div>
                </CardContent>
              </Card>

              {/* Employment Information */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Employment Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div>
                    <span className="font-medium">Department:</span>
                    <p className="text-sm text-muted-foreground">{selectedEmployee.department}</p>
                  </div>
                  <div>
                    <span className="font-medium">Position:</span>
                    <p className="text-sm text-muted-foreground">{selectedEmployee.position}</p>
                  </div>
                  <div>
                    <span className="font-medium">Hire Date:</span>
                    <p className="text-sm text-muted-foreground">{new Date(selectedEmployee.hire_date).toLocaleDateString()}</p>
                  </div>
                  <div>
                    <span className="font-medium">Salary:</span>
                    <p className="text-sm text-muted-foreground">{selectedEmployee.salary ? `$${selectedEmployee.salary.toLocaleString()}` : 'N/A'}</p>
                  </div>
                  <div>
                    <span className="font-medium">Immediate Supervisor:</span>
                    <p className="text-sm text-muted-foreground">{selectedEmployee.immediate_supervisor || 'N/A'}</p>
                  </div>
                  {selectedEmployee.employment_details && (
                    <div>
                      <span className="font-medium">Employment Details:</span>
                      <p className="text-sm text-muted-foreground">{selectedEmployee.employment_details}</p>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Previous Employment */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Previous Employment</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div>
                    <span className="font-medium">Previous Employer:</span>
                    <p className="text-sm text-muted-foreground">{selectedEmployee.previous_employer || 'N/A'}</p>
                  </div>
                  <div>
                    <span className="font-medium">Company Name:</span>
                    <p className="text-sm text-muted-foreground">{selectedEmployee.previous_company_name || 'N/A'}</p>
                  </div>
                  <div>
                    <span className="font-medium">Company Address:</span>
                    <p className="text-sm text-muted-foreground">{selectedEmployee.previous_company_address || 'N/A'}</p>
                  </div>
                </CardContent>
              </Card>

              {/* Emergency Contact */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Emergency Contact</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div>
                    <span className="font-medium">Contact Name:</span>
                    <p className="text-sm text-muted-foreground">{selectedEmployee.emergency_contact_name || 'N/A'}</p>
                  </div>
                  <div>
                    <span className="font-medium">Relationship:</span>
                    <p className="text-sm text-muted-foreground">{selectedEmployee.emergency_contact_relation || 'N/A'}</p>
                  </div>
                  <div>
                    <span className="font-medium">Phone Number:</span>
                    <p className="text-sm text-muted-foreground">{selectedEmployee.emergency_contact_phone || 'N/A'}</p>
                  </div>
                  <div>
                    <span className="font-medium">Address:</span>
                    <p className="text-sm text-muted-foreground">{selectedEmployee.emergency_contact_address || 'N/A'}</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  )
}
