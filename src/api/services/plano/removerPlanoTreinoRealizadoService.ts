import { client } from "../../prisma/client";
import { checkPlanoTreinoExists, checkAutorPlanoTreino, checkPlanoTreinoIsRealizado } from "../../helpers/dbHelpers";

class RemoverPlanoTreinoRealizadoService {
  async execute(alunoId: string, planoId: string) {
    const exists_plano = await checkPlanoTreinoExists(planoId);
    if (!exists_plano) {
      throw new Error("O plano de treino não existe");
    }

    const plano_isRealizado = await checkPlanoTreinoIsRealizado(planoId);
    if (!plano_isRealizado) {
      throw new Error("O plano de treino ainda não foi realizado");
    }

    const plano = await client.planos_treino.findUnique({
      where:{
          plano_treino_id:planoId
      }
    })
    const isAutor = await checkAutorPlanoTreino(alunoId,planoId);
    if(!isAutor){
      throw new Error("O plano de treino não lhe pertence");
    }

    await client.planos_treino.update({
     where: {
       plano_treino_id: planoId
      },
     data:{
       isRealizado: false
     }
    })

    return {
      msg: "Remover plano de treino realizado com sucesso",
    };
  }
}

export { RemoverPlanoTreinoRealizadoService };
