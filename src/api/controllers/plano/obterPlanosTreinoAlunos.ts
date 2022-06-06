/**
 * @module ObterPlanosTreinoAlunos
 */
import { Request, Response } from "express";
import { ObterPlanosTreinoAlunosService } from "../../services/plano/obterPlanosTreinoAlunosService";

/**
 * Classe responsável por receber e chamar os métodos do serviço que serve para obter os planos de treinos de alunos
 */
export class ObterPlanosTreinoAlunos {
  /**
   * Permite obter todos o perfil de outros utilizadores recebendo os dados por parâmetro do request, verificando se este existem e redirecionado de seguida para o serviço associado
   *
   * {@link ObterPlanosTreinoAlunosService}
   * @param request pedido efetuado.
   * @param response resposta.
   */
  async handle(request: Request, response: Response) {
    const uid = request.params.treinadorId;

    try{
      if (uid === undefined) {
        throw new Error("Pedido inválido");
      }
  
      const obterPlanosTreinoAlunosService = new ObterPlanosTreinoAlunosService();
      const resp = await obterPlanosTreinoAlunosService.execute(uid);
      response.status(resp.status).json(resp.data);
    } catch (e) {
      response.status(500).json(e.message)
    }
  }
}
