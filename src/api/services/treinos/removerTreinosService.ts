import { client } from "../../prisma/client";
import { checkTreinoExists } from "../../helpers/dbHelpers";

class RemoverTreinosService {
  async execute(treinoId: string) {
    const exists_treino = await checkTreinoExists(treinoId);
    if (!exists_treino) {
      throw new Error("O treino não existe");
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
      msg: "Treino removido com sucesso",
    };
  }
}

export { RemoverTreinosService };
