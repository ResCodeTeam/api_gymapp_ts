import { Request, Response } from "express";
import { RegistarUserMarcasService } from "../../services/marcas/registarUserMarcasService";

class RegistarUserMarcasController {
  async handle(request: Request, response: Response) {
    const userId = response.locals.uid;
    const { nome, mobilidade, cor, logotipo } = request.body;

    const registarUserMarcasController = new RegistarUserMarcasService();
    const resp = await registarUserMarcasController.execute({
      userId,
      nome,
      mobilidade,
      cor,
      logotipo,
    });
    response.json( resp);
  }
}

export { RegistarUserMarcasController };
