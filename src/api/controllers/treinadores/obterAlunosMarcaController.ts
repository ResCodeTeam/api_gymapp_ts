import { Request, Response } from "express";
import { ObterAlunosMarcaService } from "../../services/treinadores/obterAlunoMarcaService";

export class ObterAlunosMarcaController {
  async handle(request: Request, response: Response) {
    const marcaId = request.params.marcaId;
    const userId = request.params.userId;


    try {
      if (userId === undefined || marcaId === undefined) {
        throw new Error("Pedido inválido")

      }
      const obterAlunosMarcaService = new ObterAlunosMarcaService();
      const message = await obterAlunosMarcaService.execute({
        marcaId,
        userId
      });

      response.json(message.data).status(message.status);
    } catch (e) {
      response.status(500).json(e.message)
    }

  }
}