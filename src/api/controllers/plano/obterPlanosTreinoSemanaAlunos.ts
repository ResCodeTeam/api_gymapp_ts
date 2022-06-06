/**
 * @module ObterPlanosTreinoSemanaAlunos
 */
import { Request, Response } from "express";
import { ObterPlanoTreinoSemanalAlunosService } from "../../services/plano/obterPlanoTreinoSemanalAlunosService";

/**
 * Classe responsável por receber e chamar os métodos do serviço que serve para criar obter os planos de treino semanais dos alunos
 */
export class ObterPlanosTreinoSemanaAlunos {
  /**
   * Permite obter os planos de treino semanais dos alunos recebendo os dados por parâmetro do request, verificando se este existem e redirecionado de seguida para o serviço associado
   *
   * {@link ObterPlanoTreinoSemanalAlunosService}
   * @param request pedido efetuado.
   * @param response resposta.
   */
  async handle(request: Request, response: Response) {
    const uid = request.params.treinadorId;
    const startDate = request.params.startDate;
    const endDate = request.params.endDate;

    try{
      if (uid === undefined || startDate === undefined || endDate === undefined) {
        throw new Error("Pedido inválido");
      }
  
      const obterPlanosTreinoAlunosService =
        new ObterPlanoTreinoSemanalAlunosService();
      const resp = await obterPlanosTreinoAlunosService.execute(
        uid,
        startDate,
        endDate
      );
      response.status(resp.status).json(resp.data);
    } catch (e) {
      response.status(500).json(e.message)
    }
  }
}
