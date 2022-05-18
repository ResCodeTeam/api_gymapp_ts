import { client } from "../../prisma/client";
import { checkAtividadeExists } from "../../helpers/dbHelpers";

class RemoverAtividadesService {
  async execute(atividadeId: string) {
    const exists_atividade = await checkAtividadeExists(atividadeId);
    if (!exists_atividade) {
      return { data: "A modalidade não existe", status: 500 }
    }


    await client.atividades.update({
      where: {
        atividade_id: atividadeId
      },
      data: {
        isDeleted: true
      }
    })

    return {
      data: "Atividade removida com sucesso",
      status: 200
    };
  }
}

export { RemoverAtividadesService };
