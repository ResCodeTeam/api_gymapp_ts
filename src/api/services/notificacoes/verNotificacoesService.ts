import { client } from "../../prisma/client";

export class VerNotificacoesService{
    async execute(origemId: string){

        const notificacoes = await client.notificacoes.findMany({
            where:{
                destinos_notificacao: {
                    some:{
                        dest_uid: origemId
                    }
                }
            },
        })
        return {data: notificacoes, status: 200};
    }
}