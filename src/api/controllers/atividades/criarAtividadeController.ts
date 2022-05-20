import { Request, Response } from "express";
import { CriarAtividadeService } from "../../services/atividades/criarAtividadeService";

class CriarAtividadeController {
  async handle(request: Request, response: Response) {
    const { descricao, icon } = request.body;
    if (descricao === undefined || icon === undefined) {
      response.json("Pedido inválido").status(500);
    }

    const criarAtividadeService = new CriarAtividadeService();
    const resp = await criarAtividadeService.execute({
      descricao,
      icon,
    });
    response.json(resp.data).status(resp.status);
  }
}
export { CriarAtividadeController };
