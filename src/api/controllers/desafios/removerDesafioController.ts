import { Request, Response } from "express";
import { RemoverDesafioService } from "../../services/desafios/removerDesafioService";

export class RemoverDesafioController {
  async handle(request: Request, response: Response) {
    //Pedir Id do desafio por parametro
    const desafioId = request.params.id;
    const uId = request.params.userId;

    try{
      if (uId === undefined || desafioId === undefined) {
        throw new Error("Pedido inválido");
      }
  
      //Serviço
      const removerDesafioService = new RemoverDesafioService();
      //Invocar Função
      const resp = await removerDesafioService.execute(desafioId, uId);
  
      //Responder
      response.status(resp.status).json(resp.data);
    } catch (e) {
      response.status(500).json(e.message)
    }
  }
}
