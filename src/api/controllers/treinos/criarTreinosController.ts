import { Request, Response } from "express";
import { CriarTreinosService } from "../../services/treinos/criarTreinosService";

class CriarTreinosController {
  async handle(request: Request, response: Response) {
    const uid = request.params.id;
    const { tipoModalidade, atividadeId, modalidadeId, duracao, calorias, distancia, data } = request.body;

    // let data = new Date(data);
    const criarTreinosService = new CriarTreinosService();
    const resp = await criarTreinosService.execute({
      uid,
      tipoModalidade,
      atividadeId,
      modalidadeId,
      duracao,
      calorias,
      distancia,
      data 
    });
    response.json(resp);
  }
}
export { CriarTreinosController };
