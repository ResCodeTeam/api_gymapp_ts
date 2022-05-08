import { client } from "../../prisma/client";
import { checkPlanoTreinoExists, checkTreinadorPlanoTreino } from "../../helpers/dbHelpers";

class RemoverPlanoTreinoService {
  async execute(treinadorId: string, planoId: string) {

    const exists_plano = await checkPlanoTreinoExists(planoId);
    if (!exists_plano) {
      throw new Error("O plano de treino não existe");
    }

    const plano = await client.planos_treino.findUnique({
      where:{
          plano_treino_id:planoId
      }
    })
    const isAutor = await checkTreinadorPlanoTreino(treinadorId,planoId);
    if(!isAutor){
      throw new Error("O plano de treino não lhe pertence");
    }
    
    await client.planos_treino.update({
     where: {
       plano_treino_id: planoId
      },
     data:{
       isDeleted: true
     }
    })

    return {
      msg: "Remover plano de treino com sucesso",
    };
  }
}

export { RemoverPlanoTreinoService };
