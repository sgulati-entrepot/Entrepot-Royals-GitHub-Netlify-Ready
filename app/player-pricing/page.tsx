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
        <Image className="pricingHeroPhoto" src="/pricing-hero-stadium.jpg" alt="Elegant cricket auction desk overlooking a floodlit stadium" fill sizes="100vw" priority />
        <div className="pricingHeroShade" />
        <div className="pricingHeroCopy">
          <p className="eyebrow"><span /> ROYAL AUCTION DESK</p>
          <h1>PLAYER<br /><em>PRICING</em></h1>
          <p>Eight players. Twenty million points. Build the squad with clarity, control and complete budget visibility.</p>
        </div>
        <div className="pricingHeroSeal">
          <Image src="/entrepot-royals-logo.png" alt="Entrepot Royals official crest" width={96} height={96} priority />
          <div><small>ROYAL ALLOCATION</small><span>20,000,000</span><b>TOTAL POINTS · 08 PLAYERS</b></div>
        </div>
      </header>
      <PricingDashboard />
      <Footer />
    </main>
  );
}
