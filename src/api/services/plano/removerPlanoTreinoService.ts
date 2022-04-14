import { client } from "../../prisma/client";
import { checkPlanoTreinoExists } from "../../helpers/dbHelpers";

class RemoverPlanoTreinoService {
  async execute(planoId: string) {
    const exists_plano = await checkPlanoTreinoExists(planoId);
    if (!exists_plano) {
      throw new Error("O plano de treino não existe");
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
      msg: "Remover plano de treino realizado com sucesso",
    };
  }
}

export { RemoverPlanoTreinoService };
