import { User, InsertUser, Comparison, InsertComparison } from "@shared/schema";
import session from "express-session";
import createMemoryStore from "memorystore";

const MemoryStore = createMemoryStore(session);

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  createComparison(comparison: InsertComparison): Promise<Comparison>;
  getComparison(id: number): Promise<Comparison | undefined>;
  listActiveComparisons(): Promise<Comparison[]>;
  updateVotes(id: number, voteA: boolean): Promise<Comparison>;
  
  sessionStore: session.Store;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private comparisons: Map<number, Comparison>;
  private currentUserId: number;
  private currentComparisonId: number;
  sessionStore: session.Store;

  constructor() {
    this.users = new Map();
    this.comparisons = new Map();
    this.currentUserId = 1;
    this.currentComparisonId = 1;
    this.sessionStore = new MemoryStore({
      checkPeriod: 86400000,
    });
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentUserId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async createComparison(comp: InsertComparison): Promise<Comparison> {
    const id = this.currentComparisonId++;
    const comparison: Comparison = {
      ...comp,
      id,
      votesA: 0,
      votesB: 0,
      active: true,
    };
    this.comparisons.set(id, comparison);
    return comparison;
  }

  async getComparison(id: number): Promise<Comparison | undefined> {
    return this.comparisons.get(id);
  }

  async listActiveComparisons(): Promise<Comparison[]> {
    return Array.from(this.comparisons.values()).filter(c => c.active);
  }

  async updateVotes(id: number, voteA: boolean): Promise<Comparison> {
    const comparison = await this.getComparison(id);
    if (!comparison) throw new Error("Comparison not found");
    
    const updated: Comparison = {
      ...comparison,
      votesA: comparison.votesA + (voteA ? 1 : 0),
      votesB: comparison.votesB + (voteA ? 0 : 1),
    };
    
    this.comparisons.set(id, updated);
    return updated;
  }
}

export const storage = new MemStorage();
