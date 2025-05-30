
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { CreditCard, Lock, ArrowLeft } from 'lucide-react';

interface BillingFormProps {
  selectedPlan: {
    name: string;
    price: string;
    id: string;
  };
  onBack: () => void;
  onPayment: () => void;
}

export function BillingForm({ selectedPlan, onBack, onPayment }: BillingFormProps) {
  const [formData, setFormData] = useState({
    email: '',
    fullName: '',
    company: '',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    billingAddress: '',
    city: '',
    postalCode: '',
    country: ''
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would integrate with Stripe or another payment processor
    onPayment();
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-4">
        <Button variant="ghost" onClick={onBack} className="p-2">
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div>
          <h1 className="text-3xl font-bold text-white">Billing Information</h1>
          <p className="text-gray-400">Complete your purchase to generate the valuation report</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Order Summary */}
        <Card className="bg-card/30 backdrop-blur border-border/50">
          <CardHeader>
            <CardTitle className="text-white">Order Summary</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between">
              <span className="text-gray-300">{selectedPlan.name}</span>
              <span className="text-white font-semibold">{selectedPlan.price}</span>
            </div>
            <Separator />
            <div className="flex justify-between font-semibold">
              <span className="text-white">Total</span>
              <span className="text-valoov-teal text-lg">{selectedPlan.price}</span>
            </div>
            <div className="mt-4 p-3 bg-valoov-teal/10 rounded-lg border border-valoov-teal/30">
              <div className="flex items-center space-x-2 text-valoov-teal text-sm">
                <Lock className="h-4 w-4" />
                <span>Secure SSL encrypted payment</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Billing Form */}
        <Card className="lg:col-span-2 bg-card/30 backdrop-blur border-border/50">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2 text-white">
              <CreditCard className="h-5 w-5" />
              <span>Payment Details</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Contact Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-white">Contact Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="email" className="text-gray-300">Email Address</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      className="bg-card/50 border-border text-white"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="fullName" className="text-gray-300">Full Name</Label>
                    <Input
                      id="fullName"
                      value={formData.fullName}
                      onChange={(e) => handleInputChange('fullName', e.target.value)}
                      className="bg-card/50 border-border text-white"
                      required
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="company" className="text-gray-300">Company (Optional)</Label>
                  <Input
                    id="company"
                    value={formData.company}
                    onChange={(e) => handleInputChange('company', e.target.value)}
                    className="bg-card/50 border-border text-white"
                  />
                </div>
              </div>

              <Separator />

              {/* Payment Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-white">Payment Information</h3>
                <div>
                  <Label htmlFor="cardNumber" className="text-gray-300">Card Number</Label>
                  <Input
                    id="cardNumber"
                    placeholder="1234 5678 9012 3456"
                    value={formData.cardNumber}
                    onChange={(e) => handleInputChange('cardNumber', e.target.value)}
                    className="bg-card/50 border-border text-white"
                    required
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="expiryDate" className="text-gray-300">Expiry Date</Label>
                    <Input
                      id="expiryDate"
                      placeholder="MM/YY"
                      value={formData.expiryDate}
                      onChange={(e) => handleInputChange('expiryDate', e.target.value)}
                      className="bg-card/50 border-border text-white"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="cvv" className="text-gray-300">CVV</Label>
                    <Input
                      id="cvv"
                      placeholder="123"
                      value={formData.cvv}
                      onChange={(e) => handleInputChange('cvv', e.target.value)}
                      className="bg-card/50 border-border text-white"
                      required
                    />
                  </div>
                </div>
              </div>

              <Separator />

              {/* Billing Address */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-white">Billing Address</h3>
                <div>
                  <Label htmlFor="billingAddress" className="text-gray-300">Address</Label>
                  <Input
                    id="billingAddress"
                    value={formData.billingAddress}
                    onChange={(e) => handleInputChange('billingAddress', e.target.value)}
                    className="bg-card/50 border-border text-white"
                    required
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="city" className="text-gray-300">City</Label>
                    <Input
                      id="city"
                      value={formData.city}
                      onChange={(e) => handleInputChange('city', e.target.value)}
                      className="bg-card/50 border-border text-white"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="postalCode" className="text-gray-300">Postal Code</Label>
                    <Input
                      id="postalCode"
                      value={formData.postalCode}
                      onChange={(e) => handleInputChange('postalCode', e.target.value)}
                      className="bg-card/50 border-border text-white"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="country" className="text-gray-300">Country</Label>
                    <Input
                      id="country"
                      value={formData.country}
                      onChange={(e) => handleInputChange('country', e.target.value)}
                      className="bg-card/50 border-border text-white"
                      required
                    />
                  </div>
                </div>
              </div>

              <Button 
                type="submit" 
                className="w-full bg-valoov-orange hover:bg-valoov-orange/90 text-lg py-3"
              >
                Complete Payment {selectedPlan.price}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
