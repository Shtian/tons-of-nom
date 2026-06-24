"use client";

import { useQuery } from "convex/react";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { HornDisplay } from "@/components/horns";
import { RateDialog } from "@/components/rate-dialog";
import { Button } from "@/components/ui/button";
import { api } from "@/convex/_generated/api";
import type { Id } from "@/convex/_generated/dataModel";

function timeAgo(ts: number): string {
	const diff = Date.now() - ts;
	const min = Math.floor(diff / 60000);
	if (min < 1) return "just now";
	if (min < 60) return `${min}m ago`;
	const hr = Math.floor(min / 60);
	if (hr < 24) return `${hr}h ago`;
	return `${Math.floor(hr / 24)}d ago`;
}

export function StallDetail({ stallId }: { stallId: Id<"stalls"> }) {
	const data = useQuery(api.stalls.get, { stallId });

	return (
		<div className="mx-auto flex w-full max-w-md flex-1 flex-col px-4 pb-28 pt-4">
			<Link
				href="/"
				className="mb-3 inline-flex items-center gap-1 text-sm text-muted-foreground"
			>
				<ArrowLeft className="size-4" /> All stalls
			</Link>

			{data === undefined && (
				<p className="py-16 text-center text-sm text-muted-foreground">
					Loading…
				</p>
			)}

			{data === null && (
				<p className="py-16 text-center text-sm text-muted-foreground">
					This stall doesn't exist.
				</p>
			)}

			{data && (
				<>
					<header className="mb-5">
						<h1 className="text-2xl font-bold">{data.stall.name}</h1>
						<p className="text-xs text-muted-foreground">
							added by {data.stall.nickname}
						</p>
						<div className="mt-3 flex items-center gap-3">
							<HornDisplay value={data.avgHorns} size="lg" />
							<span className="text-sm tabular-nums text-muted-foreground">
								{data.count > 0
									? `${data.avgHorns.toFixed(1)} · ${data.count}${
											data.count === 1 ? " rating" : " ratings"
										}`
									: "not rated yet"}
							</span>
						</div>
					</header>

					<ul className="flex flex-col gap-3">
						{data.ratings.map((r) => (
							<li key={r._id} className="rounded-xl border bg-card p-3">
								<div className="flex items-center justify-between gap-2">
									<HornDisplay value={r.horns} size="sm" />
									<span className="text-xs text-muted-foreground">
										{r.nickname} · {timeAgo(r.createdAt)}
									</span>
								</div>
								{r.description && (
									<p className="mt-2 whitespace-pre-wrap text-sm">
										{r.description}
									</p>
								)}
							</li>
						))}
					</ul>

					{data.count === 0 && (
						<p className="py-8 text-center text-sm text-muted-foreground">
							No ratings yet. Be the first 🤘
						</p>
					)}

					<div className="fixed inset-x-0 bottom-0 z-10 border-t bg-background/90 px-4 py-3 backdrop-blur">
						<div className="mx-auto max-w-md">
							<RateDialog
								stallId={data.stall._id}
								stallName={data.stall.name}
								trigger={<Button className="w-full">Rate this stall 🤘</Button>}
							/>
						</div>
					</div>
				</>
			)}
		</div>
	);
}
