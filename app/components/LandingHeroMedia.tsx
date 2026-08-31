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
      <Image className="landingHeroPhoto" src={photo} alt={alt} width={1600} height={1000} sizes="100vw" priority />
      <Image className="landingHeroCrest" src="/entrepot-royals-logo.png" alt="Entrepot Royals official crest" width={256} height={256} priority />
      <span>{caption}</span>
    </div>
  );
}
import Image from "next/image";
