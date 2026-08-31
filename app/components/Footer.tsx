const Logo = () => (
  <img className="brandLogo" src="/entrepot-royals-logo.png" alt="Entrepot Royals official crest" />
);

export default function Footer() {
  return (
    <footer className="siteFooter">
      <div className="footerIdentity">
        <a className="brand footerBrand" href="/" aria-label="Entrepot Royals home">
          <Logo /><span><b>ENTREPOT</b><strong>ROYALS</strong></span>
        </a>
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
        </div>
      </div>
    </footer>
  );
}
