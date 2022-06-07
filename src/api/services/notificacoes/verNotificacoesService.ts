/**
 * @module VerNotificacoesService
 */

import { client } from "../../prisma/client";

/**
 * Classe responsavel pelo serviço que serve para obter notificações
 */
export class VerNotificacoesService {
    /**
     * Método que permite ver todas as notificações de um utilizador autenticado
     * @param origemId id da origem
    
     */
    async execute(origemId: string) {

        const notificacoes = await client.notificacoes.findMany({
            where: {
                destinos_notificacao: {
                    some: {
                        dest_uid: origemId
                    }
                }
            },
            include: {
                users: {
                    select: {
                        nome: true,
                        hashtag: true,
                        imagem_url: true,
                    }
                }
            }
        })
        return { data: notificacoes, status: 200 };
    }
}