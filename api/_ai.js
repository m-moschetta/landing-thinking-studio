/**
 * Cloudflare AI Gateway utility
 * Pattern from: github.com/fatturai/web-monorepo/apps/web/server/utils/ai.ts
 *
 * Routes xAI calls through Cloudflare AI Gateway for:
 * - Request caching
 * - Usage analytics
 * - Rate limiting
 * - Model fallback
 *
 * Falls back to direct xAI endpoint if Cloudflare vars are not set.
 */

const XAI_BASE = "https://api.x.ai/v1";

function getGatewayBase() {
  const accountId = process.env.CLOUDFLARE_ACCOUNT_ID;
  const gatewayId = process.env.CLOUDFLARE_AI_GATEWAY_ID;

  if (!accountId || !gatewayId) return XAI_BASE;

  return `https://gateway.ai.cloudflare.com/v1/${accountId}/${gatewayId}/xai/v1`;
}

/**
 * Calls the xAI chat completions endpoint via Cloudflare AI Gateway.
 * @param {string} apiKey - xAI API key
 * @param {{ model: string, messages: object[], max_tokens?: number, temperature?: number }} options
 * @returns {Promise<Response>}
 */
export function chatCompletion(apiKey, options) {
  const base = getGatewayBase();

  return fetch(`${base}/chat/completions`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify(options),
  });
}
