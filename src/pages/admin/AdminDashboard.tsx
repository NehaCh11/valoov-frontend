
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
    // Add new admin functionality
    console.log('Add new admin clicked');
  };

  return (
    <AdminLayout>
      {/* Header */}
      <div className="bg-white">
        <div className="px-6">
          <div className="flex justify-between items-center h-16">
            <h1 className="text-2xl font-bold text-black">Admin Dashboard</h1>
            <div className="flex items-center space-x-4">
              <Button 
                onClick={handleAddNew}
                style={{ backgroundColor: '#48B2BB' }}
                className="hover:opacity-90 text-white"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add New Admin
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Dashboard Content */}
      <div className="space-y-8 p-6 pt-4 ml-[50px]">
        {/* Stats Cards Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <AdminStatsCard
            title="1,234"
            value="View Companies"
            subtitle="Total companies valuated"
            icon={Building2}
            color="#48B2BB"
          />
          <AdminStatsCard
            title="1,234"
            value="Active"
            subtitle="Active subscribers"
            icon={Users}
            color="#48B2BB"
          />
          <AdminStatsCard
            title="1,234"
            value="View Reports"
            subtitle="Reports generated"
            icon={FileText}
            color="#48B2BB"
          />
          <AdminStatsCard
            title="1,234"
            value="User Support"
            subtitle="Support tickets"
            icon={Headphones}
            color="#48B2BB"
          />
        </div>

        {/* Chart Section */}
        <ChartSection />

        {/* Activity Log Table */}
        <ActivityLogTable />
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;
