
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
  return (
    <Card className="shadow-md hover:shadow-lg transition-shadow duration-200">
      <CardContent className="p-6">
        <div className="flex flex-col items-start space-y-3">
          {/* Icon at the top */}
          <div 
            className="h-12 w-12 rounded-lg flex items-center justify-center"
            style={{ backgroundColor: color }}
          >
            <Icon className="h-6 w-6 text-white" />
          </div>
          
          {/* Number/Count */}
          <div className="text-3xl font-bold text-black">{title}</div>
          
          {/* Title/Heading */}
          <div className="text-lg font-semibold text-black">{value}</div>
          
          {/* Subtitle */}
          <p className="text-sm text-muted-foreground">{subtitle}</p>
        </div>
      </CardContent>
    </Card>
  );
};
