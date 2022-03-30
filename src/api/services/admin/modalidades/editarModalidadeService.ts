import { client } from "../../../prisma/client";
import { checkModalidadeExists } from "../../../helpers/dbHelpers";


interface IEditarModalidades{

    modalidade_id: string
}

class EditarModalidadesService {
  async execute(modalidadeId: string) {
    const exists_dst = await checkModalidadeExists(modalidadeId);
    if (!exists_dst) {
      throw new Error("A modalidade não existe");
    }

    client.modalidades_ginasio.update({
      where: { modalidade_id: modalidadeId },
      data: {
          modalidade_id: modalidadeId
      },
    });

    return {
      msg: "Modalidade removida com sucesso",
    };
  }
}

export { EditarModalidadesService };
