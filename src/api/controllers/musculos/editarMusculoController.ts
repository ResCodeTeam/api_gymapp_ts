import { Request, Response } from "express";
import { EditarMusculoService } from "../../services/musculos/editarMusculoService";

export class EditarMusculoController {
  async handle(request: Request, response: Response) {
    const musculoId = request.params.musculoId;
    const { nome, imagem } = request.body;
    if (nome === undefined || imagem === undefined) {
      throw new Error("Pedido inválido")
    }

    const editarMusculosService = new EditarMusculoService();
    const resp = await editarMusculosService.execute(musculoId, nome, imagem);

    response.json(resp)
  }
}