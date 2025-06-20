
import { useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MoreHorizontal, Edit, Pause, Trash2, Eye, Ticket } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';

interface ActivityLog {
  id: string;
  name: string;
  email: string;
  lastLogin: string;
  status: 'Active' | 'Suspended';
  lastActivity: string;
}

const mockData: ActivityLog[] = [
  {
    id: '1',
    name: 'Sarah Johnson',
    email: 'sarah@valoov.com',
    lastLogin: '05 Jun 2025 - 09:32 AM',
    status: 'Active',
    lastActivity: 'Create Subscription',
  },
  {
    id: '2',
    name: 'Mike Chen',
    email: 'mike@valoov.com',
    lastLogin: '04 Jun 2025 - 14:45 PM',
    status: 'Suspended',
    lastActivity: 'View Reports',
  },
  {
    id: '3',
    name: 'Emma Davis',
    email: 'emma@valoov.com',
    lastLogin: '04 Jun 2025 - 11:20 AM',
    status: 'Active',
    lastActivity: 'View Support Tickets',
  },
  {
    id: '4',
    name: 'John Smith',
    email: 'john@valoov.com',
    lastLogin: '03 Jun 2025 - 16:30 PM',
    status: 'Active',
    lastActivity: 'Update Profile',
  },
  {
    id: '5',
    name: 'Lisa Wong',
    email: 'lisa@valoov.com',
    lastLogin: '03 Jun 2025 - 13:15 PM',
    status: 'Suspended',
    lastActivity: 'Download Report',
  },
  {
    id: '6',
    name: 'Alex Brown',
    email: 'alex@valoov.com',
    lastLogin: '02 Jun 2025 - 10:45 AM',
    status: 'Active',
    lastActivity: 'Create Company',
  },
];

export const ActivityLogTable = () => {
  const [data, setData] = useState<ActivityLog[]>(mockData);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Calculate pagination
  const totalPages = Math.ceil(data.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentData = data.slice(startIndex, endIndex);

  const handleStatusToggle = (id: string) => {
    setData(prev => prev.map(item => 
      item.id === id 
        ? { ...item, status: item.status === 'Active' ? 'Suspended' : 'Active' }
        : item
    ));
  };

  const handleRemove = (id: string) => {
    setData(prev => prev.filter(item => item.id !== id));
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <Card>
      <CardHeader className="border-b-2 border-blue-500">
        <div className="flex justify-between items-center">
          <CardTitle className="text-lg">Activity Log</CardTitle>
          <div className="flex space-x-2">
            <Button 
              style={{ backgroundColor: '#48B2BB' }}
              className="hover:opacity-90 text-white"
              size="sm"
            >
              <Eye className="h-4 w-4 mr-2" />
              View Reports
            </Button>
            <Button variant="outline" size="sm" className="text-black border-blue-300">
              <Ticket className="h-4 w-4 mr-2" />
              View Support Tickets
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <Table>
          <TableHeader>
            <TableRow className="bg-blue-50">
              <TableHead className="font-semibold text-black border-r border-blue-300">Name</TableHead>
              <TableHead className="font-semibold text-black border-r border-blue-300">Email</TableHead>
              <TableHead className="font-semibold text-black border-r border-blue-300">Last Login</TableHead>
              <TableHead className="font-semibold text-black border-r border-blue-300">Status</TableHead>
              <TableHead className="font-semibold text-black border-r border-blue-300">Last Activity Performed</TableHead>
              <TableHead className="font-semibold text-black">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {currentData.map((row) => (
              <TableRow key={row.id} className="border-b">
                <TableCell className="border-r border-gray-200 font-medium text-black">
                  {row.name}
                </TableCell>
                <TableCell className="border-r border-gray-200 text-black">
                  {row.email}
                </TableCell>
                <TableCell className="border-r border-gray-200">
                  {row.lastLogin}
                </TableCell>
                <TableCell className="border-r border-gray-200">
                  <div className="flex items-center space-x-2">
                    <div className={`w-2 h-2 rounded-full ${row.status === 'Active' ? 'bg-green-500' : 'bg-red-500'}`} />
                    <span className={row.status === 'Active' ? 'text-green-600' : 'text-red-600'}>
                      {row.status}
                    </span>
                  </div>
                </TableCell>
                <TableCell className="border-r border-gray-200">
                  <Badge variant="outline" className="text-black border-blue-300">
                    {row.lastActivity}
                  </Badge>
                </TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm" className="text-black">
                        <Edit className="h-4 w-4 mr-1" />
                        Edit
                        <Pause className="h-4 w-4 ml-1" />
                        Suspend
                        <Trash2 className="h-4 w-4 ml-1" />
                        Remove
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>
                        <Edit className="h-4 w-4 mr-2" />
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleStatusToggle(row.id)}>
                        <Pause className="h-4 w-4 mr-2" />
                        {row.status === 'Active' ? 'Suspend' : 'Activate'}
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleRemove(row.id)} className="text-red-600">
                        <Trash2 className="h-4 w-4 mr-2" />
                        Remove
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        
        {/* Pagination */}
        <div className="flex justify-between items-center py-4 px-4">
          {/* Previous Button - Left Side */}
          <PaginationPrevious 
            href="#" 
            onClick={(e) => {
              e.preventDefault();
              if (currentPage > 1) handlePageChange(currentPage - 1);
            }}
            className={currentPage === 1 ? 'pointer-events-none opacity-50' : ''}
          />
          
          {/* Page Numbers - Center */}
          <div className="flex space-x-1">
            {[1, 2, 3, 4, 5, 6, 7].map((page) => (
              <PaginationLink
                key={page}
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  handlePageChange(page);
                }}
                isActive={currentPage === page}
                className="px-3 py-1"
              >
                {page}
              </PaginationLink>
            ))}
          </div>
          
          {/* Next Button - Right Side */}
          <PaginationNext 
            href="#" 
            onClick={(e) => {
              e.preventDefault();
              if (currentPage < 7) handlePageChange(currentPage + 1);
            }}
            className={currentPage === 7 ? 'pointer-events-none opacity-50' : ''}
          />
        </div>
      </CardContent>
    </Card>
  );
};
