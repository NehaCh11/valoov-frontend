
import { useState } from 'react';
import { AdminLayout } from '@/layouts/AdminLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { useNavigate } from 'react-router-dom';
import { MessageSquare, Eye } from 'lucide-react';

// Dummy tickets data
const dummyTickets = [
  {
    id: 1,
    subject: "Login Issues",
    user: "john.doe@email.com",
    status: "open",
    priority: "high",
    created: "2024-01-15",
    description: "User cannot login to their account"
  },
  {
    id: 2,
    subject: "Valuation Report Error",
    user: "jane.smith@email.com",
    status: "closed",
    priority: "medium",
    created: "2024-01-14",
    description: "Error generating valuation report"
  },
  {
    id: 3,
    subject: "Payment Processing",
    user: "mike.johnson@email.com",
    status: "open",
    priority: "low",
    created: "2024-01-13",
    description: "Payment not processing correctly"
  }
];

const AdminSupport = () => {
  const navigate = useNavigate();

  const handleReply = (ticket: any) => {
    navigate('/admin/support/reply', { state: { ticket } });
  };

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case 'open':
        return 'destructive';
      case 'closed':
        return 'secondary';
      default:
        return 'default';
    }
  };

  const getPriorityBadgeVariant = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'destructive';
      case 'medium':
        return 'default';
      case 'low':
        return 'secondary';
      default:
        return 'default';
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Support Tickets</h1>
          <p className="text-muted-foreground">
            Manage and respond to user support requests
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Support Tickets</CardTitle>
            <CardDescription>
              View and respond to customer support tickets
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Subject</TableHead>
                  <TableHead>User</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Priority</TableHead>
                  <TableHead>Created</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {dummyTickets.map((ticket) => (
                  <TableRow key={ticket.id}>
                    <TableCell>#{ticket.id}</TableCell>
                    <TableCell className="font-medium">{ticket.subject}</TableCell>
                    <TableCell>{ticket.user}</TableCell>
                    <TableCell>
                      <Badge variant={getStatusBadgeVariant(ticket.status)}>
                        {ticket.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant={getPriorityBadgeVariant(ticket.priority)}>
                        {ticket.priority}
                      </Badge>
                    </TableCell>
                    <TableCell>{ticket.created}</TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleReply(ticket)}
                        >
                          <MessageSquare className="h-4 w-4 mr-1" />
                          Reply
                        </Button>
                        <Button size="sm" variant="outline">
                          <Eye className="h-4 w-4 mr-1" />
                          View
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default AdminSupport;
