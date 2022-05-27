import { Request, Response } from "express";
import { VerLocaisMedidaService } from "../../services/localMedida/verLocaisMedidaService";

export class VerLocaisMedidaController {
  async handle(request: Request, response: Response) {
    const uId = request.params.treinadorId;

    try{
      if (uId === undefined) {
        throw new Error("Pedido inválido");
      }
  
      const verLocaisMedidaService = new VerLocaisMedidaService();
      const resp = await verLocaisMedidaService.execute({ uId });
      response.status(resp.status).json(resp.data);
    } catch (e) {
      response.status(500).json(e.message)
    } 
  }
}
