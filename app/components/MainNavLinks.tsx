import Link from "next/link";
import InsightsMenu from "./InsightsMenu";
import TeamMenu from "./TeamMenu";

type ActivePage = "home" | "story" | "owners" | "team" | "fixtures" | "gallery" | "supporters" | "insights" | "contact";

export default function MainNavLinks({ active }: { active?: ActivePage }) {
  return (
    <div className="navLinks">
      <Link className={active === "home" ? "active" : ""} href="/">Home</Link>
      <Link className={active === "story" ? "active" : ""} href="/our-story">Our Story</Link>
      <Link className={active === "owners" ? "active" : ""} href="/owners">Owners</Link>
      <TeamMenu active={active === "team"} />
      <Link className={active === "fixtures" ? "active" : ""} href="/fixtures">Fixtures</Link>
      <Link className={active === "gallery" ? "active" : ""} href="/gallery">Royal Moments</Link>
      <Link className={active === "supporters" ? "active" : ""} href="/supporters">Royal Supporters</Link>
      <InsightsMenu active={active === "insights"} />
    </div>
  );
}
