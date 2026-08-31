import Image from "next/image";
import Link from "next/link";

const Logo = () => (
  <Image className="brandLogo" src="/entrepot-royals-logo.png" alt="Entrepot Royals official crest" width={64} height={64} />
);

export default function Footer() {
  return (
    <footer className="siteFooter">
      <div className="footerIdentity">
        <Link className="brand footerBrand" href="/" aria-label="Entrepot Royals home">
          <Logo /><span><b>ENTREPOT</b><strong>ROYALS</strong></span>
        </Link>
        <p>RISE WITH PRIDE · PLAY WITH PURPOSE</p>
      </div>
      <nav className="footerLinks" aria-label="Footer navigation">
        <span>EXPLORE</span>
        <a href="/our-story">Our Story</a>
        <a href="/insights">Insights</a>
        <a href="/insights/testimonials">Testimonials</a>
        <a href="/insights/blogs">Blogs</a>
        <a href="/contact">Contact Us</a>
      </nav>
      <div className="footerContact">
        <span>CONNECT</span>
        <a href="mailto:royals@entrepot.in">royals@entrepot.in</a>
        <p>Andheri West · Lokhandwala</p>
        <div className="footerSocials">
          <a className="instagramLink" href="https://www.instagram.com/entrepot_royals/" target="_blank" rel="noreferrer" aria-label="Entrepot Royals on Instagram"><i>◎</i> @entrepot_royals</a>
          <a className="youtubeLink" href="https://www.youtube.com/@EntrepotRoyals" target="_blank" rel="noreferrer" aria-label="Entrepot Royals on YouTube"><i>▶</i> YouTube</a>
          <a className="facebookLink" href="https://www.facebook.com/profile.php?id=61593631606868" target="_blank" rel="noreferrer" aria-label="Entrepot Royals on Facebook"><i><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M17.5 2h-3.2c-3.6 0-5.8 2.2-5.8 6v3H5v4h3.5v7h4.3v-7h3.6l.6-4h-4.2V8.4c0-1.2.4-2.4 2.5-2.4h2.2V2Z" /></svg></i> Facebook</a>
        </div>
      </div>
    </footer>
  );
}
