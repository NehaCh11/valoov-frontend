
import { useState } from 'react';
import { AdminLayout } from '@/layouts/AdminLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { useNavigate } from 'react-router-dom';
import { MessageSquare, Eye, UserPlus, Edit, Trash2 } from 'lucide-react';

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

// Dummy sub-admins data
const dummySubAdmins = [
  {
    id: 1,
    name: "Alice Johnson",
    email: "alice.johnson@company.com",
    role: "Support Admin",
    status: "active",
    created: "2024-01-10",
    lastLogin: "2024-01-15"
  },
  {
    id: 2,
    name: "Bob Smith",
    email: "bob.smith@company.com",
    role: "Content Admin",
    status: "active",
    created: "2024-01-08",
    lastLogin: "2024-01-14"
  },
  {
    id: 3,
    name: "Carol Davis",
    email: "carol.davis@company.com",
    role: "User Admin",
    status: "inactive",
    created: "2024-01-05",
    lastLogin: "2024-01-12"
  }
];

const AdminSupport = () => {
  const navigate = useNavigate();
  const [subAdmins, setSubAdmins] = useState(dummySubAdmins);
  const [isCreating, setIsCreating] = useState(false);
  const [editingAdmin, setEditingAdmin] = useState<any>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: '',
    status: 'active'
  });

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

  const handleCreateSubAdmin = () => {
    if (formData.name && formData.email && formData.role) {
      const newAdmin = {
        id: subAdmins.length + 1,
        ...formData,
        created: new Date().toISOString().split('T')[0],
        lastLogin: 'Never'
      };
      setSubAdmins([...subAdmins, newAdmin]);
      setFormData({ name: '', email: '', role: '', status: 'active' });
      setIsCreating(false);
    }
  };

  const handleEditSubAdmin = (admin: any) => {
    setEditingAdmin(admin);
    setFormData({
      name: admin.name,
      email: admin.email,
      role: admin.role,
      status: admin.status
    });
  };

  const handleUpdateSubAdmin = () => {
    if (editingAdmin && formData.name && formData.email && formData.role) {
      setSubAdmins(subAdmins.map(admin => 
        admin.id === editingAdmin.id 
          ? { ...admin, ...formData }
          : admin
      ));
      setEditingAdmin(null);
      setFormData({ name: '', email: '', role: '', status: 'active' });
    }
  };

  const handleDeleteSubAdmin = (id: number) => {
    setSubAdmins(subAdmins.filter(admin => admin.id !== id));
  };

  const resetForm = () => {
    setFormData({ name: '', email: '', role: '', status: 'active' });
    setIsCreating(false);
    setEditingAdmin(null);
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Support Management</h1>
          <p className="text-muted-foreground">
            Manage support tickets and administrative users
          </p>
        </div>

        <Tabs defaultValue="tickets" className="space-y-4">
          <TabsList>
            <TabsTrigger value="tickets">Support Tickets</TabsTrigger>
            <TabsTrigger value="sub-admins">Sub Admins</TabsTrigger>
          </TabsList>

          <TabsContent value="tickets" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Support Tickets</CardTitle>
                <CardDescription>
                  Manage and respond to user support requests
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
                              Open
                            </Button>
                            <Button size="sm" variant="secondary">
                              Closed
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="sub-admins" className="space-y-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Sub Administrators</CardTitle>
                  <CardDescription>
                    Manage sub-admin accounts and permissions
                  </CardDescription>
                </div>
                <Button 
                  onClick={() => setIsCreating(true)}
                  disabled={isCreating || editingAdmin}
                >
                  <UserPlus className="h-4 w-4 mr-2" />
                  Add Sub Admin
                </Button>
              </CardHeader>
              <CardContent className="space-y-4">
                {(isCreating || editingAdmin) && (
                  <Card>
                    <CardHeader>
                      <CardTitle>
                        {editingAdmin ? 'Edit Sub Admin' : 'Create New Sub Admin'}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="name">Name</Label>
                          <Input
                            id="name"
                            value={formData.name}
                            onChange={(e) => setFormData({...formData, name: e.target.value})}
                            placeholder="Enter full name"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="email">Email</Label>
                          <Input
                            id="email"
                            type="email"
                            value={formData.email}
                            onChange={(e) => setFormData({...formData, email: e.target.value})}
                            placeholder="Enter email address"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="role">Role</Label>
                          <Input
                            id="role"
                            value={formData.role}
                            onChange={(e) => setFormData({...formData, role: e.target.value})}
                            placeholder="Enter role (e.g., Support Admin)"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="status">Status</Label>
                          <select
                            id="status"
                            value={formData.status}
                            onChange={(e) => setFormData({...formData, status: e.target.value})}
                            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                          >
                            <option value="active">Active</option>
                            <option value="inactive">Inactive</option>
                          </select>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <Button 
                          onClick={editingAdmin ? handleUpdateSubAdmin : handleCreateSubAdmin}
                        >
                          {editingAdmin ? 'Update' : 'Create'} Sub Admin
                        </Button>
                        <Button variant="outline" onClick={resetForm}>
                          Cancel
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                )}

                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Role</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Created</TableHead>
                      <TableHead>Last Login</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {subAdmins.map((admin) => (
                      <TableRow key={admin.id}>
                        <TableCell className="font-medium">{admin.name}</TableCell>
                        <TableCell>{admin.email}</TableCell>
                        <TableCell>{admin.role}</TableCell>
                        <TableCell>
                          <Badge variant={admin.status === 'active' ? 'default' : 'secondary'}>
                            {admin.status}
                          </Badge>
                        </TableCell>
                        <TableCell>{admin.created}</TableCell>
                        <TableCell>{admin.lastLogin}</TableCell>
                        <TableCell>
                          <div className="flex space-x-2">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleEditSubAdmin(admin)}
                              disabled={isCreating || editingAdmin}
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button
                              size="sm"
                              variant="destructive"
                              onClick={() => handleDeleteSubAdmin(admin.id)}
                              disabled={isCreating || editingAdmin}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AdminLayout>
  );
};

export default AdminSupport;
