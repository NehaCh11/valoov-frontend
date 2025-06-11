
import { useLocation, useNavigate } from 'react-router-dom';
import { AdminLayout } from '@/layouts/AdminLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { ArrowLeft, Send, Paperclip, User } from 'lucide-react';
import { useState } from 'react';

const AdminSupportReply = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [replyMessage, setReplyMessage] = useState('');
  
  // Get ticket data from navigation state
  const ticket = location.state?.ticket;

  if (!ticket) {
    navigate('/admin/support');
    return null;
  }

  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case 'Open': return 'bg-red-100 text-red-800';
      case 'Closed': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityBadgeColor = (priority: string) => {
    switch (priority) {
      case 'High': return 'bg-red-100 text-red-800';
      case 'Medium': return 'bg-yellow-100 text-yellow-800';
      case 'Low': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleSendReply = () => {
    if (replyMessage.trim()) {
      console.log('Sending reply:', replyMessage);
      // Here you would implement the actual reply sending logic
      setReplyMessage('');
      // Optionally navigate back or show success message
    }
  };

  const handleBack = () => {
    navigate('/admin/support');
  };

  return (
    <AdminLayout>
      {/* Header */}
      <div className="bg-white shadow-sm border-b -m-6 mb-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center h-16">
            <Button 
              variant="ghost" 
              onClick={handleBack}
              className="mr-4"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Tickets
            </Button>
            <h1 className="text-2xl font-bold text-valoov-orange">Reply to Ticket</h1>
          </div>
        </div>
      </div>

      <div className="space-y-6">
        {/* Ticket Information */}
        <Card>
          <CardHeader>
            <div className="flex justify-between items-start">
              <div>
                <CardTitle className="text-xl">{ticket.subject}</CardTitle>
                <p className="text-muted-foreground mt-1">Ticket {ticket.id}</p>
              </div>
              <div className="flex space-x-2">
                <Badge className={getStatusBadgeColor(ticket.status)}>
                  {ticket.status}
                </Badge>
                <Badge className={getPriorityBadgeColor(ticket.priority)}>
                  {ticket.priority}
                </Badge>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <p className="text-sm font-medium text-muted-foreground">From</p>
                <p className="text-sm">{ticket.from}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Created On</p>
                <p className="text-sm">{ticket.createdOn}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Priority</p>
                <p className="text-sm">{ticket.priority}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Conversation History */}
        <Card>
          <CardHeader>
            <CardTitle>Conversation</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Original Message */}
            <div className="border-l-4 border-blue-500 pl-4">
              <div className="flex items-center space-x-2 mb-2">
                <User className="h-4 w-4" />
                <span className="font-medium text-sm">{ticket.from}</span>
                <span className="text-xs text-muted-foreground">{ticket.createdOn}</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Original message content would go here. This is a placeholder for the actual ticket content 
                that would be loaded from your backend system.
              </p>
            </div>

            {/* Previous Replies would be listed here */}
            <div className="border-l-4 border-green-500 pl-4">
              <div className="flex items-center space-x-2 mb-2">
                <User className="h-4 w-4" />
                <span className="font-medium text-sm">Support Team</span>
                <span className="text-xs text-muted-foreground">06 May</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Thank you for contacting support. We're looking into your issue and will get back to you shortly.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Reply Form */}
        <Card>
          <CardHeader>
            <CardTitle>Send Reply</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Textarea
              placeholder="Type your reply here..."
              value={replyMessage}
              onChange={(e) => setReplyMessage(e.target.value)}
              rows={6}
              className="resize-none"
            />
            
            <div className="flex justify-between items-center">
              <Button variant="outline" className="flex items-center space-x-2">
                <Paperclip className="h-4 w-4" />
                <span>Attach File</span>
              </Button>
              
              <div className="flex space-x-2">
                <Button variant="outline" onClick={handleBack}>
                  Cancel
                </Button>
                <Button 
                  onClick={handleSendReply}
                  disabled={!replyMessage.trim()}
                  className="bg-valoov-orange hover:bg-valoov-orange/90"
                >
                  <Send className="h-4 w-4 mr-2" />
                  Send Reply
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default AdminSupportReply;
