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

const getSecret = async ({ region = Region.EU, secretId }: GetOtsRequest) =>
  await client
    .get(`secrets/${secretId}`, {
      prefixUrl: getPrefixUrl(region),
    })
    .json<GetOtsResponse>()

const api = {
  createSecret,
  getSecret,
}

export default api
