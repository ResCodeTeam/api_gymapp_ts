import { client } from "../../prisma/client";
import { checkUserIdExists } from "../../helpers/dbHelpers";


export class RemoverAlunoService {
  async execute(uId: string) {
    const exists_user = await checkUserIdExists(uId);
    if (!exists_user) {
      throw new Error("O user não existe do desafio não existe");
    }

    const removerAluno= await client.users.update({
     where: {
       uid:uId
      },
     data:{
       isDeleted: true
     }
    })

    return removerAluno 
  }
}


