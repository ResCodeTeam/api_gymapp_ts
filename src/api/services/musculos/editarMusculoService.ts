import { checkMusculoExists } from "../../helpers/dbHelpers";
import { client } from "../../prisma/client";

export class EditarMusculoService{
  async execute(musculoId:string,nome:string, imagem:string){
    const existsMusculo = await checkMusculoExists(musculoId);
    if(!existsMusculo){
      throw new Error("O musculo não existe")
    }

    const musculo = await client.musculos.update({
      where:{
        musculo_id:musculoId
      },
      data:{
        nome,
        img_url:imagem
      }
    })

    return musculo;
  }
}