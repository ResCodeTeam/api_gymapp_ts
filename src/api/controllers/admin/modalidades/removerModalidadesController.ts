import { Request, Response } from "express";
import removerModalidadesService from "../../../services/admin/modalidades/removerModalidadesService";

class RemoverModalidadesController{
    async handle(request: Request, response: Response){
        const modalidade_id = request.params.id;

    const resp = await removerModalidadesService(modalidade_id);
    response.json(resp)
    }
}

export{ RemoverModalidadesController }
