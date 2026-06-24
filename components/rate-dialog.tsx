"use client";

import { useMutation } from "convex/react";
import { type ReactElement, useState } from "react";
import { toast } from "sonner";
import { HornInput } from "@/components/horns";
import { useNickname } from "@/components/nickname";
import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { api } from "@/convex/_generated/api";
import type { Id } from "@/convex/_generated/dataModel";
import { metalConfetti } from "@/lib/metal";

const MAX_DESCRIPTION = 500;

export function RateDialog({
	stallId,
	stallName,
	trigger,
}: {
	stallId: Id<"stalls">;
	stallName: string;
	trigger: ReactElement;
}) {
	const { nickname } = useNickname();
	const addRating = useMutation(api.ratings.add);
	const [open, setOpen] = useState(false);
	const [horns, setHorns] = useState(0);
	const [description, setDescription] = useState("");
	const [submitting, setSubmitting] = useState(false);

	const reset = () => {
		setHorns(0);
		setDescription("");
	};

	const submit = async () => {
		if (horns < 1) {
			toast.error("Pick at least one horn 🤘");
			return;
		}
		setSubmitting(true);
		try {
			await addRating({
				stallId,
				horns,
				description: description.trim() || undefined,
				nickname,
			});
			const full = horns === 5;
			if (full) metalConfetti();
			toast.success(full ? "FULL HORNS! 🤘🔥" : "Rating dropped 🤘");
			// Let the lit horns and confetti land before the lights drop —
			// the one earned release shouldn't burst over an empty screen.
			if (full) await new Promise((r) => setTimeout(r, 900));
			setOpen(false);
			reset();
		} catch (err) {
			toast.error(err instanceof Error ? err.message : "Something broke");
		} finally {
			setSubmitting(false);
		}
	};

	return (
		<Dialog
			open={open}
			onOpenChange={(o) => {
				setOpen(o);
				if (!o) reset();
			}}
		>
			<DialogTrigger render={trigger} />
			<DialogContent>
				<DialogHeader>
					<DialogTitle className="truncate">Rate {stallName}</DialogTitle>
					<DialogDescription>
						Tap the left half of a horn for a half, the right half for a full.
					</DialogDescription>
				</DialogHeader>

				<div className="flex flex-col items-center gap-2 py-2">
					<HornInput value={horns} onChange={setHorns} />
					<span className="font-mono text-sm text-muted-foreground tabular-nums">
						{horns > 0 ? `${horns.toFixed(1)} / 5` : "no horns yet"}
					</span>
				</div>

				<div className="flex flex-col gap-1">
					<Textarea
						placeholder="Optional: what did you eat? worth it? (max 500)"
						value={description}
						maxLength={MAX_DESCRIPTION}
						onChange={(e) => setDescription(e.target.value)}
						rows={3}
					/>
					<span className="self-end font-mono text-xs text-muted-foreground tabular-nums">
						{description.length}/{MAX_DESCRIPTION}
					</span>
				</div>

				<DialogFooter>
					<Button
						className="w-full"
						disabled={submitting || horns < 1}
						onClick={submit}
					>
						{submitting ? "Dropping…" : "Drop rating"}
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
