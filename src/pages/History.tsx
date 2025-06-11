
/**
 * History Page
 * 
 * Displays user's valuation history with:
 * - List of past valuations
 * - Status tracking
 * - Quick actions to view or continue valuations
 */

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Clock, FileText, TrendingUp, Eye } from 'lucide-react';

interface HistoryProps {
  setActiveView: (view: string) => void;
}

const History = ({ setActiveView }: HistoryProps) => {
  // Mock history data
  const historyItems = [
    {
      id: 1,
      title: 'Q4 2024 Valuation',
      date: '2024-12-15',
      status: 'completed',
      valuation: '€3.2M',
      progress: 100
    },
    {
      id: 2,
      title: 'Mid-Year Assessment',
      date: '2024-06-30',
      status: 'completed',
      valuation: '€2.8M',
      progress: 100
    },
    {
      id: 3,
      title: 'Current Valuation',
      date: '2024-12-20',
      status: 'in-progress',
      valuation: 'In Progress',
      progress: 75
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-600';
      case 'in-progress': return 'bg-yellow-600';
      default: return 'bg-gray-600';
    }
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold text-black">Valuation History</h1>
        <p className="text-gray-600 mt-1">Track your valuation progress over time</p>
      </div>

      {/* History Items */}
      <div className="space-y-4">
        {historyItems.map((item) => (
          <Card key={item.id} className="bg-card/30 backdrop-blur border-border/50">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="p-3 bg-valoov-teal/20 rounded-full">
                    <FileText className="h-6 w-6 text-valoov-teal" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-black">{item.title}</h3>
                    <div className="flex items-center space-x-3 mt-1">
                      <span className="text-sm text-gray-600 flex items-center">
                        <Clock className="h-3 w-3 mr-1" />
                        {new Date(item.date).toLocaleDateString()}
                      </span>
                      <Badge className={getStatusColor(item.status)}>
                        {item.status}
                      </Badge>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4">
                  <div className="text-right">
                    <p className="text-lg font-bold text-black">{item.valuation}</p>
                    <p className="text-sm text-gray-600">{item.progress}% Complete</p>
                  </div>
                  
                  <div className="flex space-x-2">
                    {item.status === 'completed' ? (
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => setActiveView('valuation-report')}
                      >
                        <Eye className="h-3 w-3 mr-1" />
                        View
                      </Button>
                    ) : (
                      <Button 
                        size="sm" 
                        className="bg-valoov-orange hover:bg-valoov-orange/90"
                        onClick={() => setActiveView('questionnaire')}
                      >
                        <TrendingUp className="h-3 w-3 mr-1" />
                        Continue
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default History;
