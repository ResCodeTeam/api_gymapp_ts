import { client } from "../../prisma/client";
import { checkUserIdExists, findUserDefinicoes } from "../../helpers/dbHelpers";

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

    const defId = await findUserDefinicoes(uId);

    const user = await client.definicoes_user.update({
        where : {
          def_id: defId
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
  


