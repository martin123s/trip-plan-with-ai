import { mutation, query } from "./_generated/server";
import { v } from "convex/values"


export const CreateImageURL = mutation({
  args: {
    name: v.string(),
    type: v.string(),
    url: v.string()
  },
  handler: async (ctx, args) => {
    const existing = await ctx.db
      .query("ImageURLTable")
      .withIndex("by_name", q => q.eq("name", args.name))
      .unique();

    if (!existing) {
      await ctx.db.insert("ImageURLTable", args);
    }
  },
})

export const GetSingleImageURL = query({
  args: { name: v.string() },
  handler: async (ctx, args) => {
    const result = await ctx.db
      .query("ImageURLTable")
      .withIndex("by_name", q => q.eq("name", args.name))
      .unique();

    return result?.url || "";
  },
})

export const GetImageURLs = query({
  handler: async (ctx) => {
    const results = await ctx.db.query("ImageURLTable").collect();
    // return in a lookup map instead of array
    return results.map(r => ({
      name: r.name,
      type: r.type,
      url: r.url,
    }));
  },
})


