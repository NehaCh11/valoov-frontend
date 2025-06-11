
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

const lineChartData = [
  { name: 'Jan', companies: 40 },
  { name: 'Feb', companies: 65 },
  { name: 'Mar', companies: 80 },
  { name: 'Apr', companies: 95 },
  { name: 'May', companies: 120 },
  { name: 'Jun', companies: 134 },
];

const pieChartData = [
  { name: 'Basic', value: 45, color: '#3b82f6' },
  { name: 'Pro', value: 35, color: '#10b981' },
  { name: 'Enterprise', value: 20, color: '#f59e0b' },
];

export const ChartSection = () => {
  return (
    <Card>
      <CardHeader className="border-b-2 border-blue-500">
        <CardTitle className="text-lg">📊 Chart Section (Optional add-on below table)</CardTitle>
        <p className="text-sm text-gray-600">Use horizontal layout for:</p>
      </CardHeader>
      <CardContent className="p-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Line Chart */}
          <div className="space-y-2">
            <h3 className="font-semibold text-blue-600">1. No of Companies Valuated Line Chart (Calendar Monthly, Weekly, Yearly)</h3>
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={lineChartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="companies" stroke="#3b82f6" strokeWidth={3} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Pie Chart */}
          <div className="space-y-2">
            <h3 className="font-semibold text-blue-600">2. Subscription Purchases Plan Distribution Pie Chart</h3>
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieChartData}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    dataKey="value"
                    label={({ name, value }) => `${name}: ${value}%`}
                  >
                    {pieChartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
