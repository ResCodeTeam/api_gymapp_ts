import { Request, Response } from "express";
import { VerTodosGinasiosService } from "../../services/ginasios/verTodosGinasiosService";

export class VerTodosGinasiosController {
  async handle(request: Request, response: Response) {
    const marcaId = request.params.id;
    const userId = request.params.adminId;

    try{
      if (userId === undefined || marcaId === undefined) {
        throw new Error("Pedido inválido");
      }
  
      const verTodosGinasiosService = new VerTodosGinasiosService();
      const resp = await verTodosGinasiosService.execute({ marcaId, userId });
      response.status(resp.status).json(resp.data);
    } catch (e) {
      response.status(500).json(e.message)
    }
  }
}
