import { Request, Response } from "express";
import { RemoverPlanoTreinoService } from "../../services/plano/removerPlanoTreinoService";

export class RemoverPlanoTreinoController {
    async handle(request: Request, response: Response) {
        const treinadorId = request.params.treinadorId;
        const planoId = request.params.plano_id;

        const removerPlanoTreinoService = new RemoverPlanoTreinoService();
        const resp = await removerPlanoTreinoService.execute(treinadorId, planoId);
        response.json(resp);
    }
}
