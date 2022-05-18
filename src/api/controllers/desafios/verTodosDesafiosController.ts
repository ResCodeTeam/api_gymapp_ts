import { Request, Response } from "express";
import { VerTodosDesafiosService } from "../../services/desafios/verTodosDesafiosService";

export class VerTodosDesafiosController{
    async handle(request:Request,response:Response){
        const uId = request.params.userId;
        const ginasioId = request.params.id;

        const verTodosDesafiosService = new VerTodosDesafiosService();
        const resp = await verTodosDesafiosService.execute({uId, ginasioId});
        response.json(resp.data).status(resp.status);
    }
}