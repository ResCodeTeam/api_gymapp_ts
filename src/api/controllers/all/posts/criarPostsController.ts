import { Request, Response } from "express";
<<<<<<< HEAD:src/api/controllers/admin/posts/criarPostsController.ts
import { CriarPostsService } from "../../../services/treinador/posts/criarPostsService";
=======
import { CriarPostsService } from "../../../services/all/posts/criarPostsService";
>>>>>>> f082aa2c692f0075ac98418c0a4e8b43494a6619:src/api/controllers/all/posts/criarPostsController.ts

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
