import { useState, useEffect } from "react";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CalendarDays, CheckCircle, XCircle, Clock, Plus } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { format, parseISO } from "date-fns";

interface LeaveRequest {
  id: string;
  employee_id: string;
  start_date: string;
  end_date: string;
  days_requested: number;
  leave_type: string;
  reason: string;
  status: string;
  created_at: string;
  employees?: {
    first_name: string;
    last_name: string;
  };
}

const LeaveRequestsPage = () => {
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [leaveRequests, setLeaveRequests] = useState<LeaveRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchLeaveRequests();
  }, []);

  const fetchLeaveRequests = async () => {
    try {
      const { data, error } = await supabase
        .from('leave_requests')
        .select(`
          *,
          employees (
            first_name,
            last_name
          )
        `)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setLeaveRequests(data || []);
    } catch (error) {
      console.error('Error fetching leave requests:', error);
      toast({
        title: "Error",
        description: "Failed to fetch leave requests",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const getStatusCounts = () => {
    const pending = leaveRequests.filter(req => req.status === 'pending').length;
    const approved = leaveRequests.filter(req => req.status === 'approved').length;
    const declined = leaveRequests.filter(req => req.status === 'rejected').length;
    
    return { pending, approved, declined };
  };

  const { pending, approved, declined } = getStatusCounts();

  // Get approved leave dates for calendar highlighting
  const approvedLeaveDates = leaveRequests
    .filter(req => req.status === 'approved')
    .flatMap(req => {
      const dates = [];
      const start = new Date(req.start_date);
      const end = new Date(req.end_date);
      
      for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
        dates.push(new Date(d));
      }
      return dates;
    });

  // Sample holidays and company events (in real app, these would come from database)
  const holidays = [
    new Date(2024, 11, 25), // Christmas
    new Date(2024, 0, 1),   // New Year
  ];

  const companyEvents = [
    new Date(2024, 11, 15), // Company Party
  ];

  const modifiers = {
    approvedLeave: approvedLeaveDates,
    holiday: holidays,
    companyEvent: companyEvents,
  };

  const modifiersStyles = {
    approvedLeave: {
      backgroundColor: 'hsl(var(--approved-leave))',
      color: 'white',
    },
    holiday: {
      backgroundColor: 'hsl(var(--holiday))',
      color: 'white',
    },
    companyEvent: {
      backgroundColor: 'hsl(var(--company-event))',
      color: 'white',
    },
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Leave Requests</h1>
          <p className="text-muted-foreground">Manage employee leave requests and view calendar</p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          New Leave Request
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Pending Requests
            </CardTitle>
            <Clock className="h-4 w-4 text-warning" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">{pending}</div>
            <Badge variant="secondary" className="mt-2">
              Awaiting Review
            </Badge>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Approved Leaves
            </CardTitle>
            <CheckCircle className="h-4 w-4 text-success" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">{approved}</div>
            <Badge variant="secondary" className="mt-2" style={{ backgroundColor: 'hsl(var(--approved-leave))', color: 'white' }}>
              Approved
            </Badge>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Declined Requests
            </CardTitle>
            <XCircle className="h-4 w-4 text-destructive" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">{declined}</div>
            <Badge variant="destructive" className="mt-2">
              Declined
            </Badge>
          </CardContent>
        </Card>
      </div>

      {/* Calendar Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CalendarDays className="h-5 w-5" />
              Leave Calendar
            </CardTitle>
            <div className="flex gap-4 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded" style={{ backgroundColor: 'hsl(var(--approved-leave))' }}></div>
                <span>Approved Leaves</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded" style={{ backgroundColor: 'hsl(var(--holiday))' }}></div>
                <span>Holidays</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded" style={{ backgroundColor: 'hsl(var(--company-event))' }}></div>
                <span>Company Events</span>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={setSelectedDate}
              className="rounded-md border"
              modifiers={modifiers}
              modifiersStyles={modifiersStyles}
            />
          </CardContent>
        </Card>

        {/* Recent Leave Requests */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Requests</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {leaveRequests.slice(0, 5).map((request) => (
              <div key={request.id} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="space-y-1">
                  <p className="font-medium text-foreground">
                    {request.employees?.first_name} {request.employees?.last_name}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {format(parseISO(request.start_date), 'MMM dd')} - {format(parseISO(request.end_date), 'MMM dd, yyyy')}
                  </p>
                  <p className="text-xs text-muted-foreground">{request.leave_type}</p>
                </div>
                <Badge 
                  variant={
                    request.status === 'approved' ? 'secondary' : 
                    request.status === 'rejected' ? 'destructive' : 
                    'secondary'
                  }
                  style={
                    request.status === 'approved' 
                      ? { backgroundColor: 'hsl(var(--approved-leave))', color: 'white' }
                      : {}
                  }
                >
                  {request.status}
                </Badge>
              </div>
            ))}
            {leaveRequests.length === 0 && (
              <p className="text-center text-muted-foreground py-8">
                No leave requests found
              </p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default LeaveRequestsPage;