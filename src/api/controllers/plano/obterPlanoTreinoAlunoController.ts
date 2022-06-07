/**
 * @module ObterPlanoTreinoAlunoController
 */
import { Request, Response } from "express";
import { ObterPlanoTreinoSemanalService } from "../../services/plano/obterPlanoTreinoSemanalService";

/**
 * Classe responsável por receber e chamar os métodos do serviço que serve para criar obter os planos de treino de um aluno
 */
export class ObterPlanoTreinoAlunoController {
  /**
   * Permite obter os planos de treino de um aluno recebendo os dados por parâmetro do request, verificando se este existem e redirecionado de seguida para o serviço associado
   *
   * {@link obterPlanoTreinoSemanalService}
   * @param request pedido efetuado.
   * @param response resposta.
   */
  async handle(request: Request, response: Response) {
    const treinadorId = request.params.treinadorId;
    const uid = request.params.id;
    const startDate = request.params.startDate;
    const endDate = request.params.endDate;

    try{
      if (
        treinadorId === undefined ||
        uid === undefined ||
        startDate === undefined ||
        endDate === undefined
      ) {
        throw new Error("Pedido inválido");
      }
  
      const startDateParsed = new Date(startDate);
      const endDateParsed = new Date(endDate);
      const obterPlanoTreinoSemanalService = new ObterPlanoTreinoSemanalService();
      const resp = await obterPlanoTreinoSemanalService.execute(
        uid,
        startDateParsed,
        endDateParsed,
        treinadorId
      );
      response.status(resp.status).json(resp.data);
    } catch (e) {
      response.status(500).json(e.message)
    }
  }
}
