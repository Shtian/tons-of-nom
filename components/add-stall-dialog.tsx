"use client";

import { useMutation } from "convex/react";
import { type ReactElement, useEffect, useState } from "react";
import { toast } from "sonner";
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
import { Input } from "@/components/ui/input";
import { api } from "@/convex/_generated/api";

export function AddStallDialog({
	trigger,
	defaultName = "",
}: {
	trigger: ReactElement;
	defaultName?: string;
}) {
	const { nickname } = useNickname();
	const addStall = useMutation(api.stalls.add);
	const [open, setOpen] = useState(false);
	const [name, setName] = useState(defaultName);
	const [submitting, setSubmitting] = useState(false);

	useEffect(() => {
		if (open) setName(defaultName);
	}, [open, defaultName]);

	const submit = async () => {
		const clean = name.trim();
		if (!clean) return;
		setSubmitting(true);
		try {
			await addStall({ name: clean, nickname });
			toast.success(`Added "${clean}" 🤘`);
			setOpen(false);
			setName("");
		} catch (err) {
			toast.error(err instanceof Error ? err.message : "Something broke");
		} finally {
			setSubmitting(false);
		}
	};

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger render={trigger} />
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Add a food stall</DialogTitle>
					<DialogDescription>
						Search first — if it's already here, rate that one instead of making
						a duplicate.
					</DialogDescription>
				</DialogHeader>
				<form
					className="flex flex-col gap-3"
					onSubmit={(e) => {
						e.preventDefault();
						submit();
					}}
				>
					<Input
						autoFocus
						placeholder="Stall name"
						value={name}
						maxLength={80}
						onChange={(e) => setName(e.target.value)}
					/>
					<DialogFooter>
						<Button
							type="submit"
							className="w-full"
							disabled={submitting || !name.trim()}
						>
							{submitting ? "Adding…" : "Add stall"}
						</Button>
					</DialogFooter>
				</form>
			</DialogContent>
		</Dialog>
	);
}
