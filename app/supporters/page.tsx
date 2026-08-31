import Footer from "../components/Footer";
import HeaderSocials from "../components/HeaderSocials";
import TeamMenu from "../components/TeamMenu";

const Logo = ({ className = "" }: { className?: string }) => (
  <img className={className} src="/entrepot-royals-logo.png" alt="Entrepot Royals official crest" />
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
    <main className="profilePage supportersPage">
      <nav className="nav innerNav" aria-label="Main navigation">
        <a className="brand" href="/" aria-label="Entrepot Royals home"><Logo className="brandLogo" /><span><b>ENTREPOT</b><strong>ROYALS</strong></span></a>
        <div className="navLinks"><a href="/">Home</a><a href="/owners">Owners</a><TeamMenu /><a href="/fixtures">Fixtures</a><a href="/gallery">Royal Moments</a><a className="active" href="/supporters">Supporters</a></div>
        <HeaderSocials /><a className="navCta" href="/contact">Contact us ↗</a>
      </nav>

      <header className="supportersHero">
        <div className="supportersHeroCopy">
          <p className="eyebrow"><span /> THE HEART BEHIND THE TEAM</p>
          <h1>ROYAL<br /><em>SUPPORTERS</em></h1>
          <p>They bring the energy, carry the colours and make every Royal moment louder. This page celebrates the family behind the team.</p>
          <a className="goldButton" href="#supporter-stories">Meet the Royal family <span aria-hidden="true">↓</span></a>
        </div>
        <div className="supportersHeroVisual">
          <img src="/royal-moment-family-support-enhanced.png" alt="The Entrepot Royals supporter family wearing team jerseys" />
          <span>ONE CREST · ONE FAMILY · ONE ROAR</span>
        </div>
      </header>

      <section className="supportersIntro" id="supporter-stories">
        <div><p className="sectionLabel">THE ROYAL FAMILY</p><h2>OUR STRENGTH<br /><em>BEYOND THE FIELD</em></h2></div>
        <p>Every cheer from the boundary, every message of encouragement and every proud photograph adds to the Entrepot Royals story. Our supporters are not outside the team—they are part of it.</p>
      </section>

      <section className="supporterStories" aria-label="Featured Royal supporters">
        {supporters.map((supporter, index) => (
          <article className={`supporterStory supporterStory${index + 1}`} key={supporter.title}>
            <div className="supporterPhoto"><img src={supporter.src} alt={supporter.alt} /></div>
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
