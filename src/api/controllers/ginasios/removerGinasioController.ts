import { Request, Response } from "express";
import { RemoverGinasioService } from "../../services/ginasios/removerGinasioService";

class RemoverGinasioController{
    async handle(request: Request, response: Response){
        const uId = response.locals.uid;
        const ginasioId = request.params.id;
        
    const removerGinasioService = new RemoverGinasioService();
    const resp = await removerGinasioService.execute(uId, ginasioId);
    response.json(resp);
    }
}

export{ RemoverGinasioController }
