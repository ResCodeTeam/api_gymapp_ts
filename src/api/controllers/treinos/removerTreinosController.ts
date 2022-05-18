import { Request, Response } from "express";
import { RemoverTreinosService } from "../../services/treinos/removerTreinosService";

class RemoverTreinosController{
    async handle(request: Request, response: Response){
        const uId = request.params.alunoId;
        const treinoId = request.params.treino_id;
        
    const removerTreinosService = new RemoverTreinosService();
    const resp = await removerTreinosService.execute(uId, treinoId);
    response.json(resp.data).status(resp.status);
    }
}

export{ RemoverTreinosController }
