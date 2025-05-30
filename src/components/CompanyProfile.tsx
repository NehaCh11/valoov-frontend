
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Building2, Globe, MapPin, Calendar } from 'lucide-react';

export function CompanyProfile() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Company Profile</h1>
        <p className="text-gray-600 mt-1">Learn about VALOOV and our mission</p>
      </div>

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
                <p className="text-sm text-gray-600">Company Name</p>
                <p className="font-semibold text-gray-900 text-lg">VALOOV</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Founded</p>
                <div className="flex items-center space-x-2">
                  <Calendar className="h-4 w-4 text-valoov-teal" />
                  <span className="font-semibold text-gray-900">2013</span>
                </div>
              </div>
              <div>
                <p className="text-sm text-gray-600">Headquarters</p>
                <div className="flex items-center space-x-2">
                  <MapPin className="h-4 w-4 text-valoov-orange" />
                  <span className="font-semibold text-gray-900">Valencia, Spain</span>
                </div>
                <p className="text-sm text-gray-600 mt-1">with presence in the Netherlands</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Website</p>
                <div className="flex items-center space-x-2">
                  <Globe className="h-4 w-4 text-financial-cyan" />
                  <a href="https://www.valoov.com" className="font-semibold text-valoov-teal hover:underline">
                    www.valoov.com
                  </a>
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-600">Industry</p>
                <Badge className="bg-valoov-teal/20 text-valoov-teal border-valoov-teal/30">
                  Financial Technology (FinTech)
                </Badge>
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
          <p className="text-gray-700 leading-relaxed">
            VALOOV is the leading online platform for startup valuation. Our mission is to bring transparency 
            and data integrity to the startup investment process by offering accurate, accessible, and defensible 
            valuations. We simplify complex valuation methods—like DCF, Scorecard, and Venture Capital Method—into 
            one comprehensive tool used by entrepreneurs, advisors, and investors alike.
          </p>
        </CardContent>
      </Card>

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
