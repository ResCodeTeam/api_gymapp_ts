/**
 * @module VerDesafioController
 */
import { Request, Response } from "express";
import { VerDesafioService } from "../../services/desafios/verDesafioService";

/**
 * Classe responsável por receber e chamar os métodos do serviço que serve para obter as informações de um desafio
 */
export class VerDesafioController {
  /**
   * Permite obter as informações de um desafio recebendo os dados por parâmetro do request, verificando se este existem e redirecionado de seguida para o serviço associado
   *
   * {@link VerDesafioService}
   * @param request pedido efetuado.
   * @param response resposta.
   */
  async handle(request: Request, response: Response) {
    const uId = request.params.userId;
    const desafioId = request.params.id;

    try{
      if (uId === undefined || desafioId === undefined) {
        throw new Error("Pedido inválido");
      }
  
      const verDesafioService = new VerDesafioService();
      const resp = await verDesafioService.execute(uId, desafioId);
      response.status(resp.status).json(resp.data);
    } catch (e) {
      response.status(500).json(e.message)
    }
  }
}
