
import { useState } from 'react';
import { Building2, Bot, Bell, Settings, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const Header = () => {
  const [notifications] = useState(2);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <div className="p-2 rounded-lg bg-financial-blue/20">
              <Building2 className="h-6 w-6 text-financial-cyan animate-pulse-glow" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-glow">VALOOV</h1>
              <p className="text-xs text-muted-foreground">Company Valuation Platform</p>
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <div className="hidden md:flex items-center space-x-2">
            <Badge variant="outline" className="bg-financial-green/20 text-financial-green border-financial-green/30">
              <Bot className="h-3 w-3 mr-1" />
              AI Active
            </Badge>
            <Badge variant="outline" className="bg-financial-cyan/20 text-financial-cyan border-financial-cyan/30">
              FR & ES Ready
            </Badge>
          </div>

          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-4 w-4" />
              {notifications > 0 && (
                <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 bg-financial-red text-white text-xs">
                  {notifications}
                </Badge>
              )}
            </Button>
            <Button variant="ghost" size="icon">
              <Settings className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon">
              <User className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
