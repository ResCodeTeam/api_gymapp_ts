import { checkUserIdExists } from "../../helpers/dbHelpers";
import { client } from "../../prisma/client";

export class EditarMencoesService{
  async execute(uid:string, mencoes:boolean){
    
    const existsUser = await checkUserIdExists(uid);
    if(!existsUser){
      throw new Error("User inexistente")
    }

    const mencoesEdited = await client.definicoes_user.update({
      where:{
        usersuid:uid
      },
      data:{
        mencoes
      }
    })

    return{mencoesEdited}

    
  }
}