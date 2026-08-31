import Image from "next/image";
import Footer from "../components/Footer";
import LandingHeroMedia from "../components/LandingHeroMedia";
import SiteHeader from "../components/SiteHeader";

const Logo = () => <Image className="brandLogo" src="/entrepot-royals-logo.png" alt="Entrepot Royals official crest" width={600} height={600} />;

export default function ContactPage() {
  return <main className="editorialPage contactPage" id="main-content">
    <SiteHeader active="contact" ctaHref="mailto:royals@entrepot.in" ctaLabel="Email us" />
    <header className="editorialHero contactHero"><div className="editorialHeroCopy"><p className="eyebrow"><span /> CONNECT WITH THE ROYALS</p><h1>CONTACT<br /><em>US</em></h1><p>For team enquiries, collaborations, supporter stories and everything Entrepot Royals.</p></div><LandingHeroMedia photo="/contact-hero-elegant.jpg" alt="A welcoming conversation inside an elegant cricket clubhouse" caption="START A ROYAL CONVERSATION" /></header>
    <section className="contactGrid">
      <a className="contactCard" href="mailto:royals@entrepot.in"><span>01 · EMAIL</span><h2>royals@<br />entrepot.in</h2><p>Write to the Entrepot Royals team</p><i>↗</i></a>
      <a className="contactCard" href="https://www.google.com/maps/search/?api=1&query=Lokhandwala%2C%20Andheri%20West%2C%20Mumbai" target="_blank" rel="noreferrer"><span>02 · LOCATION</span><h2>ANDHERI WEST<br /><em>LOKHANDWALA</em></h2><p>Mumbai, Maharashtra, India</p><i>↗</i></a>
    </section>
    <section className="contactBanner"><Logo /><div><p className="sectionLabel light">THE ROYAL FAMILY</p><h2>LET’S START A<br /><em>CONVERSATION.</em></h2></div><a className="goldButton" href="mailto:royals@entrepot.in">Email the Royals ↗</a></section>
    <Footer />
  </main>;
}
