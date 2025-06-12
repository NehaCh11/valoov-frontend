
import { useState } from 'react';
import { AdminLayout } from '@/layouts/AdminLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Building2, Users, TrendingUp, MoreHorizontal, Eye, Pause, Trash2 } from 'lucide-react';
import { AdminStatsCard } from '@/components/admin/AdminStatsCard';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface Company {
  id: string;
  name: string;
  country: string;
  industry: string;
  createdOn: string;
  subscriptionPlan: string;
  status: 'Active' | 'Inactive';
}

const mockCompanies: Company[] = [
  {
    id: '1',
    name: 'Acme Ltd',
    country: 'Germany',
    industry: 'SaaS',
    createdOn: 'May 01, 2025',
    subscriptionPlan: 'Pro / Free / Enterprise',
    status: 'Active',
  },
  {
    id: '2',
    name: 'TechCorp Inc',
    country: 'USA',
    industry: 'Technology',
    createdOn: 'Apr 15, 2025',
    subscriptionPlan: 'Enterprise',
    status: 'Active',
  },
  {
    id: '3',
    name: 'Global Solutions',
    country: 'UK',
    industry: 'Consulting',
    createdOn: 'Mar 22, 2025',
    subscriptionPlan: 'Pro',
    status: 'Inactive',
  },
  {
    id: '4',
    name: 'StartupX',
    country: 'Canada',
    industry: 'FinTech',
    createdOn: 'Feb 10, 2025',
    subscriptionPlan: 'Free',
    status: 'Active',
  },
  {
    id: '5',
    name: 'InnovateCo',
    country: 'France',
    industry: 'AI/ML',
    createdOn: 'Jan 18, 2025',
    subscriptionPlan: 'Pro',
    status: 'Active',
  },
];

const AdminCompanies = () => {
  const [companies, setCompanies] = useState<Company[]>(mockCompanies);

  const handleStatusToggle = (id: string) => {
    setCompanies(prev => prev.map(company => 
      company.id === id 
        ? { ...company, status: company.status === 'Active' ? 'Inactive' : 'Active' }
        : company
    ));
  };

  const handleDelete = (id: string) => {
    setCompanies(prev => prev.filter(company => company.id !== id));
  };

  return (
    <AdminLayout>
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="px-6">
          <div className="flex justify-between items-center h-16">
            <h1 className="text-2xl font-bold text-black">Company Management</h1>
          </div>
        </div>
      </div>

      <div className="space-y-6 p-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <AdminStatsCard
            title="1,234"
            value="View Companies"
            subtitle="Total companies valuated"
            icon={Building2}
            color="#48B2BB"
          />
          <AdminStatsCard
            title="2,567"
            value="Active Users"
            subtitle="Active subscribers"
            icon={Users}
            color="#48B2BB"
          />
          <AdminStatsCard
            title="5,432"
            value="Total Valuations"
            subtitle="Reports generated"
            icon={TrendingUp}
            color="#48B2BB"
          />
        </div>

        {/* Company Table */}
        <Card>
          <CardHeader className="border-b-2 border-blue-500">
            <CardTitle className="text-lg">Companies</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow className="bg-blue-50">
                  <TableHead className="font-semibold text-black border-r border-blue-300">Company Name</TableHead>
                  <TableHead className="font-semibold text-black border-r border-blue-300">Country</TableHead>
                  <TableHead className="font-semibold text-black border-r border-blue-300">Industry</TableHead>
                  <TableHead className="font-semibold text-black border-r border-blue-300">Created On</TableHead>
                  <TableHead className="font-semibold text-black border-r border-blue-300">Subscription Plan</TableHead>
                  <TableHead className="font-semibold text-black border-r border-blue-300">Status</TableHead>
                  <TableHead className="font-semibold text-black">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {companies.map((company) => (
                  <TableRow key={company.id} className="border-b">
                    <TableCell className="border-r border-gray-200 font-medium text-black">
                      {company.name}
                    </TableCell>
                    <TableCell className="border-r border-gray-200 text-black">
                      {company.country}
                    </TableCell>
                    <TableCell className="border-r border-gray-200 text-black">
                      {company.industry}
                    </TableCell>
                    <TableCell className="border-r border-gray-200">
                      {company.createdOn}
                    </TableCell>
                    <TableCell className="border-r border-gray-200">
                      <Badge variant="outline" className="text-black border-blue-300">
                        {company.subscriptionPlan}
                      </Badge>
                    </TableCell>
                    <TableCell className="border-r border-gray-200">
                      <div className="flex items-center space-x-2">
                        <div className={`w-2 h-2 rounded-full ${company.status === 'Active' ? 'bg-green-500' : 'bg-red-500'}`} />
                        <span className={company.status === 'Active' ? 'text-green-600' : 'text-red-600'}>
                          {company.status}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm" className="text-black">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>
                            <Eye className="h-4 w-4 mr-2" />
                            View
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleStatusToggle(company.id)}>
                            <Pause className="h-4 w-4 mr-2" />
                            {company.status === 'Active' ? 'Suspend' : 'Activate'}
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleDelete(company.id)} className="text-red-600">
                            <Trash2 className="h-4 w-4 mr-2" />
                            Delete
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

export default AdminCompanies;
