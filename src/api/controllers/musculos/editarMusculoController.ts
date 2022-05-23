import { Request, Response } from "express";
import { EditarMusculoService } from "../../services/musculos/editarMusculoService";

export class EditarMusculoController {
  async handle(request: Request, response: Response) {
    const musculoId = request.params.musculoId;
    const { nome, imagem } = request.body;
    if (musculoId === undefined || nome === undefined || imagem === undefined) {
      response.status(500).json("Pedido inválido");
    }

    const editarMusculosService = new EditarMusculoService();
    const resp = await editarMusculosService.execute(musculoId, nome, imagem);

    response.status(resp.status).json(resp.data);
  }
}