import confetti from "canvas-confetti";

// The "metal moment" (ADR 0003): a dark/crimson confetti burst on a full 5 horns.
export function metalConfetti() {
	const colors = ["#7a0010", "#b30015", "#e10020", "#1a1a1a", "#888888"];
	const defaults = { origin: { y: 0.6 }, colors };

	confetti({ ...defaults, particleCount: 80, spread: 70, startVelocity: 55 });
	confetti({ ...defaults, particleCount: 40, spread: 120, scalar: 0.8 });
	setTimeout(() => {
		confetti({
			...defaults,
			particleCount: 50,
			angle: 60,
			spread: 55,
			origin: { x: 0, y: 0.7 },
		});
		confetti({
			...defaults,
			particleCount: 50,
			angle: 120,
			spread: 55,
			origin: { x: 1, y: 0.7 },
		});
	}, 150);
}
