
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Bell, Shield, User, Globe } from 'lucide-react';

export function NotificationSettings() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-white">Notifications</h1>
        <p className="text-gray-400 mt-1">Manage which alerts you receive via email and in-app</p>
      </div>

      {/* Notification Preferences */}
      <Card className="bg-card/30 backdrop-blur border-border/50">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Bell className="h-5 w-5 text-valoov-teal" />
            <span>Notification Preferences</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <Label className="text-base font-medium">Email Notifications</Label>
              <p className="text-sm text-gray-400">Receive updates via email</p>
            </div>
            <Switch defaultChecked />
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <Label className="text-base font-medium">Valuation Updates</Label>
              <p className="text-sm text-gray-400">Get notified when valuations are complete</p>
            </div>
            <Switch defaultChecked />
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <Label className="text-base font-medium">Document Processing</Label>
              <p className="text-sm text-gray-400">Alerts for document upload status</p>
            </div>
            <Switch />
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <Label className="text-base font-medium">Marketing Updates</Label>
              <p className="text-sm text-gray-400">Product updates and feature announcements</p>
            </div>
            <Switch />
          </div>
        </CardContent>
      </Card>

      {/* Account Preferences */}
      <Card className="bg-card/30 backdrop-blur border-border/50">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Globe className="h-5 w-5 text-valoov-orange" />
            <span>Account Preferences</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label>Language Selection</Label>
              <Select defaultValue="en">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="en">English</SelectItem>
                  <SelectItem value="es">Español</SelectItem>
                  <SelectItem value="fr">Français</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label>Timezone</Label>
              <Select defaultValue="europe/madrid">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="europe/madrid">Europe/Madrid</SelectItem>
                  <SelectItem value="europe/amsterdam">Europe/Amsterdam</SelectItem>
                  <SelectItem value="america/new_york">America/New_York</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label>Date Format</Label>
              <Select defaultValue="dd/mm/yyyy">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="dd/mm/yyyy">DD/MM/YYYY</SelectItem>
                  <SelectItem value="mm/dd/yyyy">MM/DD/YYYY</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label>Currency Preference</Label>
              <Select defaultValue="eur">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="eur">EUR (€)</SelectItem>
                  <SelectItem value="usd">USD ($)</SelectItem>
                  <SelectItem value="aed">AED (د.إ)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Security Settings */}
      <Card className="bg-card/30 backdrop-blur border-border/50">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Shield className="h-5 w-5 text-financial-cyan" />
            <span>Security Settings</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <Label className="text-base font-medium">2-Factor Authentication</Label>
              <p className="text-sm text-gray-400">Enable via authenticator app or SMS</p>
            </div>
            <Switch />
          </div>
          
          <div>
            <Label className="text-base font-medium">Change Password</Label>
            <div className="grid grid-cols-1 gap-4 mt-2">
              <Input type="password" placeholder="Current Password" />
              <Input type="password" placeholder="New Password" />
              <Input type="password" placeholder="Confirm New Password" />
            </div>
            <Button className="mt-2">Update Password</Button>
          </div>
          
          <div>
            <Label className="text-base font-medium">Recent Login Activity</Label>
            <div className="mt-2 space-y-2">
              <div className="flex justify-between items-center p-2 bg-card/20 rounded">
                <span className="text-sm">Current Session - Chrome on Windows</span>
                <span className="text-xs text-gray-400">Now</span>
              </div>
              <div className="flex justify-between items-center p-2 bg-card/20 rounded">
                <span className="text-sm">Mobile App - iPhone</span>
                <span className="text-xs text-gray-400">2 hours ago</span>
              </div>
            </div>
            <Button variant="outline" className="mt-2">Logout from All Devices</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
