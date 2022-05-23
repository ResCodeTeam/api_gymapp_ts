import { Request, Response } from "express";
import { CriarNotificacaoGinasioService } from "../../services/notificacoes/criarNotificacaoGinasioService";

export class CriarNotificacaoGinasioController {
    async handle(request: Request, response: Response) {
        const userId = request.params.adminId;
        const ginasioId = request.params.ginasioId;
        const { conteudo, tipo } = request.body;
        if (userId === undefined || ginasioId === undefined || conteudo === undefined || tipo === undefined) {
            response.status(500).json("Pedido inválido");
        }

        const criarNotificacaoMarcarController = new CriarNotificacaoGinasioService();
        const resp = await criarNotificacaoMarcarController.execute({
            userId,
            ginasioId,
            conteudo,
            tipo
        });
        response.status(resp.status).json(resp.data);
    }
}