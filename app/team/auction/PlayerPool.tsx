"use client";

import { useState } from "react";
import { AuctionDocument, RegisteredPlayer, categories, playerAvailability } from "../../../lib/auction";

export default function PlayerPool({ doc, dashboard, disabled, onChange }: { doc: AuctionDocument; dashboard: boolean; disabled: boolean; onChange: (players: RegisteredPlayer[]) => void }) {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [status, setStatus] = useState("");
  const [preferred, setPreferred] = useState("");
  const [sort, setSort] = useState({ key: "name", direction: 1 });
  const players = playerAvailability(doc);
  const available = players.filter(p => p.status === "AVAILABLE");
  const filtered = players.filter(p => p.name.toLowerCase().includes(search.toLowerCase()) && (category === "all" || p.category === category) && (!status || p.status === status) && (!preferred || p.preferred === preferred));
  const rows = [...filtered].sort((a, b) => {
    const av = a[sort.key as keyof typeof a], bv = b[sort.key as keyof typeof b];
    return (typeof av === "number" && typeof bv === "number" ? av - bv : String(av).localeCompare(String(bv), undefined, { numeric: true })) * sort.direction;
  });
  const update = (name: string, field: "preferred" | "category", value: string) => onChange(doc.registry.map(p => p.name === name ? { ...p, [field]: value } : p));
  const headers = [["name", "Player name"], ["preferred", "Preferred?"], ["category", "Category"], ["status", "Auction status"], ["count", "Times selected"], ["teams", "Selected by team"]];
  const exportCsv = () => {
    const quote = (value: unknown) => `"${String(value ?? "").replace(/^[=+@\-\t\r]/, "'$&").replaceAll('"', '""')}"`;
    const body = [headers.map(h => h[1]), ...rows.map(p => headers.map(([key]) => p[key as keyof typeof p]))].map(r => r.map(quote).join(",")).join("\r\n");
    const url = URL.createObjectURL(new Blob(["\uFEFF", body], { type: "text/csv;charset=utf-8" }));
    const link = document.createElement("a"); link.href = url; link.download = "RECL5-player-list.csv"; link.click(); URL.revokeObjectURL(url);
  };
  return <section aria-label={dashboard ? "Player availability dashboard" : "Master player list"} className="playerPool">
    <h3>{dashboard ? "Remaining players, by category." : "The master player list."}</h3>
    <div className="auctionKpis playerKpis">{[
      ["Total players", players.length], ["Available", available.length], ["Sold / selected", players.length - available.length], ["Preferred available", available.filter(p => p.preferred === "Yes").length],
      ["Duplicate picks", players.filter(p => p.count > 1).length], ["Uncategorised available", available.filter(p => !p.category).length], ["Preferred selected", players.filter(p => p.preferred === "Yes" && p.status === "SOLD").length], ["Categorised available", available.filter(p => p.category).length],
    ].map(([label, value]) => <article key={label}><span>{label}</span><strong>{value}</strong></article>)}</div>
    <p className="playerHelp">Set preferences and categories in Player List, then use Save all entries below. A player becomes selected as soon as their name is entered in Auction Entry, even before a bid is entered. Repeated selections are flagged as duplicates.</p>
    <div className="auctionFilters"><label>Search registered players<input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search player name…" /></label><label>Player category<select value={category} onChange={e => setCategory(e.target.value)}><option value="all">All categories</option><option value="">Uncategorised</option>{categories.map(c => <option key={c}>{c}</option>)}</select></label><label>Preferred players<select value={preferred} onChange={e => setPreferred(e.target.value)}><option value="">All players</option><option>Yes</option><option>No</option></select></label>{!dashboard && <label>Player status<select value={status} onChange={e => setStatus(e.target.value)}><option value="">All statuses</option><option>AVAILABLE</option><option>SOLD</option><option>DUPLICATE</option></select></label>}<button className="auctionGhost" onClick={() => { setSearch(""); setCategory("all"); setPreferred(""); setStatus(""); }}>Clear player filters</button></div>
    {dashboard ? <div className="playerCategoryGrid">{[...categories, ""].filter(c => category === "all" || c === category).map(c => {
      const group = players.filter(p => p.status === "AVAILABLE" && p.category === c && p.name.toLowerCase().includes(search.toLowerCase()) && (!preferred || p.preferred === preferred));
      return <article key={c}><h4>{c || "Uncategorised"}</h4><p>{group.length} available · {group.filter(p => p.preferred === "Yes").length} preferred</p><ul>{group.map(p => <li key={p.name}>{p.name}{p.preferred === "Yes" && <span>Preferred</span>}</li>)}</ul>{!group.length && <p>No matching available players.</p>}</article>;
    })}</div> : <><div className="auctionTableMeta"><span>{rows.length} of {players.length} registered players · No duplicate master entries</span><button onClick={exportCsv} disabled={disabled}>Export player list (CSV)</button></div><div className="auctionTableScroll" tabIndex={0} aria-label="Registered player table, horizontally scrollable"><table className="auctionTable playerTable"><thead><tr>{headers.map(([key,label]) => <th key={key} scope="col" aria-sort={sort.key === key ? sort.direction === 1 ? "ascending" : "descending" : "none"}><button onClick={() => setSort({ key, direction: sort.key === key ? -sort.direction : 1 })}>{label}{sort.key === key ? sort.direction === 1 ? " ↑" : " ↓" : " ↕"}</button></th>)}</tr></thead><tbody>{rows.map(p => <tr key={p.name}><th scope="row">{p.name}</th><td><select aria-label={`${p.name} preferred`} value={p.preferred} disabled={disabled} onChange={e => update(p.name, "preferred", e.target.value)}><option value="">Not set</option><option>Yes</option><option>No</option></select></td><td><select aria-label={`${p.name} category`} value={p.category} disabled={disabled} onChange={e => update(p.name, "category", e.target.value)}><option value="">Uncategorised</option>{categories.map(c => <option key={c}>{c}</option>)}</select></td><td><span className={`auctionStatus ${p.status === "AVAILABLE" ? "ready" : p.status === "SOLD" ? "complete" : "danger"}`}>{p.status}</span></td><td>{p.count}</td><td>{p.teams || "—"}</td></tr>)}</tbody></table>{!rows.length && <p className="auctionLoad">No matching registered players.</p>}</div></>}
  </section>;
}
