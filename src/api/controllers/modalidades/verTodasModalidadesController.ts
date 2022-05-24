import { Request, Response } from "express";
import { VerTodasModalidadesService } from "../../services/modalidades/verTodasModalidadesService";

export class VerTodasModalidadesController {
  async handle(request: Request, response: Response) {
    const ginasioId = request.params.id;
    const userId = request.params.adminId;

    try{
      if (ginasioId === undefined || userId === undefined) {
        throw new Error("Pedido inválido");
      }
  
      const verTodasModalidadesService = new VerTodasModalidadesService();
      const resp = await verTodasModalidadesService.execute({
        ginasioId,
        userId,
      });
      response.status(resp.status).json(resp.data);
    } catch (e) {
      response.status(500).json(e.message)
    }
  }
}
