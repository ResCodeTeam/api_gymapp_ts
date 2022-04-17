import { Request, Response } from "express";
import { RemoverModalidadesService } from "../../services/modalidades/removerModalidadesService";

class RemoverModalidadesController{
    async handle(request: Request, response: Response){
        const uid = response.locals.uid;
        const modalidadeId = request.params.id;
        const ginasioId = request.params.ginasioId;
        const removerModalidadesService = new RemoverModalidadesService();
        const resp = await removerModalidadesService.execute(modalidadeId, ginasioId, uid);
        response.json(resp);
    }
}

export{ RemoverModalidadesController }
