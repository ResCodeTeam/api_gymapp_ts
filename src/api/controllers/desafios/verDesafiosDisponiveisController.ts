/**
 * @module VerDesafiosDisponiveisController
 */
import { Request, Response } from "express";
import { VerDesafiosDisponiveisService } from "../../services/desafios/verDesafiosDisponiveisService";

/**
 * Classe responsável por receber e chamar os métodos do serviço que serve para obter os desafios disponíveis
 */
export class VerDesafiosDisponiveisController {
  /**
   * Permite obter os desafios disponíveis recebendo os dados por parâmetro do request, verificando se este existem e redirecionado de seguida para o serviço associado
   *
   * {@link VerDesafiosDisponiveisService}
   * @param request pedido efetuado.
   * @param response resposta.
   */
  async handle(request: Request, response: Response) {
    const uId = request.params.userId;
    const ginasioId = request.params.id;

    try{
      if (uId === undefined || ginasioId === undefined) {
        throw new Error("Pedido inválido");
      }
  
      const verDesafiosDisponiveisService = new VerDesafiosDisponiveisService();
      const resp = await verDesafiosDisponiveisService.execute({
        uId,
        ginasioId,
      });
      response.status(resp.status).json(resp.data);
    } catch (e) {
      response.status(500).json(e.message)
    }
  }
}
