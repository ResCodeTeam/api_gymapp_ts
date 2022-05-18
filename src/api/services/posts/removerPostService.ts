import { client } from "../../prisma/client";
import { checkPostExists, checkAutorPublicacoes } from "../../helpers/dbHelpers";


class RemoverPostService {

    async execute(uId: string, postId: string) {
        const existsPost = await checkPostExists(postId);
        if (!existsPost) {
            return { date: "A publicação não existe", status: 500 }
        }

        const publicacao = await client.publicacoes.findUnique({
            where: {
                publicacao_id: postId
            }
        })
        const isAutor = await checkAutorPublicacoes(uId, postId);
        if (!isAutor) {
            return { date: "A publicação não lhe pertence", status: 500 }
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
            msg: "Publicação removida com sucesso"
        }
    }
}
export { RemoverPostService };
