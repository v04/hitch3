import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import RewardModal from './reward-modal';
import { Utensils, Shirt, Mountain, Ticket, Coffee, ShoppingBag, Plane, Star, Zap, Gift, Flame } from 'lucide-react';

// Mock data for development
const mockTokens = {
  food: 45,
  travel: 68,
  clothing: 32,
  coupons: 40,
  total: 185
};

const mockRewards = {
  food: [
    { id: 1, name: "Starbucks Coffee", description: "Any size drink", tokensRequired: 50, brand: "Starbucks", icon: "coffee", canRedeem: true, popular: true },
    { id: 2, name: "McDonald's Meal", description: "Big Mac combo", tokensRequired: 80, brand: "McDonald's", icon: "burger", canRedeem: true, hot: true },
    { id: 3, name: "Domino's Pizza", description: "Medium pizza", tokensRequired: 120, brand: "Domino's", icon: "pizza", canRedeem: false },
    { id: 4, name: "Swiggy Credit", description: "₹200 food delivery", tokensRequired: 150, brand: "Swiggy", icon: "utensils", canRedeem: false }
  ],
  travel: [
    { id: 5, name: "Uber Ride", description: "₹300 ride credit", tokensRequired: 100, brand: "Uber", icon: "car", canRedeem: true },
    { id: 6, name: "RedBus Ticket", description: "₹500 bus booking", tokensRequired: 120, brand: "RedBus", icon: "bus", canRedeem: false },
    { id: 7, name: "Airbnb Stay", description: "₹1000 accommodation", tokensRequired: 250, brand: "Airbnb", icon: "home", canRedeem: false, premium: true }
  ],
  clothing: [
    { id: 8, name: "H&M Voucher", description: "20% off purchase", tokensRequired: 80, brand: "H&M", icon: "shirt", canRedeem: false },
    { id: 9, name: "Nike Discount", description: "15% off shoes", tokensRequired: 100, brand: "Nike", icon: "shoes", canRedeem: false },
    { id: 10, name: "Bewakoof Tee", description: "Free t-shirt", tokensRequired: 60, brand: "Bewakoof", icon: "tshirt", canRedeem: true }
  ],
  coupons: [
    { id: 11, name: "Amazon Voucher", description: "₹500 shopping credit", tokensRequired: 120, brand: "Amazon", icon: "gift", canRedeem: false },
    { id: 12, name: "Nykaa Beauty", description: "₹300 cosmetics", tokensRequired: 90, brand: "Nykaa", icon: "sparkles", canRedeem: false },
    { id: 13, name: "Zomato Gold", description: "1 month free", tokensRequired: 200, brand: "Zomato", icon: "crown", canRedeem: false, exclusive: true }
  ]
};

export default function RewardsTab() {
  const [selectedReward, setSelectedReward] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [activeCategory, setActiveCategory] = useState('food');

  const handleRedeemClick = (reward: any) => {
    setSelectedReward(reward);
    setShowModal(true);
  };

  const progressPercentage = 75;

  const renderRewardCard = (reward: any) => {
    const getBadges = () => {
      const badges = [];
      if (reward.popular) badges.push(<Badge key="popular" className="bg-red-500 text-white text-xs mr-1"><Star className="w-3 h-3 mr-1" />Popular</Badge>);
      if (reward.hot) badges.push(<Badge key="hot" className="bg-orange-500 text-white text-xs mr-1"><Flame className="w-3 h-3 mr-1" />Hot</Badge>);
      if (reward.premium) badges.push(<Badge key="premium" className="bg-purple-500 text-white text-xs mr-1"><Zap className="w-3 h-3 mr-1" />Premium</Badge>);
      if (reward.exclusive) badges.push(<Badge key="exclusive" className="bg-black text-white text-xs mr-1">Exclusive</Badge>);
      return badges;
    };

    return (
      <Card key={reward.id} className="hover:shadow-lg transition-all duration-200 border-l-4 border-l-blue-500">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                activeCategory === 'food' ? 'bg-gradient-to-br from-red-500 to-orange-500' :
                activeCategory === 'clothing' ? 'bg-gradient-to-br from-blue-500 to-purple-500' :
                activeCategory === 'travel' ? 'bg-gradient-to-br from-green-500 to-blue-500' :
                'bg-gradient-to-br from-purple-500 to-pink-500'
              }`}>
                <Coffee className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-1">
                  <h4 className="font-bold text-gray-800">{reward.name}</h4>
                  {getBadges()}
                </div>
                <p className="text-sm text-gray-600">{reward.description}</p>
                <p className="text-xs text-gray-500 font-medium">{reward.brand}</p>
              </div>
            </div>
            <div className="text-right">
              <Badge className="bg-amber-500 text-white mb-2 font-bold">
                {reward.tokensRequired}
              </Badge>
              {reward.canRedeem ? (
                <Button 
                  size="sm" 
                  className="bg-blue-600 hover:bg-blue-700 text-white"
                  onClick={() => handleRedeemClick(reward)}
                >
                  Redeem
                </Button>
              ) : (
                <div className="text-xs text-gray-500">
                  Need {reward.tokensRequired - mockTokens[activeCategory as keyof typeof mockTokens]} more
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="px-4 py-4">
      {/* Token Wallet Header - More Compact */}
      <Card className="bg-gradient-to-r from-amber-500 to-blue-600 text-white mb-4">
        <CardContent className="p-4 text-center">
          <div className="flex items-center justify-center space-x-2 mb-2">
            <Gift className="w-6 h-6" />
            <h2 className="text-xl font-bold">Reward Wallet</h2>
          </div>
          <div className="text-3xl font-bold mb-1">{mockTokens.total}</div>
          <p className="opacity-90 text-sm">Total Tokens</p>
        </CardContent>
      </Card>

      {/* Progress Bar - More Prominent */}
      <Card className="mb-4 border-l-4 border-l-emerald-500">
        <CardContent className="p-4">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center space-x-2">
              <Star className="w-5 h-5 text-amber-500" />
              <h3 className="font-bold text-gray-800">Silver Tier Progress</h3>
            </div>
            <span className="text-sm font-bold text-emerald-600">{progressPercentage}%</span>
          </div>
          <Progress value={progressPercentage} className="mb-2 h-3" />
          <p className="text-sm text-gray-600">🎯 50 more tokens for exclusive rewards!</p>
        </CardContent>
      </Card>

      {/* Category Tabs */}
      <Tabs value={activeCategory} onValueChange={setActiveCategory} className="mb-4">
        <TabsList className="grid w-full grid-cols-4 bg-gray-100">
          <TabsTrigger value="food" className="flex items-center space-x-1">
            <Utensils className="w-4 h-4" />
            <span className="text-xs">Food</span>
          </TabsTrigger>
          <TabsTrigger value="travel" className="flex items-center space-x-1">
            <Mountain className="w-4 h-4" />
            <span className="text-xs">Travel</span>
          </TabsTrigger>
          <TabsTrigger value="clothing" className="flex items-center space-x-1">
            <Shirt className="w-4 h-4" />
            <span className="text-xs">Style</span>
          </TabsTrigger>
          <TabsTrigger value="coupons" className="flex items-center space-x-1">
            <Ticket className="w-4 h-4" />
            <span className="text-xs">Deals</span>
          </TabsTrigger>
        </TabsList>

        {/* Token Balance for Active Category */}
        <div className="flex items-center justify-between py-3 px-2">
          <div className="flex items-center space-x-2">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
              activeCategory === 'food' ? 'bg-red-100' :
              activeCategory === 'travel' ? 'bg-green-100' :
              activeCategory === 'clothing' ? 'bg-blue-100' :
              'bg-purple-100'
            }`}>
              {activeCategory === 'food' && <Utensils className="w-4 h-4 text-red-600" />}
              {activeCategory === 'travel' && <Mountain className="w-4 h-4 text-green-600" />}
              {activeCategory === 'clothing' && <Shirt className="w-4 h-4 text-blue-600" />}
              {activeCategory === 'coupons' && <Ticket className="w-4 h-4 text-purple-600" />}
            </div>
            <span className="font-medium text-gray-700">Your Balance:</span>
          </div>
          <Badge className="bg-amber-500 text-white font-bold text-lg px-3 py-1">
            {mockTokens[activeCategory as keyof typeof mockTokens]}
          </Badge>
        </div>

        <TabsContent value="food" className="space-y-3 mt-0">
          {mockRewards.food.map(renderRewardCard)}
        </TabsContent>
        <TabsContent value="travel" className="space-y-3 mt-0">
          {mockRewards.travel.map(renderRewardCard)}
        </TabsContent>
        <TabsContent value="clothing" className="space-y-3 mt-0">
          {mockRewards.clothing.map(renderRewardCard)}
        </TabsContent>
        <TabsContent value="coupons" className="space-y-3 mt-0">
          {mockRewards.coupons.map(renderRewardCard)}
        </TabsContent>
      </Tabs>

      {/* Reward Redemption Modal */}
      {showModal && selectedReward && (
        <RewardModal
          reward={selectedReward}
          onClose={() => setShowModal(false)}
          onConfirm={() => {
            setShowModal(false);
          }}
        />
      )}
    </div>
  );
}
