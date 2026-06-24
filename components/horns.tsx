"use client";

import { cn } from "@/lib/utils";

// The horn glyph 🤘. Empty = desaturated + faint; filled = crimson, clipped for halves.
function Horn({ fill, sizeClass }: { fill: number; sizeClass: string }) {
	const pct = Math.max(0, Math.min(1, fill)) * 100;
	return (
		<span className={cn("relative inline-block select-none", sizeClass)}>
			<span className="opacity-25 grayscale" aria-hidden>
				🤘
			</span>
			<span
				className="absolute inset-0 overflow-hidden"
				style={{ width: `${pct}%` }}
				aria-hidden
			>
				<span
					className="block"
					style={{
						filter:
							"drop-shadow(0 0 2px color-mix(in oklch, var(--horn) 70%, transparent))",
					}}
				>
					🤘
				</span>
			</span>
		</span>
	);
}

// Read-only horn score (ADR 0003): renders 1–5 with half-horn precision.
export function HornDisplay({
	value,
	size = "md",
	className,
}: {
	value: number;
	size?: "sm" | "md" | "lg";
	className?: string;
}) {
	const sizeClass =
		size === "lg" ? "text-3xl" : size === "sm" ? "text-base" : "text-xl";
	return (
		<span className={cn("inline-flex items-center gap-0.5", className)}>
			{[0, 1, 2, 3, 4].map((i) => (
				<Horn key={i} fill={value - i} sizeClass={sizeClass} />
			))}
		</span>
	);
}

// Interactive half-horn picker (ADR 0003 + 0011: touch-friendly, big targets).
// Tap the left half of a horn for x.5, the right half for x.0.
export function HornInput({
	value,
	onChange,
}: {
	value: number;
	onChange: (v: number) => void;
}) {
	return (
		<div className="flex items-center justify-center gap-1">
			{[0, 1, 2, 3, 4].map((i) => {
				const half = i + 0.5;
				const full = i + 1;
				return (
					<div key={i} className="relative">
						<Horn fill={value - i} sizeClass="text-4xl" />
						{/* Two oversized tap zones per horn for thumbs */}
						<button
							type="button"
							aria-label={`${half} horns`}
							className="absolute inset-y-0 left-0 w-1/2"
							onClick={() => onChange(half)}
						/>
						<button
							type="button"
							aria-label={`${full} horns`}
							className="absolute inset-y-0 right-0 w-1/2"
							onClick={() => onChange(full)}
						/>
					</div>
				);
			})}
		</div>
	);
}
