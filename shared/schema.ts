import { pgTable, text, serial, integer, boolean, timestamp, decimal, jsonb } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  email: text("email").notNull().unique(),
  name: text("name").notNull(),
  role: text("role").notNull(), // 'rider', 'driver', 'both'
  avatar: text("avatar"),
  phone: text("phone"),
  location: jsonb("location"), // { lat: number, lng: number, address: string }
  rating: decimal("rating", { precision: 3, scale: 2 }).default("0"),
  trustScore: integer("trust_score").default(0),
  isVerified: boolean("is_verified").default(false),
  createdAt: timestamp("created_at").defaultNow(),
});

export const tokens = pgTable("tokens", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id).notNull(),
  food: integer("food").default(0),
  travel: integer("travel").default(0),
  clothing: integer("clothing").default(0),
  coupons: integer("coupons").default(0),
  total: integer("total").default(0),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const rides = pgTable("rides", {
  id: serial("id").primaryKey(),
  driverId: integer("driver_id").references(() => users.id).notNull(),
  riderId: integer("rider_id").references(() => users.id),
  status: text("status").notNull(), // 'pending', 'matched', 'in_progress', 'completed', 'cancelled'
  pickupLocation: jsonb("pickup_location"), // { lat: number, lng: number, address: string }
  destination: jsonb("destination"), // { lat: number, lng: number, address: string }
  seatsAvailable: integer("seats_available").default(1),
  tokensEarned: integer("tokens_earned").default(10),
  distance: decimal("distance", { precision: 8, scale: 2 }),
  duration: integer("duration"), // in minutes
  scheduledTime: timestamp("scheduled_time"),
  createdAt: timestamp("created_at").defaultNow(),
  completedAt: timestamp("completed_at"),
});

export const userStats = pgTable("user_stats", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id).notNull(),
  totalRides: integer("total_rides").default(0),
  carbonSaved: decimal("carbon_saved", { precision: 8, scale: 2 }).default("0"), // in kg
  distanceTraveled: decimal("distance_traveled", { precision: 10, scale: 2 }).default("0"), // in km
  tokensEarned: integer("tokens_earned").default(0),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const rewards = pgTable("rewards", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description"),
  category: text("category").notNull(), // 'food', 'travel', 'clothing', 'coupons'
  tokensRequired: integer("tokens_required").notNull(),
  brand: text("brand"),
  icon: text("icon"),
  isActive: boolean("is_active").default(true),
});

export const userRewards = pgTable("user_rewards", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id).notNull(),
  rewardId: integer("reward_id").references(() => rewards.id).notNull(),
  redeemedAt: timestamp("redeemed_at").defaultNow(),
  status: text("status").default("redeemed"), // 'redeemed', 'used'
});

// Insert schemas
export const insertUserSchema = createInsertSchema(users).omit({
  id: true,
  createdAt: true,
});

export const insertTokensSchema = createInsertSchema(tokens).omit({
  id: true,
  updatedAt: true,
});

export const insertRideSchema = createInsertSchema(rides).omit({
  id: true,
  createdAt: true,
  completedAt: true,
});

export const insertUserStatsSchema = createInsertSchema(userStats).omit({
  id: true,
  updatedAt: true,
});

export const insertRewardSchema = createInsertSchema(rewards).omit({
  id: true,
});

export const insertUserRewardSchema = createInsertSchema(userRewards).omit({
  id: true,
  redeemedAt: true,
});

// Types
export type User = typeof users.$inferSelect;
export type InsertUser = z.infer<typeof insertUserSchema>;
export type Tokens = typeof tokens.$inferSelect;
export type InsertTokens = z.infer<typeof insertTokensSchema>;
export type Ride = typeof rides.$inferSelect;
export type InsertRide = z.infer<typeof insertRideSchema>;
export type UserStats = typeof userStats.$inferSelect;
export type InsertUserStats = z.infer<typeof insertUserStatsSchema>;
export type Reward = typeof rewards.$inferSelect;
export type InsertReward = z.infer<typeof insertRewardSchema>;
export type UserReward = typeof userRewards.$inferSelect;
export type InsertUserReward = z.infer<typeof insertUserRewardSchema>;

// Relations
export const usersRelations = relations(users, ({ one, many }) => ({
  tokens: one(tokens, {
    fields: [users.id],
    references: [tokens.userId],
  }),
  stats: one(userStats, {
    fields: [users.id],
    references: [userStats.userId],
  }),
  driverRides: many(rides, {
    relationName: "driverRides",
  }),
  riderRides: many(rides, {
    relationName: "riderRides",
  }),
  userRewards: many(userRewards),
}));

export const tokensRelations = relations(tokens, ({ one }) => ({
  user: one(users, {
    fields: [tokens.userId],
    references: [users.id],
  }),
}));

export const ridesRelations = relations(rides, ({ one }) => ({
  driver: one(users, {
    fields: [rides.driverId],
    references: [users.id],
    relationName: "driverRides",
  }),
  rider: one(users, {
    fields: [rides.riderId],
    references: [users.id],
    relationName: "riderRides",
  }),
}));

export const userStatsRelations = relations(userStats, ({ one }) => ({
  user: one(users, {
    fields: [userStats.userId],
    references: [users.id],
  }),
}));

export const rewardsRelations = relations(rewards, ({ many }) => ({
  userRewards: many(userRewards),
}));

export const userRewardsRelations = relations(userRewards, ({ one }) => ({
  user: one(users, {
    fields: [userRewards.userId],
    references: [users.id],
  }),
  reward: one(rewards, {
    fields: [userRewards.rewardId],
    references: [rewards.id],
  }),
}));
