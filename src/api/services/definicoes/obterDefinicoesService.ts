/**
 * @module ObterDefinicoesService
 */
import { client } from "../../prisma/client";

/**
 * Classe responsavel pelo serviço que serve para obter as definições de um utilizador
 */
export class ObterDefinicoesService {
  async execute(uid: string) {

    const def = await client.users.findFirst({
      where: {
        uid,
        isDeleted: false,
      },
      select: {
        definicoes_user: true
      }
    })


    const definicoes = def.definicoes_user
    return { data: definicoes, status: 200 };
  }
}