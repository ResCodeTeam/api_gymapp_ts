import { Request, Response } from "express";
import { AddMusculoService } from "../../services/musculos/addMusculoService";

export class AddMusculoController {
  async handle(request: Request, response: Response) {
    const { nome, image } = request.body;

    try{
      if (nome === undefined || image === undefined) {
        throw new Error("Pedido inválido");
      }
  
      const addMusculoService = new AddMusculoService();
      const resp = await addMusculoService.execute(nome, image);
      response.status(resp.status).json(resp.data);
    } catch (e) {
      response.status(500).json(e.message)
    }
  }
}
