import { client } from "../../prisma/client";
import { checkPlanoTreinoExists, checkAutorPlanoTreino, checkPlanoTreinoIsRealizado } from "../../helpers/dbHelpers";

class EditarPlanoTreinoRealizadoService {
  async execute(alunoId: string, planoId: string) {
    const exists_plano = await checkPlanoTreinoExists(planoId);
    if (!exists_plano) {
      return { date: "O plano de treino não existe", status: 500 }
    }

    const plano_isRealizado = await checkPlanoTreinoIsRealizado(planoId);
    if (plano_isRealizado) {
      return { date: "O plano de treino já foi realizado", status: 500 }
    }

    const plano = await client.planos_treino.findUnique({
      where: {
        plano_treino_id: planoId
      }
    })
    const isAutor = await checkAutorPlanoTreino(alunoId, planoId);
    if (!isAutor) {
      return { date: "O plano de treino não lhe pertence", status: 500 }
    }

    const update = await client.planos_treino.update({
      where: {
        plano_treino_id: planoId
      },
      data: {
        isRealizado: true
      }
    })

    return {data: update, status: 200};
  }
}

export { EditarPlanoTreinoRealizadoService };
