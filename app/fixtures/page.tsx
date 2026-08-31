import Image from "next/image";
import Footer from "../components/Footer";
import SiteHeader from "../components/SiteHeader";

const Logo = ({ className = "", priority = false }: { className?: string; priority?: boolean }) => (
  <Image className={className} src="/entrepot-royals-logo.png" alt="Entrepot Royals official crest" width={600} height={600} priority={priority} />
);

const upcoming = ["MATCH 01", "MATCH 02", "MATCH 03"];

export default function FixturesPage() {
  return (
    <main className="profilePage fixturesPage" id="main-content">
      <SiteHeader active="fixtures" ctaHref="/team" ctaLabel="Meet the squad" />

      <header className="fixturesHero">
        <div><p className="eyebrow"><span /> THE ROYAL MATCH CENTRE</p><h1>FIXTURES<br /><em>& RESULTS</em></h1><p>Every fixture. Every result. Every step of the Entrepot Royals RECL campaign.</p></div>
        <Image className="fixturesHeroPhoto" src="/fixtures-hero-elegant.jpg" alt="Cricket stumps and a red ball on a lush floodlit ground before a fixture" width={1800} height={1200} sizes="100vw" priority />
        <div className="fixtureHeroCard"><small>NEXT MATCH</small><div><Logo className="fixtureLogo" priority /><span>VS</span><div className="tbcCrest">?</div></div><strong>DETAILS TO BE ANNOUNCED</strong></div>
      </header>

      <section className="fixturesContent">
        <div className="fixturesHeading"><div><p className="sectionLabel">UPCOMING</p><h2>ROYAL <em>FIXTURES</em></h2></div><p>Official dates, opponents and venues will appear here once the RECL schedule is confirmed.</p></div>
        <div className="fixturesList">
          {upcoming.map((match) => (
            <article className="fixtureRow" key={match}>
              <div className="fixtureIndex"><small>RECL 2026</small><strong>{match}</strong></div>
              <div className="fixtureTeams"><span>ENTREPOT ROYALS</span><b>VS</b><span>OPPONENT TBC</span></div>
              <div className="fixtureInfo"><span>DATE TBC</span><span>VENUE TBC</span></div>
              <span className="rowArrow">↗</span>
            </article>
          ))}
        </div>
      </section>

      <section className="resultsSection">
        <div><p className="sectionLabel light">COMPLETED MATCHES</p><h2>RESULTS &<br /><em>PERFORMANCES</em></h2></div>
        <div className="resultsEmpty"><span>—</span><h3>No results posted yet</h3><p>Match scores and standout Royal performances will be published here during the season.</p></div>
      </section>

      <section className="quoteBand goldBand"><p>Every match writes the next chapter.</p><a href="/team">Meet the squad →</a></section>
      <Footer />
    </main>
  );
}
