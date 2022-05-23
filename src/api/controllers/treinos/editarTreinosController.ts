import { Request, Response } from "express";
import { EditarTreinosService } from "../../services//treinos/editarTreinosService";

export class EditarTreinosController {
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
