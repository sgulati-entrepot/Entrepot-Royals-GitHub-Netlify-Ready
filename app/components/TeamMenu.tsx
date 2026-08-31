"use client";

import Link from "next/link";
import { useState } from "react";

export default function TeamMenu({ active = false }: { active?: boolean }) {
  const [open, setOpen] = useState(false);

  return (
    <div className={`teamMenu${active ? " active" : ""}${open ? " open" : ""}`} onMouseLeave={() => setOpen(false)}>
      <Link className="teamMenuLink" href="/team">Team members</Link>
      <button
        className="teamMenuToggle"
        type="button"
        aria-label="Show team seasons"
        aria-expanded={open}
        onClick={() => setOpen((current) => !current)}
      >
        <span aria-hidden="true">⌄</span>
      </button>
      <div className="teamDropdown">
        <Link href="/team/2026">Team of 2026</Link>
        <Link href="/team/2025">Team of 2025</Link>
      </div>
    </div>
  );
}
