import { checkUserIdExists, checkTreinador, checkDonoMarca, getTreinadorMarca } from "../../helpers/dbHelpers";
import { client } from "../../prisma/client";

interface Itreinador {
    treinador_id: string
    userId: string
}

export class EliminarTreinadorService {
    async execute({ treinador_id, userId }: Itreinador) {
        const exists_id = await checkUserIdExists(treinador_id);
        if (!exists_id) {
            return { date: "User não existe", status: 500 }
        }

        const exists_treinador = await checkTreinador(treinador_id);
        if (!exists_treinador) {
            return { date: "O user não é um treinador", status: 500 }
        }
        const marcaId = await getTreinadorMarca(treinador_id);

        const isDono = await checkDonoMarca(marcaId, userId);

        const users = await client.users.update({
            data: {
                isDeleted: true,
            },
            where: {
                uid: treinador_id,
            },
        })

        return {
            msg: "Treinador cessado das funções!"
        };
    }
}


