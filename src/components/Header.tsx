
import { useState } from 'react';
import { Bot, Bell, Settings, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const Header = () => {
  const [notifications] = useState(2);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-3">
            <img 
              src="/lovable-uploads/ccbfeb8f-e488-4725-8c91-82d50190256a.png" 
              alt="VALOOV AI Logo" 
              className="h-64 w-auto object-contain"
            />
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <div className="hidden md:flex items-center space-x-2">
            <Badge variant="outline" className="bg-financial-cyan/20 text-financial-cyan border-financial-cyan/30">
              <Bot className="h-3 w-3 mr-1" />
              AI Active
            </Badge>
            <Badge variant="outline" className="bg-valoov-orange/20 text-valoov-orange border-valoov-orange/30">
              FR & ES Ready
            </Badge>
          </div>

          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-4 w-4" />
              {notifications > 0 && (
                <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 bg-valoov-orange text-white text-xs">
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
