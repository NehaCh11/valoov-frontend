
import { AdminLayout } from '@/layouts/AdminLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Settings, Database, Shield, Bell, Globe, Save, User, Edit, Download } from 'lucide-react';

const AdminSettings = () => {
  return (
    <AdminLayout>
      {/* Header */}
      <div className="bg-white">
        <div className="px-6">
          <div className="flex justify-between items-center h-16">
            <h1 className="text-2xl font-bold text-black">Platform Settings</h1>
            <div className="flex items-center space-x-4">
              <Button className="bg-green-500 hover:bg-green-600 text-white">
                <Save className="h-4 w-4 mr-2" />
                Save Changes
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-6 p-6">
        {/* Personal Info Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <User className="h-5 w-5" />
              <span>Personal Info</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Photo */}
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <Label className="text-sm font-medium">Photo</Label>
                <p className="text-xs text-muted-foreground">150x150px JPEG, PNG Image</p>
              </div>
              <div className="flex items-center space-x-3">
                <Avatar className="h-16 w-16">
                  <AvatarImage src="/placeholder.svg" />
                  <AvatarFallback>JT</AvatarFallback>
                </Avatar>
                <Button variant="outline" size="sm">
                  <Edit className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Name */}
            <div className="flex items-center justify-between">
              <div className="space-y-1 flex-1">
                <Label className="text-sm font-medium">Name</Label>
                <Input value="Jason Tatum" readOnly className="bg-gray-50" />
              </div>
              <Button variant="outline" size="sm" className="ml-4">
                <Edit className="h-4 w-4 text-orange-500" />
              </Button>
            </div>

            {/* Email */}
            <div className="flex items-center justify-between">
              <div className="space-y-1 flex-1">
                <Label className="text-sm font-medium">Email</Label>
                <Input value="abcd@xyz.com" readOnly className="bg-gray-50" />
              </div>
              <Button variant="outline" size="sm" className="ml-4">
                <Edit className="h-4 w-4 text-orange-500" />
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Security Settings Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Shield className="h-5 w-5" />
              <span>Security Settings</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Multi-Factor Authentication */}
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <Label className="text-sm font-medium">Enable Multi-Factor Authentication</Label>
              </div>
              <Switch defaultChecked />
            </div>

            {/* Policy Document Upload */}
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <Label className="text-sm font-medium">Policy Document Upload</Label>
              </div>
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 text-orange-500" />
              </Button>
            </div>

            {/* Notification Setting */}
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <Label className="text-sm font-medium">Notification Setting (ON/OFF)</Label>
              </div>
              <Switch defaultChecked />
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default AdminSettings;
