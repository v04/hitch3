import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { NearbyUser } from '@/lib/types';
import { Star, Car, User } from 'lucide-react';

// Mock data for development
const mockNearbyUsers: NearbyUser[] = [
  {
    id: 1,
    name: "Arjun R.",
    role: "driver",
    location: { lat: 12.9716, lng: 77.5946, address: "0.8km away" },
    rating: 4.8,
    distance: 0.8,
    seatsAvailable: 2
  },
  {
    id: 2,
    name: "Priya S.",
    role: "rider",
    location: { lat: 12.9716, lng: 77.5946, address: "1.2km away" },
    rating: 4.9,
    distance: 1.2
  },
  {
    id: 3,
    name: "Rahul K.",
    role: "driver",
    location: { lat: 12.9716, lng: 77.5946, address: "1.5km away" },
    rating: 4.7,
    distance: 1.5,
    seatsAvailable: 1
  },
  {
    id: 4,
    name: "Sneha M.",
    role: "rider",
    location: { lat: 12.9716, lng: 77.5946, address: "1.8km away" },
    rating: 4.9,
    distance: 1.8
  }
];

export default function NearbyUsers() {
  return (
    <div className="bg-gray-50 px-4 py-6">
      <h3 className="font-semibold text-gray-800 mb-4">
        Nearby Community ({mockNearbyUsers.length})
      </h3>
      <div className="space-y-3">
        {mockNearbyUsers.map((user) => (
          <Card 
            key={user.id} 
            className="shadow-sm border border-gray-100 hover:shadow-md transition-shadow cursor-pointer"
          >
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Avatar className="w-12 h-12">
                    <AvatarFallback className="bg-gradient-to-br from-emerald-500 to-blue-600 text-white font-semibold">
                      {user.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h4 className="font-semibold text-gray-800">{user.name}</h4>
                    <div className="flex items-center space-x-2">
                      <div className="flex items-center">
                        <Star className="w-3 h-3 text-amber-500 fill-current" />
                        <span className="text-sm text-gray-600 ml-1">{user.rating}</span>
                      </div>
                      <span className="text-gray-300">•</span>
                      <span className="text-sm text-gray-600">{user.distance}km away</span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    user.role === 'driver' ? 'bg-emerald-500' : 'bg-amber-500'
                  }`}>
                    {user.role === 'driver' ? (
                      <Car className="w-4 h-4 text-white" />
                    ) : (
                      <User className="w-4 h-4 text-white" />
                    )}
                  </div>
                  <span className="text-xs text-gray-500 mt-1 block">
                    {user.role === 'driver' ? `${user.seatsAvailable} seats` : 'Rider'}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
