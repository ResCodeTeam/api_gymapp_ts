/**
 * @module CriarPlanoTreinoController
 */
import { Request, Response } from "express";
import { CriarPlanoTreinoService } from "../../services/plano/criarPlanoTreinoService";

/**
 * Classe responsável por receber e chamar os métodos do serviço que serve para criar planos de treino
 */
export class CriarPlanoTreinoController {
  /**
   * Permite criar um plano de treino recebendo os dados por body e parâmetro do request, verificando se este existem e redirecionado de seguida para o serviço associado
   *
   * {@link CriarPlanoTreinoService}
   * @param request pedido efetuado.
   * @param response resposta.
   */
  async handle(request: Request, response: Response) {
    const treinadorId = request.params.treinadorId;

    const { alunoId, modalidadeId, blocos } = request.body;

    try{
      if (
        alunoId === undefined ||
        modalidadeId === undefined ||
        treinadorId === undefined ||
        blocos === undefined
      ) {
        throw new Error("Pedido inválido");
      }
  
      const data = new Date(Date.now());
      const criarPlanoTreinoService = new CriarPlanoTreinoService();
      const resp = await criarPlanoTreinoService.execute({
        alunoId,
        treinadorId,
        data,
        modalidadeId,
        blocos,
      });
      response.status(resp.status).json(resp.data);
    } catch (e) {
      response.status(500).json(e.message)
    }
  }
}
