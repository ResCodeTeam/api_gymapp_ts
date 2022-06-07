/**
 * @module VerNotificacoesService
 */

import { client } from "../../prisma/client";

export class VerNotificacoesService {
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