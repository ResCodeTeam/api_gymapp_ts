/**
 * @module VerTodasAtividadesService
 */
import { client } from "../../prisma/client";

/**
 * Classe responsavel pelo serviço que serve para obter todas as atividades
 */
export class VerTodasAtividadesService {
    async execute() {

        const atividades = await client.atividades.findMany({
            where: {
                isDeleted: false
            },
        })

        return {data: atividades, status: 200};
    }
}