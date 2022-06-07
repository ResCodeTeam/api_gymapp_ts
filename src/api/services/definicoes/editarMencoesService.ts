/**
 * @module EditarMencoesService
 */
import { checkUserIdExists } from "../../helpers/dbHelpers";
import { client } from "../../prisma/client";

/**
 * Classe responsavel pelo serviço de edição do estado das menções
 */
export class EditarMencoesService {
  /**
 * Método que permite editar o estado das menções na base de dados tendo em conta todas as verificações necessárias
 * 
 * @param uid id do utilizador
 * @param mencoes estado das mencoes
 */
  async execute(uid: string, mencoes: boolean) {

    const existsUser = await checkUserIdExists(uid);
    if (!existsUser) {
      return { data: "User inexistente", status: 500 }
    }

    const mencoesEdited = await client.definicoes_user.update({
      where: {
        usersuid: uid
      },
      data: {
        mencoes
      }
    })

    return { data: mencoesEdited, status: 200 };
  }
}