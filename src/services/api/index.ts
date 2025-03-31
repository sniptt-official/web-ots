import ky from "ky"

import config from "~/config"
import {   CreateOtsRequest,
  CreateOtsResponse,
  GetOtsRequest,
  GetOtsResponse,
Region ,
} from "~/services/api/types"

/**
 * Default public API keys for each region.
 *
 * These are intentionally public and shared across all users to implement
 * global rate limiting on the service. For higher rate limits or production
 * usage, users should obtain their own API keys.
 */
const API_KEYS = {
  [Region.US]: "V3aFLdJneB21Cyd5m6peY7TEMy9H13kH3KQUHGnC",
  [Region.EU]: "xLNkEyYKlS4Fu3ieSZtjY34rG9DeQXeY3a3QvGwA",
}

const client = ky.extend({
  hooks: {
    beforeRequest: [
      (request) => {
        request.headers.set("Content-Type", "application/json")
        request.headers.set("X-Client-Name", location.toString())
        // Get the region from the URL
        const url = new URL(request.url)
        const region = url.hostname.split(".")[1] as Region

        request.headers.set("X-API-Key", API_KEYS[region])
      },
    ],
  },
})

function getPrefixUrl(region: Region) {
  return `https://ots.${region}.${config.api.baseUrl}`
}

/**
 * Creates a new One-Time Secret.
 *
 * By default, all One-Time Secrets are created in the US
 * region with an expiration of 24 hours.
 */
const createSecret = async ({
  region = Region.EU,
  encryptedBytes,
  expiresIn = 86_400,
}: CreateOtsRequest) =>
  await client
    .post("secrets", {
      json: {
        encryptedBytes,
        expiresIn,
      },
      prefixUrl: getPrefixUrl(region),
    })
    .json<CreateOtsResponse>()

/**
 * Detects if the request is from a preview bot by checking the User-Agent header.
 * This is a simple but effective way to identify preview requests from major platforms.
 *
 * Sources:
 * - Slack: https://api.slack.com/robots
 * - Facebook: https://developers.facebook.com/docs/sharing/webmasters/crawler
 * - Twitter: https://developer.twitter.com/en/docs/twitter-for-websites/cards/guides/getting-started#crawler
 * - LinkedIn: https://www.linkedin.com/robots.txt
 */
function isPreviewBot() {
  if (typeof window === 'undefined') return false;

  const userAgent = window.navigator.userAgent.toLowerCase();

  // Known preview bot patterns
  const previewBots = [
    // Slack preview bots (version-agnostic)
    'slackbot-linkexpanding',
    'slack-imgproxy',
    'slackbot',

    // Other common preview bots
    'facebookexternalhit',
    'twitterbot',
    'linkedinbot',  // From LinkedIn's robots.txt
  ];

  return previewBots.some(bot => userAgent.includes(bot));
}

const getSecret = async ({ region = Region.EU, secretId }: GetOtsRequest) => {
  // Silently skip fetching if it's a preview bot
  if (isPreviewBot()) {
    return null;
  }

  return await client
    .get(`secrets/${secretId}`, {
      prefixUrl: getPrefixUrl(region),
    })
    .json<GetOtsResponse>();
}

const api = {
  createSecret,
  getSecret,
}

export default api
