export default function LandingHeroMedia({
  photo,
  alt,
  caption,
  className = "",
}: {
  photo: string;
  alt: string;
  caption: string;
  className?: string;
}) {
  return (
    <div className={`landingHeroMedia ${className}`}>
      <img className="landingHeroPhoto" src={photo} alt={alt} />
      <img className="landingHeroCrest" src="/entrepot-royals-logo.png" alt="Entrepot Royals official crest" />
      <span>{caption}</span>
    </div>
  );
}
