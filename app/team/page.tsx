import Link from "next/link";
import Footer from "../components/Footer";
import HeaderSocials from "../components/HeaderSocials";
import TeamMenu from "../components/TeamMenu";

const Logo = ({ className = "" }: { className?: string }) => (
  <img className={className} src="/entrepot-royals-logo.png" alt="Entrepot Royals official crest" />
);

export default function TeamPage() {
  return (
    <main className="profilePage teamPage">
      <nav className="nav innerNav" aria-label="Main navigation">
        <Link className="brand" href="/" aria-label="Entrepot Royals home"><Logo className="brandLogo" /><span><b>ENTREPOT</b><strong>ROYALS</strong></span></Link>
        <div className="navLinks"><Link href="/">Home</Link><Link href="/owners">Owners</Link><TeamMenu active /><Link href="/fixtures">Fixtures</Link><Link href="/gallery">Royal Moments</Link><Link href="/supporters">Supporters</Link></div>
        <HeaderSocials /><Link className="navCta" href="/owners">Our leadership ↗</Link>
      </nav>

      <header className="pageHero teamHero teamIndexHero">
        <div>
          <p className="eyebrow"><span /> THE ROYAL SQUADS</p>
          <h1>CHOOSE YOUR<br /><em>ROYAL ERA</em></h1>
          <p>Explore the players who wore the Entrepot Royals crest in each season.</p>
        </div>
        <div className="teamHeroPortrait">
          <Logo className="teamHeroCrest" />
          <span>ENTREPOT ROYALS · OFFICIAL TEAM ARCHIVE</span>
        </div>
      </header>

      <section className="teamSeasonGrid" aria-label="Entrepot Royals teams by season">
        <Link href="/team/2025">
          <small>OUR FIRST CHAPTER</small>
          <strong>TEAM OF <em>2025</em></strong>
          <span>Meet the 2025 Royals ↗</span>
        </Link>
        <Link href="/team/2026">
          <small>THE CURRENT SQUAD</small>
          <strong>TEAM OF <em>2026</em></strong>
          <span>Meet the 2026 Royals ↗</span>
        </Link>
      </section>

      <Footer />
    </main>
  );
}
