import { checkAutorExercicio, checkExercicioExists, checkImagemExercicioExists, getImagemExercicio } from "../../../helpers/dbHelpers";
import { client } from "../../../prisma/client";

export class RemoverExercicioImagemService{
  async execute(imagemId:string,treinadorId:string,exercicioId:string){
    const exists_exercicio = await checkExercicioExists(exercicioId)
    if(!exists_exercicio){
      throw new Error("O exercício não existe")
    }
    console.log(exercicioId);
    const exists_image = await checkImagemExercicioExists(imagemId)
    if(!exists_image){
      throw new Error("A imagem não existe")
    }

    const isAutor = await checkAutorExercicio(treinadorId,exercicioId);
    if(!isAutor){
      throw new Error("Não possui autorização")
    }

    let exercicio = await getImagemExercicio(imagemId);
    if(exercicio == exercicioId){
      await client.exercicios_imagens.delete({
        where:{
          imagem_id:imagemId,
        }
      })
    }
    else{
      throw new Error("A imagem não pertence ao exercicio")
    }
    

    return{"msg":"imagem removida com sucesso"}
  }
}