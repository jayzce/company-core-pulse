import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Plus } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { Textarea } from "@/components/ui/textarea"
import { supabase } from "@/integrations/supabase/client"
import { Separator } from "@/components/ui/separator"

interface AddEmployeeDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onEmployeeAdded: () => void
}

export function AddEmployeeDialog({ open, onOpenChange, onEmployeeAdded }: AddEmployeeDialogProps) {
  const { toast } = useToast()
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    dateOfBirth: "",
    email: "",
    contactNumber: "",
    homeAddress: "",
    tinNumber: "",
    hdmfNumber: "",
    philhealthNumber: "",
    sssNumber: "",
    course: "",
    school: "",
    yearAttendedFrom: "",
    yearAttendedTo: "",
    department: "",
    position: "",
    salary: "",
    employeeNumber: "",
    hireDate: "",
    immediateSupervisor: "",
    employmentDetails: "",
    // Last 3 employers
    employer1CompanyName: "",
    employer1CompanyAddress: "",
    employer1ContactNumber: "",
    employer1Position: "",
    employer1EmploymentFrom: "",
    employer1EmploymentTo: "",
    employer1SupervisorName: "",
    employer1SupervisorContact: "",
    employer1ReasonLeaving: "",
    employer2CompanyName: "",
    employer2CompanyAddress: "",
    employer2ContactNumber: "",
    employer2Position: "",
    employer2EmploymentFrom: "",
    employer2EmploymentTo: "",
    employer2SupervisorName: "",
    employer2SupervisorContact: "",
    employer2ReasonLeaving: "",
    employer3CompanyName: "",
    employer3CompanyAddress: "",
    employer3ContactNumber: "",
    employer3Position: "",
    employer3EmploymentFrom: "",
    employer3EmploymentTo: "",
    employer3SupervisorName: "",
    employer3SupervisorContact: "",
    employer3ReasonLeaving: "",
    // Emergency contact
    emergencyContactName: "",
    emergencyContactAddress: "",
    emergencyContactPhone: "",
    emergencyContactEmail: "",
    emergencyContactRelation: ""
  })

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const resetForm = () => {
    setFormData({
      firstName: "",
      lastName: "",
      dateOfBirth: "",
      email: "",
      contactNumber: "",
      homeAddress: "",
      tinNumber: "",
      hdmfNumber: "",
      philhealthNumber: "",
      sssNumber: "",
      course: "",
      school: "",
      yearAttendedFrom: "",
      yearAttendedTo: "",
      department: "",
      position: "",
      salary: "",
      employeeNumber: "",
      hireDate: "",
      immediateSupervisor: "",
      employmentDetails: "",
      employer1CompanyName: "",
      employer1CompanyAddress: "",
      employer1ContactNumber: "",
      employer1Position: "",
      employer1EmploymentFrom: "",
      employer1EmploymentTo: "",
      employer1SupervisorName: "",
      employer1SupervisorContact: "",
      employer1ReasonLeaving: "",
      employer2CompanyName: "",
      employer2CompanyAddress: "",
      employer2ContactNumber: "",
      employer2Position: "",
      employer2EmploymentFrom: "",
      employer2EmploymentTo: "",
      employer2SupervisorName: "",
      employer2SupervisorContact: "",
      employer2ReasonLeaving: "",
      employer3CompanyName: "",
      employer3CompanyAddress: "",
      employer3ContactNumber: "",
      employer3Position: "",
      employer3EmploymentFrom: "",
      employer3EmploymentTo: "",
      employer3SupervisorName: "",
      employer3SupervisorContact: "",
      employer3ReasonLeaving: "",
      emergencyContactName: "",
      emergencyContactAddress: "",
      emergencyContactPhone: "",
      emergencyContactEmail: "",
      emergencyContactRelation: ""
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Basic validation
    if (!formData.firstName || !formData.lastName || !formData.dateOfBirth || !formData.email || !formData.department || !formData.position || !formData.hireDate) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields (Name, Date of Birth, Email, Department, Position, Hire Date)",
        variant: "destructive"
      })
      return
    }

    try {
      const { error } = await supabase
        .from('employees')
        .insert([{
          employee_id: formData.employeeNumber || `EMP-${Date.now()}`,
          first_name: formData.firstName,
          last_name: formData.lastName,
          date_of_birth: formData.dateOfBirth || null,
          email: formData.email,
          contact_number: formData.contactNumber,
          home_address: formData.homeAddress,
          tin_number: formData.tinNumber,
          hdmf_number: formData.hdmfNumber,
          philhealth_number: formData.philhealthNumber,
          sss_number: formData.sssNumber,
          course: formData.course,
          school: formData.school,
          year_attended_from: formData.yearAttendedFrom ? parseInt(formData.yearAttendedFrom) : null,
          year_attended_to: formData.yearAttendedTo ? parseInt(formData.yearAttendedTo) : null,
          department: formData.department,
          position: formData.position,
          salary: formData.salary ? parseFloat(formData.salary) : null,
          employee_number: formData.employeeNumber,
          hire_date: formData.hireDate,
          status: 'active',
          immediate_supervisor: formData.immediateSupervisor,
          employment_details: formData.employmentDetails,
          // Last 3 employers
          employer_1_company_name: formData.employer1CompanyName,
          employer_1_company_address: formData.employer1CompanyAddress,
          employer_1_contact_number: formData.employer1ContactNumber,
          employer_1_position: formData.employer1Position,
          employer_1_employment_from: formData.employer1EmploymentFrom || null,
          employer_1_employment_to: formData.employer1EmploymentTo || null,
          employer_1_supervisor_name: formData.employer1SupervisorName,
          employer_1_supervisor_contact: formData.employer1SupervisorContact,
          employer_1_reason_leaving: formData.employer1ReasonLeaving,
          employer_2_company_name: formData.employer2CompanyName,
          employer_2_company_address: formData.employer2CompanyAddress,
          employer_2_contact_number: formData.employer2ContactNumber,
          employer_2_position: formData.employer2Position,
          employer_2_employment_from: formData.employer2EmploymentFrom || null,
          employer_2_employment_to: formData.employer2EmploymentTo || null,
          employer_2_supervisor_name: formData.employer2SupervisorName,
          employer_2_supervisor_contact: formData.employer2SupervisorContact,
          employer_2_reason_leaving: formData.employer2ReasonLeaving,
          employer_3_company_name: formData.employer3CompanyName,
          employer_3_company_address: formData.employer3CompanyAddress,
          employer_3_contact_number: formData.employer3ContactNumber,
          employer_3_position: formData.employer3Position,
          employer_3_employment_from: formData.employer3EmploymentFrom || null,
          employer_3_employment_to: formData.employer3EmploymentTo || null,
          employer_3_supervisor_name: formData.employer3SupervisorName,
          employer_3_supervisor_contact: formData.employer3SupervisorContact,
          employer_3_reason_leaving: formData.employer3ReasonLeaving,
          // Emergency contact
          emergency_contact_name: formData.emergencyContactName,
          emergency_contact_address: formData.emergencyContactAddress,
          emergency_contact_phone: formData.emergencyContactPhone,
          emergency_contact_email: formData.emergencyContactEmail,
          emergency_contact_relation: formData.emergencyContactRelation
        }])

      if (error) throw error

      onEmployeeAdded()
      resetForm()
      onOpenChange(false)
      
      toast({
        title: "Success",
        description: "Employee added successfully",
      })
    } catch (error) {
      console.error('Error adding employee:', error)
      toast({
        title: "Error",
        description: "Failed to add employee",
        variant: "destructive"
      })
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[800px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Plus className="h-5 w-5" />
            Add New Employee
          </DialogTitle>
          <DialogDescription>
            Complete employee information form. Fields marked with * are required.
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Personal Information */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Personal Information</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">First Name *</Label>
                <Input
                  id="firstName"
                  value={formData.firstName}
                  onChange={(e) => handleInputChange("firstName", e.target.value)}
                  placeholder="John"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Last Name *</Label>
                <Input
                  id="lastName"
                  value={formData.lastName}
                  onChange={(e) => handleInputChange("lastName", e.target.value)}
                  placeholder="Doe"
                  required
                />
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="dateOfBirth">Date of Birth *</Label>
                <Input
                  id="dateOfBirth"
                  type="date"
                  value={formData.dateOfBirth}
                  onChange={(e) => handleInputChange("dateOfBirth", e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="contactNumber">Mobile Number</Label>
                <Input
                  id="contactNumber"
                  value={formData.contactNumber}
                  onChange={(e) => handleInputChange("contactNumber", e.target.value)}
                  placeholder="+63 912 345 6789"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email Address *</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  placeholder="john.doe@company.com"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="homeAddress">Address</Label>
                <Input
                  id="homeAddress"
                  value={formData.homeAddress}
                  onChange={(e) => handleInputChange("homeAddress", e.target.value)}
                  placeholder="Complete home address"
                />
              </div>
            </div>
          </div>

          <Separator />

          {/* Government IDs */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Government IDs</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="tinNumber">TIN Number</Label>
                <Input
                  id="tinNumber"
                  value={formData.tinNumber}
                  onChange={(e) => handleInputChange("tinNumber", e.target.value)}
                  placeholder="123-456-789-000"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="hdmfNumber">HDMF Number</Label>
                <Input
                  id="hdmfNumber"
                  value={formData.hdmfNumber}
                  onChange={(e) => handleInputChange("hdmfNumber", e.target.value)}
                  placeholder="1234-5678-9012"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="philhealthNumber">PhilHealth Number</Label>
                <Input
                  id="philhealthNumber"
                  value={formData.philhealthNumber}
                  onChange={(e) => handleInputChange("philhealthNumber", e.target.value)}
                  placeholder="12-345678901-2"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="sssNumber">SSS Number</Label>
                <Input
                  id="sssNumber"
                  value={formData.sssNumber}
                  onChange={(e) => handleInputChange("sssNumber", e.target.value)}
                  placeholder="03-1234567-8"
                />
              </div>
            </div>
          </div>

          <Separator />

          {/* Education */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Education</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="course">Course</Label>
                <Input
                  id="course"
                  value={formData.course}
                  onChange={(e) => handleInputChange("course", e.target.value)}
                  placeholder="Bachelor of Science in Computer Science"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="school">School</Label>
                <Input
                  id="school"
                  value={formData.school}
                  onChange={(e) => handleInputChange("school", e.target.value)}
                  placeholder="University of the Philippines"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="yearAttendedFrom">Year Attended From</Label>
                <Input
                  id="yearAttendedFrom"
                  type="number"
                  value={formData.yearAttendedFrom}
                  onChange={(e) => handleInputChange("yearAttendedFrom", e.target.value)}
                  placeholder="2015"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="yearAttendedTo">Year Attended To</Label>
                <Input
                  id="yearAttendedTo"
                  type="number"
                  value={formData.yearAttendedTo}
                  onChange={(e) => handleInputChange("yearAttendedTo", e.target.value)}
                  placeholder="2019"
                />
              </div>
            </div>
          </div>

          <Separator />

          {/* Employment Information */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Employment Information</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="employeeNumber">Employee Number</Label>
                <Input
                  id="employeeNumber"
                  value={formData.employeeNumber}
                  onChange={(e) => handleInputChange("employeeNumber", e.target.value)}
                  placeholder="EMP-001"
                />
              </div>
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
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="position">Position *</Label>
                <Input
                  id="position"
                  value={formData.position}
                  onChange={(e) => handleInputChange("position", e.target.value)}
                  placeholder="Software Engineer"
                  required
                />
              </div>
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
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="salary">Annual Salary (₱)</Label>
                <Input
                  id="salary"
                  type="number"
                  value={formData.salary}
                  onChange={(e) => handleInputChange("salary", e.target.value)}
                  placeholder="500000"
                />
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
            </div>
          </div>

          <Separator />

          {/* Previous Employment History */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Previous Employment History (Last 3 Employers)</h3>
            
            {/* Employer 1 */}
            <div className="space-y-4 border rounded-lg p-4">
              <h4 className="font-medium">Most Recent Employer</h4>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="employer1CompanyName">Company Name</Label>
                  <Input
                    id="employer1CompanyName"
                    value={formData.employer1CompanyName}
                    onChange={(e) => handleInputChange("employer1CompanyName", e.target.value)}
                    placeholder="ABC Corporation"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="employer1Position">Position Held</Label>
                  <Input
                    id="employer1Position"
                    value={formData.employer1Position}
                    onChange={(e) => handleInputChange("employer1Position", e.target.value)}
                    placeholder="Senior Developer"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="employer1CompanyAddress">Company Address</Label>
                <Textarea
                  id="employer1CompanyAddress"
                  value={formData.employer1CompanyAddress}
                  onChange={(e) => handleInputChange("employer1CompanyAddress", e.target.value)}
                  placeholder="Complete company address"
                />
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="employer1ContactNumber">Company Contact</Label>
                  <Input
                    id="employer1ContactNumber"
                    value={formData.employer1ContactNumber}
                    onChange={(e) => handleInputChange("employer1ContactNumber", e.target.value)}
                    placeholder="+63 2 123 4567"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="employer1EmploymentFrom">Employment From</Label>
                  <Input
                    id="employer1EmploymentFrom"
                    type="date"
                    value={formData.employer1EmploymentFrom}
                    onChange={(e) => handleInputChange("employer1EmploymentFrom", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="employer1EmploymentTo">Employment To</Label>
                  <Input
                    id="employer1EmploymentTo"
                    type="date"
                    value={formData.employer1EmploymentTo}
                    onChange={(e) => handleInputChange("employer1EmploymentTo", e.target.value)}
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="employer1SupervisorName">Immediate Supervisor</Label>
                  <Input
                    id="employer1SupervisorName"
                    value={formData.employer1SupervisorName}
                    onChange={(e) => handleInputChange("employer1SupervisorName", e.target.value)}
                    placeholder="Supervisor's full name"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="employer1SupervisorContact">Supervisor Contact</Label>
                  <Input
                    id="employer1SupervisorContact"
                    value={formData.employer1SupervisorContact}
                    onChange={(e) => handleInputChange("employer1SupervisorContact", e.target.value)}
                    placeholder="+63 912 345 6789"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="employer1ReasonLeaving">Reason for Leaving</Label>
                <Textarea
                  id="employer1ReasonLeaving"
                  value={formData.employer1ReasonLeaving}
                  onChange={(e) => handleInputChange("employer1ReasonLeaving", e.target.value)}
                  placeholder="Reason for leaving"
                />
              </div>
            </div>

            {/* Employer 2 */}
            <div className="space-y-4 border rounded-lg p-4">
              <h4 className="font-medium">Second Previous Employer</h4>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="employer2CompanyName">Company Name</Label>
                  <Input
                    id="employer2CompanyName"
                    value={formData.employer2CompanyName}
                    onChange={(e) => handleInputChange("employer2CompanyName", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="employer2Position">Position Held</Label>
                  <Input
                    id="employer2Position"
                    value={formData.employer2Position}
                    onChange={(e) => handleInputChange("employer2Position", e.target.value)}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="employer2CompanyAddress">Company Address</Label>
                <Textarea
                  id="employer2CompanyAddress"
                  value={formData.employer2CompanyAddress}
                  onChange={(e) => handleInputChange("employer2CompanyAddress", e.target.value)}
                />
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="employer2ContactNumber">Company Contact</Label>
                  <Input
                    id="employer2ContactNumber"
                    value={formData.employer2ContactNumber}
                    onChange={(e) => handleInputChange("employer2ContactNumber", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="employer2EmploymentFrom">Employment From</Label>
                  <Input
                    id="employer2EmploymentFrom"
                    type="date"
                    value={formData.employer2EmploymentFrom}
                    onChange={(e) => handleInputChange("employer2EmploymentFrom", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="employer2EmploymentTo">Employment To</Label>
                  <Input
                    id="employer2EmploymentTo"
                    type="date"
                    value={formData.employer2EmploymentTo}
                    onChange={(e) => handleInputChange("employer2EmploymentTo", e.target.value)}
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="employer2SupervisorName">Immediate Supervisor</Label>
                  <Input
                    id="employer2SupervisorName"
                    value={formData.employer2SupervisorName}
                    onChange={(e) => handleInputChange("employer2SupervisorName", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="employer2SupervisorContact">Supervisor Contact</Label>
                  <Input
                    id="employer2SupervisorContact"
                    value={formData.employer2SupervisorContact}
                    onChange={(e) => handleInputChange("employer2SupervisorContact", e.target.value)}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="employer2ReasonLeaving">Reason for Leaving</Label>
                <Textarea
                  id="employer2ReasonLeaving"
                  value={formData.employer2ReasonLeaving}
                  onChange={(e) => handleInputChange("employer2ReasonLeaving", e.target.value)}
                />
              </div>
            </div>

            {/* Employer 3 */}
            <div className="space-y-4 border rounded-lg p-4">
              <h4 className="font-medium">Third Previous Employer</h4>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="employer3CompanyName">Company Name</Label>
                  <Input
                    id="employer3CompanyName"
                    value={formData.employer3CompanyName}
                    onChange={(e) => handleInputChange("employer3CompanyName", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="employer3Position">Position Held</Label>
                  <Input
                    id="employer3Position"
                    value={formData.employer3Position}
                    onChange={(e) => handleInputChange("employer3Position", e.target.value)}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="employer3CompanyAddress">Company Address</Label>
                <Textarea
                  id="employer3CompanyAddress"
                  value={formData.employer3CompanyAddress}
                  onChange={(e) => handleInputChange("employer3CompanyAddress", e.target.value)}
                />
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="employer3ContactNumber">Company Contact</Label>
                  <Input
                    id="employer3ContactNumber"
                    value={formData.employer3ContactNumber}
                    onChange={(e) => handleInputChange("employer3ContactNumber", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="employer3EmploymentFrom">Employment From</Label>
                  <Input
                    id="employer3EmploymentFrom"
                    type="date"
                    value={formData.employer3EmploymentFrom}
                    onChange={(e) => handleInputChange("employer3EmploymentFrom", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="employer3EmploymentTo">Employment To</Label>
                  <Input
                    id="employer3EmploymentTo"
                    type="date"
                    value={formData.employer3EmploymentTo}
                    onChange={(e) => handleInputChange("employer3EmploymentTo", e.target.value)}
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="employer3SupervisorName">Immediate Supervisor</Label>
                  <Input
                    id="employer3SupervisorName"
                    value={formData.employer3SupervisorName}
                    onChange={(e) => handleInputChange("employer3SupervisorName", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="employer3SupervisorContact">Supervisor Contact</Label>
                  <Input
                    id="employer3SupervisorContact"
                    value={formData.employer3SupervisorContact}
                    onChange={(e) => handleInputChange("employer3SupervisorContact", e.target.value)}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="employer3ReasonLeaving">Reason for Leaving</Label>
                <Textarea
                  id="employer3ReasonLeaving"
                  value={formData.employer3ReasonLeaving}
                  onChange={(e) => handleInputChange("employer3ReasonLeaving", e.target.value)}
                />
              </div>
            </div>
          </div>

          <Separator />

          {/* Emergency Contact */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Emergency Contact</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="emergencyContactName">Full Name</Label>
                <Input
                  id="emergencyContactName"
                  value={formData.emergencyContactName}
                  onChange={(e) => handleInputChange("emergencyContactName", e.target.value)}
                  placeholder="Jane Doe"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="emergencyContactRelation">Relationship</Label>
                <Input
                  id="emergencyContactRelation"
                  value={formData.emergencyContactRelation}
                  onChange={(e) => handleInputChange("emergencyContactRelation", e.target.value)}
                  placeholder="Mother, Father, Spouse, etc."
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="emergencyContactPhone">Mobile Number</Label>
                <Input
                  id="emergencyContactPhone"
                  value={formData.emergencyContactPhone}
                  onChange={(e) => handleInputChange("emergencyContactPhone", e.target.value)}
                  placeholder="+63 912 345 6789"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="emergencyContactEmail">Email</Label>
                <Input
                  id="emergencyContactEmail"
                  type="email"
                  value={formData.emergencyContactEmail}
                  onChange={(e) => handleInputChange("emergencyContactEmail", e.target.value)}
                  placeholder="jane.doe@email.com"
                />
              </div>
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

          <DialogFooter className="flex gap-2 pt-6">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit">
              Add Employee
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}