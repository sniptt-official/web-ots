/*
  Import an AES secret key from an ArrayBuffer containing the raw bytes.
  Takes an ArrayBuffer string containing the bytes, and returns a Promise
  that will resolve to a CryptoKey representing the secret key.
  */
export default function importSecretKey(rawKey: Uint8Array) {
  return window.crypto.subtle.importKey("raw", rawKey, "AES-GCM", true, [
    "encrypt",
    "decrypt",
  ])
}
