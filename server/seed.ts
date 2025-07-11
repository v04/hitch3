import { db } from "./db";
import { users, tokens, userStats, rewards } from "@shared/schema";

async function seed() {
  console.log("🌱 Seeding database...");

  // Create sample users
  const [user1] = await db.insert(users).values({
    name: "Alex Kumar",
    email: "alex@example.com",
    role: "both",
    location: { lat: 12.9716, lng: 77.5946, address: "Bangalore, India" },
    rating: "4.8",
    trustScore: 95,
    isVerified: true
  }).returning();

  const [user2] = await db.insert(users).values({
    name: "Priya Singh",
    email: "priya@example.com",
    role: "rider",
    location: { lat: 12.9341, lng: 77.6101, address: "Whitefield, Bangalore" },
    rating: "4.6",
    trustScore: 88,
    isVerified: true
  }).returning();

  // Create tokens for users
  await db.insert(tokens).values([
    {
      userId: user1.id,
      food: 50,
      travel: 35,
      clothing: 25,
      coupons: 15,
      total: 125
    },
    {
      userId: user2.id,
      food: 30,
      travel: 20,
      clothing: 15,
      coupons: 10,
      total: 75
    }
  ]);

  // Create user stats
  await db.insert(userStats).values([
    {
      userId: user1.id,
      totalRides: 15,
      carbonSaved: "45.5",
      distanceTraveled: "250.8",
      tokensEarned: 125
    },
    {
      userId: user2.id,
      totalRides: 8,
      carbonSaved: "22.3",
      distanceTraveled: "145.2",
      tokensEarned: 75
    }
  ]);

  // Create sample rewards
  await db.insert(rewards).values([
    {
      name: "Starbucks Coffee",
      description: "Any size drink",
      category: "food",
      tokensRequired: 50,
      brand: "Starbucks",
      icon: "coffee"
    },
    {
      name: "McDonald's Meal",
      description: "Big Mac combo",
      category: "food",
      tokensRequired: 80,
      brand: "McDonald's",
      icon: "burger"
    },
    {
      name: "Uber Ride",
      description: "₹300 ride credit",
      category: "travel",
      tokensRequired: 100,
      brand: "Uber",
      icon: "car"
    },
    {
      name: "H&M Voucher",
      description: "20% off purchase",
      category: "clothing",
      tokensRequired: 80,
      brand: "H&M",
      icon: "shirt"
    },
    {
      name: "Amazon Voucher",
      description: "₹500 shopping credit",
      category: "coupons",
      tokensRequired: 120,
      brand: "Amazon",
      icon: "gift"
    }
  ]);

  console.log("✅ Database seeded successfully!");
}

seed().catch(console.error);