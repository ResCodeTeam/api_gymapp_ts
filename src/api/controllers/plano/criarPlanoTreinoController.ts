import { Request, Response } from "express";
import { CriarPlanoTreinoService } from "../../services/plano/criarPlanoTreinoService";


export class CriarPlanoTreinoController {
    async handle(request: Request, response: Response) {
        const treinadorId = request.params.treinadorId;

        const { alunoId, modalidadeId, blocos } = request.body;
        if (alunoId === undefined || treinadorId === undefined || modalidadeId === undefined || blocos === undefined) {
            throw new Error("Pedido inválido")
        }

        const data = new Date(Date.now())
        const criarPlanoTreinoService = new CriarPlanoTreinoService();
        const resp = await criarPlanoTreinoService.execute({ alunoId, treinadorId, data, modalidadeId, blocos });
        response.json(resp.data).status(resp.status);
    }
}
