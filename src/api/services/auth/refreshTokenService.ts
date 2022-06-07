/**
 * @module RefreshTokenService
 */
import { verify } from "jsonwebtoken";
import { generateSessionToken } from "../../helpers/jwtHelpers"
import { client } from "../../prisma/client"

/**
 * Classe responsavel pelo serviço que permite obter um novo token
 */
export class RefreshTokenService {
  /**
   * Método que permite gerar um novo token de sessão para um utilizador tendo em conta o seu refresh token
   * @param refreshToken token de refresh
   * @returns 
   */
  async execute(refreshToken: string) {
    const userId = (await client.users.findFirst({
      where: {
        refresh_token: refreshToken
      }
    })).uid

    if (!userId) {
      return { data: 'Token invalido', status: 401 }
    }

    try {
      verify(refreshToken, process.env.SECRET_KEY_REFRESH_TOKEN);
    } catch (e) {
      return { data: { 'msg': 'Sessão invalida' }, status: 401 }
    }

    const token = await generateSessionToken(userId)
    return { data: token, status: 200 }
  }
}