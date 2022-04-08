import { client } from "../../prisma/client";
import { checkMarcaExists } from "../../helpers/dbHelpers";

interface IMarca{
  marcaId :string
}
class RemoverMarcaService {
  async execute({marcaId} : IMarca) {

    const exists_dst = await checkMarcaExists(marcaId);
    if (!exists_dst) {
      throw new Error("A marca não existe");
    }

    const marca = await client.marcas.update({
        data: {
          isDeleted: true,
        },
        where:{
          marca_id: marcaId,
        },
    });

    return {
      msg: "Marca removida com sucesso",
    };
  }
}

export { RemoverMarcaService };
