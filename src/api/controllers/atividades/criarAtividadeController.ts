import { Request, Response } from "express";
import { CriarAtividadeService } from "../../services/atividades/criarAtividadeService";

class CriarAtividadeController {
  async handle(request: Request, response: Response) {
    const { descricao, icon } = request.body;

    try{
      if (descricao === undefined || icon === undefined) {
        throw new Error("Pedido inválido");
      }
  
      const criarAtividadeService = new CriarAtividadeService();
      const resp = await criarAtividadeService.execute({
        descricao,
        icon,
      });
      response.status(resp.status).json(resp.data);
    } catch (e) {
      response.status(500).json(e.message)
    }
    
  }
}
export { CriarAtividadeController };
