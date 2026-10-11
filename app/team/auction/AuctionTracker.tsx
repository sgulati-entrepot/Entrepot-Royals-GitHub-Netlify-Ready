"use client";

import Image from "next/image";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import SiteHeader from "../../components/SiteHeader";
import Footer from "../../components/Footer";
import { AuctionDocument, AuctionSettings, AuctionTeam, createAuction, emptyPlayer, format, leagueMetrics, statuses, teamMetrics, validateAuction } from "../../../lib/auction";
import "./auction.css";
import PlayerPool from "./PlayerPool";
import { auctionTeamNames } from "../../../lib/auction-teams";

type Snapshot = { document: AuctionDocument; version: string | null; updatedAt: string | null; error?: string };
type Column = { key: string; label: string; numeric?: boolean };
type Filter = { key: string; operator: string; value: string };
const metrics: Column[] = [
  { key: "spent", label: "Total spent · ₹ L", numeric: true },
  { key: "left", label: "Budget left · ₹ L", numeric: true },
  { key: "bought", label: "Players bought", numeric: true },
  { key: "open", label: "Open slots", numeric: true },
  { key: "maxBid", label: "Max next bid · ₹ L", numeric: true },
  { key: "status", label: "Team status" },
];
const statusClass = (status: string) => status === "READY" ? "ready" : status === "COMPLETE" ? "complete" : status === "CHECK ENTRIES" ? "check" : "danger";

function cellValue(team: AuctionTeam, settings: AuctionSettings, key: string): string | number | null {
  if (key === "name") return team.name;
  if (key.startsWith("player-")) {
    const [, index, field] = key.split("-");
    return team.players[Number(index)]?.[field as "name" | "bid"] ?? null;
  }
  const values = teamMetrics(team, settings);
  if (key === "used") return values.used * 100;
  return values[key as keyof typeof values];
}

export default function AuctionTracker({ onLock }: { onLock: () => void }) {
  const [doc, setDoc] = useState<AuctionDocument>(createAuction);
  const [saved, setSaved] = useState<Snapshot | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [notice, setNotice] = useState("");
  const [error, setError] = useState("");
  const [view, setView] = useState<"entry" | "dashboard" | "players" | "availability">("entry");
  const [sort, setSort] = useState({ key: "name", direction: 1 });
  const [dashboardSort, setDashboardSort] = useState({ key: "left", direction: -1 });
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [filter, setFilter] = useState<Filter>({ key: "left", operator: "gte", value: "" });
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [confirmReload, setConfirmReload] = useState(false);
  const [settingsDraft, setSettingsDraft] = useState(doc.settings);
  const editVersion = useRef(0);
  const dirty = saved !== null && JSON.stringify(doc) !== JSON.stringify(saved.document);
  const current = useRef({ dirty, saving });
  useEffect(() => { current.current = { dirty, saving }; }, [dirty, saving]);

  const load = useCallback(async (quiet = false) => {
    const revision = editVersion.current;
    try {
      const response = await fetch("/api/auction", { cache: "no-store", credentials: "same-origin" });
      const data: Snapshot = await response.json();
      if (!response.ok) throw new Error(data.error || "Could not load the auction.");
      if (editVersion.current !== revision || (quiet && (current.current.dirty || current.current.saving))) return;
      setDoc(data.document); setSaved(data); setSettingsDraft(data.document.settings);
      setError("");
      if (!quiet) setNotice("Saved auction loaded.");
    } catch (caught) { setError(caught instanceof Error ? caught.message : "Could not load the auction."); }
    finally { setLoading(false); }
  }, []);

  useEffect(() => { void load(); }, [load]);
  useEffect(() => {
    const timer = window.setInterval(() => { if (!current.current.dirty && !current.current.saving && document.visibilityState === "visible") void load(true); }, 15000);
    return () => window.clearInterval(timer);
  }, [load]);
  useEffect(() => {
    const warn = (event: BeforeUnloadEvent) => { if (dirty) { event.preventDefault(); event.returnValue = ""; } };
    window.addEventListener("beforeunload", warn);
    return () => window.removeEventListener("beforeunload", warn);
  }, [dirty]);

  const edit = (next: AuctionDocument) => { editVersion.current++; current.current.dirty = true; setDoc(next); setNotice(""); setError(""); };
  const editTeam = (id: number, update: (team: AuctionTeam) => AuctionTeam) => edit({ ...doc, teams: doc.teams.map(team => team.id === id ? update(team) : team) });
  const save = async () => {
    if (!saved || saving) return;
    let document;
    try { document = validateAuction(doc); } catch (caught) { setError(caught instanceof Error ? caught.message : "Check the entries."); return; }
    setSaving(true); current.current.saving = true; setError(""); setNotice("");
    try {
      const response = await fetch("/api/auction", { method: "PUT", credentials: "same-origin", headers: { "content-type": "application/json" }, body: JSON.stringify({ document, version: saved.version }) });
      const data: Snapshot = await response.json();
      if (!response.ok) throw new Error(data.error || "Save failed. Please retry.");
      setDoc(data.document); setSaved(data); setNotice("All auction entries saved.");
    } catch (caught) { setError(caught instanceof Error ? caught.message : "Save failed. Please retry."); }
    finally { setSaving(false); current.current.saving = false; }
  };

  const applySettings = () => {
    if (saving) return;
    const s = settingsDraft;
    if (![s.kitty, s.baseBid].every(n => Number.isFinite(n) && n > 0 && n <= 1_000_000) || !Number.isInteger(s.teamCount) || s.teamCount < 1 || s.teamCount > 64 || !Number.isInteger(s.playersPerTeam) || s.playersPerTeam < 1 || s.playersPerTeam > 32) { setError("Enter positive budgets, 1–64 teams and 1–32 players per team."); return; }
    if (doc.teams.slice(s.teamCount).some(team => team.players.some(p => p.name || p.bid !== null)) || doc.teams.some(team => team.players.slice(s.playersPerTeam).some(p => p.name || p.bid !== null))) { setError("These settings would remove player entries. Clear those entries deliberately before reducing team or player counts."); return; }
    const teams = Array.from({ length: s.teamCount }, (_, i) => ({ id: i + 1, name: doc.teams[i]?.name ?? `Team ${String(i + 1).padStart(2, "0")}`, players: Array.from({ length: s.playersPerTeam }, (_, j) => doc.teams[i]?.players[j] ?? emptyPlayer(j + 1)) }));
    edit({ ...doc, settings: { ...s }, teams }); setSettingsOpen(false);
  };

  const columns = useMemo<Column[]>(() => view === "entry" ? [
    { key: "name", label: "Team name" },
    ...Array.from({ length: doc.settings.playersPerTeam }, (_, i) => [{ key: `player-${i}-name`, label: `Player ${String(i + 1).padStart(2, "0")}` }, { key: `player-${i}-bid`, label: `Bid ${String(i + 1).padStart(2, "0")} · ₹ L`, numeric: true }]).flat(),
    ...metrics,
  ] : [{ key: "name", label: "Team" }, metrics[2], metrics[3], metrics[0], metrics[1], metrics[4], metrics[5], { key: "used", label: "Budget used", numeric: true }], [view, doc.settings.playersPerTeam]);
  const activeSort = view === "entry" ? sort : dashboardSort;
  const rows = useMemo(() => doc.teams.filter(team => {
    const m = teamMetrics(team, doc.settings);
    if (search && ![team.name, ...team.players.map(p => p.name)].some(name => name.toLowerCase().includes(search.toLowerCase()))) return false;
    if (statusFilter && m.status !== statusFilter) return false;
    if (filter.value !== "") {
      const value = cellValue(team, doc.settings, filter.key);
      if (filter.operator === "contains") return String(value ?? "").toLowerCase().includes(filter.value.toLowerCase());
      if (value === null) return false;
      if (filter.operator === "eq") return String(value).toLowerCase() === filter.value.toLowerCase();
      return filter.operator === "gte" ? Number(value) >= Number(filter.value) : Number(value) <= Number(filter.value);
    }
    return true;
  }).sort((a, b) => {
    const av = cellValue(a, doc.settings, activeSort.key), bv = cellValue(b, doc.settings, activeSort.key);
    if (av === null) return bv === null ? a.id - b.id : 1;
    if (bv === null) return -1;
    return (typeof av === "number" && typeof bv === "number" ? av - bv : String(av).localeCompare(String(bv), undefined, { numeric: true })) * activeSort.direction || a.id - b.id;
  }), [doc, search, statusFilter, filter, activeSort]);
  const totals = leagueMetrics(doc);
  const alerts = doc.teams.filter(team => !["READY", "COMPLETE"].includes(teamMetrics(team, doc.settings).status));

  const exportCsv = () => {
    const escape = (value: string | number | null) => {
      const text = value === null ? "" : String(value);
      const safe = typeof value === "string" && /^[=+@\-\t\r]/.test(text) ? `'${text}` : text;
      return `"${safe.replaceAll('"', '""')}"`;
    };
    const csv = [columns.map(c => c.label), ...rows.map(team => columns.map(c => cellValue(team, doc.settings, c.key)))].map(row => row.map(escape).join(",")).join("\r\n");
    const url = URL.createObjectURL(new Blob(["\uFEFF", csv], { type: "text/csv;charset=utf-8" }));
    const link = document.createElement("a"); link.href = url; link.download = `RECL5-${view}.csv`; link.click(); URL.revokeObjectURL(url);
  };

  return <main className="auctionPage" id="main-content">
    <datalist id="auction-registered-players">{doc.registry.map(p => <option key={p.name} value={p.name} />)}</datalist>
    <SiteHeader active="team" ctaHref="/team/2026" ctaLabel="Team of 2026" />
    <header className="auctionHero">
      <Image src="/pricing-hero-stadium.jpg" alt="Cricket stadium and auction desk" fill sizes="100vw" priority />
      <div className="auctionHeroCopy"><p className="eyebrow"><span /> RECL · SEASON 5</p><h1>THE AUCTION<br /><em>CONTROL ROOM.</em></h1><p>Every team. Every bid. Every point of the game.</p></div>
      <div className="auctionHeroBadge"><Image src="/entrepot-royals-logo.png" width={76} height={76} alt="Entrepot Royals" /><span>LIVE AUCTION TRACKER<br /><b>{doc.settings.teamCount} teams · {doc.settings.playersPerTeam} players each</b></span></div>
    </header>
    <section className="auctionWorkspace" aria-label="RECL5 auction tracker">
      <div className="auctionTitle"><div><p className="sectionLabel">RECL5 AUCTION TRACKER</p><h2>The league, <em>at a glance.</em></h2></div><button className="auctionGhost" onClick={onLock}>Lock page</button></div>
      <div className="auctionKpis">{[["League kitty · ₹ L", totals.kitty], ["Total spent · ₹ L", totals.spent], ["Kitty remaining · ₹ L", totals.left], ["Players sold", totals.bought], ["Players to buy", totals.open], ["Teams complete", `${totals.complete} / ${doc.settings.teamCount}`]].map(([label, value]) => <article key={label}><span>{label}</span><strong>{typeof value === "number" ? format(value) : value}</strong></article>)}</div>
      <div className="auctionSettingsSummary"><span>Team kitty <b>₹{format(doc.settings.kitty)} L</b></span><span>Base bid <b>₹{format(doc.settings.baseBid)} L</b></span><span>Total slots <b>{doc.settings.teamCount * doc.settings.playersPerTeam}</b></span><button onClick={() => { setSettingsDraft(doc.settings); setSettingsOpen(!settingsOpen); }} disabled={!saved || saving}>{settingsOpen ? "Close settings" : "Edit auction settings"}</button></div>
      {settingsOpen && <div className="auctionSettings">{([['kitty', 'Team kitty · ₹ lakh'], ['baseBid', 'Base bid · ₹ lakh'], ['playersPerTeam', 'Players per team'], ['teamCount', 'Number of teams']] as const).map(([key, label]) => <label key={key}>{label}<input type="number" min={key === "kitty" || key === "baseBid" ? 0.01 : 1} step={key === "kitty" || key === "baseBid" ? 0.01 : 1} value={settingsDraft[key]} onChange={e => setSettingsDraft({ ...settingsDraft, [key]: Number(e.target.value) })} /></label>)}<button className="auctionGold" onClick={applySettings}>Apply settings</button></div>}
      <div className="auctionViewBar"><div role="tablist" aria-label="Workbook sheets"><button role="tab" aria-selected={view === "entry"} onClick={() => { setView("entry"); setFilter({ key: "left", operator: "gte", value: "" }); }}>01 / Auction Entry</button><button role="tab" aria-selected={view === "dashboard"} onClick={() => { setView("dashboard"); setFilter({ key: "left", operator: "gte", value: "" }); }}>02 / Live Dashboard</button></div><span>{view === "entry" ? "Blue cells are editable · All bids in ₹ lakh" : "Live calculations · Click any column heading to sort"}</span></div>
      <div className="auctionViewBar playerViewBar"><div role="tablist" aria-label="Player workbook sheets"><button role="tab" aria-selected={view === "players"} onClick={() => setView("players")}>03 / Player List</button><button role="tab" aria-selected={view === "availability"} onClick={() => setView("availability")}>04 / Player Dashboard</button></div><span>One master list · availability follows team selections</span></div>
      {(view === "players" || view === "availability") && <PlayerPool doc={doc} dashboard={view === "availability"} disabled={!saved || saving} onChange={registry => edit({ ...doc, registry })} />}
      {(view === "entry" || view === "dashboard") && <>
      <div className="auctionFilters"><label>Search teams or players<input type="search" value={search} onChange={e => setSearch(e.target.value)} placeholder="Find a team or player…" /></label><label>Status<select value={statusFilter} onChange={e => setStatusFilter(e.target.value)}><option value="">All statuses</option>{statuses.map(status => <option key={status}>{status}</option>)}</select></label><label>Filter column<select value={filter.key} onChange={e => setFilter({ ...filter, key: e.target.value })}>{columns.map(c => <option key={c.key} value={c.key}>{c.label}</option>)}</select></label><label>Condition<select value={filter.operator} onChange={e => setFilter({ ...filter, operator: e.target.value })}><option value="gte">At least</option><option value="lte">At most</option><option value="eq">Equals</option><option value="contains">Contains</option></select></label><label>Filter value<input value={filter.value} onChange={e => setFilter({ ...filter, value: e.target.value })} placeholder="Any value" /></label><button className="auctionGhost" onClick={() => { setSearch(""); setStatusFilter(""); setFilter({ key: "left", operator: "gte", value: "" }); }}>Clear filters</button></div>
      <div className="auctionTableMeta"><span>{rows.length} of {doc.teams.length} teams · {view === "entry" ? "Scroll horizontally for all player slots and budgets" : "Ranked independently from Auction Entry"}</span><button onClick={exportCsv} disabled={!saved}>Export this view (CSV)</button></div>
      {loading ? <div className="auctionLoad" role="status">Loading the saved auction…</div> : !saved ? <div className="auctionLoad"><p role="alert">{error}</p><button className="auctionGold" onClick={() => void load()}>Retry loading</button></div> : <div className="auctionTableScroll" tabIndex={0} aria-label={`${view === "entry" ? "Auction entry" : "Live dashboard"} table, horizontally scrollable`}>
        <table className={view === "entry" ? "auctionTable entry" : "auctionTable dashboard"}><thead><tr>{columns.map(c => <th key={c.key} scope="col" aria-sort={activeSort.key === c.key ? activeSort.direction === 1 ? "ascending" : "descending" : "none"}><button onClick={() => { const next = { key: c.key, direction: activeSort.key === c.key ? activeSort.direction * -1 : c.numeric ? -1 : 1 }; if (view === "entry") setSort(next); else setDashboardSort(next); }}>{c.label}<span aria-hidden="true">{activeSort.key === c.key ? activeSort.direction === 1 ? " ↑" : " ↓" : " ↕"}</span></button></th>)}</tr></thead>
        <tbody>{rows.map(team => { const m = teamMetrics(team, doc.settings); return <tr key={team.id}>{columns.map(c => {
          const value = cellValue(team, doc.settings, c.key);
          if (view === "entry" && c.key === "name") return <th scope="row" key={c.key}><select className="auctionTeamSelect" aria-label={`Team ${team.id} name`} value={team.name} disabled={saving} onChange={e => editTeam(team.id, t => ({ ...t, name: e.target.value }))}>{!auctionTeamNames.includes(team.name) && <option value={team.name}>{team.name || "Select team"}</option>}{auctionTeamNames.map(name => <option key={name} value={name}>{name}</option>)}</select></th>;
          if (view === "entry" && c.key.startsWith("player-")) { const [, index, field] = c.key.split("-"); const p = team.players[Number(index)]; return <td key={c.key}><input list={field === "name" ? "auction-registered-players" : undefined} aria-label={`${team.name} ${c.label}`} type={field === "bid" ? "number" : "text"} inputMode={field === "bid" ? "decimal" : undefined} min={field === "bid" ? doc.settings.baseBid : undefined} step={field === "bid" ? "0.01" : undefined} maxLength={field === "name" ? 80 : undefined} value={value ?? ""} placeholder={field === "bid" ? "—" : "Player name"} disabled={saving} aria-invalid={field === "bid" && p.bid !== null && p.bid < doc.settings.baseBid} onChange={e => { const next = field === "bid" ? e.target.value === "" ? null : Number(e.target.value) : e.target.value; editTeam(team.id, t => ({ ...t, players: t.players.map(player => player.id === p.id ? { ...player, [field]: next } : player) })); }} /></td>; }
          if (c.key === "status") return <td key={c.key}><span className={`auctionStatus ${statusClass(m.status)}`}>{m.status}</span></td>;
          if (c.key === "used") return <td key={c.key}><div className="auctionUsage"><span style={{ width: `${Math.min(100, Math.max(0, m.used * 100))}%` }} /><b>{format(m.used * 100)}%</b></div></td>;
          if (c.key === "name") return <th scope="row" key={c.key}>{team.name || `Team ${team.id}`}</th>;
          return <td key={c.key} className={`${c.numeric ? "numeric" : ""} ${c.key === "left" && m.left < 0 || c.key === "maxBid" && m.open > 0 && m.maxBid < doc.settings.baseBid ? "auctionNegative" : ""}`}>{typeof value === "number" ? format(value) : value}</td>;
        })}</tr>; })}{rows.length === 0 && <tr><td colSpan={columns.length}>No teams match these filters.</td></tr>}</tbody>
        <tfoot><tr>{columns.map((c, i) => <td key={c.key}>{i === 0 ? "LEAGUE TOTALS" : ["spent", "left", "bought", "open"].includes(c.key) ? format(totals[c.key as "spent" | "left" | "bought" | "open"]) : c.key === "status" ? `${totals.complete} / ${doc.settings.teamCount} COMPLETE` : ""}</td>)}</tr></tfoot></table>
      </div>}
      </>}
      <div className="auctionSaveBar"><div><strong>{!saved ? "Waiting for saved auction" : dirty ? "Unsaved changes" : "All changes saved"}</strong><span>{saved?.updatedAt ? `Last saved ${new Date(saved.updatedAt).toLocaleString("en-IN")}` : "New auction · ready for your first entries"}</span></div><div><button className="auctionGhost" disabled={!saved || saving} onClick={() => { if (dirty) setConfirmReload(true); else void load(); }}>Load saved version</button><button className="auctionGold" onClick={() => void save()} disabled={!saved || saving || !dirty}>{saving ? "Saving…" : "Save all entries"}</button></div></div>
      {confirmReload && <div className="auctionMessage" role="alert"><p>Discard unsaved edits and load the latest saved auction?</p><button className="auctionGhost" disabled={saving} onClick={() => setConfirmReload(false)}>Keep editing</button> <button className="auctionGold" disabled={saving} onClick={() => { setConfirmReload(false); editVersion.current++; current.current.dirty = false; void load(); }}>Discard edits and reload</button></div>}
      {error && saved && <p className="auctionMessage error" role="alert">{error}</p>}{notice && <p className="auctionMessage" role="status">{notice}</p>}
      {alerts.length > 0 && <div className="auctionWarnings" role="status"><strong>{alerts.length} team{alerts.length === 1 ? "" : "s"} need attention</strong><p>{alerts.map(t => `${t.name || `Team ${t.id}`}: ${teamMetrics(t, doc.settings).status}`).join(" · ")}</p></div>}
      <div className="auctionNotes"><article><small>BIDDING RULE</small><h3>Reserve the rest of your squad.</h3><p>Maximum next bid = budget left − (open slots − 1) × ₹{format(doc.settings.baseBid)} lakh. A new team can bid up to ₹{format(Math.max(0, doc.settings.kitty - (doc.settings.playersPerTeam - 1) * doc.settings.baseBid))} lakh.</p></article><article><small>ENTRY & SAVE GUIDE</small><p>Enter names and winning bids in the blue cells. For ₹35.5 lakh, enter 35.5. Blank bids mean an unfilled slot. Save before leaving or switching tabs—the page locks when you leave. Saved changes from other sessions appear every 15 seconds while you have no unsaved edits.</p><p>Red: over budget, below base or insufficient kitty. Amber: a player name and bid do not match. Blue: complete roster. League totals always include every team, even when filters are active.</p></article></div>
    </section><Footer />
  </main>;
}
