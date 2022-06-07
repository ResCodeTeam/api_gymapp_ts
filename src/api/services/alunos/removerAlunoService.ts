/**
 * @module RemoverAlunoService
 */
import { client } from "../../prisma/client";
import { checkDonoMarca, checkUserIdExists, getAlunoMarca } from "../../helpers/dbHelpers";

/**
 * Classe responsavel pelo serviço de remoção de um aluno
 */
export class RemoverAlunoService {
  async execute(uId: string, adminId: string) {
    const exists_user = await checkUserIdExists(uId);
    if (!exists_user) {
      return { data: "O user não existe", status: 500 }
    }

    const marcaId = await getAlunoMarca(uId);
    const dono = await checkDonoMarca(marcaId, adminId);
    if(!dono)
    {
      return { data: "Não possui autorização", status: 500 }
    }

    const removerAluno = await client.users.update({
      where: {
        uid: uId,

      },
      data: {
        isDeleted: true
      }
    })

    return { data: removerAluno, status: 200 };
  }
}


