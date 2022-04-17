import { checkGostoPublicacaoExists } from "../../../helpers/dbHelpers";
import { client } from "../../../prisma/client";

export class RemoverGostoPublicacaoService{
  async execute(publicacaoId:string, userId:string){
    const gosto = await checkGostoPublicacaoExists(publicacaoId,userId)
    if(gosto==null){
      throw new Error("Gosto inexistente")
    }

    await client.gostos_publicacao.delete({
      where:{
        gosto_id:gosto.gosto_id
      }
    })

    return {"msg":"gosto removido com sucesso"}

  }
}