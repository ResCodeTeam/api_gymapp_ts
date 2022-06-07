/**
 * @module VerDesafiosMarcaController
 */
import { Request, Response } from "express";
import { VerDesafiosMarcaService } from "../../services/desafios/verDesafiosMarcaService";

/**
 * Classe responsável por receber e chamar os métodos do serviço que serve para obter os desafios de uma marca
 */
export class VerDesafiosMarcaController {
  /**
   * Permite obter os desafios de uma marca recebendo os dados por parâmetro do request, verificando se este existem e redirecionado de seguida para o serviço associado
   *
   * {@link VerDesafiosMarcaService}
   * @param request pedido efetuado.
   * @param response resposta.
   */
  async handle(request: Request, response: Response) {
    const uid = request.params.treinadorId;

    try{
      if (uid === undefined) {
        throw new Error("Pedido inválido");
      }
  
      const verDesafiosMarcaService = new VerDesafiosMarcaService();
      const resp = await verDesafiosMarcaService.execute(uid);
  
      response.status(resp.status).json(resp.data);
    } catch (e) {
      response.status(500).json(e.message)
    }
  }
}
