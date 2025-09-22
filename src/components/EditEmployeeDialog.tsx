import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { Edit } from "lucide-react"
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

interface EditEmployeeDialogProps {
  employee: Employee
  open: boolean
  onOpenChange: (open: boolean) => void
  onEmployeeUpdated: () => void
}

export function EditEmployeeDialog({ employee, open, onOpenChange, onEmployeeUpdated }: EditEmployeeDialogProps) {
  const { toast } = useToast()
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    contactNumber: "",
    department: "",
    position: "",
    salary: "",
    employeeNumber: "",
    homeAddress: "",
    hireDate: "",
    status: "",
    emergencyContactName: "",
    emergencyContactRelation: "",
    emergencyContactPhone: "",
    emergencyContactAddress: "",
    previousEmployer: "",
    previousCompanyName: "",
    previousCompanyAddress: "",
    employmentDetails: "",
    immediateSupervisor: ""
  })

  useEffect(() => {
    if (employee) {
      setFormData({
        firstName: employee.first_name || "",
        lastName: employee.last_name || "",
        email: employee.email || "",
        contactNumber: employee.contact_number || "",
        department: employee.department || "",
        position: employee.position || "",
        salary: employee.salary?.toString() || "",
        employeeNumber: employee.employee_number || "",
        homeAddress: employee.home_address || "",
        hireDate: employee.hire_date || "",
        status: employee.status || "",
        emergencyContactName: employee.emergency_contact_name || "",
        emergencyContactRelation: employee.emergency_contact_relation || "",
        emergencyContactPhone: employee.emergency_contact_phone || "",
        emergencyContactAddress: employee.emergency_contact_address || "",
        previousEmployer: employee.previous_employer || "",
        previousCompanyName: employee.previous_company_name || "",
        previousCompanyAddress: employee.previous_company_address || "",
        employmentDetails: employee.employment_details || "",
        immediateSupervisor: employee.immediate_supervisor || ""
      })
    }
  }, [employee])

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.department || !formData.position || !formData.hireDate) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields",
        variant: "destructive"
      })
      return
    }

    try {
      const { error } = await supabase
        .from('employees')
        .update({
          first_name: formData.firstName,
          last_name: formData.lastName,
          email: formData.email,
          contact_number: formData.contactNumber,
          department: formData.department,
          position: formData.position,
          salary: formData.salary ? parseFloat(formData.salary) : null,
          employee_number: formData.employeeNumber,
          home_address: formData.homeAddress,
          hire_date: formData.hireDate,
          status: formData.status,
          emergency_contact_name: formData.emergencyContactName,
          emergency_contact_relation: formData.emergencyContactRelation,
          emergency_contact_phone: formData.emergencyContactPhone,
          emergency_contact_address: formData.emergencyContactAddress,
          previous_employer: formData.previousEmployer,
          previous_company_name: formData.previousCompanyName,
          previous_company_address: formData.previousCompanyAddress,
          employment_details: formData.employmentDetails,
          immediate_supervisor: formData.immediateSupervisor
        })
        .eq('id', employee.id)

      if (error) throw error

      onEmployeeUpdated()
      onOpenChange(false)
      
      toast({
        title: "Success",
        description: "Employee updated successfully",
      })
    } catch (error) {
      console.error('Error updating employee:', error)
      toast({
        title: "Error",
        description: "Failed to update employee",
        variant: "destructive"
      })
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Edit className="h-5 w-5" />
            Edit Employee
          </DialogTitle>
          <DialogDescription>
            Update the employee information below.
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Basic Information */}
          <div className="space-y-4">
            <h3 className="font-semibold">Basic Information</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">First Name *</Label>
                <Input
                  id="firstName"
                  value={formData.firstName}
                  onChange={(e) => handleInputChange("firstName", e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Last Name *</Label>
                <Input
                  id="lastName"
                  value={formData.lastName}
                  onChange={(e) => handleInputChange("lastName", e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email *</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="contactNumber">Contact Number</Label>
                <Input
                  id="contactNumber"
                  value={formData.contactNumber}
                  onChange={(e) => handleInputChange("contactNumber", e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="homeAddress">Home Address</Label>
              <Textarea
                id="homeAddress"
                value={formData.homeAddress}
                onChange={(e) => handleInputChange("homeAddress", e.target.value)}
                placeholder="Complete home address"
              />
            </div>
          </div>

          {/* Employment Information */}
          <div className="space-y-4">
            <h3 className="font-semibold">Employment Information</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="employeeNumber">Employee Number</Label>
                <Input
                  id="employeeNumber"
                  value={formData.employeeNumber}
                  onChange={(e) => handleInputChange("employeeNumber", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="status">Status</Label>
                <Select value={formData.status} onValueChange={(value) => handleInputChange("status", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="inactive">Inactive</SelectItem>
                    <SelectItem value="on leave">On Leave</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="department">Department *</Label>
                <Select value={formData.department} onValueChange={(value) => handleInputChange("department", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select department" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Engineering">Engineering</SelectItem>
                    <SelectItem value="Marketing">Marketing</SelectItem>
                    <SelectItem value="Sales">Sales</SelectItem>
                    <SelectItem value="HR">HR</SelectItem>
                    <SelectItem value="Finance">Finance</SelectItem>
                    <SelectItem value="Operations">Operations</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="position">Position *</Label>
                <Input
                  id="position"
                  value={formData.position}
                  onChange={(e) => handleInputChange("position", e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="hireDate">Hire Date *</Label>
                <Input
                  id="hireDate"
                  type="date"
                  value={formData.hireDate}
                  onChange={(e) => handleInputChange("hireDate", e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="salary">Annual Salary ($)</Label>
                <Input
                  id="salary"
                  type="number"
                  value={formData.salary}
                  onChange={(e) => handleInputChange("salary", e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="immediateSupervisor">Immediate Supervisor</Label>
              <Input
                id="immediateSupervisor"
                value={formData.immediateSupervisor}
                onChange={(e) => handleInputChange("immediateSupervisor", e.target.value)}
                placeholder="Name of immediate supervisor"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="employmentDetails">Employment Details</Label>
              <Textarea
                id="employmentDetails"
                value={formData.employmentDetails}
                onChange={(e) => handleInputChange("employmentDetails", e.target.value)}
                placeholder="Additional employment information"
              />
            </div>
          </div>

          {/* Previous Employment */}
          <div className="space-y-4">
            <h3 className="font-semibold">Previous Employment</h3>
            <div className="space-y-2">
              <Label htmlFor="previousEmployer">Previous Employer</Label>
              <Input
                id="previousEmployer"
                value={formData.previousEmployer}
                onChange={(e) => handleInputChange("previousEmployer", e.target.value)}
                placeholder="Previous employer name"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="previousCompanyName">Previous Company Name</Label>
              <Input
                id="previousCompanyName"
                value={formData.previousCompanyName}
                onChange={(e) => handleInputChange("previousCompanyName", e.target.value)}
                placeholder="Company name"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="previousCompanyAddress">Previous Company Address</Label>
              <Textarea
                id="previousCompanyAddress"
                value={formData.previousCompanyAddress}
                onChange={(e) => handleInputChange("previousCompanyAddress", e.target.value)}
                placeholder="Company address"
              />
            </div>
          </div>

          {/* Emergency Contact */}
          <div className="space-y-4">
            <h3 className="font-semibold">Emergency Contact</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="emergencyContactName">Contact Name</Label>
                <Input
                  id="emergencyContactName"
                  value={formData.emergencyContactName}
                  onChange={(e) => handleInputChange("emergencyContactName", e.target.value)}
                  placeholder="Full name"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="emergencyContactRelation">Relationship</Label>
                <Input
                  id="emergencyContactRelation"
                  value={formData.emergencyContactRelation}
                  onChange={(e) => handleInputChange("emergencyContactRelation", e.target.value)}
                  placeholder="Relationship to employee"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="emergencyContactPhone">Mobile Number</Label>
              <Input
                id="emergencyContactPhone"
                value={formData.emergencyContactPhone}
                onChange={(e) => handleInputChange("emergencyContactPhone", e.target.value)}
                placeholder="Mobile number"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="emergencyContactAddress">Address</Label>
              <Textarea
                id="emergencyContactAddress"
                value={formData.emergencyContactAddress}
                onChange={(e) => handleInputChange("emergencyContactAddress", e.target.value)}
                placeholder="Complete address"
              />
            </div>
          </div>

          <DialogFooter className="flex gap-2">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit">
              Update Employee
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}