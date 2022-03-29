import { Request, Response} from "express";
import { verDesafiosParticipantesService } from "../../../services/admin/desafios/verDesafiosParticipantesService";

export class VerDesafiosParticipantesController{
    async handle(request : Request, response : Response) {
        const encerrarDesafiosController = new verDesafiosParticipantesService();
        await encerrarDesafiosController.execute().then(data => {
            response.json(data);
        }).catch(err => {
            response.json(err);
        })


    }
}