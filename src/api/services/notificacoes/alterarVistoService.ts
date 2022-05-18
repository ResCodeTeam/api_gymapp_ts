
import { checkDestinoNotificacao, checknotificacaoExists } from "../../helpers/dbHelpers";
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

    const isAutor = await checkDestinoNotificacao(destUid, notiId);
    if(!isAutor){
      throw new Error("Não possui autorização")
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

    return {data: alterarVisto, status: 200}; 
  }
}