
import { checknotificacaoExists } from "../../helpers/dbHelpers";
import { client } from "../../prisma/client";


interface IVisto{
    notiId:string
    destUid:string
}
export class AlterarVistoService{
  async execute({notiId,destUid}:IVisto){
    
    const existsVisto = await checknotificacaoExists(notiId);
    if(!existsVisto){
      throw new Error("notificação não existe")
    }

    const alterarVisto = await client.destinos_notificacao.update({
      where:{
        noti_id_dest_uid:{
            noti_id:notiId,
            dest_uid:destUid
            
        }
      },
      data:{
          visto:true
        
      }
    })

    return{alterarVisto}

    
  }
}