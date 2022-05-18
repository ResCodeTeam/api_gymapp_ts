import { client } from "../../../prisma/client";
import { checkUserIdExists } from "../../../helpers/dbHelpers";

export class VerAgendamentosAvaliacoesAlunoService {
    async execute(uId: string) {

        const exists_user = await checkUserIdExists(uId);
        if (!exists_user) {
            return { date: "O utilizador não existe", status: 500 }
        }

        const agendamentos = await client.agendamentos_avaliacoes.findMany({
            where: {
                uid: uId,
                isDeleted: false
            },
        })

        return agendamentos;
    }
}