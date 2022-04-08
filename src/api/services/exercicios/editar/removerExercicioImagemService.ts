import { checkAutorExercicio, checkExercicioExists } from "../../../helpers/dbHelpers";
import { client } from "../../../prisma/client";

export class RemoverExercicioImagemService{
  async execute(imagemId:string,treinadorId:string,exercicioId:string){
    const isAutor = await checkAutorExercicio(treinadorId,exercicioId);
    if(!isAutor){
      throw new Error("Não possui autorização")
    }

    await client.exercicios_imagens.delete({
      where:{
        imagem_id:imagemId,
      }
    })

    return{"msg":"imagem removida com sucesso"}
  }
}