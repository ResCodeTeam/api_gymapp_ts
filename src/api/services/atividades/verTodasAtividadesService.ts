import { client } from "../../prisma/client";
import { checkAtividadeExists } from "../../helpers/dbHelpers"


export class VerTodasAtividadesService{
    async execute(atividadeId:string){

        const exists_atividade= await checkAtividadeExists(atividadeId)
        if(!exists_atividade){
            throw new Error("A atividade não existe")
        }

        const atividades = await client.atividades.findMany({
            where:{
                atividade_id:atividadeId,
                isDeleted:false
            },
            select:{
                descricao: true,
                icon: true
            }
        })

        return {
            atividades
        }
    }
}