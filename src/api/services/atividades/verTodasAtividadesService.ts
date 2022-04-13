import { client } from "../../prisma/client";
import { checkAtividadeExists } from "../../helpers/dbHelpers"


export class VerTodasAtividadesService{
    async execute(){

        const atividades = await client.atividades.findMany({
            where:{
                isDeleted:false
            },
        })

        return {
            atividades
        }
    }
}