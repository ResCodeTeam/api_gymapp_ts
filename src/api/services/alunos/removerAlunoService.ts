import { client } from "../../prisma/client";
import { checkDonoMarca, checkEmail, checkPlanoTreinoIsRealizado, checkUserIdExists, getAlunoMarca } from "../../helpers/dbHelpers";


export class RemoverAlunoService {
  async execute(uId: string, adminId: string) {
    const exists_user = await checkUserIdExists(uId);
    if (!exists_user) {
      return { date: "O user não existe", status: 500 }
    }

    const marcaId = await getAlunoMarca(uId);
    await checkDonoMarca(marcaId, adminId);

    const removerAluno = await client.users.update({
      where: {
        uid: uId,

      },
      data: {
        isDeleted: true
      }
    })

    return {data: removerAluno, status: 200};
  }
}


