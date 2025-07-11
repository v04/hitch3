import { useState } from 'react';
import { useLocation } from 'wouter';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { UserRole } from '@/lib/types';
import { useRole } from '@/hooks/use-role';
import { Car, MapPin, ArrowUpDown } from 'lucide-react';

export default function OnboardingPage() {
  const [, setLocation] = useLocation();
  const { setRole } = useRole();
  const [selectedRole, setSelectedRole] = useState<UserRole | null>(null);

  const roleOptions = [
    {
      id: 'rider' as UserRole,
      title: "I'm a Rider",
      description: "Looking for lifts and adventures",
      icon: <MapPin className="w-6 h-6 text-white" />,
      color: "bg-amber-500"
    },
    {
      id: 'driver' as UserRole,
      title: "I'm a Pilot", 
      description: "Ready to give rides and earn tokens",
      icon: <Car className="w-6 h-6 text-white" />,
      color: "bg-emerald-500"
    },
    {
      id: 'both' as UserRole,
      title: "Both Modes",
      description: "Flexible travel companion",
      icon: <ArrowUpDown className="w-6 h-6 text-white" />,
      color: "bg-amber-500"
    }
  ];

  const handleContinue = () => {
    if (selectedRole) {
      setRole(selectedRole);
      setLocation('/home');
    }
  };

  return (
    <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-emerald-500 z-50 animate-fade-in">
      <div className="flex flex-col items-center justify-center h-full px-8 text-white">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center mb-6 mx-auto">
            <Car className="w-12 h-12 text-white" />
          </div>
          <h1 className="text-4xl font-bold mb-4">HICUT</h1>
          <p className="text-lg opacity-90 leading-relaxed">
            Community-driven hitchhiking with token rewards
          </p>
        </div>

        {/* Role Selection */}
        <div className="w-full space-y-4 mb-8">
          {roleOptions.map((option) => (
            <Card
              key={option.id}
              className={`w-full bg-white/20 backdrop-blur-sm border border-white/30 rounded-xl p-4 text-left hover:bg-white/30 transition-all duration-200 cursor-pointer ${
                selectedRole === option.id ? 'bg-white/40 border-white' : ''
              }`}
              onClick={() => setSelectedRole(option.id)}
            >
              <div className="flex items-center space-x-4">
                <div className={`w-12 h-12 ${option.color} rounded-lg flex items-center justify-center`}>
                  {option.icon}
                </div>
                <div>
                  <h3 className="font-semibold text-lg">{option.title}</h3>
                  <p className="text-sm opacity-80">{option.description}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>

        <Button 
          onClick={handleContinue}
          disabled={!selectedRole}
          className="w-full bg-white text-blue-600 font-semibold py-4 rounded-xl hover:bg-gray-100 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Continue to App
        </Button>
      </div>
    </div>
  );
}
