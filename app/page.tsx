import Footer from "./components/Footer";
import HeaderSocials from "./components/HeaderSocials";
import MainNavLinks from "./components/MainNavLinks";

const Arrow = () => <span aria-hidden="true">↗</span>;

const Logo = ({ className = "" }: { className?: string }) => (
  <img
    className={className}
    src="/entrepot-royals-logo.png"
    alt="Entrepot Royals official crest"
  />
);

export default function Home() {
  return (
    <main>
      <nav className="nav" aria-label="Main navigation">
        <a className="brand" href="#home" aria-label="Entrepot Royals home">
          <Logo className="brandLogo" />
          <span><b>ENTREPOT</b><strong>ROYALS</strong></span>
        </a>
        <MainNavLinks active="home" />
        <HeaderSocials /><a className="navCta" href="#royal-family">Join the roar <Arrow /></a>
      </nav>

      <section className="hero" id="home">
        <img className="heroBackdropPhoto" src="/home-hero-stadium-elegant.jpg" alt="Cricketer in elegant navy and gold colours overlooking a floodlit stadium" />
        <div className="heroLines" aria-hidden="true" />
        <div className="heroCopy">
          <p className="eyebrow"><span /> GATEWAY TO THE ROYAL STANDARD</p>
          <h1>CRICKET WITH<br /><em>ROYAL PURPOSE</em></h1>
          <p className="heroText">
            A team built on belief, sharpened by competition and united by one
            crest. This is Entrepot Royals—where every innings carries intent.
          </p>
          <div className="heroActions">
            <a className="goldButton" href="/team">Meet the Royals <Arrow /></a>
            <a className="textLink" href="/our-story#recl"><span className="play">▶</span> Our RECL journey</a>
          </div>
          <div className="heroRoyalStats" aria-label="Entrepot Royals highlights">
            <div><strong>2025</strong><span>ROYAL LEGACY BEGAN</span></div>
            <div><strong>RECL</strong><span>BUILT FOR THE CONTEST</span></div>
            <div><strong>ONE</strong><span>CREST · ONE FAMILY</span></div>
          </div>
        </div>

        <div className="crestWrap">
          <div className="orbit orbitOne" />
          <div className="orbit orbitTwo" />
          <div className="crestGlow" />
          <Logo className="officialCrest" />
        </div>

        <div className="heroSeasonTag"><b>EST. 2025</b><span>ONE ROYAL FAMILY</span></div>

        <div className="scrollHint"><span /> DISCOVER THE ROYAL JOURNEY</div>
      </section>

      <section className="clubLinks" aria-label="Explore Entrepot Royals">
        <a href="/owners"><small>01 · THE VISION</small><strong>Meet the Owners</strong><span>↗</span></a>
        <a href="/team"><small>02 · THE SQUAD</small><strong>Meet the Royals</strong><span>↗</span></a>
        <a href="/fixtures"><small>03 · MATCH CENTRE</small><strong>Fixtures & Results</strong><span>↗</span></a>
        <a href="/gallery"><small>04 · THE ARCHIVE</small><strong>Royal Moments</strong><span>↗</span></a>
        <a href="/supporters"><small>05 · THE ROYAL FAMILY</small><strong>Royal Supporters</strong><span>↗</span></a>
      </section>

      <section className="matchCentre">
        <div className="matchTitle">
          <p className="sectionLabel">MATCH CENTRE</p>
          <h2>THE NEXT<br /><em>ROYAL BATTLE</em></h2>
          <a href="/fixtures">View all fixtures & results <span>↗</span></a>
        </div>
        <div className="featuredMatch">
          <div className="matchMeta"><span>RECL · 2026 SEASON</span><b>UPCOMING</b></div>
          <div className="matchTeams">
            <div><Logo className="matchCrest" /><strong>ENTREPOT<br />ROYALS</strong></div>
            <span className="versus">VS</span>
            <div className="opponentMark"><span>?</span><strong>OPPONENT<br />TO BE ANNOUNCED</strong></div>
          </div>
          <div className="matchDetails"><span>DATE · TO BE ANNOUNCED</span><span>VENUE · TO BE ANNOUNCED</span></div>
        </div>
        <div className="homeFixtureList" aria-label="Upcoming Entrepot Royals fixtures">
          {["MATCH 01", "MATCH 02", "MATCH 03"].map((match) => (
            <a href="/fixtures" className="homeFixtureRow" key={match}>
              <span><small>RECL 2026</small><strong>{match}</strong></span>
              <b>ENTREPOT ROYALS <em>VS</em> OPPONENT TBC</b>
              <i>DATE TBC →</i>
            </a>
          ))}
        </div>
      </section>

      <section className="codeSection" id="code">
        <div className="codeIntro">
          <p className="sectionLabel light">02 · THE ROYAL CODE</p>
          <h2>WHAT WE<br /><em>STAND FOR</em></h2>
          <p>Four principles. One identity. The code behind every Royal performance.</p>
        </div>
        <div className="values">
          <article>
            <span>01</span><i className="valueIcon">◆</i>
            <h3>COURAGE</h3>
            <p>We take on every challenge and never retreat from the contest.</p>
          </article>
          <article>
            <span>02</span><i className="valueIcon">◇</i>
            <h3>UNITY</h3>
            <p>Different strengths. One purpose. We rise together as a team.</p>
          </article>
          <article>
            <span>03</span><i className="valueIcon">✦</i>
            <h3>DISCIPLINE</h3>
            <p>Preparation creates confidence; consistency creates champions.</p>
          </article>
          <article>
            <span>04</span><i className="valueIcon">♛</i>
            <h3>PRIDE</h3>
            <p>We respect the game, the opposition and the crest we represent.</p>
          </article>
        </div>
      </section>

      <section className="join" id="royal-family">
        <Logo className="joinLogo" />
        <p className="sectionLabel light">THE ROYAL FAMILY</p>
        <h2>HEAR THE ROAR.<br /><em>FEEL THE RISE.</em></h2>
        <p>Follow the Entrepot Royals journey through RECL and stand with us for every ball, every battle and every breakthrough.</p>
        <div className="socialActions">
          <a className="goldButton" href="https://www.instagram.com/entrepot_royals/" target="_blank" rel="noreferrer" aria-label="Follow Entrepot Royals on Instagram">Follow @entrepot_royals <Arrow /></a>
          <a className="youtubeButton" href="https://www.youtube.com/@EntrepotRoyals" target="_blank" rel="noreferrer" aria-label="Watch Entrepot Royals on YouTube"><i>▶</i> Watch @EntrepotRoyals</a>
          <a className="textLink" href="/contact">Contact the Royals</a>
        </div>
      </section>

      <Footer />
    </main>
  );
}
