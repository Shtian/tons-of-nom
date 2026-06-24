import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { weightedScore } from "./ranking";

// Ranked stall list for the leaderboard (ADR 0009).
// Small single festival → fetch all and aggregate in memory is fine.
export const list = query({
	args: {},
	handler: async (ctx) => {
		const stalls = await ctx.db.query("stalls").collect();
		const ratings = await ctx.db.query("ratings").collect();

		const agg = new Map<string, { sum: number; count: number }>();
		for (const r of ratings) {
			const key = r.stallId;
			const cur = agg.get(key) ?? { sum: 0, count: 0 };
			cur.sum += r.horns;
			cur.count += 1;
			agg.set(key, cur);
		}

		return stalls
			.map((s) => {
				const a = agg.get(s._id) ?? { sum: 0, count: 0 };
				const avgHorns = a.count > 0 ? a.sum / a.count : 0;
				return {
					_id: s._id,
					name: s.name,
					nickname: s.nickname,
					createdAt: s._creationTime,
					count: a.count,
					avgHorns,
					weighted: weightedScore(a.sum, a.count),
				};
			})
			.sort((a, b) => {
				// Rated stalls first (by weighted desc), unrated last (newest first).
				if (a.count === 0 && b.count === 0) return b.createdAt - a.createdAt;
				if (a.count === 0) return 1;
				if (b.count === 0) return -1;
				return b.weighted - a.weighted;
			});
	},
});

// Stall detail + its ratings, newest first.
export const get = query({
	args: { stallId: v.id("stalls") },
	handler: async (ctx, { stallId }) => {
		const stall = await ctx.db.get(stallId);
		if (!stall) return null;

		const ratings = await ctx.db
			.query("ratings")
			.withIndex("by_stall", (q) => q.eq("stallId", stallId))
			.collect();
		ratings.sort((a, b) => b._creationTime - a._creationTime);

		const sum = ratings.reduce((acc, r) => acc + r.horns, 0);
		const count = ratings.length;

		return {
			stall: {
				_id: stall._id,
				name: stall.name,
				nickname: stall.nickname,
				createdAt: stall._creationTime,
			},
			ratings: ratings.map((r) => ({
				_id: r._id,
				horns: r.horns,
				description: r.description,
				nickname: r.nickname,
				createdAt: r._creationTime,
			})),
			avgHorns: count > 0 ? sum / count : 0,
			count,
		};
	},
});

// Add a stall (ADR 0006/0007/0008): name only, attributed by nickname, dupes allowed.
export const add = mutation({
	args: { name: v.string(), nickname: v.string() },
	handler: async (ctx, { name, nickname }) => {
		const cleanName = name.trim();
		const cleanNick = nickname.trim();
		if (!cleanName) throw new Error("Stall name required");
		if (!cleanNick) throw new Error("Nickname required");
		return await ctx.db.insert("stalls", {
			name: cleanName,
			nickname: cleanNick,
		});
	},
});
