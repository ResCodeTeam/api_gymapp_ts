/**
 * @module ImpedirIdentificacaoService
 */
import { checkUserIdExists } from "../../helpers/dbHelpers";
import { client } from "../../prisma/client";

/**
 * Classe responsavel pelo serviço de edição do estado das identificações
 */
export class ImpedirIdentificacaoService {
  /**
 * Método que permite edotar o estado das identificações na base de dados tendo em conta todas as verificações necessárias
 * 
 * @param uid id do utilizador
 * @param identificacoes estado das identificações
 */
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