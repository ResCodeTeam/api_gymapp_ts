import { Request, Response } from "express";
import { RemoverPlanoTreinoRealizadoService } from "../../services/plano/removerPlanoTreinoRealizadoService";

export class RemoverPlanoTreinoRealizadoController {
    async handle(request: Request, response: Response) {
        const alunoId = request.params.alunoId;
        const planoId = request.params.plano_id;
        if (alunoId === undefined || planoId === undefined) {
            response.status(500).json("Pedido inválido");
        }

        const removerPlanoTreinoRealizadoService = new RemoverPlanoTreinoRealizadoService();
        const resp = await removerPlanoTreinoRealizadoService.execute(alunoId, planoId);
        response.status(resp.status).json(resp.data);
    }
}
