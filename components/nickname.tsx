"use client";

import {
	createContext,
	type ReactNode,
	useContext,
	useEffect,
	useState,
} from "react";
import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const STORAGE_KEY = "tons-of-nom:nickname";

type NicknameContextValue = {
	nickname: string;
	setNickname: (name: string) => void;
};

const NicknameContext = createContext<NicknameContextValue | null>(null);

export function useNickname() {
	const ctx = useContext(NicknameContext);
	if (!ctx) throw new Error("useNickname must be used within NicknameProvider");
	return ctx;
}

// Required nickname gate (ADR 0006): prompt on first visit, store in localStorage,
// block the app behind a non-dismissible dialog until set.
export function NicknameProvider({ children }: { children: ReactNode }) {
	const [nickname, setNicknameState] = useState("");
	const [hydrated, setHydrated] = useState(false);
	const [draft, setDraft] = useState("");

	useEffect(() => {
		const stored = window.localStorage.getItem(STORAGE_KEY) ?? "";
		setNicknameState(stored);
		setHydrated(true);
	}, []);

	const setNickname = (name: string) => {
		const clean = name.trim();
		if (!clean) return;
		window.localStorage.setItem(STORAGE_KEY, clean);
		setNicknameState(clean);
	};

	const needsName = hydrated && !nickname;

	return (
		<NicknameContext.Provider value={{ nickname, setNickname }}>
			{children}
			{/* Controlled with no onOpenChange → dismissal attempts are no-ops (ADR 0006). */}
			<Dialog open={needsName}>
				<DialogContent showCloseButton={false}>
					<DialogHeader>
						<DialogTitle>What do they call you?</DialogTitle>
						<DialogDescription>
							Your name rides along with every rating you drop. Pick something.
						</DialogDescription>
					</DialogHeader>
					<form
						className="flex flex-col gap-3"
						onSubmit={(e) => {
							e.preventDefault();
							setNickname(draft);
						}}
					>
						<Label htmlFor="nickname" className="sr-only">
							Nickname
						</Label>
						<Input
							id="nickname"
							autoFocus
							placeholder="e.g. Lemmy"
							value={draft}
							maxLength={40}
							onChange={(e) => setDraft(e.target.value)}
						/>
						<Button type="submit" disabled={!draft.trim()}>
							Enter the pit 🤘
						</Button>
					</form>
				</DialogContent>
			</Dialog>
		</NicknameContext.Provider>
	);
}
