import { Request, Response } from "express";
import { CriarAtividadeService } from "../../services/atividades/criarAtividadeService";

class CriarAtividadeController {
  async handle(request: Request, response: Response) {
    const { descricao, icon } = request.body;
    if (descricao === undefined || icon === undefined) {
      response.status(500).json("Pedido inválido");
    }

    const criarAtividadeService = new CriarAtividadeService();
    const resp = await criarAtividadeService.execute({
      descricao,
      icon,
    });
    response.status(resp.status).json(resp.data);
  }
}
export { CriarAtividadeController };
