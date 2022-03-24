import { Request, Response } from "express";
import { RegistarMarcaGinasiosService } from "../../../services/admin/ginasios/registarMarcaGinasiosService";

class RegistarMarcaGinasiosController {
  async handle(request: Request, response: Response) {
    const marcaId = request.params.id;
    const { nome, rua, cp, estado, imagemUrl, lat, long, cpExt } =
      request.body;

    const registarMarcaGinasiosController = new RegistarMarcaGinasiosService();
    const resp = await registarMarcaGinasiosController.execute({
      nome,
      rua,
      cp,
      marcaId,
      estado,
      imagemUrl,
      lat,
      long,
      cpExt
    });
    return resp;
  }
}
export { RegistarMarcaGinasiosController };
