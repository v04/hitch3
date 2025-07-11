import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Achievement } from '@/lib/types';
import { 
  Star, 
  Shield, 
  UserCog, 
  Settings, 
  HelpCircle, 
  ChevronRight,
  Construction,
  Leaf,
  Users
} from 'lucide-react';

// Mock data for development
const mockUser = {
  name: "John Doe",
  email: "john.doe@email.com",
  rating: 4.8,
  trustScore: 92,
  stats: {
    totalRides: 47,
    carbonSaved: "28kg",
    tokensEarned: 185,
    distanceTraveled: "342km"
  }
};

const mockAchievements: Achievement[] = [
  {
    id: "first-ride",
    name: "First Ride",
    icon: "road",
    description: "Completed your first HICUT ride",
    unlocked: true
  },
  {
    id: "eco-warrior", 
    name: "Eco Warrior",
    icon: "leaf",
    description: "Saved 25kg of CO₂ emissions",
    unlocked: true
  },
  {
    id: "community-builder",
    name: "Community Builder", 
    icon: "users",
    description: "Completed 25 rides",
    unlocked: true
  }
];

export default function ProfileTab() {
  return (
    <div className="px-4 py-4">
      {/* Profile Header */}
      <Card className="bg-gradient-to-r from-blue-600 to-emerald-500 text-white mb-6">
        <CardContent className="p-6">
          <div className="flex items-center space-x-4">
            <Avatar className="w-16 h-16">
              <AvatarFallback className="bg-white/20 text-white text-2xl font-bold">
                {mockUser.name.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
            <div>
              <h2 className="text-xl font-bold">{mockUser.name}</h2>
              <p className="opacity-90">{mockUser.email}</p>
              <div className="flex items-center space-x-4 mt-2">
                <div className="flex items-center space-x-1">
                  <Star className="w-4 h-4 text-amber-300 fill-current" />
                  <span className="font-medium">{mockUser.rating}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Shield className="w-4 h-4 text-green-300" />
                  <span className="font-medium">{mockUser.trustScore}</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-blue-600 mb-1">
              {mockUser.stats.totalRides}
            </div>
            <p className="text-sm text-gray-600">Total Rides</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-emerald-600 mb-1">
              {mockUser.stats.carbonSaved}
            </div>
            <p className="text-sm text-gray-600">CO₂ Saved</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-amber-600 mb-1">
              {mockUser.stats.tokensEarned}
            </div>
            <p className="text-sm text-gray-600">Tokens Earned</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-blue-600 mb-1">
              {mockUser.stats.distanceTraveled}
            </div>
            <p className="text-sm text-gray-600">Distance</p>
          </CardContent>
        </Card>
      </div>

      {/* Achievements */}
      <Card className="mb-6">
        <CardContent className="p-6">
          <h3 className="font-semibold text-gray-800 mb-4">Achievements</h3>
          <div className="grid grid-cols-3 gap-4">
            {mockAchievements.map((achievement) => {
              const IconComponent = achievement.icon === 'road' ? Construction :
                                   achievement.icon === 'leaf' ? Leaf : Users;
              
              return (
                <div key={achievement.id} className="text-center">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-2 ${
                    achievement.icon === 'road' ? 'bg-amber-500' :
                    achievement.icon === 'leaf' ? 'bg-emerald-500' :
                    'bg-blue-600'
                  }`}>
                    <IconComponent className="w-6 h-6 text-white" />
                  </div>
                  <p className="text-xs text-gray-600">{achievement.name}</p>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Settings Menu */}
      <div className="space-y-3">
        <Button 
          variant="ghost" 
          className="w-full justify-between p-4 h-auto bg-white border border-gray-100 hover:bg-gray-50"
        >
          <div className="flex items-center space-x-3">
            <UserCog className="w-5 h-5 text-gray-400" />
            <span className="font-medium text-gray-800">Edit Profile</span>
          </div>
          <ChevronRight className="w-4 h-4 text-gray-400" />
        </Button>

        <Button 
          variant="ghost" 
          className="w-full justify-between p-4 h-auto bg-white border border-gray-100 hover:bg-gray-50"
        >
          <div className="flex items-center space-x-3">
            <Shield className="w-5 h-5 text-gray-400" />
            <span className="font-medium text-gray-800">Verify Documents</span>
          </div>
          <div className="flex items-center space-x-2">
            <Badge className="bg-red-500 text-white text-xs">Pending</Badge>
            <ChevronRight className="w-4 h-4 text-gray-400" />
          </div>
        </Button>

        <Button 
          variant="ghost" 
          className="w-full justify-between p-4 h-auto bg-white border border-gray-100 hover:bg-gray-50"
        >
          <div className="flex items-center space-x-3">
            <Settings className="w-5 h-5 text-gray-400" />
            <span className="font-medium text-gray-800">Preferences</span>
          </div>
          <ChevronRight className="w-4 h-4 text-gray-400" />
        </Button>

        <Button 
          variant="ghost" 
          className="w-full justify-between p-4 h-auto bg-white border border-gray-100 hover:bg-gray-50"
        >
          <div className="flex items-center space-x-3">
            <HelpCircle className="w-5 h-5 text-gray-400" />
            <span className="font-medium text-gray-800">Help & Support</span>
          </div>
          <ChevronRight className="w-4 h-4 text-gray-400" />
        </Button>
      </div>
    </div>
  );
}
