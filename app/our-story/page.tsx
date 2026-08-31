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
        <LandingHeroMedia photo="/home-hero-stadium-elegant.jpg" alt="A cricketer in navy and gold overlooking a floodlit ground" caption="BELIEF · CHARACTER · ONE ROYAL PURPOSE" className="storyHeroMedia" />
      </header>
      <section className="storyOverview">
        <div><p className="sectionLabel">01 / THE ROYAL IDEA</p><h2>MORE THAN A TEAM.<br /><em>A STANDARD.</em></h2></div>
        <div className="storyOverviewCopy"><p>Entrepot Royals is built around the conviction that cricket can create something enduring: trust between teammates, pride across families and a culture that grows stronger through every contest.</p><p>The crest represents courage in difficult moments, discipline in preparation and respect for everyone who shares the journey.</p></div>
      </section>
      <section className="storyChapters" aria-label="Entrepot Royals story chapters">
        {chapters.map((chapter) => <article key={chapter.number}><span>{chapter.number}</span><small>{chapter.label}</small><h2>{chapter.title}</h2><p>{chapter.copy}</p></article>)}
      </section>
      <section className="storyPromise"><Logo className="storyPromiseLogo" /><div><p className="sectionLabel light">THE STORY CONTINUES</p><h2>ONE CREST.<br /><em>EVERY CHAPTER.</em></h2><p>The next Royal moment is waiting to be written.</p></div><Link className="goldButton" href="/team">Meet the team ↗</Link></section>
      <Footer />
    </main>
  );
}
