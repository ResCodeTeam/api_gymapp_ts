import { checkSubmissaoExists, checkAutorSubmissaoDesafio, checkDesafioIdExists, checkIsSubmissaoDesafio, getDesafio, getMarcaGym, getTreinadorMarca } from "../../../helpers/dbHelpers";
import { client } from "../../../prisma/client";

export class RemoverSubmissaoDesafioService{
  async execute(uid:string,submissaoId:string, desafioId:string){
    
    const existsDesafio = await checkDesafioIdExists(desafioId);
    if(!existsDesafio){
      throw new Error("Desafio inexistente")
    }

    const isSubmissaoDesafio = await checkIsSubmissaoDesafio(desafioId,submissaoId);
    if(!isSubmissaoDesafio){
      throw new Error("Não é submissao do desafio")
    }

    const exists_submissao = await checkSubmissaoExists(submissaoId);
    if(!exists_submissao){
      throw new Error("A submissao do desafio não existe")
    }

    const desafio = await getDesafio(desafioId);
    const gymDesafio=desafio.ginasio_id;
    const marca = await getMarcaGym(gymDesafio);
    
    const marca_treinador = await getTreinadorMarca(uid)
    if(marca_treinador != marca.marca_id){
      throw new Error("Não tem autorização");
    }
    
    const submissoes = await client.submissoes_desafios.delete({
        where:{
            submissao_id: submissaoId
        },
      })

    return {"msg": "submissao removida com sucesso"}

  }
}