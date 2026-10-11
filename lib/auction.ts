export type AuctionPlayer = { id: number; name: string; bid: number | null };
export type AuctionTeam = { id: number; name: string; players: AuctionPlayer[] };
export type AuctionSettings = { kitty: number; baseBid: number; playersPerTeam: number; teamCount: number };
export type AuctionDocument = { settings: AuctionSettings; teams: AuctionTeam[] };
export const statuses = ["READY", "COMPLETE", "OVER BUDGET", "BELOW BASE", "CHECK ENTRIES", "BASE SHORTFALL"] as const;
export type AuctionStatus = typeof statuses[number];
export const round = (value: number) => Math.round((value + Number.EPSILON) * 100) / 100;
export const format = (value: number) => new Intl.NumberFormat("en-IN", { maximumFractionDigits: 2 }).format(value);
export const emptyPlayer = (id: number): AuctionPlayer => ({ id, name: "", bid: null });
export const createAuction = (): AuctionDocument => ({
  settings: { kitty: 200, baseBid: 6, playersPerTeam: 8, teamCount: 14 },
  teams: Array.from({ length: 14 }, (_, i) => ({ id: i + 1, name: `Team ${String(i + 1).padStart(2, "0")}`, players: Array.from({ length: 8 }, (_, j) => emptyPlayer(j + 1)) })),
});

export function teamMetrics(team: AuctionTeam, settings: AuctionSettings) {
  const bids = team.players.flatMap(player => player.bid === null ? [] : [player.bid]);
  const spent = round(bids.reduce((sum, bid) => sum + bid, 0));
  const left = round(settings.kitty - spent);
  const bought = bids.length;
  const open = Math.max(0, settings.playersPerTeam - bought);
  const maxBid = open === 0 ? 0 : Math.max(0, round(left - (open - 1) * settings.baseBid));
  // Preserve the workbook's alert precedence; also identify mismatches within each player pair.
  const mismatch = team.players.some(player => Boolean(player.name.trim()) !== (player.bid !== null));
  const status: AuctionStatus = left < 0 ? "OVER BUDGET" : bids.some(bid => bid < settings.baseBid) ? "BELOW BASE" : mismatch ? "CHECK ENTRIES" : open > 0 && left < round(open * settings.baseBid) ? "BASE SHORTFALL" : open === 0 ? "COMPLETE" : "READY";
  return { spent, left, bought, open, maxBid, status, used: settings.kitty ? spent / settings.kitty : 0 };
}

export function leagueMetrics(doc: AuctionDocument) {
  const teams = doc.teams.map(team => teamMetrics(team, doc.settings));
  return {
    kitty: round(doc.settings.kitty * doc.settings.teamCount),
    spent: round(teams.reduce((sum, team) => sum + team.spent, 0)),
    left: round(teams.reduce((sum, team) => sum + team.left, 0)),
    bought: teams.reduce((sum, team) => sum + team.bought, 0),
    open: teams.reduce((sum, team) => sum + team.open, 0),
    complete: teams.filter(team => team.status === "COMPLETE").length,
  };
}

export function validateAuction(value: unknown): AuctionDocument {
  if (!value || typeof value !== "object") throw new Error("Invalid auction document.");
  const doc = value as AuctionDocument;
  const settings = doc.settings;
  if (!settings || ![settings.kitty, settings.baseBid].every(n => typeof n === "number" && Number.isFinite(n) && n > 0 && n <= 1_000_000 && Math.abs(round(n) - n) < 1e-8)) throw new Error("Kitty and base bid must be positive numbers with up to two decimal places.");
  if (!Number.isInteger(settings.teamCount) || settings.teamCount < 1 || settings.teamCount > 64 || !Number.isInteger(settings.playersPerTeam) || settings.playersPerTeam < 1 || settings.playersPerTeam > 32) throw new Error("Use 1–64 teams and 1–32 players per team.");
  if (!Array.isArray(doc.teams) || doc.teams.length !== settings.teamCount) throw new Error("The team count does not match the entries.");
  const ids = new Set<number>();
  const teams = doc.teams.map(team => {
    if (!team || !Number.isInteger(team.id) || team.id < 1 || team.id > 64 || ids.has(team.id)) throw new Error("Team IDs must be unique.");
    ids.add(team.id);
    if (typeof team.name !== "string" || team.name.length > 80) throw new Error("Team names must be 80 characters or fewer.");
    if (!Array.isArray(team.players) || team.players.length !== settings.playersPerTeam) throw new Error("The player count does not match the entries.");
    const players = team.players.map((player, index) => {
      if (!player || player.id !== index + 1 || typeof player.name !== "string" || player.name.length > 80) throw new Error("Invalid player entry.");
      if (player.bid !== null && (typeof player.bid !== "number" || !Number.isFinite(player.bid) || player.bid < settings.baseBid || player.bid > 1_000_000 || Math.abs(round(player.bid) - player.bid) > 1e-8)) throw new Error(`Every entered bid must be at least ${settings.baseBid} lakh, with up to two decimal places.`);
      return { id: player.id, name: player.name.trim(), bid: player.bid };
    });
    return { id: team.id, name: team.name.trim(), players };
  });
  return { settings: { kitty: settings.kitty, baseBid: settings.baseBid, teamCount: settings.teamCount, playersPerTeam: settings.playersPerTeam }, teams };
}
