"use client";
import { useState } from "react";
import { AuctionDocument, format, teamMetrics } from "../../../lib/auction";

const measures = [
  { key: "spent", label: "Total spent", unit: "₹ lakh" },
  { key: "left", label: "Budget remaining", unit: "₹ lakh" },
  { key: "maxBid", label: "Maximum next bid", unit: "₹ lakh" },
  { key: "bought", label: "Players bought", unit: "players" },
] as const;

export default function TeamComparison({ doc }: { doc: AuctionDocument }) {
  const [metric, setMetric] = useState<typeof measures[number]["key"]>("spent");
  const measure = measures.find(m => m.key === metric)!;
  const rows = doc.teams.map(team => ({ id: team.id, name: team.name || `Team ${team.id}`, value: teamMetrics(team, doc.settings)[metric] }))
    .sort((a,b) => b.value - a.value || a.id - b.id);
  const min = Math.min(0, ...rows.map(r => r.value));
  const max = Math.max(1, ...rows.map(r => r.value));
  const range = max - min;
  const zero = -min / range * 100;
  return <section className="teamComparison" aria-labelledby="team-comparison-title">
    <header><div><p className="sectionLabel">LEAGUE COMPARISON</p><h3 id="team-comparison-title">Every team, side by side.</h3><p>All {rows.length} teams · {measure.label} in {measure.unit} · Highest to lowest</p></div>
      <label>Compare by<select value={metric} onChange={e => setMetric(e.target.value as typeof metric)}>{measures.map(m => <option key={m.key} value={m.key}>{m.label}</option>)}</select></label>
    </header>
    <p className="comparisonNote">This chart always includes every team, regardless of table filters. Values update with auction entries.</p>
    <div className="comparisonAxis" aria-hidden="true"><span>{format(min)}</span><span>{format((min + max) / 2)}</span><span>{format(max)}</span></div>
    <ul className="comparisonBars" aria-label={`All teams compared by ${measure.label}, in ${measure.unit}`}>
      {rows.map(row => <li key={row.id}><span className="comparisonName">{row.name}</span><span className="comparisonTrack" aria-hidden="true"><i className="comparisonZero" style={{ left: `${zero}%` }} /><span className={`comparisonBar${row.value < 0 ? " negative" : ""}`} style={{ left: `${row.value < 0 ? (row.value - min) / range * 100 : zero}%`, width: `${Math.abs(row.value) / range * 100}%` }} /></span><strong>{format(row.value)}<span className="comparisonUnit"> {measure.unit}</span></strong></li>)}
    </ul>
  </section>;
}
