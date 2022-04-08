import { Request, Response } from "express";
import { RemoverTreinosService } from "../../services/treinos/removerTreinosService";

class RemoverTreinosController{
    async handle(request: Request, response: Response){
        const treinoId = request.params.id;

    const removerTreinosService = new RemoverTreinosService();
    const resp = await removerTreinosService.execute(treinoId);
    response.json(resp);
    }
}

export{ RemoverTreinosController }
