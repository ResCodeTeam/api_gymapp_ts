import { checkAutorPublicacoes, checkGostoPublicacaoExists, checkPublicacaoExists } from "../../../helpers/dbHelpers";
import { client } from "../../../prisma/client";

export class RemoverGostoPublicacaoService{
  async execute(publicacaoId:string, userId:string){
    
    const publicacao = await checkPublicacaoExists(publicacaoId)
    if(!publicacao){
      throw new Error("Publicação inexistente")
    }

    const autor = await checkAutorPublicacoes(userId, publicacaoId)
    if(!autor){
      throw new Error("Não possui autorização")
    }

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