import Footer from "../../components/Footer";
import HeaderSocials from "../../components/HeaderSocials";
import LandingHeroMedia from "../../components/LandingHeroMedia";
import MainNavLinks from "../../components/MainNavLinks";

const Logo = () => <img className="brandLogo" src="/entrepot-royals-logo.png" alt="Entrepot Royals official crest" />;
const voices = [
  { mark: "01", title: "ONE TEAM", quote: "Every player brings a different strength, but the Royal spirit brings everyone together.", source: "THE SQUAD" },
  { mark: "02", title: "ONE FAMILY", quote: "The support beyond the boundary gives the team confidence, energy and a reason to keep rising.", source: "ROYAL SUPPORTERS" },
  { mark: "03", title: "ONE PURPOSE", quote: "We play with courage, respect the contest and carry the Entrepot Royals crest with pride.", source: "THE ROYAL CODE" },
];

export default function TestimonialsPage() {
  return <main className="editorialPage">
    <nav className="nav innerNav" aria-label="Main navigation"><a className="brand" href="/"><Logo /><span><b>ENTREPOT</b><strong>ROYALS</strong></span></a><MainNavLinks active="insights" /><HeaderSocials /><a className="navCta" href="/contact">Contact us ↗</a></nav>
    <header className="editorialHero"><div className="editorialHeroCopy"><p className="eyebrow"><span /> VOICES OF THE ROYAL FAMILY</p><h1>ROYAL<br /><em>TESTIMONIALS</em></h1><p>What it means to wear the crest, stand by the boundary and rise together as one Royal family.</p></div><LandingHeroMedia photo="/testimonials-hero-elegant.jpg" alt="An elegant cricket club guestbook representing Royal voices and memories" caption="VOICES OF THE ROYAL FAMILY" className="testimonialsHeroMedia" /></header>
    <section className="testimonialGrid" aria-label="Entrepot Royals testimonials">{voices.map((voice) => <article key={voice.mark}><span>{voice.mark}</span><small>{voice.title}</small><blockquote>“{voice.quote}”</blockquote><p>— {voice.source}</p></article>)}</section>
    <section className="editorialCta"><p className="sectionLabel light">SHARE THE ROAR</p><h2>PART OF THE<br /><em>ROYAL STORY?</em></h2><p>We would love to hear what Entrepot Royals means to you.</p><a className="goldButton" href="mailto:royals@entrepot.in?subject=My%20Royal%20Testimonial">Send your testimonial ↗</a></section>
    <Footer />
  </main>;
}
