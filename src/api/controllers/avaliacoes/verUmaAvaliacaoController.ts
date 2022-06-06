/**
 * @module VerUmaAvaliacaoController
 */
import { Request, Response } from "express";
import { VerUmaAvaliacaoService } from "../../services/avaliacoes/verUmaAvaliacaoService";

/**
 * Classe responsável por receber e chamar os métodos do serviço que serve para obter informações de uma avaliação 
 */
export class VerUmaAvaliacaoController {
  /**
   * Permite obter informações de uma avaliação recebendo os dados por parâmetro do request, verificando se este existem e redirecionado de seguida para o serviço associado
   *
   * {@link VerUmaAvaliacaoService}
   * @param request pedido efetuado.
   * @param response resposta.
   */
  async handle(request: Request, response: Response) {
    const userId = request.params.alunoId;
    const avaliacaoId = request.params.avaliacaoId;

    try{
      if (avaliacaoId === undefined) {
        throw new Error("Pedido inválido");
      }
  
      const verUmaAvaliacaoService = new VerUmaAvaliacaoService();
      const resp = await verUmaAvaliacaoService.execute(userId, avaliacaoId);
      response.status(resp.status).json(resp.data);
    } catch (e) {
      response.status(500).json(e.message)
    }
  }
}
