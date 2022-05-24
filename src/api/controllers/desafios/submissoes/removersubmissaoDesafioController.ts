import { Request, Response } from "express";
import { RemoverSubmissaoDesafioService } from "../../../services/desafios/submissoes/removerSubmissaoDesafioService";

export class RemoverSubmissaoDesafioController {
  async handle(request: Request, response: Response) {
    const uid = request.params.treinadorId;
    const submissaoId = request.params.id;
    const desafioId = request.params.desafioId;

    try{
      if (
        uid === undefined ||
        submissaoId === undefined ||
        desafioId === undefined
      ) {
        throw new Error("Pedido inválido");
      }
  
      const removerSubmissaoDesafioService = new RemoverSubmissaoDesafioService();
      const resp = await removerSubmissaoDesafioService.execute(
        uid,
        submissaoId,
        desafioId
      );
  
      response.status(resp.status).json(resp.data);
    } catch (e) {
      response.status(500).json(e.message)
    }
  }
}
