import Footer from "../../components/Footer";
import LandingHeroMedia from "../../components/LandingHeroMedia";
import SiteHeader from "../../components/SiteHeader";

const posts = [
  { number: "01", tag: "TEAM STORY", title: "Built on Belief. United by Purpose.", copy: "The values, friendships and ambition shaping the next chapter of Entrepot Royals.", href: "/our-story" },
  { number: "02", tag: "2025 SEASON", title: "The Debut Was Only the Beginning", copy: "A look back at the lessons, breakthroughs and Royal moments that made our first RECL chapter unforgettable.", href: "/gallery" },
  { number: "03", tag: "ROYAL FAMILY", title: "The Heart Beyond the Boundary", copy: "Celebrating the supporters whose energy, encouragement and pride travel with the team everywhere.", href: "/supporters" },
];

export default function BlogsPage() {
  return <main className="editorialPage" id="main-content">
    <SiteHeader active="insights" ctaHref="/contact" ctaLabel="Contact us" />
    <header className="editorialHero blogHero"><div className="editorialHeroCopy"><p className="eyebrow"><span /> STORIES FROM THE KINGDOM</p><h1>ROYAL<br /><em>BLOGS</em></h1><p>Match-day emotion, team stories and the moments that shape the Entrepot Royals journey.</p></div><LandingHeroMedia photo="/blogs-hero-elegant.jpg" alt="An elegant cricket match journal, camera and equipment overlooking a floodlit ground" caption="STORIES BEHIND THE CREST" className="blogsHeroMedia" /></header>
    <section className="blogGrid">{posts.map((post) => <article key={post.number}><div className="blogNumber">{post.number}</div><small>{post.tag}</small><h2>{post.title}</h2><p>{post.copy}</p><a href={post.href}>Explore the story <span>↗</span></a></article>)}</section>
    <section className="blogNote"><span>NEW STORIES COMING THROUGHOUT THE 2026 SEASON</span><a href="https://www.instagram.com/entrepot_royals/" target="_blank" rel="noreferrer">Follow @entrepot_royals ↗</a></section>
    <Footer />
  </main>;
}
