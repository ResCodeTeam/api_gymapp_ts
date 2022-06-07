/**
 * @module RemoverTreinosController
 */
import { Request, Response } from "express";
import { RemoverTreinosService } from "../../services/treinos/removerTreinosService";

/**
 * Classe responsável por receber e chamar os métodos do serviço que serve para remover treinos
 */
class RemoverTreinosController {
  /**
   * Permite remover treinos recebendo os dados por parâmetro do request, verificando se este existem e redirecionado de seguida para o serviço associado
   *
   * {@link RemoverTreinosService}
   * @param request pedido efetuado.
   * @param response resposta.
   */
  async handle(request: Request, response: Response) {
    const uId = request.params.alunoId;
    const treinoId = request.params.treino_id;

    try{
      if (uId === undefined || treinoId === undefined) {
        throw new Error("Pedido inválido");
      }
  
      const removerTreinosService = new RemoverTreinosService();
      const resp = await removerTreinosService.execute(uId, treinoId);
      response.status(resp.status).json(resp.data);
    } catch (e) {
      response.status(500).json(e.message)
    }
  }
}

export { RemoverTreinosController };
