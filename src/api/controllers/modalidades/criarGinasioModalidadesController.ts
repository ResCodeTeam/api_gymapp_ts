import { Request, Response } from "express";
import { CriarGinasioModalidadesService } from "../../services/modalidades/criarGinasioModalidadesService";

class CriarGinasioModalidadesController {
  async handle(request: Request, response: Response) {
    const ginasioId = request.params.id;
    const adminId = request.params.adminId;

    const { nome, imagemUrl } = request.body;
    if (ginasioId === undefined || adminId === undefined || nome === undefined || imagemUrl === undefined) {
      response.json("Pedido inválido").status(500);
    }

    const criarGinasioModalidadesService = new CriarGinasioModalidadesService();
    const resp = await criarGinasioModalidadesService.execute({
      ginasioId,
      nome,
      imagemUrl,
      adminId
    });
    response.status(resp.status).json(resp.data);
  }
}
export { CriarGinasioModalidadesController };
