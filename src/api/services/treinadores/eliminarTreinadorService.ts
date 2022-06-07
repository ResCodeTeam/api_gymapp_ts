/**
 * @module EliminarTreinadorService
 */

import { checkUserIdExists, checkTreinador, checkDonoMarca, getTreinadorMarca } from "../../helpers/dbHelpers";
import { client } from "../../prisma/client";

/**
 * @param treinador_id id do treinador
 * @param userId id do utilizador
 */
export interface Itreinador {
    treinador_id: string
    userId: string
}

/**
 * Classe responsavel pelo serviço de remoção de treinadores de posts
 */
export class EliminarTreinadorService {
    /**
     * Método que permite eliminar um treinador de uma marca tendo em conta todas as verificações necessárias
     * @param Itreinador interface de dados do serviço
    
     */
    async execute({ treinador_id, userId }: Itreinador) {
        const exists_id = await checkUserIdExists(treinador_id);
        if (!exists_id) {
            return { data: "User não existe", status: 500 }
        }

        const exists_treinador = await checkTreinador(treinador_id);
        if (!exists_treinador) {
            return { data: "O user não é um treinador", status: 500 }
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
            data: "Treinador cessado das funções!",
            status: 200
        };
    }
}


