import { generateSessionToken } from "../../helpers/jwtHelpers"
import { client } from "../../prisma/client"


export class RefreshTokenService {
  async execute(refreshToken: string) {
    const userId = (await client.users.findFirst({
      where: {
        refresh_token: refreshToken
      }
    })).uid

    if (!userId) {
      return { data: 'Token invalido', status: 401 }
    }

    const token = await generateSessionToken(userId)
    return { data: token, status: 200 }
  }
}