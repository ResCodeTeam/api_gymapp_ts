/**
 * @module VerDesafiosSubmissoesController
 */
import { Request, Response } from "express";
import { VerDesafiosSubmissoesService } from "../../services/desafios/verDesafiosSubmissoesService";

/**
 * Classe responsável por receber e chamar os métodos do serviço que serve para obter os desafios disponíveis
 */
export class VerDesafiosSubmissoesController {
  /**
   * Permite obter os desafios disponíveis recebendo os dados por parâmetro do request, verificando se este existem e redirecionado de seguida para o serviço associado
   *
   * {@link VerDesafiosSubmissoesService}
   * @param request pedido efetuado.
   * @param response resposta.
   */
  async handle(request: Request, response: Response) {
    const uId = request.params.userId;
    const desafioId = request.params.desafioId;

    try{
      if (uId === undefined || desafioId === undefined) {
        throw new Error("Pedido inválido");
      }
  
      const encerrarDesafiosSubmissoesService =
        new VerDesafiosSubmissoesService();
      const resp = await encerrarDesafiosSubmissoesService.execute(
        uId,
        desafioId
      );
      response.status(resp.status).json(resp.data);
    } catch (e) {
      response.status(500).json(e.message)
    }
  }
}
