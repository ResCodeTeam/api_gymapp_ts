import { client } from "../../prisma/client";
import { checkGinasioExists, getMarcaGym } from "../../helpers/dbHelpers";

class RemoverGinasioService {
  async execute(uId: string, ginasioId: string) {
    const exists_ginasio = await checkGinasioExists(ginasioId);
    if (!exists_ginasio) {
      throw new Error("O ginasio não existe");
    }

    const marca = await getMarcaGym(ginasioId);
    marca.dono_id

    if(marca.dono_id != uId){
      throw new Error ("Não possui autorização");
    }
    
    await client.ginasio.update({
      where: {
        ginasio_id: ginasioId
       },
      data:{
        isDeleted: true
      }
    })

    return {
      data: "Ginásio removido com sucesso",
      status: 200
    };
  }
}

export { RemoverGinasioService };
