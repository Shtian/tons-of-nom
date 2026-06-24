import { StallDetail } from "@/components/stall-detail";
import type { Id } from "@/convex/_generated/dataModel";

export default async function StallPage({
	params,
}: {
	params: Promise<{ id: string }>;
}) {
	const { id } = await params;
	return <StallDetail stallId={id as Id<"stalls">} />;
}
