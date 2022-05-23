import { Request, Response } from "express";
import { VerUmaMarcaService } from "../../services/marcas/verUmaMarcaService";

export class VerUmaMarcaController {
  async handle(request: Request, response: Response) {
    const donoId = request.params.adminId;
    const marcaId = request.params.id;

    try{
      if (donoId === undefined || marcaId === undefined) {
        throw new Error("Pedido inválido");
      }
  
      const verUmaMarcaService = new VerUmaMarcaService();
      const resp = await verUmaMarcaService.execute({ donoId, marcaId });
      response.status(resp.status).json(resp.data);
    } catch (e) {
      response.status(500).json(e.message)
    }
  }
}
