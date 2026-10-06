"use client";

import Image from "next/image";
import { FormEvent, useEffect, useState } from "react";
import Footer from "../components/Footer";
import SiteHeader from "../components/SiteHeader";
import PricingDashboard from "./PricingDashboard";

type AuthResponse = {
  authorized?: boolean;
  error?: string;
};

export default function PlayerPricingGate() {
  const [authState, setAuthState] = useState<"checking" | "locked" | "authorized">("checking");
  const [pin, setPin] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;
    const beginLockedVisit = async () => {
      await fetch("/api/player-pricing-auth", {
        method: "DELETE",
        credentials: "same-origin",
        cache: "no-store",
      }).catch(() => undefined);
      if (!cancelled) setAuthState("locked");
    };
    void beginLockedVisit();
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    const lockPrivatePage = () => {
      setPin("");
      setError("");
      setAuthState("locked");
      void fetch("/api/player-pricing-auth", {
        method: "DELETE",
        credentials: "same-origin",
        keepalive: true,
      }).catch(() => undefined);
    };

    const lockHiddenPage = () => {
      if (document.visibilityState === "hidden") lockPrivatePage();
    };

    document.addEventListener("visibilitychange", lockHiddenPage);
    window.addEventListener("blur", lockPrivatePage);
    window.addEventListener("pagehide", lockPrivatePage);
    return () => {
      document.removeEventListener("visibilitychange", lockHiddenPage);
      window.removeEventListener("blur", lockPrivatePage);
      window.removeEventListener("pagehide", lockPrivatePage);
    };
  }, []);

  const unlock = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (submitting || pin.length !== 6) return;
    setSubmitting(true);
    setError("");

    try {
      const response = await fetch("/api/player-pricing-auth", {
        method: "POST",
        headers: { "content-type": "application/json" },
        credentials: "same-origin",
        body: JSON.stringify({ pin }),
      });
      const result = (await response.json()) as AuthResponse;
      if (!response.ok || !result.authorized) throw new Error(result.error || "Private access is unavailable.");
      setPin("");
      setAuthState("authorized");
    } catch (caughtError) {
      setPin("");
      setError(caughtError instanceof Error ? caughtError.message : "Private access is unavailable.");
    } finally {
      setSubmitting(false);
    }
  };

  const lockPage = async () => {
    await fetch("/api/player-pricing-auth", { method: "DELETE", credentials: "same-origin" }).catch(() => undefined);
    setPin("");
    setError("");
    setAuthState("locked");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (authState !== "authorized") {
    return (
      <main className="pricingLockPage" id="main-content">
        <Image className="pricingLockPhoto" src="/pricing-hero-stadium.jpg" alt="" fill sizes="100vw" priority />
        <div className="pricingLockShade" />
        <section className="pricingLockCard" aria-busy={authState === "checking"}>
          <Image src="/entrepot-royals-logo.png" alt="Entrepot Royals official crest" width={116} height={116} priority />
          <p className="eyebrow"><span /> PRIVATE ROYAL ACCESS</p>
          <h1>PLAYER<br /><em>PRICING</em></h1>
          {authState === "checking" ? (
            <p className="pricingLockStatus" role="status">Checking secure access…</p>
          ) : (
            <>
              <p className="pricingLockIntro">Enter the six-digit PIN to open the Royal Auction Desk.</p>
              <form className="pricingLockForm" onSubmit={unlock}>
                <label htmlFor="pricing-page-pin">SECURE PIN</label>
                <input
                  id="pricing-page-pin"
                  type="password"
                  inputMode="numeric"
                  pattern="[0-9]{6}"
                  maxLength={6}
                  autoComplete="current-password"
                  autoFocus
                  value={pin}
                  onChange={(event) => {
                    setPin(event.target.value.replace(/\D/g, "").slice(0, 6));
                    setError("");
                  }}
                  aria-describedby={error ? "pricing-pin-error" : undefined}
                  aria-invalid={Boolean(error)}
                />
                <button type="submit" disabled={pin.length !== 6 || submitting}>
                  {submitting ? "Unlocking…" : "Unlock the desk"}<span aria-hidden="true">→</span>
                </button>
              </form>
              {error && <p className="pricingLockError" id="pricing-pin-error" role="alert">{error}</p>}
            </>
          )}
          <small className="pricingLockNote">AUTHORISED TEAM ACCESS ONLY</small>
        </section>
      </main>
    );
  }

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
          <button className="pricingLockButton" type="button" onClick={lockPage}>Lock private page</button>
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
