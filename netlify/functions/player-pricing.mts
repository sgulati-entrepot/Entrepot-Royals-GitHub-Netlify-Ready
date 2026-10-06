import { getStore } from "@netlify/blobs";
import type { Config } from "@netlify/functions";
import { isPricingAuthorized } from "./lib/pricing-auth";

const TOTAL_ALLOCATION = 20_000_000;
const PLAYER_COUNT = 8;
const STORE_KEY = "current";

type PlayerPrice = {
  id: number;
  name: string;
  price: number;
};

type PricingRecord = {
  allocation: number;
  players: PlayerPrice[];
  updatedAt: string | null;
  revision: number;
};

type SavePayload = {
  players?: unknown;
  version?: unknown;
};

const defaultPlayers: PlayerPrice[] = Array.from({ length: PLAYER_COUNT }, (_, index) => ({
  id: index + 1,
  name: index === 0 ? "Sajeev Gulati" : index === 1 ? "Divyesh Kharade" : "",
  price: 0,
}));

const defaultRecord = (): PricingRecord => ({
  allocation: TOTAL_ALLOCATION,
  players: defaultPlayers,
  updatedAt: null,
  revision: 0,
});

const json = (body: unknown, status = 200) =>
  Response.json(body, {
    status,
    headers: {
      "cache-control": "no-store",
      "content-type": "application/json; charset=utf-8",
    },
  });

const validatePlayers = (value: unknown): { players?: PlayerPrice[]; error?: string } => {
  if (!Array.isArray(value) || value.length !== PLAYER_COUNT) {
    return { error: `Exactly ${PLAYER_COUNT} players are required.` };
  }

  const ids = new Set<number>();
  const players: PlayerPrice[] = [];

  for (const entry of value) {
    if (!entry || typeof entry !== "object") return { error: "Every player entry must be an object." };
    const candidate = entry as Partial<PlayerPrice>;
    const id = candidate.id;
    const name = typeof candidate.name === "string" ? candidate.name.trim() : "";
    const price = candidate.price;

    if (typeof id !== "number" || !Number.isInteger(id) || id < 1 || id > PLAYER_COUNT || ids.has(id)) {
      return { error: "Player positions must be unique numbers from 1 to 8." };
    }
    if (name.length > 80) return { error: `Player ${id}'s name must be 80 characters or fewer.` };
    if (typeof price !== "number" || !Number.isSafeInteger(price) || price < 0 || price > TOTAL_ALLOCATION) {
      return { error: `Player ${id}'s purchase points must be a whole number between 0 and ${TOTAL_ALLOCATION}.` };
    }

    ids.add(id);
    players.push({ id, name, price });
  }

  players.sort((a, b) => a.id - b.id);
  const totalSpent = players.reduce((sum, player) => sum + player.price, 0);
  if (totalSpent > TOTAL_ALLOCATION) {
    return { error: `The total purchase points cannot exceed the ${TOTAL_ALLOCATION}-point allocation.` };
  }

  return { players };
};

const handler = async (request: Request) => {
  if (request.method !== "GET" && request.method !== "PUT") {
    return json({ error: "Method not allowed." }, 405);
  }

  if (!isPricingAuthorized(request)) {
    return json({ error: "Enter the page PIN to access player pricing." }, 401);
  }

  try {
    const store = getStore({ name: "entrepot-player-pricing", consistency: "strong" });
    const existing = await store.getWithMetadata(STORE_KEY, { type: "json" });
    const record = (existing?.data as PricingRecord | undefined) ?? defaultRecord();
    const version = existing?.etag ?? null;

    if (request.method === "GET") return json({ ...record, version });

    const contentLength = Number(request.headers.get("content-length") ?? 0);
    if (contentLength > 25_000) return json({ error: "Request is too large." }, 413);

    let payload: SavePayload;
    try {
      payload = (await request.json()) as SavePayload;
    } catch {
      return json({ error: "The request body must be valid JSON." }, 400);
    }

    const validation = validatePlayers(payload.players);
    if (!validation.players) return json({ error: validation.error }, 400);

    const submittedVersion = typeof payload.version === "string" ? payload.version : null;
    if (submittedVersion !== version) {
      return json({ error: "Pricing was changed in another session. Reload the latest version before saving." }, 409);
    }

    const nextRecord: PricingRecord = {
      allocation: TOTAL_ALLOCATION,
      players: validation.players,
      updatedAt: new Date().toISOString(),
      revision: record.revision + 1,
    };

    const result = existing
      ? await store.setJSON(STORE_KEY, nextRecord, { onlyIfMatch: existing.etag })
      : await store.setJSON(STORE_KEY, nextRecord, { onlyIfNew: true });

    if (!result.modified) {
      return json({ error: "Pricing changed while this save was in progress. Reload and try again." }, 409);
    }

    return json({ ...nextRecord, version: result.etag ?? null });
  } catch (error) {
    console.error("Player pricing function failed", error);
    return json({ error: "The pricing service is temporarily unavailable. Please try again." }, 500);
  }
};

export default handler;

export const config: Config = {
  path: "/api/player-pricing",
};
