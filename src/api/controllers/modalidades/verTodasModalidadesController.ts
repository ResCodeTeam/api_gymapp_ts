/**
 * @module VerTodasModalidadesController
 */
import { Request, Response } from "express";
import { VerTodasModalidadesService } from "../../services/modalidades/verTodasModalidadesService";

/**
 * Classe responsável por receber e chamar os métodos do serviço que serve para obter todas as modalidades
 */
export class VerTodasModalidadesController {
  /**
   * Permite obter todas as modalidades recebendo os dados por parâmetro do request, verificando se este existem e redirecionado de seguida para o serviço associado
   *
   * {@link VerTodasModalidadesService}
   * @param request pedido efetuado.
   * @param response resposta.
   */
  async handle(request: Request, response: Response) {
    const ginasioId = request.params.id;
    const userId = request.params.adminId;

    try{
      if (ginasioId === undefined || userId === undefined) {
        throw new Error("Pedido inválido");
      }
  
      const verTodasModalidadesService = new VerTodasModalidadesService();
      const resp = await verTodasModalidadesService.execute({
        ginasioId,
        userId,
      });
      response.status(resp.status).json(resp.data);
    } catch (e) {
      response.status(500).json(e.message)
    }
  }
}
