import { getDatabase } from "@netlify/database";
import type { Config } from "@netlify/functions";
import { isPricingAuthorized } from "./lib/pricing-auth";
import { createAuction, validateAuction } from "../../lib/auction";

const json = (body: unknown, status = 200) => Response.json(body, { status, headers: { "cache-control": "private, no-store" } });

export default async function handler(request: Request) {
  if (!["GET", "PUT"].includes(request.method)) return json({ error: "Method not allowed." }, 405);
  if (!isPricingAuthorized(request)) return json({ error: "Please unlock the Auction page again." }, 401);
  if (request.method === "PUT" && request.headers.get("origin") && request.headers.get("origin") !== new URL(request.url).origin) return json({ error: "Invalid request origin." }, 403);
  try {
    const db = getDatabase();
    if (request.method === "GET") {
      const rows = await db.sql`SELECT document, version, updated_at FROM recl5_auction WHERE id = 1`;
      const row = rows[0];
      return json({ document: row?.document ?? createAuction(), version: row ? String(row.version) : null, updatedAt: row?.updated_at ?? null });
    }
    const body = await request.text();
    if (body.length > 500_000) return json({ error: "The auction document is too large." }, 413);
    let payload;
    try { payload = JSON.parse(body); } catch { return json({ error: "Invalid JSON." }, 400); }
    if (!payload || typeof payload !== "object") return json({ error: "Invalid save request." }, 400);
    let document;
    try { document = validateAuction(payload.document); } catch (error) { return json({ error: error instanceof Error ? error.message : "Invalid entries." }, 400); }
    if (payload.version !== null && (typeof payload.version !== "string" || !/^\d{1,9}$/.test(payload.version))) return json({ error: "Invalid document version." }, 400);
    const serialized = JSON.stringify(document);
    // A single atomic statement accepts only the exact version the editor loaded.
    const result = payload.version === null
      ? await db.sql`INSERT INTO recl5_auction (id, document, version) VALUES (1, ${serialized}::jsonb, 1) ON CONFLICT (id) DO NOTHING RETURNING version, updated_at`
      : await db.sql`UPDATE recl5_auction SET document = ${serialized}::jsonb, version = version + 1, updated_at = now() WHERE id = 1 AND version = ${Number(payload.version)} RETURNING version, updated_at`;
    if (!result.length) return json({ error: "Another session saved changes. Export your entries if needed, then load the latest saved version before editing again." }, 409);
    return json({ document, version: String(result[0].version), updatedAt: result[0].updated_at });
  } catch (error) {
    console.error("Auction document request failed", error);
    return json({ error: "The auction could not be loaded or saved. Please retry; your on-screen entries have been kept." }, 500);
  }
}
export const config: Config = { path: "/api/auction" };
