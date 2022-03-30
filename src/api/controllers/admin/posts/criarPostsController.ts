import { Request, Response } from "express";
import { CriarPostsService } from "../../../services/treinador/posts/criarPostsService";

class CriarPostsController {
  async handle(request: Request, response: Response) {
    let { criadorId, data, descricao, tipo, ginasioId } = request.body;

    const criarPostsService = new CriarPostsService();
    const resp = await criarPostsService.execute({
      criadorId,
      data,
      descricao,
      tipo,
      ginasioId,
    });
    response.json(resp);
  }
}

export { CriarPostsController };
