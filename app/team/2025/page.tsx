import TeamSeasonPage, { type TeamPlayer } from "../../components/TeamSeasonPage";

const players: TeamPlayer[] = [
  { number: "01", name: "Sajeev Gulati", role: "TEAM OF 2025 · #01", description: "Entrepot Royals squad member", photo: "/sajeev-gulati.jpg" },
  { number: "02", name: "Jinen Dedhia", role: "TEAM OF 2025 · #02", description: "Entrepot Royals squad member", photo: "/jinen-dedhia.jpg", photoClass: "jinenPlayerPhoto" },
  { number: "03", name: "Ibrahim", role: "TEAM OF 2025 · #03", description: "Entrepot Royals squad member", photo: "/ibrahim.jpg", photoClass: "ibrahimPlayerPhoto" },
  { number: "04", name: "Devang Desai", role: "TEAM OF 2025 · #04", description: "Entrepot Royals squad member", photo: "/devang-desai.jpg", photoClass: "devangPlayerPhoto" },
  { number: "05", name: "Kunal Shah", role: "TEAM OF 2025 · #05", description: "Entrepot Royals squad member", photo: "/kunal-shah.jpg", photoClass: "kunalShahPlayerPhoto" },
  { number: "06", name: "Kunal Wadhwa", role: "TEAM OF 2025 · #06", description: "Entrepot Royals squad member", photo: "/kunal-wadhwa.jpg", photoClass: "kunalWadhwaPlayerPhoto" },
  { number: "07", name: "Rajeev Belani", role: "TEAM OF 2025 · #07", description: "Entrepot Royals squad member", photo: "/rajeev-belani.jpg", photoClass: "rajeevBelaniPlayerPhoto" },
  { number: "08", name: "Jay Thakur", role: "TEAM OF 2025 · #08", description: "Entrepot Royals squad member" },
];

export default function Team2025Page() {
  return <TeamSeasonPage season="2025" players={players} introduction="The squad that carried our crest through the 2025 campaign and wrote the opening chapter of the Entrepot Royals story." />;
}
