import Footer from "../components/Footer";
import HeaderSocials from "../components/HeaderSocials";

const Logo = ({ className = "" }: { className?: string }) => (
  <img className={className} src="/entrepot-royals-logo.png" alt="Entrepot Royals official crest" />
);

const roles = ["Captain", "Vice-Captain", "Wicketkeeper", "Top-order Batter", "Middle-order Batter", "All-Rounder", "Spin Bowler", "Fast Bowler"];
const team2025 = [
  { number: "01", name: "Sajeev Gulati", photo: "/sajeev-gulati.jpg" },
  { number: "02", name: "Jinen Dedhia", photo: "/jinen-dedhia.jpg", photoClass: "jinenPlayerPhoto" },
  { number: "03", name: "Ibrahim", photo: "/ibrahim.jpg", photoClass: "ibrahimPlayerPhoto" },
  { number: "04", name: "Devang Desai", photo: "/devang-desai.jpg", photoClass: "devangPlayerPhoto" },
  { number: "05", name: "Kunal Shah", photo: "/kunal-shah.jpg", photoClass: "kunalShahPlayerPhoto" },
  { number: "06", name: "Kunal Wadhwa", photo: "/kunal-wadhwa.jpg", photoClass: "kunalWadhwaPlayerPhoto" },
  { number: "07", name: "Rajeev Belani", photo: "/rajeev-belani.jpg", photoClass: "rajeevBelaniPlayerPhoto" },
  { number: "08", name: "Jay Thakur" },
];

export default function TeamPage() {
  return (
    <main className="profilePage teamPage">
      <nav className="nav innerNav" aria-label="Main navigation">
        <a className="brand" href="/" aria-label="Entrepot Royals home"><Logo className="brandLogo" /><span><b>ENTREPOT</b><strong>ROYALS</strong></span></a>
        <div className="navLinks"><a href="/">Home</a><a href="/owners">Owners</a><a className="active" href="/team">Team</a><a href="/fixtures">Fixtures</a><a href="/gallery">Royal Moments</a><a href="/supporters">Supporters</a></div>
        <HeaderSocials /><a className="navCta" href="/owners">Our leadership ↗</a>
      </nav>

      <header className="pageHero teamHero">
        <div><p className="eyebrow"><span /> THE ROYAL SQUAD</p><h1>MEET THE<br /><em>ROYALS</em></h1><p>Different strengths. One purpose. A squad built to compete, connect and rise together.</p></div>
        <div className="teamHeroPortrait">
          <Logo className="teamHeroCrest" />
          <span>ENTREPOT ROYALS · OFFICIAL SQUAD</span>
        </div>
      </header>

      <section className="rosterSection">
        <div className="rosterHead"><div><p className="sectionLabel">2026 SQUAD</p><h2>THE PLAYING <em>ROYALS</em></h2></div><p>Player names, photographs, jersey numbers and statistics can be added as soon as the final squad is shared.</p></div>
        <div className="rosterGrid">
          {roles.map((role, index) => (
            <article className="playerCard" key={role}>
              <div className="playerVisual">
                <span>{String(index + 1).padStart(2,"0")}</span>
                {index === 0 ? <img className="playerPhoto" src="/sajeev-gulati.jpg" alt="Sajeev Gulati, Entrepot Royals 2026 squad member" /> : <Logo className="playerCrest" />}
              </div>
              <div className="playerInfo"><small>{role}</small><h3>{index === 0 ? "Sajeev Gulati" : "Player profile"}</h3><p>{index === 0 ? "Entrepot Royals 2026 squad member" : "Squad details coming soon"}</p></div>
            </article>
          ))}
        </div>
      </section>

      <section className="rosterSection legacyRoster" aria-labelledby="team-2025-title">
        <div className="rosterHead">
          <div>
            <p className="sectionLabel">TEAM OF 2025</p>
            <h2 id="team-2025-title">THE 2025 <em>ROYALS</em></h2>
          </div>
          <p>The squad that carried the Entrepot Royals crest through our 2025 campaign and wrote a proud chapter in the team&apos;s story.</p>
        </div>
        <div className="rosterGrid">
          {team2025.map((player) => (
            <article className="playerCard legacyPlayerCard" key={player.number}>
              <div className="playerVisual legacyPlayerVisual">
                <span>{player.number}</span>
                {player.photo ? <img className={`playerPhoto ${player.photoClass ?? ""}`} src={player.photo} alt={`${player.name}, Entrepot Royals 2025 squad member`} /> : <Logo className="playerCrest" />}
                <b className="seasonStamp">2025</b>
              </div>
              <div className="playerInfo">
                <small>TEAM OF 2025 · #{player.number}</small>
                <h3>{player.name}</h3>
                <p>Entrepot Royals squad member</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="quoteBand goldBand"><p>The Royals are ready to roar.</p><a href="/">Return home →</a></section>
      <Footer />
    </main>
  );
}
