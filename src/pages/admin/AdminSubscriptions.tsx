
import { AdminLayout } from '@/layouts/AdminLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Package, CreditCard, Users, TrendingUp, Plus } from 'lucide-react';

const AdminSubscriptions = () => {
  const subscriptionPlans = [
    {
      planName: 'Starter',
      price: '€29',
      reportsPerMonth: '1',
      analystAccess: 'No',
    },
    {
      planName: 'Pro',
      price: '€49',
      reportsPerMonth: '5',
      analystAccess: 'Yes',
    },
  ];

  return (
    <AdminLayout>
      {/* Header */}
      <div className="bg-white">
        <div className="px-6">
          <div className="flex justify-between items-center h-16">
            <h1 className="text-2xl font-bold text-black">Manage Subscriptions</h1>
            <div className="flex items-center space-x-4">
              <Button 
                style={{ backgroundColor: '#48B2BB' }}
                className="hover:opacity-90 text-white"
              >
                <Plus className="h-4 w-4 mr-2" />
                Create New Subscription
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-6 p-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="shadow-lg hover:shadow-xl transition-shadow duration-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
              <CreditCard className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$45,231</div>
              <p className="text-xs text-muted-foreground">+20.1% from last month</p>
            </CardContent>
          </Card>

          <Card className="shadow-lg hover:shadow-xl transition-shadow duration-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Subscriptions</CardTitle>
              <Package className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">2,350</div>
              <p className="text-xs text-muted-foreground">+180 from last month</p>
            </CardContent>
          </Card>

          <Card className="shadow-lg hover:shadow-xl transition-shadow duration-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Paying Users</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">1,573</div>
              <p className="text-xs text-muted-foreground">67% conversion rate</p>
            </CardContent>
          </Card>

          <Card className="shadow-lg hover:shadow-xl transition-shadow duration-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Monthly Growth</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">+12.5%</div>
              <p className="text-xs text-muted-foreground">Subscriber growth</p>
            </CardContent>
          </Card>
        </div>

        {/* Plan Features Table */}
        <Card>
          <CardHeader className="border-b-2 border-blue-500">
            <CardTitle className="text-lg">Plan Features Table:</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow className="bg-blue-50">
                  <TableHead className="font-semibold text-black border-r border-blue-300">Plan Name</TableHead>
                  <TableHead className="font-semibold text-black border-r border-blue-300">Price</TableHead>
                  <TableHead className="font-semibold text-black border-r border-blue-300">Reports/Month</TableHead>
                  <TableHead className="font-semibold text-black border-r border-blue-300">Analyst Access</TableHead>
                  <TableHead className="font-semibold text-black">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {subscriptionPlans.map((plan, index) => (
                  <TableRow key={index} className="border-b">
                    <TableCell className="border-r border-gray-200 font-medium text-black">
                      {plan.planName}
                    </TableCell>
                    <TableCell className="border-r border-gray-200 text-black">
                      {plan.price}
                    </TableCell>
                    <TableCell className="border-r border-gray-200 text-black">
                      {plan.reportsPerMonth}
                    </TableCell>
                    <TableCell className="border-r border-gray-200 text-black">
                      {plan.analystAccess}
                    </TableCell>
                    <TableCell>
                      <Button variant="outline" size="sm" className="text-black border-gray-300">
                        Create, edit, delete plans
                      </Button>
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

export default AdminSubscriptions;
