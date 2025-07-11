
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';
import { Resend } from "npm:resend@2.0.0";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface LeaveNotificationRequest {
  leaveRequestId: string;
  action: 'approved' | 'rejected';
  rejectionReason?: string;
}

const handler = async (req: Request): Promise<Response> => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    const resend = new Resend(Deno.env.get('RESEND_API_KEY'));

    const { leaveRequestId, action, rejectionReason }: LeaveNotificationRequest = await req.json();

    console.log('Processing leave notification:', { leaveRequestId, action });

    // Get leave request details with employee information
    const { data: leaveRequest, error: leaveError } = await supabaseClient
      .from('leave_requests')
      .select(`
        *,
        employees!inner(
          first_name,
          last_name,
          email
        )
      `)
      .eq('id', leaveRequestId)
      .single();

    if (leaveError || !leaveRequest) {
      console.error('Error fetching leave request:', leaveError);
      throw new Error('Leave request not found');
    }

    const employee = leaveRequest.employees;
    const subject = `Leave Request ${action === 'approved' ? 'Approved' : 'Rejected'}`;
    
    let emailContent = `
      <h1>Leave Request ${action === 'approved' ? 'Approved' : 'Rejected'}</h1>
      <p>Dear ${employee.first_name} ${employee.last_name},</p>
      
      <p>Your leave request has been <strong>${action}</strong>.</p>
      
      <h3>Leave Request Details:</h3>
      <ul>
        <li><strong>Leave Type:</strong> ${leaveRequest.leave_type}</li>
        <li><strong>Start Date:</strong> ${new Date(leaveRequest.start_date).toLocaleDateString()}</li>
        <li><strong>End Date:</strong> ${new Date(leaveRequest.end_date).toLocaleDateString()}</li>
        <li><strong>Days Requested:</strong> ${leaveRequest.days_requested}</li>
        <li><strong>Reason:</strong> ${leaveRequest.reason || 'Not specified'}</li>
      </ul>
    `;

    if (action === 'rejected' && rejectionReason) {
      emailContent += `
        <h3>Rejection Reason:</h3>
        <p>${rejectionReason}</p>
      `;
    }

    emailContent += `
      <p>If you have any questions, please contact HR.</p>
      <p>Best regards,<br>HR Department</p>
    `;

    const emailResponse = await resend.emails.send({
      from: "HRIS <noreply@resend.dev>",
      to: [employee.email],
      subject: subject,
      html: emailContent,
    });

    console.log('Email sent successfully:', emailResponse);

    return new Response(
      JSON.stringify({ success: true, emailId: emailResponse.data?.id }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
          ...corsHeaders,
        },
      }
    );
  } catch (error: any) {
    console.error('Error in send-leave-notification function:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
