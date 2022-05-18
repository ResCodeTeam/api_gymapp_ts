import { client } from "../../prisma/client";
import { checkUserIdExists, findUserDefinicoes } from "../../helpers/dbHelpers";

export class EditarPerfilPrivadoService {
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



