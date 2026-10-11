"use client";
import { useEffect, useRef } from "react";
import { AuctionSettings, AuctionTeam, format, teamMetrics } from "../../../lib/auction";
import NameDropdown from "./NameDropdown";

export default function SquadEditor({ team, settings, names, saving, dirty, error, onChange, onClose }: { team: AuctionTeam; settings: AuctionSettings; names: string[]; saving: boolean; dirty: boolean; error: string; onChange: (team: AuctionTeam) => void; onClose: () => void }) {
  const dialog = useRef<HTMLDialogElement>(null);
  useEffect(() => { dialog.current?.showModal(); }, []);
  const budget = teamMetrics(team, settings);
  return <dialog ref={dialog} className="royalSquadDialog" onCancel={onClose} aria-labelledby="squad-editor-title">
    <header><div><p className="sectionLabel">TEAM ROSTER · {settings.playersPerTeam} SLOTS</p><h2 id="squad-editor-title">{team.name}</h2></div><button className="auctionGhost" onClick={onClose}>Close roster</button></header>
    <div className="squadBudget"><span>Spent <b>₹{format(budget.spent)} L</b></span><span>Remaining <b>₹{format(budget.left)} L</b></span><span>Maximum next bid <b>₹{format(budget.maxBid)} L</b></span></div>
    <p className="squadHint">Search a player and enter their winning bid in lakh. Changes save automatically.</p>
    <div className="squadCards">{team.players.map(player => <article key={player.id}><div className="squadSlot">PLAYER {String(player.id).padStart(2,"0")}<span>{player.name ? "Selected" : "Open slot"}</span></div><label>Player name</label><NameDropdown label={`${team.name} player ${player.id}`} value={player.name} options={names} disabled={saving} onChange={name => onChange({ ...team, players: team.players.map(p => p.id === player.id ? { ...p, name } : p) })} /><label htmlFor={`squad-bid-${player.id}`}>Winning bid · ₹ lakh</label><input id={`squad-bid-${player.id}`} type="number" min={settings.baseBid} step="0.01" value={player.bid ?? ""} placeholder="Not entered" disabled={saving} onChange={e => onChange({ ...team, players: team.players.map(p => p.id === player.id ? { ...p, bid: e.target.value === "" ? null : Number(e.target.value) } : p) })} /></article>)}</div>
    <footer role="status">{error ? <span role="alert">{error} Close the roster to review save options.</span> : saving ? "Saving changes…" : dirty ? "Changes waiting to save…" : "All changes saved"}</footer>
  </dialog>;
}
