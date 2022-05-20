import { Request, Response } from "express";
import { RegistarMarcaGinasiosService } from "../../services/ginasios/registarMarcaGinasiosService";

class RegistarMarcaGinasiosController {
  async handle(request: Request, response: Response) {
    const marcaId = request.params.id;
    const uId = request.params.adminId;
    const { nome, rua, cp, cpExt, imagemUrl, lat, long } =
      request.body;
    if (marcaId === undefined || uId === undefined || nome === undefined || rua === undefined || cp === undefined || cpExt === undefined || imagemUrl === undefined || lat === undefined || long === undefined) {
      response.json("Pedido inválido").status(500);
    }

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
      uId
    });
    response.json(resp.data).status(resp.status);
  }
}
export { RegistarMarcaGinasiosController };
