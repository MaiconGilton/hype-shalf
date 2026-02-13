import { defineSchema, defineTable } from "convex/server"
import { v } from "convex/values"

export default defineSchema({
  recommendations: defineTable({
    title: v.string(),
    genre: v.union(
      v.literal("horror"),
      v.literal("action"),
      v.literal("comedy"),
      v.literal("drama"),
      v.literal("sci-fi"),
      v.literal("thriller")
    ),
    link: v.string(),
    blurb: v.string(),
    userId: v.string(),
    staffPick: v.boolean(),
    createdAt: v.number(),
    updatedAt: v.number(),
  })
    .index("by_userId", ["userId"])
    .index("by_genre", ["genre"])
    .index("by_staffPick", ["staffPick"]),
})
