import Link from "next/link";
import InsightsMenu from "./InsightsMenu";
import TeamMenu from "./TeamMenu";

type ActivePage = "home" | "story" | "owners" | "team" | "fixtures" | "gallery" | "supporters" | "insights" | "contact";

export default function MainNavLinks({ active, onNavigate }: { active?: ActivePage; onNavigate?: () => void }) {
  return (
    <div className="navLinks">
      <Link className={active === "home" ? "active" : ""} href="/" onClick={onNavigate}>Home</Link>
      <Link className={active === "story" ? "active" : ""} href="/our-story" onClick={onNavigate}>Our Story</Link>
      <Link className={active === "owners" ? "active" : ""} href="/owners" onClick={onNavigate}>Owners</Link>
      <TeamMenu active={active === "team"} onNavigate={onNavigate} />
      <Link className={active === "fixtures" ? "active" : ""} href="/fixtures" onClick={onNavigate}>Fixtures</Link>
      <Link className={active === "gallery" ? "active" : ""} href="/gallery" onClick={onNavigate}>Royal Moments</Link>
      <Link className={active === "supporters" ? "active" : ""} href="/supporters" onClick={onNavigate}>Royal Supporters</Link>
      <InsightsMenu active={active === "insights"} onNavigate={onNavigate} />
    </div>
  );
}
