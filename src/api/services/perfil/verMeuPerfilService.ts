/**
 * @module VerMeuPerfilService
 */
import { client } from "../../prisma/client";
import { VerTodosPostsUserService } from "../posts/obter/verTodosPostsUserService";
import { VerTreinosAlunosService } from "../treinos/verTreinosAlunosService";

/**
 * Classe responsavel pelo serviço que serve para obter os dados do perfil do utilizador autenticado
 */
export class VerMeuPerfilService {
  /**
   * Método que permite obter os dados do perfil do utilizador autenticado
   * @param uid id do utilizador
   * @returns 
   */
  async execute(uid: string) {
    const perfil = await client.users.findFirst({
      where: {
        uid,
        isDeleted: false,
      }
    })

    const verTodosPostsUserService = new VerTodosPostsUserService()
    const posts = await verTodosPostsUserService.execute(uid);
    const verTreinosAlunosService = new VerTreinosAlunosService()
    const treinos = await verTreinosAlunosService.execute(uid);

    return { data: { perfil, posts, treinos }, status: 200 }
  }
}