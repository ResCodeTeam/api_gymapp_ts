import { Request, Response } from "express";
import { RemoverModalidadesService } from "../../../services/admin/modalidades/removerModalidadesService";

class RemoverModalidadesController{
    async handle(request: Request, response: Response){
        const modalidadeId = request.params.id;
    
    const removerModalidadesService = new RemoverModalidadesService();
    const resp = await removerModalidadesService.execute(modalidadeId);
    response.json(resp);
    }
}

export{ RemoverModalidadesController }
