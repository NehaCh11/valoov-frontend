import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  CreditCard, 
  Download, 
  Calendar, 
  RefreshCw,
  CheckCircle,
  XCircle,
  Minus,
  Eye
} from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

interface Invoice {
  id: string;
  plan: string;
  date: string;
  amount: string;
  status: 'paid' | 'failed' | 'free';
  downloadType: 'pdf' | 'retry' | 'none';
}

interface HistoryProps {
  setActiveView?: (view: string) => void;
}

export function History({ setActiveView }: HistoryProps) {
  // Mock data for current plan
  const currentPlan = {
    name: 'Basic Report',
    expiryDate: '15 Feb 2025',
    status: 'active'
  };

  // Mock data for invoicing history
  const invoices: Invoice[] = [
    {
      id: '#INV-00021',
      plan: 'Pro Monthly',
      date: '02 May 2025',
      amount: '€49.00',
      status: 'paid',
      downloadType: 'pdf'
    },
    {
      id: '#INV-00020',
      plan: 'Pro Monthly',
      date: '02 April 2025',
      amount: '€49.00',
      status: 'paid',
      downloadType: 'pdf'
    },
    {
      id: '#INV-00019',
      plan: 'Trial Plan',
      date: '02 March 2025',
      amount: '€0.00',
      status: 'free',
      downloadType: 'none'
    },
    {
      id: '#INV-00018',
      plan: 'Pro Monthly',
      date: '02 Feb 2025',
      amount: '€49.00',
      status: 'failed',
      downloadType: 'retry'
    }
  ];

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'paid':
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'failed':
        return <XCircle className="h-4 w-4 text-red-600" />;
      case 'free':
        return <CheckCircle className="h-4 w-4 text-blue-600" />;
      default:
        return null;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'paid':
        return 'bg-green-600 text-white';
      case 'failed':
        return 'bg-red-600 text-white';
      case 'free':
        return 'bg-blue-600 text-white';
      default:
        return 'bg-gray-600 text-white';
    }
  };

  const getDownloadButton = (invoice: Invoice) => {
    switch (invoice.downloadType) {
      case 'pdf':
        return (
          <Button size="sm" variant="outline" className="flex items-center space-x-1">
            <Download className="h-4 w-4" />
            <span>PDF</span>
          </Button>
        );
      case 'retry':
        return (
          <Button size="sm" variant="outline" className="flex items-center space-x-1 text-orange-600 border-orange-600 hover:bg-orange-50">
            <RefreshCw className="h-4 w-4" />
            <span>Retry</span>
          </Button>
        );
      case 'none':
        return <Minus className="h-4 w-4 text-gray-400" />;
      default:
        return null;
    }
  };

  const handleViewClick = () => {
    if (setActiveView) {
      setActiveView('questionnaire');
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-black">Billing & Payment</h1>
        <p className="text-gray-600 mt-1">Manage your subscription and view payment history</p>
      </div>

      {/* Current Plan Section */}
      <Card className="bg-card/30 backdrop-blur border-border/50">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <CreditCard className="h-5 w-5 text-valoov-teal" />
            <span>Current Plan</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between p-4 bg-card/20 rounded-lg">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-valoov-teal/20 rounded-lg flex items-center justify-center">
                <CreditCard className="h-6 w-6 text-valoov-teal" />
              </div>
              <div>
                <h3 className="font-semibold text-black text-lg">{currentPlan.name}</h3>
                <div className="flex items-center space-x-3 mt-1">
                  <div className="flex items-center space-x-1">
                    <Calendar className="h-4 w-4 text-gray-500" />
                    <span className="text-sm text-gray-600">Expires: {currentPlan.expiryDate}</span>
                  </div>
                  <Badge className="bg-green-600 text-white">
                    {currentPlan.status}
                  </Badge>
                </div>
              </div>
            </div>
            <Button className="bg-valoov-orange hover:bg-valoov-orange/90">
              Renew Plan
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Invoicing History Section */}
      <Card className="bg-card/30 backdrop-blur border-border/50">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <CreditCard className="h-5 w-5 text-valoov-orange" />
            <span>Invoicing History</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="rounded-lg border border-border/50 overflow-hidden">
            <Table>
              <TableHeader className="bg-card/20">
                <TableRow>
                  <TableHead className="text-black font-semibold">Invoice ID</TableHead>
                  <TableHead className="text-black font-semibold">Plan</TableHead>
                  <TableHead className="text-black font-semibold">Date</TableHead>
                  <TableHead className="text-black font-semibold">Amount</TableHead>
                  <TableHead className="text-black font-semibold">Status</TableHead>
                  <TableHead className="text-black font-semibold">Download</TableHead>
                  <TableHead className="text-black font-semibold">View</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {invoices.map((invoice) => (
                  <TableRow key={invoice.id} className="bg-card/10 hover:bg-card/20">
                    <TableCell className="font-medium text-valoov-teal">
                      {invoice.id}
                    </TableCell>
                    <TableCell className="text-black">{invoice.plan}</TableCell>
                    <TableCell className="text-gray-600">{invoice.date}</TableCell>
                    <TableCell className="text-black font-medium">{invoice.amount}</TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        {getStatusIcon(invoice.status)}
                        <Badge className={`text-xs ${getStatusColor(invoice.status)}`}>
                          {invoice.status === 'paid' ? 'Paid' : invoice.status === 'failed' ? 'Failed' : 'Free'}
                        </Badge>
                      </div>
                    </TableCell>
                    <TableCell>
                      {getDownloadButton(invoice)}
                    </TableCell>
                    <TableCell>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={handleViewClick}
                        className="flex items-center space-x-1"
                      >
                        <Eye className="h-4 w-4" />
                        <span>View</span>
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
