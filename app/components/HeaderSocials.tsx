export default function HeaderSocials() {
  return (
    <div className="headerSocials" aria-label="Entrepot Royals social media">
      <a href="https://www.instagram.com/entrepot_royals/" target="_blank" rel="noreferrer" aria-label="Instagram @entrepot_royals"><i>◎</i><span>Instagram</span></a>
      <a className="youtubeSocial" href="https://www.youtube.com/@EntrepotRoyals" target="_blank" rel="noreferrer" aria-label="YouTube @EntrepotRoyals"><i>▶</i><span>YouTube</span></a>
      <a className="facebookSocial" href="https://www.facebook.com/profile.php?id=61593631606868" target="_blank" rel="noreferrer" aria-label="Entrepot Royals on Facebook">
        <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M17.5 2h-3.2c-3.6 0-5.8 2.2-5.8 6v3H5v4h3.5v7h4.3v-7h3.6l.6-4h-4.2V8.4c0-1.2.4-2.4 2.5-2.4h2.2V2Z" /></svg>
        <span>Facebook</span>
      </a>
    </div>
  );
}
