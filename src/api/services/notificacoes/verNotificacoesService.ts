import { client } from "../../prisma/client";

export class VerNotificacoesService{
    async execute(origemId: string){

        const notificacoes = await client.destinos_notificacao.findMany({
            where:{
                dest_uid: origemId
            },
            select:{
                notificacoes: true,
            }
        })
        return notificacoes;
    }
}