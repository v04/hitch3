import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { useRole } from '@/hooks/use-role';
import { useToast } from '@/hooks/use-toast';
import { MapPin, Navigation, Users, Clock, Car, Plane } from 'lucide-react';

export default function RidePanel() {
  const { role } = useRole();
  const { toast } = useToast();
  const [destination, setDestination] = useState('');
  const [route, setRoute] = useState('');
  const [seats, setSeats] = useState('1');
  const [time, setTime] = useState('');

  const handleRequestRide = () => {
    if (!destination.trim()) {
      toast({
        title: "Destination required",
        description: "Please enter where you want to go",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Looking for nearby pilots...",
      description: "We'll notify you when we find a match",
    });

    // Simulate finding a match
    setTimeout(() => {
      toast({
        title: "Match found! 🎉",
        description: "Arjun is coming to pick you up",
      });
    }, 2000);
  };

  const handleStartDriving = () => {
    if (!route.trim()) {
      toast({
        title: "Route required",
        description: "Please enter your planned route",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "You are now live! ✈️",
      description: "Accepting ride requests on your route",
    });
  };

  if (role === 'rider') {
    return (
      <Card className="mx-4 my-6 shadow-lg">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-gray-800">Find a Ride</h2>
            <Badge className="bg-amber-500/10 text-amber-700 hover:bg-amber-500/20">
              +10 tokens per ride
            </Badge>
          </div>
          
          <div className="space-y-3 mb-6">
            <div className="relative">
              <MapPin className="absolute left-4 top-4 w-4 h-4 text-emerald-500" />
              <Input 
                placeholder="Current location" 
                className="pl-12 pr-4 py-3 bg-gray-50 border-0 focus-visible:ring-2 focus-visible:ring-emerald-500"
                defaultValue="MG Road, Bangalore"
                readOnly
              />
            </div>
            <div className="relative">
              <Navigation className="absolute left-4 top-4 w-4 h-4 text-amber-500" />
              <Input 
                placeholder="Where to?" 
                className="pl-12 pr-4 py-3 bg-gray-50 border-0 focus-visible:ring-2 focus-visible:ring-blue-500"
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
              />
            </div>
          </div>

          <Button 
            onClick={handleRequestRide}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 rounded-xl"
          >
            <Car className="w-5 h-5 mr-2" />
            Request a Hitch
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="mx-4 my-6 shadow-lg">
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-gray-800">Offer Rides</h2>
          <Badge className="bg-emerald-500/10 text-emerald-700 hover:bg-emerald-500/20">
            Available
          </Badge>
        </div>
        
        <div className="space-y-3 mb-6">
          <div className="relative">
            <Navigation className="absolute left-4 top-4 w-4 h-4 text-blue-600" />
            <Input 
              placeholder="Your planned route" 
              className="pl-12 pr-4 py-3 bg-gray-50 border-0 focus-visible:ring-2 focus-visible:ring-blue-600"
              value={route}
              onChange={(e) => setRoute(e.target.value)}
            />
          </div>
          <div className="flex space-x-3">
            <div className="relative flex-1">
              <Users className="absolute left-4 top-4 w-4 h-4 text-amber-500" />
              <Select value={seats} onValueChange={setSeats}>
                <SelectTrigger className="pl-12 pr-4 py-3 bg-gray-50 border-0 focus:ring-2 focus:ring-amber-500">
                  <SelectValue placeholder="Seats" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">1 seat</SelectItem>
                  <SelectItem value="2">2 seats</SelectItem>
                  <SelectItem value="3">3 seats</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="relative flex-1">
              <Clock className="absolute left-4 top-4 w-4 h-4 text-blue-600" />
              <Input 
                type="time" 
                className="pl-12 pr-4 py-3 bg-gray-50 border-0 focus-visible:ring-2 focus-visible:ring-blue-600"
                value={time}
                onChange={(e) => setTime(e.target.value)}
              />
            </div>
          </div>
        </div>

        <Button 
          onClick={handleStartDriving}
          className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-4 rounded-xl"
        >
          <Plane className="w-5 h-5 mr-2" />
          Start Piloting
        </Button>
      </CardContent>
    </Card>
  );
}
