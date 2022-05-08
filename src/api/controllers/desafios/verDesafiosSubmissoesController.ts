import { Request, Response} from "express";
import { VerDesafiosSubmissoesService } from "../../services/desafios/verDesafiosSubmissoesService";

export class VerDesafiosSubmissoesController{
    async handle(request : Request, response : Response) {
        const uId = response.locals.uid;
        const desafioId = request.params.desafioId;
        const encerrarDesafiosSubmissoesService = new VerDesafiosSubmissoesService();
        await encerrarDesafiosSubmissoesService.execute(uId, desafioId).then(data => {
            response.json(data);
        }).catch(err => {
            response.json(err);
        })


    }
}