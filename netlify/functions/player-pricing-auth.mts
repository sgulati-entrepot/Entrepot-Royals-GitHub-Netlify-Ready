import type { Config } from "@netlify/functions";
import {
  clearPricingSessionCookie,
  createPricingSession,
  isPricingAuthorized,
  pricingSessionCookie,
  verifyPin,
} from "./lib/pricing-auth";

const json = (body: unknown, status = 200, headers: HeadersInit = {}) =>
  Response.json(body, {
    status,
    headers: {
      "cache-control": "no-store",
      "content-type": "application/json; charset=utf-8",
      ...headers,
    },
  });

const handler = async (request: Request) => {
  if (request.method === "GET") {
    const authorized = isPricingAuthorized(request);
    return json({ authorized }, authorized ? 200 : 401);
  }

  if (request.method === "DELETE") {
    return json({ authorized: false }, 200, { "set-cookie": clearPricingSessionCookie() });
  }

  if (request.method !== "POST") return json({ error: "Method not allowed." }, 405);

  const configuredPin = process.env.PRICING_PAGE_PIN?.trim();
  const sessionSecret = process.env.PRICING_SESSION_SECRET?.trim();
  if (!configuredPin || !sessionSecret) {
    console.error("Player pricing authentication is not configured.");
    return json({ error: "Private access is temporarily unavailable." }, 503);
  }

  let submittedPin = "";
  try {
    const payload = (await request.json()) as { pin?: unknown };
    submittedPin = typeof payload.pin === "string" ? payload.pin.trim() : "";
  } catch {
    return json({ error: "Enter the six-digit PIN." }, 400);
  }

  if (!/^\d{6}$/.test(submittedPin) || !verifyPin(submittedPin, configuredPin)) {
    await new Promise((resolve) => setTimeout(resolve, 350));
    return json({ error: "The PIN is incorrect. Please try again." }, 401);
  }

  const token = createPricingSession(sessionSecret);
  return json({ authorized: true }, 200, { "set-cookie": pricingSessionCookie(token) });
};

export default handler;

export const config: Config = {
  path: "/api/player-pricing-auth",
};
