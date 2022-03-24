import { Request, Response } from "express";
import registarMarcaGinasiosService from "../../../services/admin/ginasios/registarMarcaGinasiosService";

class RegistarMarcaGinasiosController {
  async handle(request: Request, response: Response) {
    const marca_id = request.params.id;
    const { nome, rua, cp, estado, imagem_url, lat, long, cp_ext } =
      request.body;

    const resp = await registarMarcaGinasiosService(
      nome,
      rua,
      cp,
      marca_id,
      estado,
      imagem_url,
      lat,
      long,
      cp_ext
    );
    response.json(resp);
  }
}
export { RegistarMarcaGinasiosController };
