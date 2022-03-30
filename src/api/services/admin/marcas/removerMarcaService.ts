import { client } from "../../../prisma/client";
import { checkMarcaExists } from "../../../helpers/dbHelpers";

interface IMarca{
  marca_id :string
}
class RemoverMarcaService {
  async execute({marca_id} : IMarca) {

    const exists_dst = await checkMarcaExists(marca_id);
    if (!exists_dst) {
      throw new Error("A marca não existe");
    }

    const marca = await client.marca.update({isDeleted:true},
        {where: {
          marca_id: marca_id
        }});


    return {
      msg: "Marca removida com sucesso",
    };
  }
}

export { RemoverMarcaService };
