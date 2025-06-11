
import { AdminLayout } from '@/layouts/AdminLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Ticket, AlertCircle, CheckCircle, Clock, MoreHorizontal, Reply, Eye, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const AdminSupport = () => {
  const navigate = useNavigate();

  // Dummy ticket data
  const tickets = [
    {
      id: '#1023',
      subject: 'Issue with Report',
      from: 'john@example.com',
      createdOn: '05 May',
      status: 'Open',
      priority: 'High'
    },
    {
      id: '#1022',
      subject: 'Billing Problem',
      from: 'sarah@company.com',
      createdOn: '04 May',
      status: 'Closed',
      priority: 'Medium'
    },
    {
      id: '#1021',
      subject: 'Feature Request',
      from: 'mike@startup.io',
      createdOn: '03 May',
      status: 'Open',
      priority: 'Low'
    },
    {
      id: '#1020',
      subject: 'Technical Support',
      from: 'lisa@tech.com',
      createdOn: '02 May',
      status: 'Closed',
      priority: 'High'
    },
    {
      id: '#1019',
      subject: 'Account Access',
      from: 'david@business.net',
      createdOn: '01 May',
      status: 'Open',
      priority: 'Medium'
    }
  ];

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

  const handleReply = (ticket: any) => {
    navigate('/admin/support/reply', { state: { ticket } });
  };

  const handleStatusChange = (ticketId: string, newStatus: string) => {
    console.log(`Changing ticket ${ticketId} status to ${newStatus}`);
    // Here you would implement the actual status change logic
  };

  return (
    <AdminLayout>
      {/* Header */}
      <div className="bg-white shadow-sm border-b -m-6 mb-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <h1 className="text-2xl font-bold text-valoov-orange">Support Tickets</h1>
          </div>
        </div>
      </div>

      <div className="space-y-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Tickets</CardTitle>
              <Ticket className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">1,234</div>
              <p className="text-xs text-muted-foreground">All time</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Open Tickets</CardTitle>
              <AlertCircle className="h-4 w-4 text-red-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">45</div>
              <p className="text-xs text-muted-foreground">Needs attention</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">In Progress</CardTitle>
              <Clock className="h-4 w-4 text-yellow-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">23</div>
              <p className="text-xs text-muted-foreground">Being resolved</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Resolved</CardTitle>
              <CheckCircle className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">1,166</div>
              <p className="text-xs text-muted-foreground">94.5% resolution rate</p>
            </CardContent>
          </Card>
        </div>

        {/* Tickets Table */}
        <Card>
          <CardHeader>
            <CardTitle>Support Tickets</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Ticket ID</TableHead>
                  <TableHead>Subject</TableHead>
                  <TableHead>From</TableHead>
                  <TableHead>Created On</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Priority</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {tickets.map((ticket) => (
                  <TableRow key={ticket.id}>
                    <TableCell className="font-medium">{ticket.id}</TableCell>
                    <TableCell>{ticket.subject}</TableCell>
                    <TableCell>{ticket.from}</TableCell>
                    <TableCell>{ticket.createdOn}</TableCell>
                    <TableCell>
                      <Badge className={getStatusBadgeColor(ticket.status)}>
                        {ticket.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge className={getPriorityBadgeColor(ticket.priority)}>
                        {ticket.priority}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="bg-white border border-gray-200 shadow-lg">
                          <DropdownMenuItem 
                            onClick={() => handleReply(ticket)}
                            className="flex items-center space-x-2 cursor-pointer hover:bg-gray-100"
                          >
                            <Reply className="h-4 w-4" />
                            <span>Reply</span>
                          </DropdownMenuItem>
                          <DropdownMenuItem 
                            onClick={() => handleStatusChange(ticket.id, 'Open')}
                            className="flex items-center space-x-2 cursor-pointer hover:bg-gray-100"
                          >
                            <Eye className="h-4 w-4" />
                            <span>Open</span>
                          </DropdownMenuItem>
                          <DropdownMenuItem 
                            onClick={() => handleStatusChange(ticket.id, 'Closed')}
                            className="flex items-center space-x-2 cursor-pointer hover:bg-gray-100"
                          >
                            <X className="h-4 w-4" />
                            <span>Closed</span>
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
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
