/**
 * @module ImpedirIdentificacaoService
 */
import { checkUserIdExists } from "../../helpers/dbHelpers";
import { client } from "../../prisma/client";

export class ImpedirIdentificacaoService {
  async execute(uid: string, identificacoes: boolean) {

    const existsUser = await checkUserIdExists(uid);
    if (!existsUser) {
      return { data: "User inexistente", status: 500 }
    }

    const identificacaoEditada = await client.definicoes_user.update({
      where: {
        usersuid: uid
      },
      data: {
        identificacoes
      }
    })

    return { data: identificacaoEditada, status: 200 };
  }
}