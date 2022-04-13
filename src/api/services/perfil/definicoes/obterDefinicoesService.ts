import { checkUserIdExists } from "../../../helpers/dbHelpers";
import { client } from "../../../prisma/client";

export class ObterDefinicoesService{
  async execute(uid:string){
    const existsUser= await checkUserIdExists(uid);
    if(!existsUser){
      throw new Error("User não existe")
    }

    const def = await client.users.findFirst({
      where:{
        isDeleted:false,
      },
      select:{
        definicoes_user:true
      }
    })

    
    const definicoes = def.definicoes_user
    return{definicoes}
  }
}