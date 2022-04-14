import { client } from "../../../prisma/client";

export class VerAgendamentoAvaliacoesService{
    async execute(){

        const agendamentos = await client.agendamentos_avaliacoes.findMany({
            where:{
                isDeleted:false
            },
        })

        return {
            agendamentos
        }
    }
}