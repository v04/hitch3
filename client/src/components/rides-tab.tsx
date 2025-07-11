import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { RideHistory } from '@/lib/types';
import { Check, Star, Phone, MapPin, Circle } from 'lucide-react';

// Mock data for development
const mockActiveRide = {
  id: 1,
  from: "MG Road",
  to: "Electronic City", 
  partnerName: "Rahul K.",
  status: "in_progress" as const
};

const mockRideHistory: RideHistory[] = [
  {
    id: 1,
    from: "Koramangala",
    to: "Whitefield",
    date: "Yesterday, 6:30 PM",
    partnerName: "Manoj K.",
    rating: 5.0,
    tokensEarned: 10,
    status: "completed"
  },
  {
    id: 2,
    from: "HSR Layout", 
    to: "Airport",
    date: "Dec 15, 8:00 AM",
    partnerName: "Sneha P.",
    rating: 4.8,
    tokensEarned: 15,
    status: "completed"
  },
  {
    id: 3,
    from: "Indiranagar",
    to: "Banashankari", 
    date: "Dec 10, 7:45 PM",
    partnerName: "Arjun R.",
    rating: 4.9,
    tokensEarned: 12,
    status: "completed"
  }
];

export default function RidesTab() {
  return (
    <div className="px-4 py-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-800">My Rides</h2>
        <Badge className="bg-blue-600/10 text-blue-700">
          {mockRideHistory.length + 1} Total
        </Badge>
      </div>

      {/* Active Ride */}
      <Card className="bg-gradient-to-r from-emerald-500 to-blue-600 text-white mb-6">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-lg">Active Ride</h3>
            <Badge className="bg-white/20 text-white">
              In Progress
            </Badge>
          </div>
          <div className="space-y-3">
            <div className="flex items-center space-x-3">
              <Circle className="w-3 h-3 text-green-300 fill-current" />
              <span>{mockActiveRide.from}</span>
            </div>
            <div className="flex items-center space-x-3">
              <MapPin className="w-3 h-3 text-red-300" />
              <span>{mockActiveRide.to}</span>
            </div>
            <div className="flex items-center justify-between mt-4">
              <div className="flex items-center space-x-3">
                <Avatar className="w-8 h-8">
                  <AvatarFallback className="bg-white/20 text-white">
                    {mockActiveRide.partnerName.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <span className="font-medium">{mockActiveRide.partnerName}</span>
              </div>
              <Button variant="secondary" size="sm" className="bg-white/20 text-white hover:bg-white/30">
                <Phone className="w-4 h-4 mr-2" />
                Contact
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Ride History */}
      <div className="space-y-4">
        <h3 className="font-semibold text-gray-700">Recent History</h3>
        
        {mockRideHistory.map((ride) => (
          <Card key={ride.id} className="shadow-sm border border-gray-100">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                    <Check className="w-5 h-5 text-emerald-500" />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-800">
                      {ride.from} → {ride.to}
                    </h4>
                    <p className="text-sm text-gray-500">{ride.date}</p>
                  </div>
                </div>
                <div className="text-right">
                  <Badge className="bg-amber-500/10 text-amber-700 mb-1">
                    +{ride.tokensEarned}
                  </Badge>
                  <p className="text-xs text-gray-500">tokens earned</p>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Avatar className="w-6 h-6">
                    <AvatarFallback className="bg-blue-600/10 text-blue-600 text-xs">
                      {ride.partnerName.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <span className="text-sm text-gray-600">{ride.partnerName}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Star className="w-3 h-3 text-amber-500 fill-current" />
                  <span className="text-sm text-gray-600">{ride.rating}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
