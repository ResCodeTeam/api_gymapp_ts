import { client } from "../../prisma/client";
export class VerTodasAtividadesService{
    async execute(){

        const atividades = await client.atividades.findMany({
            where:{
                isDeleted:false
            },
        })

        return atividades;
    }
}