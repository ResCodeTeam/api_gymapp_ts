import { Request, Response } from "express";
import { RegistarMarcaGinasiosService } from "../../services/ginasios/registarMarcaGinasiosService";

class RegistarMarcaGinasiosController {
  async handle(request: Request, response: Response) {
    const marcaId = request.params.id;
    const { nome, rua, cp,cpExt, imagemUrl, lat, long } =
      request.body;

    const registarMarcaGinasiosController = new RegistarMarcaGinasiosService();
    const resp = await registarMarcaGinasiosController.execute({
      nome,
      rua,
      cp,
      cpExt,
      marcaId,
      imagemUrl,
      lat,
      long,
      
    });
    response.json(resp);
  }
}
export { RegistarMarcaGinasiosController };
