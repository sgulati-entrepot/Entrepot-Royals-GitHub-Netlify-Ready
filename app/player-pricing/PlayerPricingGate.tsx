"use client";

import Image from "next/image";
import { FormEvent, useEffect, useRef, useState } from "react";
import Footer from "../components/Footer";
import SiteHeader from "../components/SiteHeader";
import PricingDashboard from "./PricingDashboard";
import AuctionTracker from "../team/auction/AuctionTracker";

type AuthResponse = {
  authorized?: boolean;
  error?: string;
};
const AUCTION_AWAY_KEY = "royal-auction-away-until";
const AWAY_GRACE_MS = 60_000;

export default function PlayerPricingGate({ auction = false }: { auction?: boolean }) {
  const [authState, setAuthState] = useState<"checking" | "locked" | "authorized">("checking");
  const [pin, setPin] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const authorizedRef = useRef(false);

  useEffect(() => {
    if (auction) return;
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
  }, [auction]);

  useEffect(() => {
    if (auction) return;
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
  }, [auction]);

  useEffect(() => {
    if (!auction) return;
    let cancelled = false;
    let timer: ReturnType<typeof setTimeout> | undefined;
    const deadline = () => { try { return Number(sessionStorage.getItem(AUCTION_AWAY_KEY)) || 0; } catch { return 0; } };
    const clearDeadline = () => { try { sessionStorage.removeItem(AUCTION_AWAY_KEY); } catch { /* Fail closed on a fresh visit. */ } };
    const lock = () => {
      clearTimeout(timer); clearDeadline(); authorizedRef.current = false;
      setPin(""); setError(""); setAuthState("locked");
      void fetch("/api/player-pricing-auth", { method: "DELETE", credentials: "same-origin", keepalive: true }).catch(() => undefined);
    };
    const leave = () => {
      if (!authorizedRef.current) return;
      const until = deadline() || Date.now() + AWAY_GRACE_MS;
      try { sessionStorage.setItem(AUCTION_AWAY_KEY, String(until)); } catch { lock(); return; }
      clearTimeout(timer);
      timer = setTimeout(lock, Math.max(0, until - Date.now()));
    };
    const resume = () => {
      if (!authorizedRef.current) return;
      const until = deadline();
      if (until && Date.now() >= until) { lock(); return; }
      clearTimeout(timer); clearDeadline();
    };
    const visibility = () => document.visibilityState === "hidden" ? leave() : resume();
    const beginVisit = async () => {
      const until = deadline();
      if (!until || Date.now() >= until) { lock(); return; }
      try {
        const response = await fetch("/api/player-pricing-auth", { credentials: "same-origin", cache: "no-store" });
        const result: AuthResponse = await response.json();
        if (cancelled) return;
        if (!response.ok || !result.authorized || Date.now() >= until) { lock(); return; }
        authorizedRef.current = true; setAuthState("authorized");
        if (document.visibilityState === "hidden") leave(); else resume();
      } catch { if (!cancelled) lock(); }
    };
    void beginVisit();
    document.addEventListener("visibilitychange", visibility);
    window.addEventListener("blur", leave);
    window.addEventListener("pagehide", leave);
    window.addEventListener("focus", resume);
    window.addEventListener("pageshow", resume);
    return () => {
      cancelled = true;
      // Client-side route changes do not emit pagehide; retain their deadline too.
      leave(); clearTimeout(timer);
      document.removeEventListener("visibilitychange", visibility);
      window.removeEventListener("blur", leave);
      window.removeEventListener("pagehide", leave);
      window.removeEventListener("focus", resume);
      window.removeEventListener("pageshow", resume);
    };
  }, [auction]);

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
      authorizedRef.current = true;
      if (auction) { try { sessionStorage.removeItem(AUCTION_AWAY_KEY); } catch { /* No persisted grace period. */ } }
      setAuthState("authorized");
    } catch (caughtError) {
      setPin("");
      setError(caughtError instanceof Error ? caughtError.message : "Private access is unavailable.");
    } finally {
      setSubmitting(false);
    }
  };

  const lockPage = async () => {
    authorizedRef.current = false;
    if (auction) { try { sessionStorage.removeItem(AUCTION_AWAY_KEY); } catch { /* Already locked. */ } }
    setAuthState("locked");
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
          <h1>{auction ? "RECL5" : "PLAYER"}<br /><em>{auction ? "AUCTION" : "PRICING"}</em></h1>
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

  if (auction) return <AuctionTracker onLock={lockPage} />;

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
