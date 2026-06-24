"use client";

import { useQuery } from "convex/react";
import { Plus, Search } from "lucide-react";
import Link from "next/link";
import { useMemo, useState } from "react";
import { AddStallDialog } from "@/components/add-stall-dialog";
import { HornDisplay } from "@/components/horns";
import { RateDialog } from "@/components/rate-dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { api } from "@/convex/_generated/api";

// Crimson encodes leaderboard rank: the loudest stall reads loudest.
// #1 full horn-crimson, podium (2–3) a dimmed crimson-ash, the rest stay ash.
function rankColor(rank: number): string | undefined {
	if (rank === 1) return "var(--horn)";
	if (rank <= 3)
		return "color-mix(in oklch, var(--horn) 55%, var(--muted-foreground))";
	return undefined; // inherits text-muted-foreground
}

export function StallList() {
	const stalls = useQuery(api.stalls.list);
	const [search, setSearch] = useState("");

	const filtered = useMemo(() => {
		if (!stalls) return stalls;
		const q = search.trim().toLowerCase();
		if (!q) return stalls;
		return stalls.filter((s) => s.name.toLowerCase().includes(q));
	}, [stalls, search]);

	const loading = stalls === undefined;
	const noStallsAtAll = stalls?.length === 0;
	const noMatches = !loading && !noStallsAtAll && filtered?.length === 0;

	return (
		<div className="mx-auto flex w-full max-w-md flex-1 flex-col px-4 pb-28 pt-6">
			<header className="mb-5 text-center">
				<h1 className="font-metal text-4xl uppercase tracking-tight text-foreground sm:text-5xl">
					Tons of Nom
				</h1>
			</header>

			<div className="relative mb-4">
				<Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
				<Input
					className="pl-9"
					inputMode="search"
					placeholder="Search stalls…"
					value={search}
					onChange={(e) => setSearch(e.target.value)}
				/>
			</div>

			{loading && (
				<p className="py-16 text-center text-sm text-muted-foreground">
					Loading the lineup…
				</p>
			)}

			{noStallsAtAll && (
				<div className="rounded-xl border border-dashed p-8 text-center">
					<p className="text-lg font-semibold">No stalls yet.</p>
					<p className="mt-1 text-sm text-muted-foreground">
						Be the first — add a food stall and kick it off.
					</p>
					<AddStallDialog
						trigger={
							<Button className="mt-4">
								<Plus className="size-4" /> Add the first stall
							</Button>
						}
					/>
				</div>
			)}

			{noMatches && (
				<div className="rounded-xl border border-dashed p-8 text-center">
					<p className="text-sm text-muted-foreground">
						Nothing matches “{search}”.
					</p>
					<AddStallDialog
						defaultName={search}
						trigger={
							<Button className="mt-4" variant="secondary">
								<Plus className="size-4" /> Add “{search.trim()}”
							</Button>
						}
					/>
				</div>
			)}

			<ul className="flex flex-col gap-3">
				{filtered?.map((stall, idx) => {
					const rank = stall.count > 0 ? idx + 1 : null;
					const isLeader = rank === 1;
					return (
						<li key={stall._id}>
							<div
								className={
									isLeader
										? "flex items-center gap-3 rounded-xl border border-[color-mix(in_oklch,var(--horn)_45%,var(--border))] bg-[color-mix(in_oklch,var(--card),var(--horn)_8%)] p-3 shadow-[0_0_24px_-10px_var(--horn)]"
										: "flex items-center gap-3 rounded-xl border bg-card p-3"
								}
							>
								<span
									className="w-5 shrink-0 text-center text-sm font-bold tabular-nums text-muted-foreground"
									style={rank ? { color: rankColor(rank) } : undefined}
								>
									{rank ?? "–"}
								</span>
								<Link href={`/stall/${stall._id}`} className="min-w-0 flex-1">
									<p className="truncate font-semibold">{stall.name}</p>
									<div className="mt-0.5 flex items-center gap-2">
										{stall.count > 0 ? (
											<>
												<HornDisplay value={stall.avgHorns} size="sm" />
												<span className="text-xs tabular-nums text-muted-foreground">
													<span className="font-semibold text-foreground">
														{stall.avgHorns.toFixed(1)}
													</span>{" "}
													· {stall.count}
													{stall.count === 1 ? " rating" : " ratings"}
												</span>
											</>
										) : (
											<span className="text-xs text-muted-foreground">
												not rated yet
											</span>
										)}
									</div>
								</Link>
								<RateDialog
									stallId={stall._id}
									stallName={stall.name}
									trigger={
										<Button size="sm" className="shrink-0">
											Rate
										</Button>
									}
								/>
							</div>
						</li>
					);
				})}
			</ul>

			{/* Sticky add button (mobile thumb reach, ADR 0011) */}
			{!noStallsAtAll && (
				<div className="fixed inset-x-0 bottom-0 z-10 border-t bg-background/90 px-4 py-3 backdrop-blur">
					<div className="mx-auto max-w-md">
						<AddStallDialog
							defaultName={search}
							trigger={
								<Button className="w-full">
									<Plus className="size-4" /> Add a stall
								</Button>
							}
						/>
					</div>
				</div>
			)}
		</div>
	);
}
