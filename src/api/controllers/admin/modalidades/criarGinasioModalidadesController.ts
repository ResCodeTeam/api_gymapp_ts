import { Request, Response } from "express";
import criarGinasioModalidadesService from "../../../services/admin/modalidades/criarGinasioModalidadesService";

class CriarGinasioModalidadesController {
  async handle(request: Request, response: Response) {
    const ginasio_id = request.params.id;
    const { nome, imagem_url, estado } = request.body;

    const resp = await criarGinasioModalidadesService(
      ginasio_id,
      nome,
      imagem_url,
      estado
    );
    response.json(resp);
  }
}
export { CriarGinasioModalidadesController };
