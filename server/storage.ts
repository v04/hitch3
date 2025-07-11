import { 
  users, tokens, rides, userStats, rewards, userRewards,
  type User, type InsertUser, type Tokens, type InsertTokens,
  type Ride, type InsertRide, type UserStats, type InsertUserStats,
  type Reward, type InsertReward, type UserReward, type InsertUserReward
} from "@shared/schema";
import { db } from "./db";
import { eq } from "drizzle-orm";

export interface IStorage {
  // Users
  getUser(id: number): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  updateUser(id: number, user: Partial<User>): Promise<User | undefined>;
  
  // Tokens
  getUserTokens(userId: number): Promise<Tokens | undefined>;
  updateUserTokens(userId: number, tokens: Partial<Tokens>): Promise<Tokens | undefined>;
  
  // Rides
  getRide(id: number): Promise<Ride | undefined>;
  getUserRides(userId: number): Promise<Ride[]>;
  getNearbyRides(lat: number, lng: number, radius: number): Promise<Ride[]>;
  createRide(ride: InsertRide): Promise<Ride>;
  updateRide(id: number, ride: Partial<Ride>): Promise<Ride | undefined>;
  
  // User Stats
  getUserStats(userId: number): Promise<UserStats | undefined>;
  updateUserStats(userId: number, stats: Partial<UserStats>): Promise<UserStats | undefined>;
  
  // Rewards
  getRewards(): Promise<Reward[]>;
  getRewardsByCategory(category: string): Promise<Reward[]>;
  getUserRewards(userId: number): Promise<UserReward[]>;
  redeemReward(userId: number, rewardId: number): Promise<UserReward>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private tokens: Map<number, Tokens>;
  private rides: Map<number, Ride>;
  private userStats: Map<number, UserStats>;
  private rewards: Map<number, Reward>;
  private userRewards: Map<number, UserReward>;
  private currentUserId: number;
  private currentRideId: number;
  private currentRewardId: number;
  private currentUserRewardId: number;

  constructor() {
    this.users = new Map();
    this.tokens = new Map();
    this.rides = new Map();
    this.userStats = new Map();
    this.rewards = new Map();
    this.userRewards = new Map();
    this.currentUserId = 1;
    this.currentRideId = 1;
    this.currentRewardId = 1;
    this.currentUserRewardId = 1;
    
    this.initializeSampleData();
  }

  private initializeSampleData() {
    // Sample rewards
    const sampleRewards = [
      { name: "Starbucks Coffee", description: "Any size drink", category: "food", tokensRequired: 50, brand: "Starbucks", icon: "coffee", isActive: true },
      { name: "McDonald's Meal", description: "Any value meal", category: "food", tokensRequired: 80, brand: "McDonald's", icon: "burger", isActive: true },
      { name: "H&M Discount", description: "20% off any purchase", category: "clothing", tokensRequired: 100, brand: "H&M", icon: "tshirt", isActive: true },
      { name: "Travel Voucher", description: "₹500 RedBus credit", category: "travel", tokensRequired: 120, brand: "RedBus", icon: "bus", isActive: true },
      { name: "Amazon Coupon", description: "₹200 off on orders above ₹1000", category: "coupons", tokensRequired: 150, brand: "Amazon", icon: "gift", isActive: true },
    ];

    sampleRewards.forEach(reward => {
      const id = this.currentRewardId++;
      this.rewards.set(id, { ...reward, id });
    });
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(user => user.email === email);
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentUserId++;
    const user: User = { 
      ...insertUser, 
      id,
      location: insertUser.location || null,
      avatar: insertUser.avatar || null,
      phone: insertUser.phone || null,
      rating: "4.5",
      trustScore: 85,
      isVerified: false,
      createdAt: new Date()
    };
    this.users.set(id, user);

    // Initialize tokens for new user
    const userTokens: Tokens = {
      id: id,
      userId: id,
      food: 45,
      travel: 68,
      clothing: 32,
      coupons: 40,
      total: 185,
      updatedAt: new Date()
    };
    this.tokens.set(id, userTokens);

    // Initialize stats for new user
    const userStatsData: UserStats = {
      id: id,
      userId: id,
      totalRides: 47,
      carbonSaved: "28.5",
      distanceTraveled: "342.8",
      tokensEarned: 185,
      updatedAt: new Date()
    };
    this.userStats.set(id, userStatsData);

    return user;
  }

  async updateUser(id: number, user: Partial<User>): Promise<User | undefined> {
    const existingUser = this.users.get(id);
    if (!existingUser) return undefined;
    
    const updatedUser = { ...existingUser, ...user };
    this.users.set(id, updatedUser);
    return updatedUser;
  }

  async getUserTokens(userId: number): Promise<Tokens | undefined> {
    return this.tokens.get(userId);
  }

  async updateUserTokens(userId: number, tokenUpdate: Partial<Tokens>): Promise<Tokens | undefined> {
    const existingTokens = this.tokens.get(userId);
    if (!existingTokens) return undefined;
    
    const updatedTokens = { ...existingTokens, ...tokenUpdate, updatedAt: new Date() };
    this.tokens.set(userId, updatedTokens);
    return updatedTokens;
  }

  async getRide(id: number): Promise<Ride | undefined> {
    return this.rides.get(id);
  }

  async getUserRides(userId: number): Promise<Ride[]> {
    return Array.from(this.rides.values()).filter(
      ride => ride.driverId === userId || ride.riderId === userId
    );
  }

  async getNearbyRides(lat: number, lng: number, radius: number): Promise<Ride[]> {
    // Mock nearby rides - in real implementation, calculate distance
    return Array.from(this.rides.values()).filter(ride => ride.status === 'pending');
  }

  async createRide(insertRide: InsertRide): Promise<Ride> {
    const id = this.currentRideId++;
    const ride: Ride = { 
      ...insertRide, 
      id,
      riderId: insertRide.riderId || null,
      pickupLocation: insertRide.pickupLocation || null,
      destination: insertRide.destination || null,
      seatsAvailable: insertRide.seatsAvailable || 1,
      tokensEarned: 10,
      distance: insertRide.distance || null,
      duration: insertRide.duration || null,
      scheduledTime: insertRide.scheduledTime || null,
      createdAt: new Date(),
      completedAt: null
    };
    this.rides.set(id, ride);
    return ride;
  }

  async updateRide(id: number, rideUpdate: Partial<Ride>): Promise<Ride | undefined> {
    const existingRide = this.rides.get(id);
    if (!existingRide) return undefined;
    
    const updatedRide = { ...existingRide, ...rideUpdate };
    this.rides.set(id, updatedRide);
    return updatedRide;
  }

  async getUserStats(userId: number): Promise<UserStats | undefined> {
    return this.userStats.get(userId);
  }

  async updateUserStats(userId: number, statsUpdate: Partial<UserStats>): Promise<UserStats | undefined> {
    const existingStats = this.userStats.get(userId);
    if (!existingStats) return undefined;
    
    const updatedStats = { ...existingStats, ...statsUpdate, updatedAt: new Date() };
    this.userStats.set(userId, updatedStats);
    return updatedStats;
  }

  async getRewards(): Promise<Reward[]> {
    return Array.from(this.rewards.values()).filter(reward => reward.isActive);
  }

  async getRewardsByCategory(category: string): Promise<Reward[]> {
    return Array.from(this.rewards.values()).filter(
      reward => reward.category === category && reward.isActive
    );
  }

  async getUserRewards(userId: number): Promise<UserReward[]> {
    return Array.from(this.userRewards.values()).filter(
      userReward => userReward.userId === userId
    );
  }

  async redeemReward(userId: number, rewardId: number): Promise<UserReward> {
    const id = this.currentUserRewardId++;
    const userReward: UserReward = {
      id,
      userId,
      rewardId,
      redeemedAt: new Date(),
      status: "redeemed"
    };
    this.userRewards.set(id, userReward);
    return userReward;
  }
}

// Database Storage Implementation
export class DatabaseStorage implements IStorage {
  async getUser(id: number): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user || undefined;
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.email, email));
    return user || undefined;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values({
        ...insertUser,
        rating: "4.5",
        trustScore: 85,
        isVerified: false,
        createdAt: new Date()
      })
      .returning();

    // Create initial tokens
    await db.insert(tokens).values({
      userId: user.id,
      food: 50,
      clothing: 25,
      travel: 35,
      coupons: 15
    });

    // Create initial stats
    await db.insert(userStats).values({
      userId: user.id,
      totalRides: 0,
      carbonSaved: "0",
      distanceTraveled: "0",
      tokensEarned: 125
    });

    return user;
  }

  async updateUser(id: number, userUpdate: Partial<User>): Promise<User | undefined> {
    const [user] = await db
      .update(users)
      .set(userUpdate)
      .where(eq(users.id, id))
      .returning();
    return user || undefined;
  }

  async getUserTokens(userId: number): Promise<Tokens | undefined> {
    const [userTokens] = await db.select().from(tokens).where(eq(tokens.userId, userId));
    return userTokens || undefined;
  }

  async updateUserTokens(userId: number, tokenUpdate: Partial<Tokens>): Promise<Tokens | undefined> {
    const [updated] = await db
      .update(tokens)
      .set(tokenUpdate)
      .where(eq(tokens.userId, userId))
      .returning();
    return updated || undefined;
  }

  async getRide(id: number): Promise<Ride | undefined> {
    const [ride] = await db.select().from(rides).where(eq(rides.id, id));
    return ride || undefined;
  }

  async getUserRides(userId: number): Promise<Ride[]> {
    return await db.select().from(rides).where(eq(rides.driverId, userId));
  }

  async getNearbyRides(lat: number, lng: number, radius: number): Promise<Ride[]> {
    // For now, return all rides - in production, you'd implement spatial queries
    return await db.select().from(rides);
  }

  async createRide(insertRide: InsertRide): Promise<Ride> {
    const [ride] = await db
      .insert(rides)
      .values({
        ...insertRide,
        tokensEarned: 10,
        createdAt: new Date(),
        completedAt: null
      })
      .returning();
    return ride;
  }

  async updateRide(id: number, rideUpdate: Partial<Ride>): Promise<Ride | undefined> {
    const [ride] = await db
      .update(rides)
      .set(rideUpdate)
      .where(eq(rides.id, id))
      .returning();
    return ride || undefined;
  }

  async getUserStats(userId: number): Promise<UserStats | undefined> {
    const [stats] = await db.select().from(userStats).where(eq(userStats.userId, userId));
    return stats || undefined;
  }

  async updateUserStats(userId: number, statsUpdate: Partial<UserStats>): Promise<UserStats | undefined> {
    const [stats] = await db
      .update(userStats)
      .set(statsUpdate)
      .where(eq(userStats.userId, userId))
      .returning();
    return stats || undefined;
  }

  async getRewards(): Promise<Reward[]> {
    return await db.select().from(rewards);
  }

  async getRewardsByCategory(category: string): Promise<Reward[]> {
    return await db.select().from(rewards).where(eq(rewards.category, category));
  }

  async getUserRewards(userId: number): Promise<UserReward[]> {
    return await db.select().from(userRewards).where(eq(userRewards.userId, userId));
  }

  async redeemReward(userId: number, rewardId: number): Promise<UserReward> {
    const [userReward] = await db
      .insert(userRewards)
      .values({
        userId,
        rewardId,
        redeemedAt: new Date(),
        status: "redeemed"
      })
      .returning();
    return userReward;
  }
}

export const storage = new DatabaseStorage();
