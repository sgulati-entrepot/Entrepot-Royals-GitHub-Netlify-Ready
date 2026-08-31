import Image from "next/image";
import Footer from "../components/Footer";
import LandingHeroMedia from "../components/LandingHeroMedia";
import SiteHeader from "../components/SiteHeader";

const Logo = ({ className = "" }: { className?: string }) => (
  <Image className={className} src="/entrepot-royals-logo.png" alt="Entrepot Royals official crest" width={600} height={600} />
);

const supporters = [
  {
    src: "/royal-moment-yellow-joy-enhanced.png",
    label: "THE YOUNGEST ROYAL",
    title: "A Smile Full of Sunshine",
    copy: "The next generation carries the Royal spirit with joy, pride and a smile that brightens every match day.",
    alt: "A smiling young Entrepot Royals supporter dressed in yellow",
  },
  {
    src: "/royal-moment-family-support-enhanced.png",
    label: "ROYALS ACROSS GENERATIONS",
    title: "One Team. One Family.",
    copy: "From the first ball to the final cheer, our families and supporters stand together behind the crest.",
    alt: "Entrepot Royals supporters together in team jerseys",
  },
  {
    src: "/royal-supporters-together.jpg",
    label: "THE ROYAL SUPPORTERS",
    title: "Together Behind the Royals",
    copy: "The people who make every victory warmer, every challenge lighter and every chapter of the Entrepot Royals journey worth celebrating.",
    alt: "A joyful group of Entrepot Royals supporters celebrating together",
  },
];

export default function SupportersPage() {
  return (
    <main className="profilePage supportersPage" id="main-content">
      <SiteHeader active="supporters" ctaHref="/contact" ctaLabel="Contact us" />

      <header className="supportersHero">
        <div className="supportersHeroCopy">
          <p className="eyebrow"><span /> THE HEART BEHIND THE TEAM</p>
          <h1>ROYAL<br /><em>SUPPORTERS</em></h1>
          <p>They bring the energy, carry the colours and make every Royal moment louder. This page celebrates the family behind the team.</p>
          <a className="goldButton" href="#supporter-stories">Meet the Royal family <span aria-hidden="true">↓</span></a>
        </div>
        <LandingHeroMedia photo="/supporters-hero-elegant.jpg" alt="A multigenerational cricket supporter family overlooking a floodlit ground" caption="ONE CREST · ONE FAMILY · ONE ROAR" className="supportersHeroVisual" />
      </header>

      <section className="supportersIntro" id="supporter-stories">
        <div><p className="sectionLabel">THE ROYAL FAMILY</p><h2>OUR STRENGTH<br /><em>BEYOND THE FIELD</em></h2></div>
        <p>Every cheer from the boundary, every message of encouragement and every proud photograph adds to the Entrepot Royals story. Our supporters are not outside the team—they are part of it.</p>
      </section>

      <section className="supporterStories" aria-label="Featured Royal supporters">
        {supporters.map((supporter, index) => (
          <article className={`supporterStory supporterStory${index + 1}`} key={supporter.title}>
            <div className="supporterPhoto"><Image src={supporter.src} alt={supporter.alt} width={1000} height={1200} sizes="(max-width: 760px) 100vw, 50vw" /></div>
            <div className="supporterCopy"><small>{supporter.label}</small><h3>{supporter.title}</h3><p>{supporter.copy}</p><span>{String(index + 1).padStart(2, "0")}</span></div>
          </article>
        ))}
      </section>

      <section className="supporterValues">
        <div><strong>CHEER</strong><span>Every voice lifts the Royals.</span></div>
        <div><strong>PRIDE</strong><span>Wear the crest with honour.</span></div>
        <div><strong>FAMILY</strong><span>Together through every chapter.</span></div>
      </section>

      <section className="supporterJoin">
        <Logo className="supporterJoinLogo" />
        <p className="sectionLabel light">JOIN THE ROYAL FAMILY</p>
        <h2>STAND WITH US.<br /><em>ROAR WITH US.</em></h2>
        <p>Follow Entrepot Royals for match updates, team stories and the moments that bring our Royal family together.</p>
        <div className="socialActions"><a className="goldButton" href="https://www.instagram.com/entrepot_royals/" target="_blank" rel="noreferrer">Instagram @entrepot_royals ↗</a><a className="youtubeButton" href="https://www.youtube.com/@EntrepotRoyals" target="_blank" rel="noreferrer"><i>▶</i> YouTube @EntrepotRoyals</a></div>
      </section>

      <Footer />
    </main>
  );
}
