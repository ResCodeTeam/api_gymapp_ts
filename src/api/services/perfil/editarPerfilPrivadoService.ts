import { client } from "../../prisma/client";
import { checkUserIdExists, findUser } from "../../helpers/dbHelpers";

interface IEditarPerfilPrivado{
    uId:string,
    isPrivado: boolean, 
}


export class EditarPerfilPrivadoService {
  async execute({  
    uId,
    isPrivado 
  } : IEditarPerfilPrivado){
    const existsUser = await checkUserIdExists(uId);
    if(!existsUser){
      throw new Error("Utilizador inexistente")
    }


    const user = await client.definicoes_user.update({
        where : {
             def_id  
        },
        data : {
          is_privado: true,
        }
    })
    return {
      user, 
    };
  }
}
  


