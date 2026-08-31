"use client";

import Link from "next/link";
import { useState } from "react";

export default function InsightsMenu({ active = false }: { active?: boolean }) {
  const [open, setOpen] = useState(false);

  return (
    <div className={`insightsMenu${active ? " active" : ""}${open ? " open" : ""}`} onMouseLeave={() => setOpen(false)}>
      <Link className="insightsMenuLink" href="/insights">Insights</Link>
      <button
        className="insightsMenuToggle"
        type="button"
        aria-label="Show insight pages"
        aria-expanded={open}
        onClick={() => setOpen((current) => !current)}
      >
        <span aria-hidden="true">⌄</span>
      </button>
      <div className="insightsDropdown">
        <Link href="/insights/testimonials">Testimonials</Link>
        <Link href="/insights/blogs">Blogs</Link>
      </div>
    </div>
  );
}
