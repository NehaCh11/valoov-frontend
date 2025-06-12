
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { AdminStatsCard } from '@/components/admin/AdminStatsCard';
import { ActivityLogTable } from '@/components/admin/ActivityLogTable';
import { ChartSection } from '@/components/admin/ChartSection';
import { AdminLayout } from '@/layouts/AdminLayout';
import { Building2, Users, FileText, Headphones, Plus } from 'lucide-react';

const AdminDashboard = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const adminToken = localStorage.getItem('adminToken');
    if (!adminToken) {
      navigate('/admin/login');
    }
  }, [navigate]);

  const handleAddNew = () => {
    // Add new admin button functionality
    console.log('Add new admin clicked');
  };

  return (
    <AdminLayout>
      {/* Header */}
      <div className="bg-white shadow-sm border-b mb-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <h1 className="text-2xl font-bold text-black">Admin Dashboard</h1>
            <div className="flex items-center space-x-4">
              <Button 
                onClick={handleAddNew}
                className="bg-blue-500 hover:bg-blue-600 text-white"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add New Admin Button
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Dashboard Content */}
      <div className="space-y-8 px-6">
        {/* Stats Cards Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <AdminStatsCard
            title="1,234"
            value="View Companies"
            subtitle="Total companies valuated"
            icon={Building2}
            color="#3b82f6"
          />
          <AdminStatsCard
            title="1,234"
            value="Active"
            subtitle="Active subscribers"
            icon={Users}
            color="#3b82f6"
          />
          <AdminStatsCard
            title="1,234"
            value="Valuated Reports"
            subtitle="Reports generated"
            icon={FileText}
            color="#3b82f6"
          />
          <AdminStatsCard
            title="1,234"
            value="User Support"
            subtitle="Support tickets"
            icon={Headphones}
            color="#3b82f6"
          />
        </div>

        {/* Activity Log Table */}
        <ActivityLogTable />

        {/* Chart Section */}
        <ChartSection />
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;
