import { Request, Response } from "express";
import { CriarPostsService } from "../../services/posts/criarPostsService";


class CriarPostsController {
  async handle(request: Request, response: Response) {
    const criadorId = response.locals.uid
    let { descricao, tipo, ginasioId,identificacao } = request.body;
    const data = new Date(Date.now())

    const criarPostsService = new CriarPostsService();
    const resp = await criarPostsService.execute({
      criadorId,
      data,
      descricao,
      tipo,
      ginasioId,
      identificacao
    });
    response.json(resp);
  }
}

export { CriarPostsController };
