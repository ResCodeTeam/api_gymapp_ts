import { Request, Response } from "express";
import { VerDesafiosMarcaService } from "../../services/desafios/verDesafiosMarcaService";

export class VerDesafiosMarcaController {
  async handle(request: Request, response: Response) {
    const uid = request.params.treinadorId;

    try{
      if (uid === undefined) {
        throw new Error("Pedido inválido");
      }
  
      const verDesafiosMarcaService = new VerDesafiosMarcaService();
      const resp = await verDesafiosMarcaService.execute(uid);
  
      response.status(resp.status).json(resp.data);
    } catch (e) {
      response.status(500).json(e.message)
    }
  }
}
