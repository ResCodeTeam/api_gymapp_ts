import { checkDesafioIdExists } from "../../../helpers/dbHelpers";
import { client } from "../../../prisma/client";


export class RemoverDesafiosService {
  async execute(desafioId: string) {
    const exists_desafioId = await checkDesafioIdExists(desafioId);
    if (!exists_desafioId) {
      throw new Error("A modalidade não existe");
    }

   
    await client.desafios.update({
     where: {
       desafio_id:desafioId
      },
     data:{
       isDeleted: true
     }
    })

    return {
      msg: "Modalidade removida com sucesso",
    };
  }
}




