import ky from "ky"

import config from "~/config"
import { Region } from "~/types"

import {
  CreateOtsRequest,
  CreateOtsResponse,
  GetOtsRequest,
  GetOtsResponse,
} from "./types"

const client = ky.extend({
  hooks: {
    beforeRequest: [
      (request) => {
        request.headers.set("Content-Type", "application/json")
        request.headers.set("X-Client-Name", location.toString())
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
