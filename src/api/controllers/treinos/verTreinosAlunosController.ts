/**
 * @module VerTreinosAlunosController
 */
import { Request, Response } from "express";
import { VerTreinosAlunosService } from "../../services/treinos/verTreinosAlunosService";

/**
 * Classe responsável por receber e chamar os métodos do serviço que serve para obter os treinos de um aluno
 */
export class VerTreinosAlunosController {
  /**
   * Permite obter os treinos de um aluno recebendo os dados por parâmetro do request, verificando se este existem e redirecionado de seguida para o serviço associado
   *
   * {@link VerTreinosAlunosService}
   * @param request pedido efetuado.
   * @param response resposta.
   */
  async handle(request: Request, response: Response) {
    const uId = request.params.alunoId;

    try{
      if (uId === undefined) {
        throw new Error("Pedido inválido");
      }
  
      const verTreinosAlunosService = new VerTreinosAlunosService();
      const resp = await verTreinosAlunosService.execute(uId);
      response.status(resp.status).json(resp.data);
    } catch (e) {
      response.status(500).json(e.message)
    }
  }
}
