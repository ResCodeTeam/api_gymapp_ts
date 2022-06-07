/**
 * @module EditarTreinosController
 */
import { Request, Response } from "express";
import { EditarTreinosService } from "../../services//treinos/editarTreinosService";

/**
 * Classe responsável por receber e chamar os métodos do serviço que serve para editar treinos
 */
export class EditarTreinosController {
  /**
   * Permite editar treinos recebendo os dados por body e parâmetro do request, verificando se este existem e redirecionado de seguida para o serviço associado
   *
   * {@link EditarTreinosService}
   * @param request pedido efetuado.
   * @param response resposta.
   */
  async handle(request: Request, response: Response) {
    const uId = request.params.alunoId;
    const treinoId = request.params.treino_id;

    let { atividadeId, modalidadeId, duracao, calorias, distancia, data } =
      request.body;

    try{
      if (
        uId === undefined ||
        treinoId === undefined ||
        (atividadeId === undefined && modalidadeId === undefined) ||
        duracao === undefined ||
        calorias === undefined ||
        distancia === undefined
      ) {
        throw new Error("Pedido inválido");
      }
  
      data = new Date(data);
      const editarTreinosService = new EditarTreinosService();
  
      const resp = await editarTreinosService.execute({
        uId,
        treinoId,
        atividadeId,
        modalidadeId,
        duracao,
        calorias,
        distancia,
        data,
      });
      response.status(resp.status).json(resp.data);
    } catch (e) {
      response.status(500).json(e.message)
    }
  }
}
