/**
 * @module VerTodosPostsController
 */
import { Request, Response } from "express";
import { VerTodosPostsService } from "../../../services/posts/obter/verTodosPostsService";

/**
 * Classe responsável por receber e chamar os métodos do serviço que serve para obter todas as publicações
 */
class VerTodosPostsController {
    /**
   * Permite obter todas as publicações recebendo os dados por parâmetro do request, verificando se este existem e redirecionado de seguida para o serviço associado
   *
   * {@link VerTodosPostsService}
   * @param request pedido efetuado.
   * @param response resposta.
   */
    async handle(request: Request, response: Response) {
        const userId = request.params.userId;
        const verPostService = new VerTodosPostsService();
        const resp = await verPostService.execute(userId);
        response.status(resp.status).json(resp.data);
    }
}

export { VerTodosPostsController }

