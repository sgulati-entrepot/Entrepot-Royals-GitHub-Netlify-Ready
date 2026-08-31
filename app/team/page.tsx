import Link from "next/link";
import Footer from "../components/Footer";
import HeaderSocials from "../components/HeaderSocials";
import LandingHeroMedia from "../components/LandingHeroMedia";
import MainNavLinks from "../components/MainNavLinks";

const Logo = ({ className = "" }: { className?: string }) => (
  <img className={className} src="/entrepot-royals-logo.png" alt="Entrepot Royals official crest" />
);

export default function TeamPage() {
  return (
    <main className="profilePage teamPage">
      <nav className="nav innerNav" aria-label="Main navigation">
        <Link className="brand" href="/" aria-label="Entrepot Royals home"><Logo className="brandLogo" /><span><b>ENTREPOT</b><strong>ROYALS</strong></span></Link>
        <MainNavLinks active="team" />
        <HeaderSocials /><Link className="navCta" href="/owners">Our leadership ↗</Link>
      </nav>

      <header className="teamProgramsHero">
        <div>
          <p className="eyebrow"><span /> TEAM MEMBERS</p>
          <h1>TEAMS BUILT FOR<br /><em>ROYAL PROGRESS.</em></h1>
          <p>Two seasons. One crest. Explore the players, personalities and shared purpose behind every Entrepot Royals chapter.</p>
        </div>
        <LandingHeroMedia photo="/team-members-hero-elegant.jpg" alt="A united cricket squad walking toward a floodlit ground in elegant navy and gold colours" caption="ONE CREST · EVERY SEASON" className="teamIndexHeroMedia" />
      </header>

      <section className="teamProgramsCatalog" aria-label="Entrepot Royals teams by season">
        <div className="teamProgramsIntro">
          <div>
            <span>02 / ROYAL SQUADS</span>
            <h2>Choose your next<br /><em>Royal chapter.</em></h2>
          </div>
          <p>Each season carries its own moments, challenges and names—united by the same Royal standard.</p>
        </div>
        <div className="teamProgramGrid">
          <Link className="teamProgramCard" href="/team/2025">
            <figure>
              <img src="/royal-moment-team-2025-enhanced.png" alt="Entrepot Royals team of 2025" />
              <span>01</span><i aria-hidden="true">↗</i>
            </figure>
            <div>
              <small>2025 SEASON · THE FIRST CHAPTER</small>
              <h2>Team of 2025</h2>
              <p>Meet the squad that carried the crest through our opening campaign and began the Entrepot Royals legacy.</p>
              <strong>View team <span>→</span></strong>
            </div>
          </Link>
          <Link className="teamProgramCard" href="/team/2026">
            <figure className="teamProgramCrest">
              <Logo />
              <span>02</span><i aria-hidden="true">↗</i>
            </figure>
            <div>
              <small>2026 SEASON · THE NEXT CHAPTER</small>
              <h2>Team of 2026</h2>
              <p>Discover the current Royals preparing to compete with belief, discipline and one shared purpose.</p>
              <strong>View team <span>→</span></strong>
            </div>
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  );
}
