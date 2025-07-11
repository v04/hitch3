export type UserRole = 'rider' | 'driver' | 'both';

export type TabType = 'map' | 'rides' | 'rewards' | 'profile';

export type RideStatus = 'pending' | 'matched' | 'in_progress' | 'completed' | 'cancelled';

export type TokenCategory = 'food' | 'travel' | 'clothing' | 'coupons';

export interface Location {
  lat: number;
  lng: number;
  address: string;
}

export interface NearbyUser {
  id: number;
  name: string;
  role: UserRole;
  location: Location;
  rating: number;
  distance: number;
  avatar?: string;
  seatsAvailable?: number;
}

export interface RideHistory {
  id: number;
  from: string;
  to: string;
  date: string;
  partnerName: string;
  rating: number;
  tokensEarned: number;
  status: RideStatus;
}

export interface Achievement {
  id: string;
  name: string;
  icon: string;
  description: string;
  unlocked: boolean;
}
