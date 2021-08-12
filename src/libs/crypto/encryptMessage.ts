import base64url from "base64url"

import importSecretKey from "./importSecretKey"

/**
 * Converts a string into a Uint8Array containing UTF-8 encoded text.
 */
function getBytes(string: string) {
  const textEncoder = new TextEncoder()
  const encoded = textEncoder.encode(string)

  return encoded
}

/**
 * Encrypts secret message using AES in Galois/Counter Mode.
 *
 * See https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto/encrypt#aes-gcm.
 */
export async function encryptMessage(secret: string) {
  const rawKey = window.crypto.getRandomValues(new Uint8Array(16))
  const secretKey = await importSecretKey(rawKey)
  const encoded = getBytes(secret)
  const iv = window.crypto.getRandomValues(new Uint8Array(12))

  const ciphertext = await window.crypto.subtle.encrypt(
    {
      name: "AES-GCM",
      iv,
    },
    secretKey,
    encoded,
  )

  const sealedSecretArrayBuffer = [Buffer.from(iv), Buffer.from(ciphertext)]
  const sealedSecret = Buffer.concat(sealedSecretArrayBuffer)
  const encryptedBytes = sealedSecret.toString("base64")
  const base64UrlKey = base64url(Buffer.from(rawKey))

  return { key: base64UrlKey, encryptedBytes }
}
