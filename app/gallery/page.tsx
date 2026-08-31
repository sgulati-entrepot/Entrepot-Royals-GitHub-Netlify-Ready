import Footer from "../components/Footer";
import HeaderSocials from "../components/HeaderSocials";
import TeamMenu from "../components/TeamMenu";

const Logo = ({ className = "" }: { className?: string }) => (
  <img className={className} src="/entrepot-royals-logo.png" alt="Entrepot Royals official crest" />
);

const moments = [
  { src: "/runner-up-mini-tournament-01-enhanced.png", title: "First Runner-Up — Mini Tournament", category: "A Proud Royal Finish", alt: "Entrepot Royals celebrating their first runner-up finish in the 2025 mini tournament with trophies", fit: "contain" },
  { src: "/runner-up-mini-tournament-02-enhanced.png", title: "The Runner-Up Celebration", category: "Mini Tournament · 2025", alt: "Entrepot Royals players and fellow competitors holding trophies after the 2025 mini tournament", fit: "contain" },
  { src: "/royal-moment-team-2025-enhanced.png", title: "The 2025 Royals", category: "Team of 2025", alt: "Entrepot Royals players together in the 2025 team kit", fit: "contain" },
  { src: "/royal-moment-squad-backs-enhanced.png", title: "Names Behind the Crest", category: "Squad Unity", alt: "Entrepot Royals players displaying their names and jersey numbers", fit: "contain" },
  { src: "/royal-moment-trophy-enhanced.png", title: "A Royal Triumph", category: "Trophy Moment", alt: "Entrepot Royals players celebrating together with a trophy" },
  { src: "/sajeev-gulati-enhanced.png", title: "Vision Behind the Royals", category: "Team Leadership", alt: "Sajeev Gulati, Team Owner of Entrepot Royals" },
  { src: "/akriti-gulati-enhanced.png", title: "The Royal Family", category: "Team Leadership", alt: "Akriti Gulati, Team Owner of Entrepot Royals" },
  { src: "/royal-moment-yellow-joy-enhanced.png", title: "A Smile Full of Sunshine — Our Youngest Royal", category: "Royal Joy", alt: "A smiling young Entrepot Royals supporter dressed in yellow" },
  { src: "/royal-moment-family-support-enhanced.png", title: "Royals Across Generations", category: "The Royal Family", alt: "Four Entrepot Royals supporters together in team jerseys" },
];

export default function GalleryPage() {
  return (
    <main className="profilePage galleryPage">
      <nav className="nav innerNav" aria-label="Main navigation">
        <a className="brand" href="/" aria-label="Entrepot Royals home"><Logo className="brandLogo" /><span><b>ENTREPOT</b><strong>ROYALS</strong></span></a>
        <div className="navLinks"><a href="/">Home</a><a href="/owners">Owners</a><TeamMenu /><a href="/fixtures">Fixtures</a><a className="active" href="/gallery">Royal Moments</a><a href="/supporters">Supporters</a></div>
        <HeaderSocials /><a className="navCta" href="/contact">Contact us ↗</a>
      </nav>

      <header className="galleryHero">
        <div><p className="eyebrow"><span /> THROUGH THE ROYAL LENS</p><h1>ROYAL MOMENTS<br /><em>GALLERY</em></h1><p>Celebrating the people, matches and memories that shape the Entrepot Royals journey.</p></div>
        <div className="galleryHeroMark"><Logo className="galleryHeroLogo" /><span>EVERY MOMENT · ONE LEGACY</span></div>
      </header>

      <section className="gallerySection">
        <div className="galleryIntro"><div><p className="sectionLabel">THE ROYAL ARCHIVE</p><h2>MOMENTS THAT<br /><em>DEFINE US</em></h2></div><p>From the 2025 squad and match-day camaraderie to family pride, joyful smiles and trophy celebrations—every photograph carries a chapter of the Royal story.</p></div>
        <div className="galleryYearHeading galleryYear2026">
          <div><small>THE NEXT CHAPTER</small><h3>MOMENTS OF <em>2026</em></h3></div>
          <span>NEW MEMORIES AHEAD</span>
        </div>
        <article className="yearComingSoon"><Logo className="yearComingSoonLogo" /><div><small>THE 2026 ARCHIVE</small><h3>THE STORY CONTINUES</h3><p>Match-day photographs, celebrations and behind-the-scenes Royal moments will be added throughout the new season.</p></div><strong>26</strong></article>

        <div className="galleryYearHeading galleryYear2025">
          <div><small>THE FIRST CHAPTER</small><h3>MOMENTS OF <em>2025</em></h3></div>
          <span>09 ROYAL MOMENTS</span>
        </div>
        <div className="momentsGrid moments2025">
          {moments.map((moment, index) => (
            <figure className={`momentCard momentCard${index + 1}${moment.fit === "contain" ? " momentContain" : ""}`} key={moment.title}>
              <img src={moment.src} alt={moment.alt} />
              <figcaption><small>{moment.category}</small><strong>{moment.title}</strong><span>{String(index + 1).padStart(2, "0")}</span></figcaption>
            </figure>
          ))}
        </div>
      </section>

      <section className="galleryCategories">
        <span>TEAM OF 2025</span><span>MATCH DAY</span><span>BEHIND THE SCENES</span><span>ROYAL CELEBRATIONS</span>
      </section>
      <section className="quoteBand goldBand"><p>Every photograph carries a piece of the Royal story.</p><a href="/team">Meet the squad →</a></section>
      <Footer />
    </main>
  );
}
