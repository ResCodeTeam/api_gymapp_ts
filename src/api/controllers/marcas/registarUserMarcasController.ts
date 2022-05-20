import { Request, Response } from "express";
import { RegistarUserMarcasService } from "../../services/marcas/registarUserMarcasService";

class RegistarUserMarcasController {
  async handle(request: Request, response: Response) {
    const userId = request.params.adminId;
    const { nome, mobilidade, cor, logotipo } = request.body;
    if (userId === undefined || nome === undefined || mobilidade === undefined || cor === undefined || logotipo === undefined) {
      response.json("Pedido inválido").status(500);
    }

    const registarUserMarcasController = new RegistarUserMarcasService();
    const resp = await registarUserMarcasController.execute({
      userId,
      nome,
      mobilidade,
      cor,
      logotipo,
    });
    response.json(resp.data).status(resp.status);
  }
}

export { RegistarUserMarcasController };
