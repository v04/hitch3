import { useState } from 'react';
import RoleToggle from '@/components/role-toggle';
import MapView from '@/components/map-view';
import BottomNavigation from '@/components/bottom-navigation';
import RidesTab from '@/components/rides-tab';
import RewardsTab from '@/components/rewards-tab';
import ProfileTab from '@/components/profile-tab';
import { TabType } from '@/lib/types';
import { Bell, Car } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

export default function HomePage() {
  const [activeTab, setActiveTab] = useState<TabType>('map');

  const renderTabContent = () => {
    switch (activeTab) {
      case 'map':
        return <MapView />;
      case 'rides':
        return <RidesTab />;
      case 'rewards':
        return <RewardsTab />;
      case 'profile':
        return <ProfileTab />;
      default:
        return <MapView />;
    }
  };

  return (
    <>
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-100 px-4 py-2 relative z-40">
        <div className="flex items-center justify-between">
          {/* Logo and Location */}
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <Car className="w-4 h-4 text-white" />
            </div>
            <div>
              <h1 className="font-bold text-lg text-blue-600">Hitch</h1>
              <p className="text-xs text-gray-500">Bangalore, India</p>
            </div>
          </div>

          {/* Role Toggle and Notifications */}
          <div className="flex items-center space-x-3">
            <RoleToggle />
            
            {/* Notification Bell */}
            <Button variant="ghost" size="sm" className="relative p-2">
              <Bell className="w-5 h-5 text-gray-600" />
              <Badge className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-xs flex items-center justify-center p-0">
                2
              </Badge>
            </Button>
          </div>
        </div>
      </header>

      {/* Tab Content */}
      <div className="pb-16">
        {renderTabContent()}
      </div>

      {/* Bottom Navigation */}
      <BottomNavigation activeTab={activeTab} onTabChange={setActiveTab} />
    </>
  );
}
