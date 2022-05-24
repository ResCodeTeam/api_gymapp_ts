import { Request, Response } from "express";
import { VerTodasMarcasService } from "../../services/marcas/verTodasMarcasService";

export class VerTodasMarcasController {
  async handle(request: Request, response: Response) {
    const donoId = request.params.adminId;

    try{
      if (donoId === undefined) {
        throw new Error("Pedido inválido");
      }
  
      const verTodasMarcasService = new VerTodasMarcasService();
      const resp = await verTodasMarcasService.execute({ donoId });
      response.status(resp.status).json(resp.data);
    } catch (e) {
      response.status(500).json(e.message)
    }
  }
}
