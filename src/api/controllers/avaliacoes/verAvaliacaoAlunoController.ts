/**
 * @module VerAvaliacaoAlunoController
 */
import { Request, Response } from "express";
import { VerAvaliacoesService } from "../../services/avaliacoes/verAvaliacaoService";

/**
 * Classe responsável por receber e chamar os métodos do serviço que serve para obter avaliações de um aluno
 */
export class VerAvaliacaoAlunoController {
  /**
   * Permite obter avaliações de um aluno recebendo os dados por parâmetro do request, verificando se este existem e redirecionado de seguida para o serviço associado
   *
   * {@link VerAvaliacoesService}
   * @param request pedido efetuado.
   * @param response resposta.
   */
  async handle(request: Request, response: Response) {
    const userId = request.params.userId;
    const alunoId = request.params.alunoId;

    try{
      if (alunoId === undefined) {
        throw new Error("Pedido inválido");
      }
  
      const verAvaliacaoService = new VerAvaliacoesService();
      const resp = await verAvaliacaoService.execute(userId, alunoId);
      response.status(resp.status).json(resp.data);
    } catch (e) {
      response.status(500).json(e.message)
    }
  }
}
