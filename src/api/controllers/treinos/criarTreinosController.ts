import { Request, Response } from "express";
import { CriarTreinosService } from "../../services/treinos/criarTreinosService";

class CriarTreinosController {
  async handle(request: Request, response: Response) {
    const uid = request.params.alunoId;
    let { atividadeId, modalidadeId, duracao, calorias, distancia, data } = request.body;
    if(atividadeId === undefined || modalidadeId === undefined || duracao === undefined || calorias === undefined || distancia === undefined || data === undefined){
      throw new Error("Pedido inválido")
    }

    data = new Date(data)
    const criarTreinosService = new CriarTreinosService();
    const resp = await criarTreinosService.execute({
      uid,
      atividadeId,
      modalidadeId,
      duracao,
      calorias,
      distancia,
      data 
    });
    response.json(resp.data).status(resp.status);
  }
}
export { CriarTreinosController };
