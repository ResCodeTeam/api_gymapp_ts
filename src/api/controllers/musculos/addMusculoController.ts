import { Request, Response } from "express";
import { AddMusculoService } from "../../services/musculos/addMusculoService";

export class AddMusculoController {
  async handle(request: Request, response: Response) {
    const { nome, image } = request.body;
    if (nome === undefined || image === undefined) {
      throw new Error("Pedido inválido")
    }

    const addMusculoService = new AddMusculoService();
    const resp = await addMusculoService.execute(nome, image);
    response.json(resp.data).status(resp.status);
  }
}