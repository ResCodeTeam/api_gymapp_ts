import { client } from "../../prisma/client";
import { checkDonoGinasio, checkGinasioExists, checkModalidadeExists } from "../../helpers/dbHelpers";

class RemoverModalidadesService {
  async execute(modalidadeId: string, ginasioId:string, uid:string) {
    const exists_dst = await checkModalidadeExists(modalidadeId);
    if (!exists_dst) {
      throw new Error("A modalidade não existe");
    }

    const existsGinasio = await checkGinasioExists(ginasioId);
    if(!existsGinasio){
      throw new Error("Ginasio não existe")
    }

    const isAutor = await checkDonoGinasio(ginasioId, uid);
    if(!isAutor){
      throw new Error("Não possui autorização")
    }

   
    await client.modalidades_ginasio.update({
     where: {
       modalidade_id:modalidadeId
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

export { RemoverModalidadesService };
