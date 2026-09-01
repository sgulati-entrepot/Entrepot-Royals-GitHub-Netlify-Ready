import Image from "next/image";
import Link from "next/link";
import Footer from "../components/Footer";
import LandingHeroMedia from "../components/LandingHeroMedia";
import SiteHeader from "../components/SiteHeader";

const Logo = ({ className = "" }: { className?: string }) => (
  <Image className={className} src="/entrepot-royals-logo.png" alt="Entrepot Royals official crest" width={600} height={600} />
);

const royalCode = [
  { number: "01", title: "Courage", copy: "We accept challenges with confidence and never step away from the contest. Whether defending a difficult total or chasing under pressure, a Royal keeps believing until the final ball." },
  { number: "02", title: "Unity", copy: "We play for the name on the front of the jersey and stand beside the people wearing it. Individual talent is celebrated, but teamwork remains our greatest strength." },
  { number: "03", title: "Discipline", copy: "Preparation creates confidence. Consistency builds performance. We respect practice, strategy, punctuality and the small details that can make a big difference on match day." },
  { number: "04", title: "Pride", copy: "We respect cricket, our opponents, our teammates and the crest we represent. Winning matters—but the manner in which we compete matters just as much." },
];

export default function OurStoryPage() {
  return (
    <main className="profilePage storyPage" id="main-content">
      <SiteHeader active="story" ctaHref="/team" ctaLabel="Meet the Royals" />

      <header className="editorialHero storyHero">
        <div className="editorialHeroCopy">
          <p className="eyebrow"><span /> THE JOURNEY BEHIND THE CREST</p>
          <h1>OUR<br /><em>STORY</em></h1>
          <p>Born from passion. Built as a family. Ready to roar.</p>
        </div>
        <LandingHeroMedia photo="/our-story-hero-elegant.jpg" alt="A heritage cricket pavilion with a worn bat, leather kit bag and scorebook at dawn" caption="BELIEF · CHARACTER · ONE ROYAL PURPOSE" className="storyHeroMedia" />
      </header>

      <section className="storyOverview" aria-labelledby="story-origin-title">
        <div>
          <p className="sectionLabel">01 · OUR ORIGIN</p>
          <h2 id="story-origin-title">BORN FROM PASSION.<br /><em>BUILT AS A FAMILY.</em></h2>
        </div>
        <div className="storyOverviewCopy">
          <p>Every great team begins with an idea. Entrepot Royals began with something even more powerful—a shared love for cricket and a vision to create a team where people could compete seriously, celebrate wholeheartedly and build friendships that continued long after the final ball was bowled.</p>
          <p>Established in 2025, Entrepot Royals was created to be much more than another cricket team. The dream was to bring together passionate players, spirited supporters and committed leaders under one distinguished crest. A team where talent would be encouraged, character would be respected and every player would feel proud to call themselves a Royal.</p>
          <p>What began as an exciting sporting initiative soon grew into a close-knit cricketing family—one that trains together, competes together, celebrates together and, occasionally, debates dropped catches and questionable umpiring decisions together!</p>
          <p>That is the spirit of Entrepot Royals: competitive on the field, connected beyond it and always ready to enjoy the game.</p>
        </div>
      </section>

      <section className="storyNarrative storyJourney" id="recl" aria-labelledby="royal-journey-title">
        <div className="storyNarrativeHeading">
          <span>02</span><p className="sectionLabel">THE FIRST CHAPTER</p>
          <h2 id="royal-journey-title">THE BEGINNING OF<br /><em>THE ROYAL JOURNEY</em></h2>
        </div>
        <div className="storyNarrativeCopy">
          <p>The Royal journey officially began in 2025 with our debut season in RECL. It was the first opportunity for our players to step onto the field wearing the Entrepot Royals crest and transform a shared vision into a living, breathing team.</p>
          <p>Our debut campaign brought everything that makes cricket unforgettable—determined performances, valuable partnerships, tense overs, important breakthroughs, spirited comebacks and plenty of memorable moments. Some matches tested our patience, while others revealed the true strength and potential of the team.</p>
          <p className="storyPullQuote">Every run taught us something. Every wicket lifted the dugout. Every challenge made us more united.</p>
          <p>The first season was never just about the scoreboard. It was about discovering who we were as a team. It helped us understand our strengths, recognise areas for improvement and develop the composure required to compete at a higher level. Most importantly, it established the foundation of the Royal identity.</p>
          <p><strong>The debut was not the destination. It was the opening chapter.</strong></p>
        </div>
      </section>

      <section className="storyNarrative storyNarrativeDark" aria-labelledby="many-strengths-title">
        <div className="storyNarrativeHeading">
          <span>03</span><p className="sectionLabel light">ONE ROYAL FAMILY</p>
          <h2 id="many-strengths-title">ONE TEAM.<br /><em>MANY STRENGTHS.</em></h2>
        </div>
        <div className="storyNarrativeCopy">
          <p>Entrepot Royals brings together players with different personalities, abilities, experiences and styles of play. Some lead with the bat, some create magic with the ball, some change the game through their fielding—and some make sure the energy in the dugout never drops.</p>
          <p className="storyPullQuote">Every Royal has a role.</p>
          <p>We believe that a successful cricket team is not created by individual talent alone. It is built through trust, communication, preparation and the willingness to support one another. A brilliant individual performance may win a moment, but a united team creates a lasting legacy.</p>
          <p>Whether celebrating a boundary, encouraging a bowler after a difficult over or supporting a teammate through a challenging innings, the Royals stand together. When one player succeeds, the entire team celebrates. When the team faces a setback, everyone shares the responsibility of returning stronger.</p>
          <p><strong>Different strengths. Different stories. One Royal family.</strong></p>
        </div>
      </section>

      <section className="storyNarrative" aria-labelledby="leadership-title">
        <div className="storyNarrativeHeading">
          <span>04</span><p className="sectionLabel">LEADERSHIP & PURPOSE</p>
          <h2 id="leadership-title">LEADERSHIP<br /><em>BEHIND THE CREST</em></h2>
        </div>
        <div className="storyNarrativeCopy">
          <p>Behind Entrepot Royals is a leadership vision centred on opportunity, togetherness and sporting excellence.</p>
          <p>The owners and leadership team are committed to creating a positive environment where players can express their abilities, develop their confidence and experience the true joy of competitive cricket. Their purpose is not merely to manage a team, but to build a culture—one that values preparation, professionalism, fairness and friendship.</p>
          <p>This leadership philosophy extends beyond match day. It is visible in the encouragement given to every player, the involvement of families and supporters, and the collective effort invested in making each Royal experience meaningful.</p>
          <p>The crest represents everyone who contributes to the journey: the players who take the field, the families who support them, the organisers who work behind the scenes and the supporters whose energy gives the Royals their roar.</p>
        </div>
      </section>

      <section className="storyCodeSection" aria-labelledby="royal-code-title">
        <div className="storyCodeIntro">
          <p className="sectionLabel light">05 · WHAT GUIDES US</p>
          <h2 id="royal-code-title">THE<br /><em>ROYAL CODE</em></h2>
          <p>At the heart of Entrepot Royals are four principles that guide how we prepare, compete and carry ourselves.</p>
        </div>
        <div className="storyCodeGrid">
          {royalCode.map((principle) => (
            <article key={principle.number}><span>{principle.number}</span><h3>{principle.title}</h3><p>{principle.copy}</p></article>
          ))}
        </div>
        <p className="storyCodePromise">Together, these principles form the Royal Code: play bravely, prepare professionally, support one another and enjoy every moment of the journey.</p>
      </section>

      <section className="storyNarrative storyBeyond" aria-labelledby="boundary-title">
        <div className="storyNarrativeHeading">
          <span>06</span><p className="sectionLabel">OUR COMMUNITY</p>
          <h2 id="boundary-title">BEYOND<br /><em>THE BOUNDARY</em></h2>
        </div>
        <div className="storyNarrativeCopy">
          <p>For Entrepot Royals, cricket is also about community.</p>
          <p>The team creates an environment where players, owners, families, friends and supporters can come together and share the excitement of the sport. The laughter before a match, the conversations after it, the photographs, the celebrations and even the nervous moments in the final over all become part of our collective story.</p>
          <p className="storyPullQuote">These are our Royal Moments—the memories that cannot always be measured on a scorecard.</p>
          <p>The team’s supporters are an essential part of this journey. Their encouragement brings energy to the players and turns every fixture into an occasion. They are not simply watching from outside the boundary; they are part of the Royal family.</p>
        </div>
      </section>

      <section className="storyFinale" aria-labelledby="next-chapter-title">
        <p className="sectionLabel light">07 · THE STORY CONTINUES</p>
        <h2 id="next-chapter-title">THE NEXT<br /><em>ROYAL CHAPTER</em></h2>
        <div className="storyFinaleCopy">
          <p>As Entrepot Royals moves forward, we do so with greater experience, sharper preparation and stronger belief.</p>
          <p>The lessons of our debut season have made us more determined. We understand that meaningful progress requires patience, consistency and the willingness to keep learning. Our ambition is to become a respected and competitive presence in RECL while continuing to build a team culture that people are genuinely proud to join.</p>
          <p>There will be new matches, new players, new partnerships and new challenges. There will be thrilling victories, difficult days and unforgettable finishes. Through every chapter, however, our identity will remain unchanged.</p>
        </div>
        <div className="storyVows" aria-label="Entrepot Royals promises">
          <span>We will compete with courage.</span><span>We will prepare with discipline.</span><span>We will stand together in unity.</span><span>And we will wear the crest with pride.</span>
        </div>
        <p className="storyFinalWords">Our story began in 2025—but the most exciting chapters are still waiting to be written.</p>
      </section>

      <section className="storyPromise">
        <Logo className="storyPromiseLogo" />
        <div><p className="sectionLabel light">ONE CREST · ONE FAMILY · ONE AMBITION</p><h2>RISE WITH PRIDE.<br /><em>PLAY WITH PURPOSE.</em></h2><p>Entrepot Royals</p></div>
        <Link className="goldButton" href="/team">Meet the team ↗</Link>
      </section>
      <Footer />
    </main>
  );
}
