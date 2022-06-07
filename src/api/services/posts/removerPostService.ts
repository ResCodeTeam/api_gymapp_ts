/**
 * @module RemoverPostService
 */

import { client } from "../../prisma/client";
import { checkPostExists, checkAutorPublicacoes } from "../../helpers/dbHelpers";

/**
 * Classe responsavel pelo serviço de remoção de posts
 */
class RemoverPostService {

    async execute(uId: string, postId: string) {
        const existsPost = await checkPostExists(postId);
        if (!existsPost) {
            return { data: "A publicação não existe", status: 500 }
        }

        const publicacao = await client.publicacoes.findUnique({
            where: {
                publicacao_id: postId
            }
        })
        const isAutor = await checkAutorPublicacoes(uId, postId);
        if (!isAutor) {
            return { data: "A publicação não lhe pertence", status: 500 }
        }

        await client.publicacoes.update({
            data: {
                isDeleted: true
            },
            where: {
                publicacao_id: postId
            }
        })

        return {
            data: "Publicação removida com sucesso",
            status: 200
        }
    }
}
export { RemoverPostService };
