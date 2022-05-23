import { Request, Response } from "express";
import { CriarPostsService } from "../../services/posts/criarPostsService";

class CriarPostsController {
  async handle(request: Request, response: Response) {
    const criadorId = request.params.userId;

    let { descricao, tipo, ginasioId, identificacao } = request.body;
    if (
      criadorId === undefined ||
      descricao === undefined ||
      tipo === undefined ||
      identificacao === undefined
    ) {
      response.status(500).json("Pedido inválido");
    }
    const data = new Date(Date.now());

    const criarPostsService = new CriarPostsService();
    const resp = await criarPostsService.execute({
      criadorId,
      data,
      descricao,
      tipo,
      ginasioId,
      identificacao,
    });
    response.status(resp.status).json(resp.data);
  }
}

export { CriarPostsController };
