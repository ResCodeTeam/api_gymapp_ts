import { Request, Response } from "express";
import { RemoverIsAceiteDesafiosService } from "../../../services/agendamentos/treinador/removerIsAceiteDesafiosService";

class RemoverIsAceiteDesafiosController{
    async handle(request: Request, response: Response){
        const agendamentoId = request.params.agendamento_id;

    const removerIsAceiteDesafiosService = new RemoverIsAceiteDesafiosService();
    const resp = await removerIsAceiteDesafiosService.execute(agendamentoId);
    response.json(resp);
    }
}

export{ RemoverIsAceiteDesafiosController }