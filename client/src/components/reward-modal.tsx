import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { Gift, Coffee, ShoppingBag, Plane } from 'lucide-react';

interface RewardModalProps {
  reward: any;
  onClose: () => void;
  onConfirm: () => void;
}

export default function RewardModal({ reward, onClose, onConfirm }: RewardModalProps) {
  const { toast } = useToast();

  const handleConfirmRedemption = () => {
    toast({
      title: "Reward redeemed successfully! 🎉",
      description: "Check your email for the voucher code",
    });
    onConfirm();
  };

  const IconComponent = reward.icon === 'coffee' ? Coffee : 
                       reward.icon === 'shopping-bag' ? ShoppingBag : Plane;

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-sm mx-auto">
        <DialogHeader>
          <div className="text-center mb-6">
            <div className="w-16 h-16 bg-amber-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Gift className="w-8 h-8 text-amber-500" />
            </div>
            <DialogTitle className="text-xl font-bold text-gray-800 mb-2">
              Redeem Reward
            </DialogTitle>
            <p className="text-gray-600">Confirm your reward redemption</p>
          </div>
        </DialogHeader>
        
        <Card className="bg-gray-50 mb-6">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                  reward.category === 'food' ? 'bg-green-600' :
                  reward.category === 'clothing' ? 'bg-blue-600' :
                  'bg-orange-600'
                }`}>
                  <IconComponent className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800">{reward.name}</h4>
                  <p className="text-sm text-gray-500">{reward.description}</p>
                </div>
              </div>
              <Badge className="bg-amber-500 text-white">
                {reward.tokensRequired} tokens
              </Badge>
            </div>
          </CardContent>
        </Card>

        <div className="flex space-x-3">
          <Button 
            variant="outline" 
            className="flex-1"
            onClick={onClose}
          >
            Cancel
          </Button>
          <Button 
            className="flex-1 bg-blue-600 hover:bg-blue-700"
            onClick={handleConfirmRedemption}
          >
            Redeem Now
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
