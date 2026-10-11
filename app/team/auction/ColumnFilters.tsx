"use client";
import { useState } from "react";

export type SelectionFilters = Record<string, string[]>;
export type FilterField = { key: string; label: string; values: string[] };
const normal = (value: string) => value.trim().replace(/\s+/g, " ").toLowerCase();
export function matchesSelections(filters: SelectionFilters, getValues: (key: string) => string[]): boolean {
  return Object.entries(filters).every(([key, selected]) => !selected.length || getValues(key).some(value => selected.some(choice => normal(choice) === normal(value))));
}
export default function ColumnFilters({ fields, value, onChange }: { fields: FilterField[]; value: SelectionFilters; onChange: (filters: SelectionFilters) => void }) {
  const [fieldKey, setFieldKey] = useState(fields[0]?.key ?? "");
  const [search, setSearch] = useState("");
  const field = fields.find(f => f.key === fieldKey) ?? fields[0];
  if (!field) return null;
  const choices = [...new Map(field.values.map(v => [normal(v), v])).values()].sort((a,b) => a.localeCompare(b, undefined, { numeric: true })).filter(v => normal(v).includes(normal(search)));
  const selected = value[field.key] ?? [];
  const active = Object.entries(value).filter(([, items]) => items.length);
  return <section className="columnFilters" aria-label="Multi-select filters">
    <div className="columnFilterControls"><label>Filter field<select value={field.key} onChange={e => { setFieldKey(e.target.value); setSearch(""); }}>{fields.map(f => <option key={f.key} value={f.key}>{f.label}</option>)}</select></label>
    <details key={field.key} className="columnFilterPicker"><summary>{selected.length ? `${selected.length} selected` : "Choose one or more values"} ▾</summary><div className="columnFilterMenu"><label>Find a value<input type="search" value={search} onChange={e => setSearch(e.target.value)} placeholder="Search values…" /></label><button type="button" onClick={() => onChange({ ...value, [field.key]: [] })}>Show all values</button><div className="columnFilterOptions">{choices.map(choice => <label key={choice}><input type="checkbox" checked={selected.some(v => normal(v) === normal(choice))} onChange={e => onChange({ ...value, [field.key]: e.target.checked ? [...selected, choice] : selected.filter(v => normal(v) !== normal(choice)) })} />{choice || "(Blank)"}</label>)}{!choices.length && <p>No matching values.</p>}</div></div></details>
    <button className="auctionGhost" type="button" onClick={() => { onChange({}); setSearch(""); }}>Clear selections</button><span>Match any selected value within a field; match all filtered fields.</span></div>
    {active.length > 0 && <div className="columnFilterChips">{active.map(([key, items]) => <button key={key} type="button" onClick={() => onChange({ ...value, [key]: [] })} aria-label={`Remove ${fields.find(f => f.key === key)?.label ?? key} filter`}>{fields.find(f => f.key === key)?.label ?? key}: {items.map(v => v || "(Blank)").join(", ")} <b>×</b></button>)}</div>}
  </section>;
}
