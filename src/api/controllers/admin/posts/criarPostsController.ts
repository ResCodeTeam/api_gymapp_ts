import { Request, Response } from "express";
import criarPostsService = require("../../../services/admin/posts/criarPostsService");

class CriarPostsController{
    async handle(request: Request, response: Response) {
        let { criador_id, data, descricao, tipo, ginasio_id } = request.body;

  const resp = await criarPostsService(criador_id, data, descricao, tipo, ginasio_id);
  response.status(200).json(resp);
    }
}

export{ CriarPostsController }