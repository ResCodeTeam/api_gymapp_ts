import { client } from "../../prisma/client";
import { checkTreinoExists, checkAutorTreino } from "../../helpers/dbHelpers";

class RemoverTreinosService {
  async execute(uId: string, treinoId: string) {
    const exists_treino = await checkTreinoExists(treinoId);
    if (!exists_treino) {
      return { date: "O treino não existe", status: 500 }
    }

    const treino = await client.treinos.findUnique({
      where: {
        treino_id: treinoId
      }
    })
    const isAutor = await checkAutorTreino(uId, treinoId);
    if (!isAutor) {
      return { date: "O treino não lhe pertence", status: 500 }
    }

    await client.treinos.update({
      where: {
        treino_id: treinoId
      },
      data: {
        isDeleted: true
      }
    })

    return {
      data: "Treino removido com sucesso",
      status: 200
    };
  }
}

export { RemoverTreinosService };
