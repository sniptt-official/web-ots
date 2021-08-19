import base64url from "base64url"

import importSecretKey from "./importSecretKey"

const ivLength = 12

/**
 * Decrypts encrypted data using the key appended to the shared One-Time URL.
 *
 * See https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto/decrypt.
 */
export async function decryptMessage(key: string, encryptedBytes: string) {
  const rawKey = base64url.toBuffer(decodeURI(key))
  const secretKey = await importSecretKey(rawKey)
  const sealedSecret = Buffer.from(encryptedBytes, "base64")
  const iv = sealedSecret.slice(0, ivLength)
  const ciphertext = sealedSecret.slice(ivLength, sealedSecret.length)

  const decrypted = await window.crypto.subtle.decrypt(
    {
      name: "AES-GCM",
      iv,
    },
    secretKey,
    ciphertext,
  )

  const textDecoder = new TextDecoder()
  const decryptedMessage = textDecoder.decode(decrypted)

  return decryptedMessage
}
