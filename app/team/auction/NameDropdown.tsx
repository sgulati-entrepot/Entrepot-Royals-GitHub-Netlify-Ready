"use client";

import { useEffect, useId, useState } from "react";
import { playerKey } from "../../../lib/auction";

export default function NameDropdown({ label, value, options, disabled, onChange }: {
  label: string; value: string; options: string[]; disabled: boolean; onChange: (value: string) => void;
}) {
  const id = useId();
  const [query, setQuery] = useState(value);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(-1);
  const [searching, setSearching] = useState(false);
  useEffect(() => { if (!open) setQuery(value); }, [value, open]);
  const matches = options.filter(name => !searching || playerKey(name).includes(playerKey(query)));
  const commit = (text: string) => {
    const name = options.find(option => playerKey(option) === playerKey(text)) ?? text.trim();
    setQuery(name); setOpen(false); setActive(-1);
    if (name !== value) onChange(name);
  };
  return <div className="auctionNameDropdown">
    <input role="combobox" aria-label={label} aria-expanded={open} aria-controls={id} aria-autocomplete="list" aria-activedescendant={open && active >= 0 && matches[active] ? `${id}-${active}` : undefined}
      autoComplete="off" maxLength={80} placeholder="Type to search…" value={query} disabled={disabled}
      onFocus={e => { setOpen(true); setSearching(false); setActive(-1); e.target.select(); }}
      onChange={e => { setQuery(e.target.value); setSearching(true); setOpen(true); setActive(-1); }}
      onBlur={() => commit(query)}
      onKeyDown={e => {
        if (e.key === "Escape") { e.preventDefault(); setQuery(value); setOpen(false); setActive(-1); }
        if (e.key === "ArrowDown" || e.key === "ArrowUp") { e.preventDefault(); setOpen(true); setActive(index => e.key === "ArrowDown" ? Math.min(index + 1, matches.length - 1) : Math.max(index - 1, 0)); }
        if (e.key === "Enter") { e.preventDefault(); commit(matches[active] ?? (matches.length === 1 ? matches[0] : query)); }
      }} />
    {open && <ul id={id} role="listbox" aria-label={`${label} suggestions`} className="auctionNameOptions">{matches.map((name, index) => <li key={name} id={`${id}-${index}`} role="option" aria-selected={index === active} onMouseDown={e => e.preventDefault()} onClick={() => commit(name)}>{name}</li>)}{!matches.length && <li className="auctionNoMatch">No matching names</li>}</ul>}
  </div>;
}
