import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import RewardModal from './reward-modal';
import { Utensils, Shirt, Mountain, Ticket, Coffee, ShoppingBag, Plane } from 'lucide-react';

// Mock data for development
const mockTokens = {
  food: 45,
  travel: 68,
  clothing: 32,
  coupons: 40,
  total: 185
};

const mockRewards = [
  {
    id: 1,
    name: "Starbucks Coffee",
    description: "Any size drink",
    category: "food",
    tokensRequired: 50,
    brand: "Starbucks",
    icon: "coffee",
    canRedeem: true
  },
  {
    id: 2,
    name: "H&M Discount",
    description: "20% off any purchase", 
    category: "clothing",
    tokensRequired: 80,
    brand: "H&M",
    icon: "shopping-bag",
    canRedeem: false
  },
  {
    id: 3,
    name: "Travel Voucher",
    description: "₹500 RedBus credit",
    category: "travel", 
    tokensRequired: 120,
    brand: "RedBus",
    icon: "plane",
    canRedeem: false
  }
];

export default function RewardsTab() {
  const [selectedReward, setSelectedReward] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const handleRedeemClick = (reward: any) => {
    setSelectedReward(reward);
    setShowModal(true);
  };

  const progressPercentage = 75; // Mock progress to next tier

  return (
    <div className="px-4 py-6">
      {/* Token Wallet Header */}
      <Card className="bg-gradient-to-r from-amber-500 to-blue-600 text-white mb-6">
        <CardContent className="p-6 text-center">
          <h2 className="text-2xl font-bold mb-2">Token Wallet</h2>
          <div className="text-4xl font-bold mb-2">{mockTokens.total}</div>
          <p className="opacity-90">Total Tokens Earned</p>
        </CardContent>
      </Card>

      {/* Token Categories */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                <Utensils className="w-5 h-5 text-red-600" />
              </div>
              <span className="font-bold text-lg text-gray-800">{mockTokens.food}</span>
            </div>
            <h3 className="font-semibold text-gray-800">Food & Bev</h3>
            <p className="text-xs text-gray-500 mt-1">McDonald's, Swiggy</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                <Shirt className="w-5 h-5 text-blue-600" />
              </div>
              <span className="font-bold text-lg text-gray-800">{mockTokens.clothing}</span>
            </div>
            <h3 className="font-semibold text-gray-800">Clothing</h3>
            <p className="text-xs text-gray-500 mt-1">H&M, Bewakoof</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                <Mountain className="w-5 h-5 text-green-600" />
              </div>
              <span className="font-bold text-lg text-gray-800">{mockTokens.travel}</span>
            </div>
            <h3 className="font-semibold text-gray-800">Travel</h3>
            <p className="text-xs text-gray-500 mt-1">Wildcraft, Redbus</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                <Ticket className="w-5 h-5 text-purple-600" />
              </div>
              <span className="font-bold text-lg text-gray-800">{mockTokens.coupons}</span>
            </div>
            <h3 className="font-semibold text-gray-800">Coupons</h3>
            <p className="text-xs text-gray-500 mt-1">Amazon, Nykaa</p>
          </CardContent>
        </Card>
      </div>

      {/* Progress to Next Tier */}
      <Card className="mb-6">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-gray-800">Progress to Silver Tier</h3>
            <span className="text-sm text-gray-500">{progressPercentage}%</span>
          </div>
          <Progress value={progressPercentage} className="mb-3" />
          <p className="text-sm text-gray-600">50 more tokens to unlock exclusive rewards!</p>
        </CardContent>
      </Card>

      {/* Available Rewards */}
      <div className="space-y-4">
        <h3 className="font-semibold text-gray-700">Available Rewards</h3>
        
        {mockRewards.map((reward) => {
          const IconComponent = reward.icon === 'coffee' ? Coffee : 
                               reward.icon === 'shopping-bag' ? ShoppingBag : Plane;
          
          return (
            <Card key={reward.id}>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                      reward.category === 'food' ? 'bg-green-600' :
                      reward.category === 'clothing' ? 'bg-blue-600' :
                      'bg-orange-600'
                    }`}>
                      <IconComponent className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800">{reward.name}</h4>
                      <p className="text-sm text-gray-500">{reward.description}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <Badge className="bg-amber-500 text-white mb-2">
                      {reward.tokensRequired} tokens
                    </Badge>
                    {reward.canRedeem ? (
                      <Button 
                        variant="link" 
                        size="sm" 
                        className="text-blue-600 p-0 h-auto"
                        onClick={() => handleRedeemClick(reward)}
                      >
                        Redeem
                      </Button>
                    ) : (
                      <p className="text-gray-400 text-sm">
                        Need {reward.tokensRequired - mockTokens[reward.category as keyof typeof mockTokens]} more
                      </p>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Reward Redemption Modal */}
      {showModal && selectedReward && (
        <RewardModal
          reward={selectedReward}
          onClose={() => setShowModal(false)}
          onConfirm={() => {
            setShowModal(false);
            // Handle redemption logic here
          }}
        />
      )}
    </div>
  );
}
