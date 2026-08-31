import Image from "next/image";
import Footer from "../components/Footer";
import LandingHeroMedia from "../components/LandingHeroMedia";
import SiteHeader from "../components/SiteHeader";

const Logo = ({ className = "" }: { className?: string }) => (
  <Image className={className} src="/entrepot-royals-logo.png" alt="Entrepot Royals official crest" width={600} height={600} />
);

export default function OwnersPage() {
  return (
    <main className="profilePage" id="main-content">
      <SiteHeader active="owners" ctaHref="/team" ctaLabel="Meet the team" />

      <header className="pageHero ownersHero">
        <div><p className="eyebrow"><span /> BEHIND THE ROYALS</p><h1>TEAM<br /><em>OWNERS</em></h1><p>Leadership with vision, passion and an unwavering belief in the team.</p></div>
        <LandingHeroMedia photo="/owners-hero-pavilion-elegant.jpg" alt="Elegant cricket pavilion overlooking a floodlit ground, representing Entrepot Royals leadership and vision" caption="LEADERSHIP · VISION · ROYAL PURPOSE" className="ownersHeroMedia" />
      </header>

      <section className="profileSection">
        <div className="sectionIntro"><p className="sectionLabel">THE VISION BEHIND THE CREST</p><h2>BUILDING MORE<br />THAN A <em>TEAM.</em></h2><p>The Entrepot Royals ownership stands for opportunity, togetherness and a winning culture—on and off the field.</p></div>
        <div className="ownerCards">
          <article className="ownerCard"><div className="profilePlaceholder ownerPhotoWrap"><Image className="ownerPhoto" src="/sajeev-gulati.jpg" alt="Sajeev Gulati, Team Owner of Entrepot Royals" width={800} height={1000} sizes="(max-width: 700px) 100vw, 50vw" /></div><div><small>TEAM OWNER</small><h3>Sajeev Gulati</h3><p>Leading Entrepot Royals with vision, passion and an unwavering belief in the team.</p></div></article>
          <article className="ownerCard accentCard"><div className="profilePlaceholder ownerPhotoWrap"><Image className="ownerPhoto akritiPhoto" src="/akriti-gulati.jpg" alt="Akriti Gulati, Team Owner of Entrepot Royals" width={800} height={1000} sizes="(max-width: 700px) 100vw, 50vw" /></div><div><small>TEAM OWNER</small><h3>Akriti Gulati</h3><p>Supporting the Entrepot Royals vision and helping build a united, ambitious and winning team culture.</p></div></article>
          <article className="ownerCard kiaraOwnerCard"><div className="profilePlaceholder ownerPhotoWrap"><Image className="ownerPhoto kiaraPhoto" src="/kiara-gulati.jpg" alt="Kiara Gulati, Youngest Owner of Entrepot Royals" width={800} height={1000} sizes="(max-width: 700px) 100vw, 50vw" /></div><div><small>YOUNGEST OWNER</small><h3>Kiara Gulati</h3><p>Bringing youthful joy, proud Royal spirit and a bright new energy to the Entrepot Royals family.</p></div></article>
          <article className="ownerCard coOwnerCard"><div className="profilePlaceholder"><Logo className="placeholderLogo" /></div><div><small>CO-OWNER</small><h3>Co-Owner Profile</h3><p>Name, photograph and personal message will be added when the co-owner details are shared.</p></div></article>
        </div>
      </section>

      <section className="quoteBand"><p>“One crest. One family. One ambition.”</p><a href="/team">Meet the players →</a></section>
      <Footer />
    </main>
  );
}
