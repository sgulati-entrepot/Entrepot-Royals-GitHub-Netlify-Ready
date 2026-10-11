import type { Metadata } from "next";
import PlayerPricingGate from "../../player-pricing/PlayerPricingGate";
export const metadata: Metadata = { title: "RECL5 Auction | Entrepot Royals", description: "Live RECL5 auction entries, team budgets and roster dashboard.", robots: { index: false, follow: false } };
export default function AuctionPage() { return <PlayerPricingGate auction />; }
