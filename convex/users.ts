import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

/* ================= GET USER ================= */
export const getUserByClerkUserId = query({
  args: {
    userId: v.string(),
  },
  handler: async (ctx, { userId }) => {
    return await ctx.db
      .query("users")
      .withIndex("by_userId", (q) => q.eq("userId", userId))
      .first();
  },
});

/* ================= UPSERT USER ================= */
export const upsertUser = mutation({
  args: {
    userId: v.string(),
    name: v.string(),
    email: v.string(),
    imageUrl: v.string(),
  },
  handler: async (ctx, { userId, name, email, imageUrl }) => {
    const existingUser = await ctx.db
      .query("users")
      .withIndex("by_userId", (q) => q.eq("userId", userId))
      .first();

    if (existingUser) {
      await ctx.db.patch(existingUser._id, {
        name,
        email,
        imageUrl,
      });
      return existingUser._id;
    }

    return await ctx.db.insert("users", {
      userId,
      name,
      email,
      imageUrl,
    });
  },
});

/* ================= SEARCH USERS ================= */
export const searchUsers = query({
  args: {
    searchTerm: v.string(),
  },
  handler: async (ctx, { searchTerm }) => {
    if (!searchTerm.trim()) return [];

    const term = searchTerm.toLowerCase();

    const users = await ctx.db.query("users").collect();

    return users
      .filter(
        (u) =>
          u.name.toLowerCase().includes(term) ||
          u.email.toLowerCase().includes(term)
      )
      .slice(0, 20);
  },
});
