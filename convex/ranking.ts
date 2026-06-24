// Weighted (Bayesian) average for leaderboard ranking. See ADR 0009.
// Pull each stall's raw average toward the scale midpoint with a small prior,
// so a 5.0-from-1-rating can't outrank a strong average from many ratings.
export const PRIOR_MEAN = 3.0; // midpoint of the 1–5 horn scale
export const PRIOR_WEIGHT = 3; // ~3 phantom votes

export function weightedScore(sum: number, count: number): number {
	if (count === 0) return 0;
	const avg = sum / count;
	return (avg * count + PRIOR_MEAN * PRIOR_WEIGHT) / (count + PRIOR_WEIGHT);
}

// Horn score validity: 1.0–5.0 in 0.5 steps (ADR 0003).
export function isValidHorns(horns: number): boolean {
	return horns >= 1 && horns <= 5 && Number.isInteger(horns * 2);
}

export const MAX_DESCRIPTION = 500; // ADR 0002 / validation rules
