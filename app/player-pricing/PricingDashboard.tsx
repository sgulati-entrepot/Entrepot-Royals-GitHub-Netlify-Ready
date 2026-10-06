"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";

const TOTAL_ALLOCATION = 20_000_000;
const PLAYER_COUNT = 8;

type PlayerPrice = {
  id: number;
  name: string;
  price: number;
};

type PricingResponse = {
  allocation: number;
  players: PlayerPrice[];
  updatedAt: string | null;
  revision: number;
  version: string | null;
  error?: string;
};

const initialPlayers: PlayerPrice[] = Array.from({ length: PLAYER_COUNT }, (_, index) => ({
  id: index + 1,
  name: index === 0 ? "Sajeev Gulati" : index === 1 ? "Divyesh Kharade" : "",
  price: 0,
}));

const formatPoints = (value: number) => new Intl.NumberFormat("en-IN").format(value);

export default function PricingDashboard() {
  const [players, setPlayers] = useState<PlayerPrice[]>(initialPlayers);
  const [savedPlayers, setSavedPlayers] = useState<PlayerPrice[]>(initialPlayers);
  const [version, setVersion] = useState<string | null>(null);
  const [updatedAt, setUpdatedAt] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ tone: "success" | "error"; text: string } | null>(null);

  const totalSpent = useMemo(() => players.reduce((sum, player) => sum + player.price, 0), [players]);
  const remaining = TOTAL_ALLOCATION - totalSpent;
  const isOverBudget = remaining < 0;
  const hasChanges = JSON.stringify(players) !== JSON.stringify(savedPlayers);

  useEffect(() => {
    let cancelled = false;

    const loadInitialPricing = async () => {
      try {
        const response = await fetch("/api/player-pricing", { cache: "no-store", credentials: "same-origin" });
        const data = (await response.json()) as PricingResponse;
        if (!response.ok) throw new Error(data.error || "Could not load player pricing.");
        if (cancelled) return;
        setPlayers(data.players);
        setSavedPlayers(data.players);
        setVersion(data.version);
        setUpdatedAt(data.updatedAt);
      } catch (error) {
        if (!cancelled) setMessage({ tone: "error", text: error instanceof Error ? error.message : "Could not load player pricing." });
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    void loadInitialPricing();
    return () => {
      cancelled = true;
    };
  }, []);

  const updatePlayer = (id: number, changes: Partial<PlayerPrice>) => {
    setPlayers((current) => current.map((player) => (player.id === id ? { ...player, ...changes } : player)));
    setMessage(null);
  };

  const savePricing = async () => {
    if (isOverBudget || saving) return;
    setSaving(true);
    setMessage(null);
    try {
      const response = await fetch("/api/player-pricing", {
        method: "PUT",
        headers: {
          "content-type": "application/json",
        },
        credentials: "same-origin",
        body: JSON.stringify({ players, version }),
      });
      const data = (await response.json()) as PricingResponse;
      if (!response.ok) throw new Error(data.error || "Could not save player pricing.");
      setPlayers(data.players);
      setSavedPlayers(data.players);
      setVersion(data.version);
      setUpdatedAt(data.updatedAt);
      setMessage({ tone: "success", text: "Player pricing saved successfully." });
    } catch (error) {
      setMessage({ tone: "error", text: error instanceof Error ? error.message : "Could not save player pricing." });
    } finally {
      setSaving(false);
    }
  };

  const resetChanges = () => {
    setPlayers(savedPlayers);
    setMessage(null);
  };

  return (
    <section className="pricingWorkspace" aria-labelledby="pricing-heading">
      <div className="pricingHeading">
        <div>
          <p className="sectionLabel">LIVE AUCTION CONTROL</p>
          <h2 id="pricing-heading">BUILD THE<br /><em>ROYAL EIGHT.</em></h2>
        </div>
        <p>Enter each player and purchase points. Every saved amount is deducted from the fixed allocation automatically.</p>
      </div>

      <figure className="pricingEditorialPhoto">
        <Image src="/pricing-eight-player-table.jpg" alt="Eight navy player cards arranged on an elegant cricket selection table" fill sizes="(max-width: 900px) 100vw, 88vw" />
        <figcaption><small>THE ROYAL EIGHT</small><strong>Every selection shapes the season.</strong><span>One allocation. Eight decisive calls.</span></figcaption>
      </figure>

      <div className="pricingSummary" aria-live="polite">
        <article><small>TOTAL ALLOTTED</small><strong>{formatPoints(TOTAL_ALLOCATION)}</strong><span>POINTS</span></article>
        <article><small>TOTAL SPENT</small><strong>{formatPoints(totalSpent)}</strong><span>POINTS</span></article>
        <article className={isOverBudget ? "budgetDanger" : "budgetRemaining"}><small>{isOverBudget ? "OVER BUDGET" : "BALANCE LEFT"}</small><strong>{formatPoints(Math.abs(remaining))}</strong><span>POINTS</span></article>
      </div>

      {loading ? (
        <div className="pricingLoading" role="status">Loading saved player pricing…</div>
      ) : (
        <div className="pricingTableWrap">
          <div className="pricingTableHeader" aria-hidden="true"><span>NO.</span><span>PLAYER NAME</span><span>PURCHASE POINTS</span><span>STATUS</span></div>
          <div className="pricingRows">
            {players.map((player) => (
              <article className="pricingRow" key={player.id}>
                <span className="pricingNumber">{String(player.id).padStart(2, "0")}</span>
                <label>
                  <span>Player name</span>
                  <input
                    type="text"
                    maxLength={80}
                    value={player.name}
                    placeholder={`Player ${String(player.id).padStart(2, "0")}`}
                    onChange={(event) => updatePlayer(player.id, { name: event.target.value })}
                  />
                </label>
                <label>
                  <span>Purchase points</span>
                  <input
                    type="text"
                    inputMode="numeric"
                    value={player.price ? formatPoints(player.price) : ""}
                    placeholder="0"
                    onChange={(event) => {
                      const digits = event.target.value.replace(/\D/g, "").slice(0, 8);
                      updatePlayer(player.id, { price: digits ? Number(digits) : 0 });
                    }}
                    aria-invalid={player.price > TOTAL_ALLOCATION}
                  />
                </label>
                <span className={player.price > 0 ? "priceEntered" : "pricePending"}>{player.price > 0 ? "POINTS ENTERED" : "AWAITING POINTS"}</span>
              </article>
            ))}
          </div>
        </div>
      )}

      <div className="pricingActions">
        <div className="pricingActionButtons">
          <button type="button" className="pricingSecondaryButton" onClick={resetChanges} disabled={!hasChanges || saving}>Discard changes</button>
          <button type="button" className="pricingSaveButton" onClick={savePricing} disabled={!hasChanges || isOverBudget || saving || loading}>{saving ? "Saving…" : "Save all points"}<span aria-hidden="true">→</span></button>
        </div>
      </div>

      {isOverBudget && <p className="pricingMessage error" role="alert">Reduce the player purchase points by {formatPoints(Math.abs(remaining))} before saving.</p>}
      {message && <p className={`pricingMessage ${message.tone}`} role={message.tone === "error" ? "alert" : "status"}>{message.text}</p>}
      <p className="pricingSavedAt">{updatedAt ? `Last saved ${new Date(updatedAt).toLocaleString("en-IN")}` : "No saved pricing yet"}</p>
    </section>
  );
}
