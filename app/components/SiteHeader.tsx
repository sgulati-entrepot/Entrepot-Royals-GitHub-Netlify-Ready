"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import HeaderSocials from "./HeaderSocials";
import MainNavLinks from "./MainNavLinks";

type ActivePage = "home" | "story" | "owners" | "team" | "fixtures" | "gallery" | "supporters" | "insights" | "contact";

export default function SiteHeader({
  active,
  ctaHref,
  ctaLabel,
  inner = true,
}: {
  active?: ActivePage;
  ctaHref: string;
  ctaLabel: string;
  inner?: boolean;
}) {
  const [open, setOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);
  const closeMenu = () => setOpen(false);

  useEffect(() => {
    const onPointerDown = (event: PointerEvent) => {
      if (open && navRef.current && !navRef.current.contains(event.target as Node)) closeMenu();
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeMenu();
    };
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    document.body.classList.toggle("menuOpen", open);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
      document.body.classList.remove("menuOpen");
    };
  }, [open]);

  return (
    <nav ref={navRef} className={`nav${inner ? " innerNav" : ""}${open ? " mobileMenuOpen" : ""}`} aria-label="Main navigation">
      <Link className="brand" href="/" aria-label="Entrepot Royals home" onClick={closeMenu}>
        <Image className="brandLogo" src="/entrepot-royals-logo.png" alt="" width={64} height={64} priority />
        <span><b>ENTREPOT</b><strong>ROYALS</strong></span>
      </Link>
      <button
        className="mobileMenuToggle"
        type="button"
        aria-label={open ? "Close navigation menu" : "Open navigation menu"}
        aria-expanded={open}
        aria-controls="site-navigation-panel"
        onClick={() => setOpen((current) => !current)}
      >
        <span /><span /><span />
      </button>
      <div className="navPanel" id="site-navigation-panel">
        <MainNavLinks active={active} onNavigate={closeMenu} />
        <HeaderSocials />
        <Link className="navCta" href={ctaHref} onClick={closeMenu}>{ctaLabel} <span aria-hidden="true">↗</span></Link>
      </div>
    </nav>
  );
}
