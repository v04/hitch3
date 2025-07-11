import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import RidePanel from './ride-panel';
import NearbyUsers from './nearby-users';
import { useRole } from '@/hooks/use-role';
import { useLocation } from '@/hooks/use-location';
import { useToast } from '@/hooks/use-toast';
import { Plus, Minus, Navigation, Car, User } from 'lucide-react';

export default function MapView() {
  const { role } = useRole();
  const { location } = useLocation();
  const { toast } = useToast();
  const [showDrivers, setShowDrivers] = useState(true);
  const [showRiders, setShowRiders] = useState(true);

  const handleUserClick = (userType: 'driver' | 'rider', seats?: number) => {
    if (userType === 'driver') {
      toast({
        title: `Pilot Available - ${seats} seats`,
        description: "Tap to request a ride",
      });
    } else {
      toast({
        title: "Rider nearby",
        description: "Looking for the same route",
      });
    }
  };

  return (
    <div>
      {/* Mock Map Interface */}
      <div className="relative h-80 bg-gradient-to-br from-blue-100 to-green-100">
        {/* Map Background with Grid Pattern */}
        <div 
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: `url('data:image/svg+xml,<svg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"><g fill="none" fill-rule="evenodd"><g fill="%23374151" fill-opacity="0.1"><rect width="1" height="1"/></g></g></svg>')`,
            backgroundSize: '30px 30px'
          }}
        />
        
        {/* Current User Location */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20">
          <div className="w-6 h-6 bg-blue-600 rounded-full border-4 border-white shadow-lg animate-pulse"></div>
          <div className="absolute inset-0 w-6 h-6 bg-blue-600/30 rounded-full animate-ping"></div>
        </div>

        {/* Nearby Users (Mock Data) */}
        {showDrivers && (
          <>
            <div 
              className="absolute top-1/4 left-1/4 z-10 cursor-pointer transform hover:scale-110 transition-transform"
              onClick={() => handleUserClick('driver', 3)}
            >
              <div className="w-10 h-10 bg-emerald-500 rounded-full border-2 border-white shadow-lg flex items-center justify-center animate-pulse">
                <Car className="w-5 h-5 text-white" />
              </div>
              <Badge className="absolute -top-2 -right-2 w-6 h-6 bg-amber-500 text-white text-xs flex items-center justify-center p-0">
                3
              </Badge>
            </div>

            <div 
              className="absolute bottom-1/4 left-2/3 z-10 cursor-pointer transform hover:scale-110 transition-transform"
              onClick={() => handleUserClick('driver', 1)}
            >
              <div className="w-10 h-10 bg-blue-600 rounded-full border-2 border-white shadow-lg flex items-center justify-center">
                <Car className="w-5 h-5 text-white" />
              </div>
              <Badge className="absolute -top-2 -right-2 w-6 h-6 bg-amber-500 text-white text-xs flex items-center justify-center p-0">
                1
              </Badge>
            </div>
          </>
        )}

        {showRiders && (
          <div 
            className="absolute top-3/4 right-1/3 z-10 cursor-pointer transform hover:scale-110 transition-transform"
            onClick={() => handleUserClick('rider')}
          >
            <div className="w-8 h-8 bg-amber-500 rounded-full border-2 border-white shadow-lg flex items-center justify-center">
              <User className="w-4 h-4 text-white" />
            </div>
          </div>
        )}

        {/* Map Controls */}
        <div className="absolute top-4 right-4 space-y-2">
          <Button size="sm" variant="secondary" className="w-10 h-10 p-0">
            <Plus className="w-4 h-4" />
          </Button>
          <Button size="sm" variant="secondary" className="w-10 h-10 p-0">
            <Minus className="w-4 h-4" />
          </Button>
          <Button size="sm" variant="secondary" className="w-10 h-10 p-0">
            <Navigation className="w-4 h-4" />
          </Button>
        </div>

        {/* Filter Toggle */}
        <div className="absolute top-4 left-4">
          <Card className="p-2 flex items-center space-x-2">
            <Button
              size="sm"
              variant={showDrivers ? "default" : "secondary"}
              className={`w-8 h-8 p-0 ${showDrivers ? 'bg-emerald-500 hover:bg-emerald-600' : ''}`}
              onClick={() => setShowDrivers(!showDrivers)}
            >
              <Car className="w-4 h-4" />
            </Button>
            <Button
              size="sm"
              variant={showRiders ? "default" : "secondary"}
              className={`w-8 h-8 p-0 ${showRiders ? 'bg-amber-500 hover:bg-amber-600' : ''}`}
              onClick={() => setShowRiders(!showRiders)}
            >
              <User className="w-4 h-4" />
            </Button>
            <span className="text-sm font-medium text-gray-700">2km</span>
          </Card>
        </div>
      </div>

      {/* Ride Action Panel */}
      <RidePanel />

      {/* Nearby Users List */}
      <NearbyUsers />
    </div>
  );
}
