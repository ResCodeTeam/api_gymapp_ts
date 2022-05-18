import { Request, Response} from "express";
import { VerDesafiosSubmissoesService } from "../../services/desafios/verDesafiosSubmissoesService";

export class VerDesafiosSubmissoesController{
    async handle(request : Request, response : Response) {
        const uId = request.params.userId;
        const desafioId = request.params.desafioId;
        
        const encerrarDesafiosSubmissoesService = new VerDesafiosSubmissoesService();
        const resp = await encerrarDesafiosSubmissoesService.execute(uId, desafioId);
        response.json(resp.data).status(resp.status);
    }
}