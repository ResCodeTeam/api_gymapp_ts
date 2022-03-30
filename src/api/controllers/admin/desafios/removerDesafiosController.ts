import { Request, Response } from "express";
import { RemoverDesafiosService } from "../../../services/admin/desafios/removerDesafiosService";


export class RemoverDesafiosController{

    async handle(request: Request, response: Response){
        
        const desafioId = request.params.id;
        const removerDesafiosController = new RemoverDesafiosService();
        const resp= await removerDesafiosController.execute(desafioId);
        response.json(resp)
    }
}
