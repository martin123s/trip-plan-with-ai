import { mutation } from "./_generated/server";
import { v } from "convex/values"

export const CreateNewUser = mutation({
  args: {
    name: v.string(),
    email: v.string(),
    imageURL: v.string()
  },
  handler: async (ctx, args) => {
    const existingUser = await ctx.db.query("UserTable")
      .filter((q) => q.eq(q.field('email'), args.email))
      .first()
    
    if (!existingUser) {
      const newUser = {
        name: args.name,
        email: args.email,
        imageURL: args.imageURL
      }
      const result = await ctx.db.insert('UserTable', newUser)
      return await ctx.db.get(result);
    }
    return existingUser
  }
})