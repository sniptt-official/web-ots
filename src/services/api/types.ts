export enum Region {
  US = "us-east-1", // US East (N. Virginia)
  EU = "eu-central-1", // Frankfurt
}

export type CreateOtsRequest = {
  region: Region
  encryptedBytes: string
  expiresIn: number
}

export type CreateOtsResponse = {
  id: string
  expiresAt: number
}

export type GetOtsRequest = {
  region: Region
  secretId: string
}

export type GetOtsResponse = {
  id: string
  encryptedBytes: string
  expiresAt: number
}
