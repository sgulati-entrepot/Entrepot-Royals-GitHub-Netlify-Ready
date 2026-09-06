import TeamSeasonPage, { type TeamPlayer } from "../../components/TeamSeasonPage";

const roles = ["Captain", "Vice-Captain", "Wicketkeeper", "Top-order Batter", "Middle-order Batter", "All-Rounder", "Spin Bowler", "Fast Bowler"];
const players: TeamPlayer[] = roles.map((role, index) => ({
  number: String(index + 1).padStart(2, "0"),
  name: index === 0 ? "Sajeev Gulati" : index === 1 ? "Divyesh Kharade" : "Player profile",
  role,
  description: index <= 1 ? "Entrepot Royals 2026 squad member" : "Squad details coming soon",
  photo: index === 0 ? "/sajeev-gulati.jpg" : index === 1 ? "/divyesh-kharade.jpg" : undefined,
}));

export default function Team2026Page() {
  return <TeamSeasonPage season="2026" players={players} introduction="Different strengths. One purpose. The current squad is built to compete, connect and rise together." />;
}
