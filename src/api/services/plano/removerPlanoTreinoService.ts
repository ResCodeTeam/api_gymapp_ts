import { client } from "../../prisma/client";
import { checkPlanoTreinoExists, checkTreinadorPlanoTreino, getTreinadorMarca, getTreinadorPlano } from "../../helpers/dbHelpers";

class RemoverPlanoTreinoService {
  async execute(treinadorId: string, planoId: string) {

    const exists_plano = await checkPlanoTreinoExists(planoId);
    if (!exists_plano) {
      return { data: "O plano de treino não existe", status: 500 }
    }

    const autor = await getTreinadorPlano(planoId);
    const marca_treinador_plano = await getTreinadorMarca(autor)
    const marca_treinador = await getTreinadorMarca(treinadorId)

    if (marca_treinador_plano != marca_treinador) {
      return { data: "Não tem autorização", status: 500 }
    }

    await client.planos_treino.update({
      where: {
        plano_treino_id: planoId
      },
      data: {
        isDeleted: true
      }
    })

    return {
      data: "Remover plano de treino com sucesso",
      status: 200
    };
  }
}

export { RemoverPlanoTreinoService };
