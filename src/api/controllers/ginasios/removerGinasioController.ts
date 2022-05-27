import { Request, Response } from "express";
import { RemoverGinasioService } from "../../services/ginasios/removerGinasioService";

class RemoverGinasioController {
  async handle(request: Request, response: Response) {
    const uId = request.params.adminId;
    const ginasioId = request.params.id;

    try{
      if (uId === undefined || ginasioId === undefined) {
        throw new Error("Pedido inválido");
      }
  
      const removerGinasioService = new RemoverGinasioService();
      const resp = await removerGinasioService.execute(uId, ginasioId);
      response.status(resp.status).json(resp.data);
    } catch (e) {
      response.status(500).json(e.message)
    }  
  }
}

export { RemoverGinasioController };
