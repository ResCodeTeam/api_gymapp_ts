import { client } from "../../../prisma/client";

export class VerAgendamentosDesafiosService {
    async execute() {

        const agendamentos = await client.agendamentos_desafios.findMany({
            where: {
                isDeleted: false
            },
        })

        return agendamentos
    }
}