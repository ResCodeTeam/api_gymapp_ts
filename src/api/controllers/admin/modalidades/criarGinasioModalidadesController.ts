import { Request, Response } from "express";
import { CriarGinasioModalidadesService } from "../../../services/admin/modalidades/criarGinasioModalidadesService";

class CriarGinasioModalidadesController {
  async handle(request: Request, response: Response) {
    const ginasioId = request.params.id;
    const { nome, imagemUrl, estado } = request.body;

    const criarGinasioModalidadesService = new CriarGinasioModalidadesService();
    const resp = await criarGinasioModalidadesService.execute({
      ginasioId,
      nome,
      imagemUrl,
      estado,
    });
    response.json(resp);
  }
}
export { CriarGinasioModalidadesController };
