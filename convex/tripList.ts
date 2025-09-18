import { mutation } from "./_generated/server";
import { v } from "convex/values"

export const CreateNewTrip = mutation({
  args: {
    tripId: v.string(),
    tripDetails: v.any(),
    userId: v.id('UserTable')
  },
  handler: async (ctx, args) => {
    const result = await ctx.db.insert('TripListTable',{
      tripId: args.tripId,
      tripDetails: args.tripDetails,
      userId: args.userId
    })
  }
})