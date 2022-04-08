import { Request, Response } from "express";
import { CriarAtividadeService } from "../../services/atividades/criarAtividadeService";

class CriarAtividadeController {
  async handle(request: Request, response: Response) {
    const { descricao, icon } = request.body;

    const criarAtividadeService = new CriarAtividadeService();
    const resp = await criarAtividadeService.execute({
      descricao,
      icon, 
    });
    response.json(resp);
  }
}
export { CriarAtividadeController };
