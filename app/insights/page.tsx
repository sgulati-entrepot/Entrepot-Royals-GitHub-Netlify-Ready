import Link from "next/link";
import Footer from "../components/Footer";
import HeaderSocials from "../components/HeaderSocials";
import LandingHeroMedia from "../components/LandingHeroMedia";
import MainNavLinks from "../components/MainNavLinks";

const Logo = ({ className = "" }: { className?: string }) => (
  <img className={className} src="/entrepot-royals-logo.png" alt="Entrepot Royals official crest" />
);

export default function InsightsPage() {
  return (
    <main className="profilePage insightsPage">
      <nav className="nav innerNav" aria-label="Main navigation">
        <Link className="brand" href="/" aria-label="Entrepot Royals home"><Logo className="brandLogo" /><span><b>ENTREPOT</b><strong>ROYALS</strong></span></Link>
        <MainNavLinks active="insights" />
        <HeaderSocials /><Link className="navCta" href="/contact">Contact us ↗</Link>
      </nav>

      <header className="editorialHero insightsLandingHero">
        <div className="editorialHeroCopy">
          <p className="eyebrow"><span /> STORIES · VOICES · PERSPECTIVE</p>
          <h1>ROYAL<br /><em>INSIGHTS</em></h1>
          <p>Explore the voices, reflections and stories that give every Royal season its meaning beyond the scorecard.</p>
        </div>
        <LandingHeroMedia photo="/blogs-hero-elegant.jpg" alt="An elegant cricket journal and camera overlooking a floodlit ground" caption="THE STORIES BEHIND THE CREST" className="insightsHeroMedia" />
      </header>

      <section className="teamProgramsCatalog" aria-label="Entrepot Royals insights">
        <div className="teamProgramsIntro">
          <div><span>02 / ROYAL PERSPECTIVES</span><h2>Discover what lives<br /><em>beyond the boundary.</em></h2></div>
          <p>First-person voices and editorial stories reveal the people, values and moments shaping the Entrepot Royals journey.</p>
        </div>
        <div className="teamProgramGrid insightsCardGrid">
          <Link className="teamProgramCard" href="/insights/testimonials">
            <figure><img src="/testimonials-hero-elegant.jpg" alt="A cricket club guestbook representing Royal testimonials" /><span>01</span><i aria-hidden="true">↗</i></figure>
            <div><small>VOICES OF THE ROYAL FAMILY</small><h2>Testimonials</h2><p>Hear what it means to wear the crest, support the team and rise together as one Royal family.</p><strong>Read the voices <span>→</span></strong></div>
          </Link>
          <Link className="teamProgramCard" href="/insights/blogs">
            <figure><img src="/blogs-hero-elegant.jpg" alt="A cricket journal and camera representing Royal stories" /><span>02</span><i aria-hidden="true">↗</i></figure>
            <div><small>STORIES FROM THE KINGDOM</small><h2>Blogs</h2><p>Explore match-day emotion, team reflections and the moments that shape every chapter of the Royals.</p><strong>Explore the stories <span>→</span></strong></div>
          </Link>
        </div>
      </section>
      <Footer />
    </main>
  );
}
