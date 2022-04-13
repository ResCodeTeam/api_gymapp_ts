import { client } from "../../prisma/client";
import { checkAtividadeExists } from "../../helpers/dbHelpers"


export class VerTodasAtividadesService{
    async execute(atividadeId:string){

        const exists_atividade= await checkAtividadeExists(atividadeId)
        if(!exists_atividade){
            throw new Error("Atividade não existe")
        }

        const atividades = await client.atividades.findMany({
            where:{
                atividade_id:atividadeId,
                
               
                
            },
                })
        return {
            atividades
        }
    }
}