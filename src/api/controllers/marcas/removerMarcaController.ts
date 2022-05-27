import { Request, Response } from "express";
import { RemoverMarcaService } from "../../services/marcas/removerMarcaService";

export class RemoverMarcaController {
  async handle(request: Request, response: Response) {
    const uId = request.params.adminId;
    const marcaId = request.params.id;

    try{
      if (uId === undefined || marcaId === undefined) {
        throw new Error("Pedido inválido");
      }
  
      const removerMarcaService = new RemoverMarcaService();
      const resp = await removerMarcaService.execute(uId, marcaId);
      response.status(resp.status).json(resp.data);
    } catch (e) {
      response.status(500).json(e.message)
    } 
  }
}
