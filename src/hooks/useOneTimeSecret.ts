import { format } from "date-fns"
import { useState } from "react"

import siteConfig from "~/config/siteConfig"
import api from "~/services/api"
import { Region } from "~/types"
import { encryptMessage } from "~/utils/crypto"

export type OneTimeSecret = {
  url: string
  expiresAt: string
}

const useOneTimeSecret = () => {
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState<OneTimeSecret | null>(null)
  const [error, setError] = useState<Error | null>(null)

  const clear = () => {
    setLoading(false)
    setData(null)
    setError(null)
  }

  const createOneTimeSecret = async ({
    region,
    secret,
    expiresIn,
  }: {
    region: Region
    secret: string
    expiresIn: number
  }) => {
    try {
      if (secret.trim().length === 0) {
        throw new Error("secret must be a non-empty string")
      }

      setLoading(true)

      // Encrypt secret.
      const { encryptedBytes, key } = await encryptMessage(secret)

      // Create OTS.
      const ots = await api.createSecret({
        region,
        encryptedBytes,
        expiresIn,
      })

      // Print One-time URL.
      const oneTimeUrl = new URL(`${siteConfig.url}/view/${ots.id}`)

      oneTimeUrl.searchParams.append("region", region)
      oneTimeUrl.searchParams.append("ref", "web")

      // Append key as a URL fragment to ensure it never sent in a server request.
      oneTimeUrl.hash = key

      const url = oneTimeUrl.href
      const expiresAt = format(ots.expiresAt * 1_000, "d LLL y hh:mm:ss")

      setData({
        url,
        expiresAt,
      })

      setLoading(false)
    } catch (error) {
      setError({
        name: "CreateOneTimeSecretFailed",
        message: "Sorry, something went wrong. Please try again.",
      })
      setLoading(false)
    }
  }

  return { createOneTimeSecret, data, loading, clear, error }
}

export default useOneTimeSecret
