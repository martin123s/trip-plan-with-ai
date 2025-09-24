import { mutation, query } from "./_generated/server";
import { v } from "convex/values"

export const CreateNewTrip = mutation({
  args: {
    tripId: v.string(),
    tripDetails: v.any(),
    userId: v.id('UserTable')
  },
  handler: async (ctx, args) => {
    await ctx.db.insert('TripListTable',{
      tripId: args.tripId,
      tripDetails: args.tripDetails,
      userId: args.userId
    })
  }
})

export const GetTrips = query({
  args: {
    userId: v.id('UserTable')
  },
  handler: async (ctx, args) => {
    const result = await ctx.db.query('TripListTable')
      .filter(q => q.eq(q.field('userId'), args.userId))
      .collect()
    
    return result
  }
})

export const GetSingleTrip = query({
  args: {
    userId: v.id('UserTable'),
    tripid: v.string()
  },
  handler: async (ctx, args) => {
    const result = await ctx.db.query('TripListTable')
      .filter(q => q.and(
        q.eq(q.field('userId'), args.userId),
        q.eq(q.field('tripId'), args.tripid)
      ))
      .collect()
    
    return result[0]
  }
})