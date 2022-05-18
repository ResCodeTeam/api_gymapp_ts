import { client } from "../../prisma/client";
import { checkTreinoExists, checkAutorTreino } from "../../helpers/dbHelpers";

class RemoverTreinosService {
  async execute(uId: string, treinoId: string) {
    const exists_treino = await checkTreinoExists(treinoId);
    if (!exists_treino) {
      throw new Error("O treino não existe");
    }

    const treino = await client.treinos.findUnique({
      where:{
          treino_id:treinoId
      }
    })
    const isAutor = await checkAutorTreino(uId,treinoId);
    if(!isAutor){
      throw new Error("O treino não lhe pertence");
    }

    await client.treinos.update({
      where: {
        treino_id: treinoId
       },
      data:{
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
