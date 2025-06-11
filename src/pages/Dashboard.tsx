
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart3, TrendingUp, FileText, DollarSign } from 'lucide-react';
import { SidebarTrigger } from '@/components/ui/sidebar';

const Dashboard = () => {
  return (
    <main className="flex-1">
      <div className="p-4 border-b bg-white">
        <SidebarTrigger />
      </div>
      <div className="p-6">
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
            <p className="text-muted-foreground">Welcome to your VALOOV valuation dashboard</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Valuations</CardTitle>
                <BarChart3 className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">12</div>
                <p className="text-xs text-muted-foreground">+2 from last month</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Avg Valuation</CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">$2.4M</div>
                <p className="text-xs text-muted-foreground">+12% from last month</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Reports Generated</CardTitle>
                <FileText className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">8</div>
                <p className="text-xs text-muted-foreground">+1 from last week</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Growth Rate</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">+24%</div>
                <p className="text-xs text-muted-foreground">Year over year</p>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>Your latest valuation activities</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center space-x-4">
                    <div className="w-2 h-2 bg-valoov-teal rounded-full"></div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">Tech Startup Valuation Completed</p>
                      <p className="text-xs text-muted-foreground">2 hours ago</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="w-2 h-2 bg-valoov-orange rounded-full"></div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">New Questionnaire Started</p>
                      <p className="text-xs text-muted-foreground">1 day ago</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">Report Generated</p>
                      <p className="text-xs text-muted-foreground">3 days ago</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
                <CardDescription>Common tasks to get you started</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <button className="w-full text-left p-3 rounded-lg border border-border hover:bg-accent transition-colors">
                  <div className="font-medium">Start New Valuation</div>
                  <div className="text-sm text-muted-foreground">Begin AI-powered questionnaire</div>
                </button>
                <button className="w-full text-left p-3 rounded-lg border border-border hover:bg-accent transition-colors">
                  <div className="font-medium">View Reports</div>
                  <div className="text-sm text-muted-foreground">Access your generated reports</div>
                </button>
                <button className="w-full text-left p-3 rounded-lg border border-border hover:bg-accent transition-colors">
                  <div className="font-medium">Update Profile</div>
                  <div className="text-sm text-muted-foreground">Manage company information</div>
                </button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Dashboard;
