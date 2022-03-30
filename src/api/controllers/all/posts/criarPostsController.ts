import { Request, Response } from "express";
import { CriarPostsService } from "../../../services/all/posts/criarPostsService";

class CriarPostsController {
  async handle(request: Request, response: Response) {
    let { criadorId, descricao, tipo, ginasioId } = request.body;
    const data = new Date(Date.now())

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
