
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Building2, Globe, MapPin, Calendar, Edit, Save, X } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

interface CompanyData {
  name: string;
  founded: string;
  headquarters: string;
  website: string;
  industry: string;
  about: string;
}

export function CompanyProfile() {
  const [isEditing, setIsEditing] = useState(false);
  
  const initialData: CompanyData = {
    name: 'VALOOV',
    founded: '2013',
    headquarters: 'Valencia, Spain',
    website: 'www.valoov.com',
    industry: 'Financial Technology (FinTech)',
    about: 'VALOOV is the leading online platform for startup valuation. Our mission is to bring transparency and data integrity to the startup investment process by offering accurate, accessible, and defensible valuations. We simplify complex valuation methods—like DCF, Scorecard, and Venture Capital Method—into one comprehensive tool used by entrepreneurs, advisors, and investors alike.'
  };

  const form = useForm<CompanyData>({
    defaultValues: initialData
  });

  const onSubmit = (data: CompanyData) => {
    console.log('Updated company data:', data);
    setIsEditing(false);
    // Here you would typically save to backend
  };

  const handleCancel = () => {
    form.reset(initialData);
    setIsEditing(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Company Profile</h1>
        {!isEditing ? (
          <Button 
            onClick={() => setIsEditing(true)}
            variant="outline"
            className="flex items-center space-x-2"
          >
            <Edit className="h-4 w-4" />
            <span>Edit Information</span>
          </Button>
        ) : (
          <div className="flex space-x-2">
            <Button 
              onClick={form.handleSubmit(onSubmit)}
              className="bg-valoov-teal hover:bg-valoov-teal/90 flex items-center space-x-2"
            >
              <Save className="h-4 w-4" />
              <span>Save Changes</span>
            </Button>
            <Button 
              onClick={handleCancel}
              variant="outline"
              className="flex items-center space-x-2"
            >
              <X className="h-4 w-4" />
              <span>Cancel</span>
            </Button>
          </div>
        )}
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {/* Company Overview */}
          <Card className="bg-card/30 backdrop-blur border-border/50">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 text-gray-900">
                <Building2 className="h-5 w-5 text-valoov-teal" />
                <span>Company Information</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-sm text-gray-600">Company Name</FormLabel>
                          <FormControl>
                            {isEditing ? (
                              <Input {...field} className="font-semibold text-gray-900 text-lg" />
                            ) : (
                              <p className="font-semibold text-gray-900 text-lg">{field.value}</p>
                            )}
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <div>
                    <FormField
                      control={form.control}
                      name="founded"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-sm text-gray-600">Founded</FormLabel>
                          <FormControl>
                            {isEditing ? (
                              <div className="flex items-center space-x-2">
                                <Calendar className="h-4 w-4 text-valoov-teal" />
                                <Input {...field} className="font-semibold text-gray-900" />
                              </div>
                            ) : (
                              <div className="flex items-center space-x-2">
                                <Calendar className="h-4 w-4 text-valoov-teal" />
                                <span className="font-semibold text-gray-900">{field.value}</span>
                              </div>
                            )}
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <div>
                    <FormField
                      control={form.control}
                      name="headquarters"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-sm text-gray-600">Headquarters</FormLabel>
                          <FormControl>
                            {isEditing ? (
                              <div className="flex items-center space-x-2">
                                <MapPin className="h-4 w-4 text-valoov-orange" />
                                <Input {...field} className="font-semibold text-gray-900" />
                              </div>
                            ) : (
                              <div className="flex items-center space-x-2">
                                <MapPin className="h-4 w-4 text-valoov-orange" />
                                <span className="font-semibold text-gray-900">{field.value}</span>
                              </div>
                            )}
                          </FormControl>
                          <p className="text-sm text-gray-600 mt-1">with presence in the Netherlands</p>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <div>
                    <FormField
                      control={form.control}
                      name="website"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-sm text-gray-600">Website</FormLabel>
                          <FormControl>
                            {isEditing ? (
                              <div className="flex items-center space-x-2">
                                <Globe className="h-4 w-4 text-financial-cyan" />
                                <Input {...field} className="font-semibold text-valoov-teal" />
                              </div>
                            ) : (
                              <div className="flex items-center space-x-2">
                                <Globe className="h-4 w-4 text-financial-cyan" />
                                <a href={`https://${field.value}`} className="font-semibold text-valoov-teal hover:underline">
                                  {field.value}
                                </a>
                              </div>
                            )}
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <FormField
                      control={form.control}
                      name="industry"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-sm text-gray-600">Industry</FormLabel>
                          <FormControl>
                            {isEditing ? (
                              <Input {...field} />
                            ) : (
                              <Badge className="bg-valoov-teal/20 text-valoov-teal border-valoov-teal/30">
                                {field.value}
                              </Badge>
                            )}
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <div>
                    <p className="text-sm text-gray-600">Type</p>
                    <div className="flex flex-wrap gap-2">
                      <Badge variant="outline">SaaS</Badge>
                      <Badge variant="outline">B2B</Badge>
                      <Badge variant="outline">API</Badge>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* About Us */}
          <Card className="bg-card/30 backdrop-blur border-border/50">
            <CardHeader>
              <CardTitle className="text-gray-900">About Us</CardTitle>
            </CardHeader>
            <CardContent>
              <FormField
                control={form.control}
                name="about"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      {isEditing ? (
                        <Textarea 
                          {...field} 
                          className="text-gray-700 leading-relaxed min-h-[120px]"
                          placeholder="Enter company description..."
                        />
                      ) : (
                        <p className="text-gray-700 leading-relaxed">{field.value}</p>
                      )}
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>
        </form>
      </Form>

      {/* Key Features */}
      <Card className="bg-card/30 backdrop-blur border-border/50">
        <CardHeader>
          <CardTitle className="text-gray-900">Key Features</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-3 text-gray-700">
            <li className="flex items-start space-x-2">
              <div className="w-2 h-2 bg-valoov-teal rounded-full mt-2"></div>
              <span>5 valuation methods combined into a single, comprehensive report</span>
            </li>
            <li className="flex items-start space-x-2">
              <div className="w-2 h-2 bg-valoov-teal rounded-full mt-2"></div>
              <span>37-question qualitative assessment + 3-year financial forecast</span>
            </li>
            <li className="flex items-start space-x-2">
              <div className="w-2 h-2 bg-valoov-teal rounded-full mt-2"></div>
              <span>Real-time insights and investor-ready PDF reports</span>
            </li>
            <li className="flex items-start space-x-2">
              <div className="w-2 h-2 bg-valoov-teal rounded-full mt-2"></div>
              <span>API integration for platforms and financial tools</span>
            </li>
            <li className="flex items-start space-x-2">
              <div className="w-2 h-2 bg-valoov-teal rounded-full mt-2"></div>
              <span>Used for funding, M&A, internal decision-making, and legal filings</span>
            </li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
