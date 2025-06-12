
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { LucideIcon } from 'lucide-react';

interface AdminStatsCardProps {
  title: string;
  value: string;
  subtitle: string;
  icon: LucideIcon;
  color: string;
}

export const AdminStatsCard = ({ title, value, subtitle, icon: Icon, color }: AdminStatsCardProps) => {
  const isViewReports = value === "View Reports";
  
  return (
    <Card className="shadow-md hover:shadow-lg transition-shadow duration-200">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <div 
          className={`h-8 w-8 rounded flex items-center justify-center ${isViewReports ? 'text-white' : ''}`}
          style={{ backgroundColor: isViewReports ? color : 'transparent' }}
        >
          <Icon 
            className="h-6 w-6" 
            style={{ color: isViewReports ? 'white' : color }} 
          />
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <p className="text-xs text-muted-foreground">{subtitle}</p>
      </CardContent>
    </Card>
  );
};
