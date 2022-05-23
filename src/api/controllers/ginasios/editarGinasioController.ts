import { Request, Response } from "express";
import { EditarGinasioService } from "../../services/ginasios/editarGinasioService";

export class EditarGinasioController {
  async handle(request: Request, response: Response) {
    const ginasioId = request.params.ginasioId;
    const adminId = request.params.adminId;

    const { nome, rua, descricao, imagemUrl, lat, long } = request.body;
    if (
      ginasioId === undefined ||
      adminId === undefined ||
      nome === undefined ||
      rua === undefined ||
      descricao === undefined ||
      imagemUrl === undefined ||
      lat === undefined ||
      long === undefined
    ) {
      response.status(500).json("Pedido inválido");
    }

    const editarGinasioService = new EditarGinasioService();

    const resp = await editarGinasioService.execute({
      adminId,
      ginasioId,
      nome,
      rua,
      descricao,
      imagemUrl,
      lat,
      long,
    });
    response.status(resp.status).json(resp.data);
  }
}
