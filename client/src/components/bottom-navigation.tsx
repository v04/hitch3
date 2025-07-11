import { Button } from '@/components/ui/button';
import { TabType } from '@/lib/types';
import { Map, Car, Gift, User } from 'lucide-react';
import { cn } from '@/lib/utils';

interface BottomNavigationProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
}

export default function BottomNavigation({ activeTab, onTabChange }: BottomNavigationProps) {
  const tabs = [
    { id: 'map' as TabType, label: 'Map', icon: Map },
    { id: 'rides' as TabType, label: 'Rides', icon: Car },
    { id: 'rewards' as TabType, label: 'Rewards', icon: Gift },
    { id: 'profile' as TabType, label: 'Profile', icon: User },
  ];

  return (
    <nav className="fixed bottom-0 left-1/2 transform -translate-x-1/2 w-full max-w-sm bg-white border-t border-gray-200 px-4 py-1 z-50">
      <div className="flex items-center justify-around">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          
          return (
            <Button
              key={tab.id}
              variant="ghost"
              size="sm"
              onClick={() => onTabChange(tab.id)}
              className={cn(
                "flex flex-col items-center py-1 px-3 rounded-lg transition-all duration-200",
                isActive 
                  ? "text-blue-600 bg-blue-50" 
                  : "text-gray-400 hover:text-gray-600"
              )}
            >
              <Icon className="w-4 h-4 mb-1" />
              <span className="text-xs font-medium">{tab.label}</span>
            </Button>
          );
        })}
      </div>
    </nav>
  );
}
