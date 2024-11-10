import { ConvexError, v } from "convex/values"
import { getUserByClerkId } from "./_utils"
import { mutation, query } from "./_generated/server"

export const get = query({args: {
    id: v.id("conversations")
},
    handler: async (ctx, args) =>{
        const identity = await ctx.auth.getUserIdentity()
    
        if(!identity){
            throw new Error("Unauthorized")
        }
    
        const currentUser = await 
        getUserByClerkId({
            ctx, 
            clerkId: identity.subject,
        })
    
        if(!currentUser){
            throw new ConvexError("User not Found")
        }
    
        const conversation = await ctx.db.get(args.id)
        if(!conversation){
            throw new ConvexError("Conversation not found")
        }

        const membership = await ctx.db.query("conversationMembers")
        .withIndex("by_memberId_conversationId", (q)=> q.eq("memberId", currentUser._id).eq("conversationId", conversation._id)).unique()

        if(!membership){
            throw new ConvexError("You aren't a member of this chat")
        }

        const allConversationMemberships = 
        await ctx.db
        .query("conversationMembers")
        .withIndex("by_conversationId",
            (q)=>q.eq("conversationId",
                args.id
            )
        ).collect();

        if(!conversation.isGroup){
            const otherMemberships = 
            allConversationMemberships.
            filter(membership =>
                membership.memberId !==
                currentUser._id
            )[0]

            const otherMemberDetails = 
            await ctx.db.get(otherMemberships.memberId);

            return{
                ...conversation,
                otherMember: {
                    ...otherMemberDetails,
                    lastSeenMessageId:
                    otherMemberships.
                    lastSeenMessage
                },
                otherMembers: null,
            }
        }else{
            const otherMembers = (await Promise.all
                (allConversationMemberships.filter(membership => membership.memberId !==
                    currentUser._id
                )
            )
        ).map(async (membership) => {
                    const member = await ctx.db.get(membership.memberId);

                        if(!member){
                            throw new ConvexError("Member Could not be Found")
                        }

                        return {
                            username: member.username,
                        };
                    });

                    return {...conversation, otherMembers, otherMember: null} //error 3:09:45

                    
        }
    },
    
    })

export const createGroup = mutation({
    args:{
        members: v.array(v.id("users")),
        name: v.string()
    },
    handler: async (ctx, args) =>{
        const identity = await ctx.auth.getUserIdentity()
    
        if(!identity){
            throw new Error("Unauthorized")
        }
    
        const currentUser = await 
        getUserByClerkId({
            ctx, 
            clerkId: identity.subject,
        })
    
        if(!currentUser){
            throw new ConvexError("User not Found")
        }
        const conversationId = await ctx.db.insert("conversations", {
            isGroup: true,
            name: args.name
        })

        await Promise.all(
            [...args.members, currentUser._id].map
            (async (memberId)=>{
                await ctx.db.insert
                ("conversationMembers", {
                    memberId,
                    conversationId,
                });
            })
        )
    }
})