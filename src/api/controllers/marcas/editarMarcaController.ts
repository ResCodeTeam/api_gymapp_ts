import { Request, Response } from "express";
import { EditarMarcaService } from "../../services/marcas/editarMarcaService";

export class EditarMarcaController {
  async handle(request: Request, response: Response) {
    const marcaId = request.params.marcaId;
    const adminId = request.params.adminId;

    const { nome, cor, logotipo, mobilidade } = request.body;
    if (
      marcaId === undefined ||
      adminId === undefined ||
      nome === undefined ||
      cor === undefined ||
      logotipo === undefined ||
      mobilidade === undefined
    ) {
      response.status(500).json("Pedido inválido");
    }

    const editarMarcaService = new EditarMarcaService();

    const resp = await editarMarcaService.execute({
      adminId,
      marcaId,
      nome,
      cor,
      logotipo,
      mobilidade,
    });
    response.status(resp.status).json(resp.data);
  }
}
