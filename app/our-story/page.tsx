import Link from "next/link";
import Footer from "../components/Footer";
import HeaderSocials from "../components/HeaderSocials";
import LandingHeroMedia from "../components/LandingHeroMedia";
import MainNavLinks from "../components/MainNavLinks";

const Logo = ({ className = "" }: { className?: string }) => (
  <img className={className} src="/entrepot-royals-logo.png" alt="Entrepot Royals official crest" />
);

const chapters = [
  { number: "01", label: "THE BEGINNING", title: "A crest with purpose", copy: "Entrepot Royals began in 2025 with a simple ambition: build a cricket team where competition, character and connection carry equal weight." },
  { number: "02", label: "THE FIRST CAMPAIGN", title: "Learning through the contest", copy: "Our debut RECL season tested our composure, strengthened our relationships and gave the Royal identity its first defining moments." },
  { number: "03", label: "THE NEXT CHAPTER", title: "Rising with experience", copy: "The Royals return with sharper preparation, deeper belief and the same promise—to honour the game, the team and every person behind the boundary." },
];

export default function OurStoryPage() {
  return (
    <main className="profilePage storyPage">
      <nav className="nav innerNav" aria-label="Main navigation">
        <Link className="brand" href="/" aria-label="Entrepot Royals home"><Logo className="brandLogo" /><span><b>ENTREPOT</b><strong>ROYALS</strong></span></Link>
        <MainNavLinks active="story" />
        <HeaderSocials /><Link className="navCta" href="/team">Meet the Royals ↗</Link>
      </nav>
      <header className="editorialHero storyHero">
        <div className="editorialHeroCopy"><p className="eyebrow"><span /> THE JOURNEY BEHIND THE CREST</p><h1>OUR<br /><em>STORY</em></h1><p>From a first season built on belief to a future shaped by purpose—this is how the Entrepot Royals continue to rise.</p></div>
        <LandingHeroMedia photo="/our-story-hero-elegant.jpg" alt="A heritage cricket pavilion with a worn bat, leather kit bag and scorebook at dawn" caption="BELIEF · CHARACTER · ONE ROYAL PURPOSE" className="storyHeroMedia" />
      </header>
      <section className="statement" id="legacy">
        <p className="sectionLabel">01 · OUR LEGACY</p>
        <div className="statementGrid">
          <h2>NOT JUST A TEAM.<br /><em>A ROYAL STANDARD.</em></h2>
          <div>
            <p className="lead">Entrepot Royals is a collective of competitors who play with courage, composure and complete commitment to the crest.</p>
            <p>Every over is an opportunity. Every partnership is built on trust. Every time we step onto the field, we carry one ambition: to set a standard worthy of the name Royals.</p>
          </div>
        </div>
        <div className="royalWord" aria-hidden="true">ROYAL</div>
      </section>
      <section className="storyChapters" aria-label="Entrepot Royals story chapters">
        {chapters.map((chapter) => <article key={chapter.number}><span>{chapter.number}</span><small>{chapter.label}</small><h2>{chapter.title}</h2><p>{chapter.copy}</p></article>)}
      </section>
      <section className="recl" id="recl">
        <div className="reclBadge">
          <span className="reclCrown" aria-hidden="true">♛</span>
          <span className="reclMonogram">RECL</span>
          <small>RISE OF THE ROYALS</small>
          <i aria-hidden="true">EST. 2025</i>
        </div>
        <div className="reclCopy">
          <p className="sectionLabel">03 · OUR RECL JOURNEY</p>
          <h2>THE DEBUT<br />WAS ONLY THE<br /><em>BEGINNING.</em></h2>
          <p>Last season marked our first chapter in RECL—a campaign that tested our character, strengthened our bond and showed us what the next level demands. We return with experience in our game and fire in our hearts.</p>
          <div className="seasonLine">
            <div><strong>01</strong><span>DEBUT<br />SEASON</span></div>
            <div><strong>01</strong><span>ROYAL<br />FAMILY</span></div>
            <div><strong>∞</strong><span>AMBITION<br />WITHOUT LIMITS</span></div>
          </div>
        </div>
      </section>
      <section className="storyPromise"><Logo className="storyPromiseLogo" /><div><p className="sectionLabel light">THE STORY CONTINUES</p><h2>ONE CREST.<br /><em>EVERY CHAPTER.</em></h2><p>The next Royal moment is waiting to be written.</p></div><Link className="goldButton" href="/team">Meet the team ↗</Link></section>
      <Footer />
    </main>
  );
}
