import { checkSubmissaoExists, checkAutorSubmissaoDesafio } from "../../../helpers/dbHelpers";
import { client } from "../../../prisma/client";

export class RemoverSubmissaoDesafioService{
  async execute(uid:string,submissaoId:string){
    
    const exists_submissao = await checkSubmissaoExists(submissaoId);
    if(!exists_submissao){
      throw new Error("A submissao do desafio não existe")
    }
    
    const isAutorSubmissao = await checkAutorSubmissaoDesafio(uid,submissaoId);
    if(!isAutorSubmissao){
      throw new Error("Não possui autorização para realizar esta operação")
    }

    const submissoes = await client.submissoes_desafios.delete({
        where:{
            submissao_id: submissaoId
        },
      })

    return submissoes

  }
}