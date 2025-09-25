import { defineSchema, defineTable } from "convex/server"
import { v } from "convex/values"

export default defineSchema({
  
  UserTable: defineTable({
    name: v.string(),
    imageURL: v.string(),
    email: v.string(),
    subscription: v.optional(v.string()),
  }), 

  TripListTable: defineTable({
    tripId: v.string(),
    tripDetails: v.any(),
    userId: v.id('UserTable')
  }),

  ImageURLTable: defineTable({
    name: v.string(),
    type: v.string(), // "city" | "hotel" | "activity"
    url: v.string()
  }).index("by_name", ["name"])

})
