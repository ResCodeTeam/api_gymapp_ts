import { Request, Response } from "express";
import { CriarNotificacaoUserService } from "../../services/notificacoes/criarNotificacaoUserService";

export class CriarNotificacaoUserController {
  async handle(request: Request, response: Response) {
    const destinoId = request.params.id;
    const origemId = request.params.adminId;
    const { conteudo, tipo } = request.body;
    if (
      destinoId === undefined ||
      origemId === undefined ||
      conteudo === undefined ||
      tipo === undefined
    ) {
      response.status(500).json("Pedido inválido");
    }

    const criarNotificacaoUserService = new CriarNotificacaoUserService();
    const resp = await criarNotificacaoUserService.execute({
      destinoId,
      origemId,
      conteudo,
      tipo,
    });

    response.status(resp.status).json(resp.data);
  }
}
