import { checkPostExists, checkUserIdExists } from "../../../helpers/dbHelpers";
import { client } from "../../../prisma/client";

export class CriarGostoService {
  async execute(postId: string, criadorId: string) {
    const existsPost = await checkPostExists(postId);
    if (!existsPost) {
      return { date: "Post inexistente", status: 500 }
    }

    const existsCriador = await checkUserIdExists(criadorId);
    if (!existsCriador) {
      return { date: "User inexistente", status: 500 }
    }

    const gosto = await client.gostos_publicacao.create({
      data: {
        criador_id: criadorId,
        publicacao_id: postId
      }
    })

    return {data: gosto, status: 200};
  }
}