import Link from "next/link";
import Footer from "./Footer";
import HeaderSocials from "./HeaderSocials";
import LandingHeroMedia from "./LandingHeroMedia";
import MainNavLinks from "./MainNavLinks";

export type TeamPlayer = {
  number: string;
  name: string;
  role: string;
  description: string;
  photo?: string;
  photoClass?: string;
};

const Logo = ({ className = "" }: { className?: string }) => (
  <img className={className} src="/entrepot-royals-logo.png" alt="Entrepot Royals official crest" />
);

export default function TeamSeasonPage({
  season,
  players,
  introduction,
}: {
  season: "2025" | "2026";
  players: TeamPlayer[];
  introduction: string;
}) {
  return (
    <main className="profilePage teamPage">
      <nav className="nav innerNav" aria-label="Main navigation">
        <Link className="brand" href="/" aria-label="Entrepot Royals home"><Logo className="brandLogo" /><span><b>ENTREPOT</b><strong>ROYALS</strong></span></Link>
        <MainNavLinks active="team" />
        <HeaderSocials /><Link className="navCta" href="/owners">Our leadership ↗</Link>
      </nav>

      <header className="pageHero teamHero">
        <div>
          <p className="eyebrow"><span /> THE {season} ROYAL SQUAD</p>
          <h1>TEAM OF<br /><em>{season}</em></h1>
          <p>{introduction}</p>
        </div>
        <LandingHeroMedia
          photo={season === "2025" ? "/royal-moment-team-2025-enhanced.png" : "/cricket-hero-royal-kit.png"}
          alt={season === "2025" ? "Entrepot Royals team of 2025" : "Cricketer in Entrepot Royals colours"}
          caption={`ENTREPOT ROYALS · TEAM OF ${season}`}
          className={season === "2025" ? "team2025HeroMedia" : "team2026HeroMedia"}
        />
      </header>

      <section className="rosterSection">
        <div className="rosterHead">
          <div><p className="sectionLabel">{season} SQUAD</p><h2>THE PLAYING <em>ROYALS</em></h2></div>
          <p>{season === "2025" ? "The players who carried the Entrepot Royals crest through our first campaign." : "The Royals preparing to compete, connect and rise together in the 2026 season."}</p>
        </div>
        <div className="rosterGrid">
          {players.map((player) => (
            <article className={`playerCard${season === "2025" ? " legacyPlayerCard" : ""}`} key={player.number}>
              <div className={`playerVisual${season === "2025" ? " legacyPlayerVisual" : ""}`}>
                <span>{player.number}</span>
                {player.photo ? <img className={`playerPhoto ${player.photoClass ?? ""}`} src={player.photo} alt={`${player.name}, Entrepot Royals ${season} squad member`} /> : <Logo className="playerCrest" />}
                {season === "2025" && <b className="seasonStamp">2025</b>}
              </div>
              <div className="playerInfo">
                <small>{player.role}</small>
                <h3>{player.name}</h3>
                <p>{player.description}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="seasonSwitch" aria-label="Browse another Entrepot Royals season">
        <span>EXPLORE ANOTHER SEASON</span>
        <Link className={season === "2025" ? "active" : ""} href="/team/2025">Team of 2025</Link>
        <Link className={season === "2026" ? "active" : ""} href="/team/2026">Team of 2026</Link>
      </section>

      <section className="quoteBand goldBand"><p>The Royals are ready to roar.</p><Link href="/">Return home →</Link></section>
      <Footer />
    </main>
  );
}
