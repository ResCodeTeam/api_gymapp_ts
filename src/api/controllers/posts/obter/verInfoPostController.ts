/**
 * @module VerInfoPostController
 */
import { Request, Response } from "express";
import { VerInfoPostService } from "../../../services/posts/obter/verInfoPostService";

/**
 * Classe responsável por receber e chamar os métodos do serviço que serve para obter informação de uma publicação
 */
export class VerInfoPostController {
    /**
   * Permite obter informação de uma publicação recebendo os dados por parâmetro do request, verificando se este existem e redirecionado de seguida para o serviço associado
   *
   * {@link VerInfoPostService}
   * @param request pedido efetuado.
   * @param response resposta.
   */
    async handle(request: Request, response: Response) {
        const postId = request.params.id;

        const verInfoPostService = new VerInfoPostService();
        const resp = await verInfoPostService.execute(postId)

        response.status(resp.status).json(resp.data);
    }
}