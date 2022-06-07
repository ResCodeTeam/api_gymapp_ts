/**
 * @module VerTodasAtividadesService
 */
import { client } from "../../prisma/client";

/**
 * Classe responsavel pelo serviço que serve para obter todas as atividades
 */
export class VerTodasAtividadesService {
    /**
 * Método que permite obter todas as atividades da base de dados tendo em conta todas as verificações necessárias
 * 
 */
    async execute() {

        const atividades = await client.atividades.findMany({
            where: {
                isDeleted: false
            },
        })

        return {data: atividades, status: 200};
    }
}