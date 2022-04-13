import { Request, Response } from "express";
import { RemoverAgendarDesafiosService } from "../../services/agendamentos/removerAgendarDesafiosService";

class RemoverAgendarDesafiosController{
    async handle(request: Request, response: Response){
        const agendamentoId = request.params.agendamento_id;
        const uId = request.params.id

    const removerAgendarDesafiosService = new RemoverAgendarDesafiosService();
    const resp = await removerAgendarDesafiosService.execute(agendamentoId, uId);
    response.json(resp);
    }
}

export{ RemoverAgendarDesafiosController }