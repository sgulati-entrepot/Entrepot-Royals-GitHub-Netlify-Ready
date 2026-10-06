import { createHmac, randomBytes, timingSafeEqual } from "node:crypto";

export const PRICING_COOKIE_NAME = "entrepot_pricing_session";
export const PRICING_SESSION_MAX_AGE = 8 * 60 * 60;

const sign = (payload: string, secret: string) =>
  createHmac("sha256", secret).update(payload).digest("base64url");

const secureEqual = (left: string, right: string) => {
  const leftBuffer = Buffer.from(left);
  const rightBuffer = Buffer.from(right);
  return leftBuffer.length === rightBuffer.length && timingSafeEqual(leftBuffer, rightBuffer);
};

const readCookie = (request: Request, name: string) => {
  const cookieHeader = request.headers.get("cookie") ?? "";
  for (const cookie of cookieHeader.split(";")) {
    const separator = cookie.indexOf("=");
    if (separator < 0) continue;
    if (cookie.slice(0, separator).trim() === name) {
      return decodeURIComponent(cookie.slice(separator + 1).trim());
    }
  }
  return null;
};

export const verifyPin = (submittedPin: string, configuredPin: string) =>
  secureEqual(submittedPin, configuredPin);

export const createPricingSession = (secret: string) => {
  const expiresAt = Math.floor(Date.now() / 1000) + PRICING_SESSION_MAX_AGE;
  const payload = `${expiresAt}.${randomBytes(18).toString("base64url")}`;
  return `${payload}.${sign(payload, secret)}`;
};

export const isPricingAuthorized = (request: Request) => {
  const secret = process.env.PRICING_SESSION_SECRET?.trim();
  const token = readCookie(request, PRICING_COOKIE_NAME);
  if (!secret || !token) return false;

  const parts = token.split(".");
  if (parts.length !== 3) return false;
  const [expiresAtValue, nonce, signature] = parts;
  const expiresAt = Number(expiresAtValue);
  if (!Number.isSafeInteger(expiresAt) || expiresAt <= Math.floor(Date.now() / 1000)) return false;

  const payload = `${expiresAtValue}.${nonce}`;
  return secureEqual(signature, sign(payload, secret));
};

export const pricingSessionCookie = (token: string) =>
  `${PRICING_COOKIE_NAME}=${encodeURIComponent(token)}; Path=/; HttpOnly; Secure; SameSite=Strict; Max-Age=${PRICING_SESSION_MAX_AGE}`;

export const clearPricingSessionCookie = () =>
  `${PRICING_COOKIE_NAME}=; Path=/; HttpOnly; Secure; SameSite=Strict; Max-Age=0`;
