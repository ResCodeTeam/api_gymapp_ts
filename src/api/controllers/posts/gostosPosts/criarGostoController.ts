/**
 * @module CriarGostoController
 */
import { Request, Response } from "express";
import { CriarGostoService } from "../../../services/posts/gostosPosts/criarGostoService";

/**
 * Classe responsável por receber e chamar os métodos do serviço que serve para criar gostos em publicações
 */
export class CriarGostoController {
  /**
   * Permite criar um gosto em uma publicação recebendo os dados por parâmetro do request, verificando se este existem e redirecionado de seguida para o serviço associado
   *
   * {@link CriarGostoService}
   * @param request pedido efetuado.
   * @param response resposta.
   */
  async handle(request: Request, response: Response) {
    const postId = request.params.id;
    const criadorId = request.params.userId;

    try{
      if (postId === undefined || criadorId === undefined) {
        throw new Error("Pedido inválido");
      }
  
      const criarGostoController = new CriarGostoService();
      const resp = await criarGostoController.execute(postId, criadorId);
      response.status(resp.status).json(resp.data);
    } catch (e) {
      response.status(500).json(e.message)
    }
  }
}
