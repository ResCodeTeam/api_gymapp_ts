import { client } from "../../prisma/client";
import { checkMarcaExists, checkAutorMarca } from "../../helpers/dbHelpers";

class RemoverMarcaService {
  async execute(uId: string, marcaId: string) {
    const exists_dst = await checkMarcaExists(marcaId);
    if (!exists_dst) {
      return { date: "A marca não existe", status: 500 }
    }

    const autor_marca = await client.marcas.findUnique({
      where: {
        marca_id: marcaId
      }
    })
    const isAutor = await checkAutorMarca(uId, marcaId);
    if (!isAutor) {
      return { date: "A marca não lhe pertence", status: 500 }
    }

    const marca = await client.marcas.update({
      data: {
        isDeleted: true,
      },
      where: {
        marca_id: marcaId,
      },
    });

    return {
      data: "Marca removida com sucesso",
      status: 200
    };
  }
}

export { RemoverMarcaService };
