import { Switch } from '@/components/ui/switch';
import { useRole } from '@/hooks/use-role';
import { MapPin, Car } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export default function RoleToggle() {
  const { role, toggleRole } = useRole();
  const { toast } = useToast();

  const handleToggle = () => {
    toggleRole();
    const newRole = role === 'rider' ? 'driver' : 'rider';
    toast({
      title: `Switched to ${newRole === 'rider' ? 'Rider' : 'Pilot'} mode`,
      description: newRole === 'rider' ? 'Looking for lifts and adventures' : 'Ready to give rides and earn tokens',
    });
  };

  return (
    <div className="flex items-center space-x-3">
      <span className="text-sm font-medium">
        {role === 'rider' ? 'Rider' : 'Pilot'}
      </span>
      <div className="relative">
        <Switch
          checked={role === 'driver'}
          onCheckedChange={handleToggle}
          className="data-[state=checked]:bg-emerald-500"
        />
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          {role === 'rider' ? (
            <MapPin className="w-3 h-3 text-gray-600 ml-1" />
          ) : (
            <Car className="w-3 h-3 text-white mr-1" />
          )}
        </div>
      </div>
    </div>
  );
}
