import type { Metadata } from "next";
import PlayerPricingGate from "./PlayerPricingGate";

export const metadata: Metadata = {
  title: "Player Pricing | Entrepot Royals",
  description: "Manage the Entrepot Royals player allocation and purchase pricing.",
};

export default function PlayerPricingPage() {
  return <PlayerPricingGate />;
}
