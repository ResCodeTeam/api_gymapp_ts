import { client } from "../../../prisma/client";
import { checkModalidadeExists } from "../../../helpers/dbHelpers";

class RemoverModalidadesService {
  async execute(modalidadeId: string) {
    const exists_dst = await checkModalidadeExists(modalidadeId);
    if (!exists_dst) {
      throw new Error("A modalidade não existe");
    }

    client.modalidades_ginasio.delete({
      where: { modalidade_id: modalidadeId },
    });

    return {
      msg: "Modalidade removida com sucesso",
    };
  }
}

export { RemoverModalidadesService };
