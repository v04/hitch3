import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertUserSchema, insertRideSchema } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // Auth routes
  app.post("/api/auth/register", async (req, res) => {
    try {
      const userData = insertUserSchema.parse(req.body);
      const user = await storage.createUser(userData);
      res.json({ user });
    } catch (error) {
      res.status(400).json({ message: "Invalid user data", error });
    }
  });

  app.get("/api/auth/me/:userId", async (req, res) => {
    try {
      const userId = parseInt(req.params.userId);
      const user = await storage.getUser(userId);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      res.json({ user });
    } catch (error) {
      res.status(500).json({ message: "Server error", error });
    }
  });

  // User routes
  app.put("/api/users/:id", async (req, res) => {
    try {
      const userId = parseInt(req.params.id);
      const user = await storage.updateUser(userId, req.body);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      res.json({ user });
    } catch (error) {
      res.status(500).json({ message: "Server error", error });
    }
  });

  // Token routes
  app.get("/api/tokens/:userId", async (req, res) => {
    try {
      const userId = parseInt(req.params.userId);
      const tokens = await storage.getUserTokens(userId);
      if (!tokens) {
        return res.status(404).json({ message: "Tokens not found" });
      }
      res.json({ tokens });
    } catch (error) {
      res.status(500).json({ message: "Server error", error });
    }
  });

  app.put("/api/tokens/:userId", async (req, res) => {
    try {
      const userId = parseInt(req.params.userId);
      const tokens = await storage.updateUserTokens(userId, req.body);
      if (!tokens) {
        return res.status(404).json({ message: "Tokens not found" });
      }
      res.json({ tokens });
    } catch (error) {
      res.status(500).json({ message: "Server error", error });
    }
  });

  // Ride routes
  app.post("/api/rides", async (req, res) => {
    try {
      const rideData = insertRideSchema.parse(req.body);
      const ride = await storage.createRide(rideData);
      res.json({ ride });
    } catch (error) {
      res.status(400).json({ message: "Invalid ride data", error });
    }
  });

  app.get("/api/rides/user/:userId", async (req, res) => {
    try {
      const userId = parseInt(req.params.userId);
      const rides = await storage.getUserRides(userId);
      res.json({ rides });
    } catch (error) {
      res.status(500).json({ message: "Server error", error });
    }
  });

  app.get("/api/rides/nearby", async (req, res) => {
    try {
      const { lat, lng, radius = 2 } = req.query;
      const rides = await storage.getNearbyRides(
        parseFloat(lat as string),
        parseFloat(lng as string),
        parseFloat(radius as string)
      );
      res.json({ rides });
    } catch (error) {
      res.status(500).json({ message: "Server error", error });
    }
  });

  app.put("/api/rides/:id", async (req, res) => {
    try {
      const rideId = parseInt(req.params.id);
      const ride = await storage.updateRide(rideId, req.body);
      if (!ride) {
        return res.status(404).json({ message: "Ride not found" });
      }
      res.json({ ride });
    } catch (error) {
      res.status(500).json({ message: "Server error", error });
    }
  });

  // Stats routes
  app.get("/api/stats/:userId", async (req, res) => {
    try {
      const userId = parseInt(req.params.userId);
      const stats = await storage.getUserStats(userId);
      if (!stats) {
        return res.status(404).json({ message: "Stats not found" });
      }
      res.json({ stats });
    } catch (error) {
      res.status(500).json({ message: "Server error", error });
    }
  });

  // Rewards routes
  app.get("/api/rewards", async (req, res) => {
    try {
      const rewards = await storage.getRewards();
      res.json({ rewards });
    } catch (error) {
      res.status(500).json({ message: "Server error", error });
    }
  });

  app.get("/api/rewards/category/:category", async (req, res) => {
    try {
      const category = req.params.category;
      const rewards = await storage.getRewardsByCategory(category);
      res.json({ rewards });
    } catch (error) {
      res.status(500).json({ message: "Server error", error });
    }
  });

  app.post("/api/rewards/redeem", async (req, res) => {
    try {
      const { userId, rewardId } = req.body;
      const userReward = await storage.redeemReward(userId, rewardId);
      res.json({ userReward });
    } catch (error) {
      res.status(400).json({ message: "Failed to redeem reward", error });
    }
  });

  app.get("/api/rewards/user/:userId", async (req, res) => {
    try {
      const userId = parseInt(req.params.userId);
      const userRewards = await storage.getUserRewards(userId);
      res.json({ userRewards });
    } catch (error) {
      res.status(500).json({ message: "Server error", error });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
