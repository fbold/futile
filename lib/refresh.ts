import { sealData, unsealData } from "iron-session"

export interface RefreshToken {
  userId: string
  authControlKey: string
  expires: number
}

const refreshTokenTTL = 30 * 24 * 60 * 60

const refreshTokenOptions = {
  password: process.env.REFRESH_TOKEN_PASSWORD!,
  ttl: refreshTokenTTL,
}

export const getRefreshToken = async (
  userId: string,
  authControlKey: string
) => {
  const refreshToken = await sealData(
    {
      userId,
      authControlKey,
      expires: Date.now() + refreshTokenTTL * 1000, // 30 days from now
    },
    refreshTokenOptions
  )
  return refreshToken
}

export const extractRefreshToken = async (sealedToken: string) => {
  return await unsealData<RefreshToken>(sealedToken, refreshTokenOptions)
}
