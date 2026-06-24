import { v } from "convex/values";
import { mutation } from "./_generated/server";
import { isValidHorns, MAX_DESCRIPTION } from "./ranking";

// Add a rating (ADR 0001/0003): anonymous-ish, immutable, no edit/delete.
export const add = mutation({
	args: {
		stallId: v.id("stalls"),
		horns: v.number(),
		description: v.optional(v.string()),
		nickname: v.string(),
	},
	handler: async (ctx, { stallId, horns, description, nickname }) => {
		const stall = await ctx.db.get(stallId);
		if (!stall) throw new Error("Stall not found");
		if (!isValidHorns(horns)) {
			throw new Error("Horns must be 1–5 in 0.5 steps");
		}
		const cleanNick = nickname.trim();
		if (!cleanNick) throw new Error("Nickname required");

		const cleanDesc = description?.trim();
		if (cleanDesc && cleanDesc.length > MAX_DESCRIPTION) {
			throw new Error(`Description max ${MAX_DESCRIPTION} characters`);
		}

		return await ctx.db.insert("ratings", {
			stallId,
			horns,
			description: cleanDesc || undefined,
			nickname: cleanNick,
		});
	},
});
