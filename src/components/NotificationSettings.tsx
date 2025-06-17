import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { TopNavigation } from '@/components/TopNavigation';
import { Bell, Shield, Smartphone, Mail, MessageSquare, DollarSign, FileText, LogOut } from 'lucide-react';

export function NotificationSettings() {
  const navigate = useNavigate();
  
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [pushNotifications, setPushNotifications] = useState(true);
  const [smsNotifications, setSmsNotifications] = useState(false);
  const [marketingEmails, setMarketingEmails] = useState(true);
  const [securityAlerts, setSecurityAlerts] = useState(true);
  const [reportReady, setReportReady] = useState(true);
  const [valuationUpdates, setValuationUpdates] = useState(true);
  const [paymentAlerts, setPaymentAlerts] = useState(true);
  const [systemMaintenance, setSystemMaintenance] = useState(false);

  const handleSignOut = () => {
    // Clear any stored authentication data
    localStorage.removeItem('authToken');
    localStorage.removeItem('adminToken');
    // Redirect to homepage
    navigate('/');
  };

  const handleLogoutAllDevices = () => {
    // Clear any stored authentication data
    localStorage.removeItem('authToken');
    localStorage.removeItem('adminToken');
    // Add any additional cleanup here (like calling an API to invalidate all sessions)
    console.log('Logging out from all devices');
    // Redirect to homepage
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <TopNavigation onSignOut={handleSignOut} />
      
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-800 mb-2">Notification Settings</h1>
          <p className="text-slate-600">Manage how you receive notifications and updates from VALOOV.</p>
        </div>

        <div className="space-y-6">
          {/* Email Notifications Card */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Mail className="h-5 w-5 text-valoov-orange" />
                Email Notifications
              </CardTitle>
              <CardDescription>
                Control which email notifications you receive
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <Label htmlFor="email-notifications" className="text-sm font-medium">
                  General email notifications
                </Label>
                <Switch
                  id="email-notifications"
                  checked={emailNotifications}
                  onCheckedChange={setEmailNotifications}
                />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="marketing-emails" className="text-sm font-medium">
                  Marketing and promotional emails
                </Label>
                <Switch
                  id="marketing-emails"
                  checked={marketingEmails}
                  onCheckedChange={setMarketingEmails}
                />
              </div>
            </CardContent>
          </Card>

          {/* Push Notifications Card */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="h-5 w-5 text-valoov-orange" />
                Push Notifications
              </CardTitle>
              <CardDescription>
                Manage browser and mobile push notifications
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <Label htmlFor="push-notifications" className="text-sm font-medium">
                  Browser push notifications
                </Label>
                <Switch
                  id="push-notifications"
                  checked={pushNotifications}
                  onCheckedChange={setPushNotifications}
                />
              </div>
            </CardContent>
          </Card>

          {/* SMS Notifications Card */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Smartphone className="h-5 w-5 text-valoov-orange" />
                SMS Notifications
              </CardTitle>
              <CardDescription>
                Receive important updates via text message
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <Label htmlFor="sms-notifications" className="text-sm font-medium">
                  SMS alerts for critical updates
                </Label>
                <Switch
                  id="sms-notifications"
                  checked={smsNotifications}
                  onCheckedChange={setSmsNotifications}
                />
              </div>
            </CardContent>
          </Card>

          {/* Security Alerts Card */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-valoov-orange" />
                Security & Account
              </CardTitle>
              <CardDescription>
                Important security and account-related notifications
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <Label htmlFor="security-alerts" className="text-sm font-medium">
                  Security alerts and login notifications
                </Label>
                <Switch
                  id="security-alerts"
                  checked={securityAlerts}
                  onCheckedChange={setSecurityAlerts}
                />
              </div>
            </CardContent>
          </Card>

          {/* Valuation & Reports Card */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-valoov-orange" />
                Valuation & Reports
              </CardTitle>
              <CardDescription>
                Notifications about your valuations and reports
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <Label htmlFor="report-ready" className="text-sm font-medium">
                  Report completion notifications
                </Label>
                <Switch
                  id="report-ready"
                  checked={reportReady}
                  onCheckedChange={setReportReady}
                />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="valuation-updates" className="text-sm font-medium">
                  Valuation updates and changes
                </Label>
                <Switch
                  id="valuation-updates"
                  checked={valuationUpdates}
                  onCheckedChange={setValuationUpdates}
                />
              </div>
            </CardContent>
          </Card>

          {/* Billing & Payments Card */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <DollarSign className="h-5 w-5 text-valoov-orange" />
                Billing & Payments
              </CardTitle>
              <CardDescription>
                Payment confirmations and billing updates
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <Label htmlFor="payment-alerts" className="text-sm font-medium">
                  Payment confirmations and receipts
                </Label>
                <Switch
                  id="payment-alerts"
                  checked={paymentAlerts}
                  onCheckedChange={setPaymentAlerts}
                />
              </div>
            </CardContent>
          </Card>

          {/* System Updates Card */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageSquare className="h-5 w-5 text-valoov-orange" />
                System Updates
              </CardTitle>
              <CardDescription>
                Platform updates and maintenance notifications
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <Label htmlFor="system-maintenance" className="text-sm font-medium">
                  Maintenance and system update notifications
                </Label>
                <Switch
                  id="system-maintenance"
                  checked={systemMaintenance}
                  onCheckedChange={setSystemMaintenance}
                />
              </div>
            </CardContent>
          </Card>

          {/* Account Actions Card */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <LogOut className="h-5 w-5 text-red-500" />
                Account Actions
              </CardTitle>
              <CardDescription>
                Manage your account security and sessions
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Separator />
              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-sm font-medium text-red-600">
                    Logout from all devices
                  </Label>
                  <p className="text-xs text-slate-500 mt-1">
                    This will end all active sessions on all devices
                  </p>
                </div>
                <Button 
                  variant="destructive" 
                  size="sm"
                  onClick={handleLogoutAllDevices}
                >
                  Logout All
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
