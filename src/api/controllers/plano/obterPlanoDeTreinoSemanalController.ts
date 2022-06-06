/**
 * @module ObterPlanoTreinoSemanalController
 */
import { Request, Response } from "express";
import { ObterPlanoTreinoSemanalService } from "../../services/plano/obterPlanoTreinoSemanalService";

/**
 * Classe responsável por receber e chamar os métodos do serviço que serve para criar obter o plano de treino da semana
 */
export class ObterPlanoTreinoSemanalController {
  /**
   * Permite obter o plano de treino da semana recebendo os dados por parâmetro do request, verificando se este existem e redirecionado de seguida para o serviço associado
   *
   * {@link ObterPlanoTreinoSemanalService}
   * @param request pedido efetuado.
   * @param response resposta.
   */
  async handle(request: Request, response: Response) {
    const uid = request.params.alunoId;
    const startDate = request.params.startDate;
    const endDate = request.params.endDate;

    try{
      if (uid === undefined || startDate === undefined || endDate === undefined) {
        throw new Error("Pedido inválido");
      }
  
      const startDateParsed = new Date(startDate);
      const endDateParsed = new Date(endDate);
  
      const obterPlanoTreinoSemanalService = new ObterPlanoTreinoSemanalService();
      const resp = await obterPlanoTreinoSemanalService.execute(
        uid,
        startDateParsed,
        endDateParsed,
        uid
      );
      response.status(resp.status).json(resp.data);
    } catch (e) {
      response.status(500).json(e.message)
    }
  }
}
