import { Request, Response } from "express";
import { RegistarUserMarcasService } from "../../services/marcas/registarUserMarcasService";

class RegistarUserMarcasController {
  async handle(request: Request, response: Response) {
    const userId = request.params.adminId;
    const { nome, mobilidade, cor, logotipo } = request.body;
    if (
      userId === undefined ||
      nome === undefined ||
      mobilidade === undefined ||
      cor === undefined ||
      logotipo === undefined
    ) {
      response.status(500).json("Pedido inválido");
    }

    const registarUserMarcasController = new RegistarUserMarcasService();
    const resp = await registarUserMarcasController.execute({
      userId,
      nome,
      mobilidade,
      cor,
      logotipo,
    });
    response.status(resp.status).json(resp.data);
  }
}

export { RegistarUserMarcasController };
