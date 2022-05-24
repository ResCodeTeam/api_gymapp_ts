import { Request, Response } from "express";
import { GetTop10Service } from "../../services/marcas/getTop10Service";

export class GetTop10Controller {
  async handle(request: Request, response: Response) {
    const uid = request.params.treinadorId;

    try{
      if (uid === undefined) {
        throw new Error("Pedido inválido");
      }
      const getTop10Service = new GetTop10Service();
      const resp = await getTop10Service.execute(uid);
      response.status(resp.status).json(resp.data); 
    } catch (e) {
      response.status(500).json(e.message)
    } 
  }
}
