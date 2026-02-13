import { v } from "convex/values"
import { mutation, query } from "./_generated/server"

export const create = mutation({
  args: {
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
  },
  handler: async (ctx, args) => {
    const now = Date.now()

    const recommendationId = await ctx.db.insert("recommendations", {
      title: args.title,
      genre: args.genre,
      link: args.link,
      blurb: args.blurb,
      userId: args.userId,
      staffPick: false,
      createdAt: now,
      updatedAt: now,
    })

    return recommendationId
  },
})

export const listByGenre = query({
  args: {
    genre: v.optional(
      v.union(
        v.literal("horror"),
        v.literal("action"),
        v.literal("comedy"),
        v.literal("drama"),
        v.literal("sci-fi"),
        v.literal("thriller")
      )
    ),
    paginationOpts: v.object({
      numItems: v.number(),
      cursor: v.union(v.string(), v.null()),
    }),
  },
  handler: async (ctx, args) => {
    const query = ctx.db.query("recommendations")
      .order("desc")

    const filtered = args.genre
      ? query.filter((q) => q.eq(q.field("genre"), args.genre!))
      : query

    const results = await filtered.paginate(args.paginationOpts)

    return results
  },
})

export const deleteRecommendation = mutation({
  args: {
    id: v.id("recommendations"),
    userId: v.string(),
    userRole: v.union(v.literal("admin"), v.literal("user")),
  },
  handler: async (ctx, args) => {
    const recommendation = await ctx.db.get(args.id)

    if (!recommendation) {
      throw new Error("Recommendation not found")
    }

    // Check permissions: admin can delete any, user can only delete own
    if (args.userRole !== 'admin' && recommendation.userId !== args.userId) {
      throw new Error("Unauthorized: You can only delete your own recommendations")
    }

    await ctx.db.delete(args.id)
    return { success: true }
  },
})

export const markAsStaffPick = mutation({
  args: {
    id: v.id("recommendations"),
    staffPick: v.boolean(),
    userRole: v.union(v.literal("admin"), v.literal("user")),
  },
  handler: async (ctx, args) => {
    // Only admins can mark staff picks
    if (args.userRole !== 'admin') {
      throw new Error("Unauthorized: Only admins can mark staff picks")
    }

    await ctx.db.patch(args.id, { staffPick: args.staffPick })
    return { success: true }
  },
})
