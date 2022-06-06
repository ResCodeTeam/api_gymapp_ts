/**
 * @module RemoverAlunoController
 */
import { RemoverAlunoService } from "../../services/alunos/removerAlunoService";
import { Request, Response } from "express";

/**
 * Classe responsável por receber e chamar os métodos do serviço que serve por remover alunos
 */
export class RemoverAlunoController {
  /**
   * Permite remover alunos recebendo os dados pelos parâmetros do request, verificando se este existem e redirecionado de seguida para o serviço associado
   *
   * {@link RemoverAlunoService}
   * @param request pedido efetuado.
   * @param response resposta.
   */
  async handle(request: Request, response: Response) {
    const uId = request.params.uId;
    const adminId = request.params.adminId;

    try{
      if (uId === undefined || adminId === undefined) {
        throw new Error("Pedido inválido");
      }
  
      const removerAlunoService = new RemoverAlunoService();
      const resp = await removerAlunoService.execute(uId, adminId);
      response.status(resp.status).json(resp.data);
    } catch (e) {
      response.status(500).json(e.message)
    }
  }
}
