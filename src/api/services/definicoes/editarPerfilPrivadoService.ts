/**
 * @module EditarPerfilPrivadoService
 */
import { client } from "../../prisma/client";
import { checkUserIdExists, findUserDefinicoes } from "../../helpers/dbHelpers";

/**
 * Classe responsavel pelo serviço de edição da privacidade do perfil
 */
export class EditarPerfilPrivadoService {
  /**
 * Método que permite editar a privacidade de um perfil na base de dados tendo em conta todas as verificações necessárias
 * 
 * @param uid id do utilizador
 * @param is_privado privacidade do perfil
 */
  async execute(uId: string, is_privado: boolean) {
    const existsUser = await checkUserIdExists(uId);
    if (!existsUser) {
      return { data: "Utilizador inexistente", status: 500 }
    }

    const defId = await findUserDefinicoes(uId);

    const perfilEdited = await client.definicoes_user.update({
      where: {
        usersuid: uId
      },
      data: {
        is_privado
      }
    })
    return { data: perfilEdited, status: 200 };
  }
}



