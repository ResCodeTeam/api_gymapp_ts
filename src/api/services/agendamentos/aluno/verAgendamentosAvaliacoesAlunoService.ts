import { client } from "../../../prisma/client";
import { checkUserIdExists } from "../../../helpers/dbHelpers";

export class VerAgendamentosAvaliacoesAlunoService{
    async execute(uId: string){

        const exists_user = await checkUserIdExists(uId);
        if (!exists_user) {
            throw new Error("O utilizador não existe");
        }
        
        const agendamentos = await client.agendamentos_avaliacoes.findMany({
            where:{
                uid: uId,
                isDeleted:false
            },
        })

        return {data: agendamentos, status: 200};    
    }
}