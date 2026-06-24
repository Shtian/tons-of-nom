import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

// Domain: one festival, two entities. See docs/DOMAIN-MODEL.md.
export default defineSchema({
	stalls: defineTable({
		name: v.string(),
		nickname: v.string(),
	}),
	ratings: defineTable({
		stallId: v.id("stalls"),
		horns: v.number(), // 1.0–5.0 in 0.5 steps (ADR 0003)
		description: v.optional(v.string()),
		nickname: v.string(),
	}).index("by_stall", ["stallId"]),
});
