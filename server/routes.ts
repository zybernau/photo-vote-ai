import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { setupAuth } from "./auth";
import { insertComparisonSchema } from "@shared/schema";

export function registerRoutes(app: Express): Server {
  setupAuth(app);

  // Get active comparisons
  app.get("/api/comparisons", async (_req, res) => {
    const comparisons = await storage.listActiveComparisons();
    res.json(comparisons);
  });

  // Get single comparison
  app.get("/api/comparisons/:id", async (req, res) => {
    const comparison = await storage.getComparison(parseInt(req.params.id));
    if (!comparison) return res.sendStatus(404);
    res.json(comparison);
  });

  // Create comparison (admin only)
  app.post("/api/comparisons", async (req, res) => {
    if (!req.isAuthenticated()) return res.sendStatus(401);
    
    const parsed = insertComparisonSchema.safeParse(req.body);
    if (!parsed.success) return res.status(400).json(parsed.error);
    
    const comparison = await storage.createComparison(parsed.data);
    res.status(201).json(comparison);
  });

  // Submit vote
  app.post("/api/comparisons/:id/vote", async (req, res) => {
    const id = parseInt(req.params.id);
    const { voteA } = req.body;
    
    if (typeof voteA !== "boolean") {
      return res.status(400).send("voteA must be a boolean");
    }

    try {
      const updated = await storage.updateVotes(id, voteA);
      res.json(updated);
    } catch (err) {
      res.status(404).send((err as Error).message);
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
