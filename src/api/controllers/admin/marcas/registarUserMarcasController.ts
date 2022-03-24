import { Request, Response } from "express";
import registarUserMarcasService from "../../../services/admin/marcas/registarUserMarcasService";

class RegistarUserMarcasController {
  async handle(request: Request, response: Response) {
    const user_id = request.params.id;
    const { nome, mobilidade, cor, logotipo } = request.body;

    const resp = await registarUserMarcasService(
      user_id,
      nome,
      mobilidade,
      cor,
      logotipo
    );
    response.json(resp);
  }
}

export { RegistarUserMarcasController };
