import type { Metadata } from "next";
import Image from "next/image";
import Footer from "../components/Footer";
import SiteHeader from "../components/SiteHeader";
import PricingDashboard from "./PricingDashboard";

export const metadata: Metadata = {
  title: "Player Pricing | Entrepot Royals",
  description: "Manage the Entrepot Royals player allocation and purchase pricing.",
};

export default function PlayerPricingPage() {
  return (
    <main className="pricingPage" id="main-content">
      <SiteHeader active="team" ctaHref="/team/2026" ctaLabel="Team of 2026" />
      <header className="pricingHero">
        <div>
          <p className="eyebrow"><span /> ROYAL AUCTION DESK</p>
          <h1>PLAYER<br /><em>PRICING</em></h1>
          <p>Eight players. Twenty million points. Build the squad with clarity, control and complete budget visibility.</p>
        </div>
        <div className="pricingHeroCrest">
          <Image src="/entrepot-royals-logo.png" alt="Entrepot Royals official crest" width={600} height={600} priority />
          <span>20,000,000</span><small>TOTAL POINTS</small>
        </div>
      </header>
      <PricingDashboard />
      <Footer />
    </main>
  );
}
