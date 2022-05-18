import { Request, Response } from "express";
import { RemoverGinasioService } from "../../services/ginasios/removerGinasioService";

class RemoverGinasioController {
    async handle(request: Request, response: Response) {
        const uId = request.params.adminId;
        const ginasioId = request.params.id;
        
    const removerGinasioService = new RemoverGinasioService();
    const resp = await removerGinasioService.execute(uId, ginasioId);
    response.json(resp.data).status(resp.status);
    }
}

export { RemoverGinasioController }
