import { Request, Response } from "express";
import { RemoverIsAceiteAvaliacoesService } from "../../../services/agendamentos/treinador/removerIsAceiteAvaliacoesService";

class RemoverIsAceiteAvaliacoesController{
    async handle(request: Request, response: Response){
        const agendamentoId = request.params.agendamento_id;

    const removerIsAceiteAvaliacoesService = new RemoverIsAceiteAvaliacoesService();
    const resp = await removerIsAceiteAvaliacoesService.execute(agendamentoId);
    response.json(resp);
    }
}

export{ RemoverIsAceiteAvaliacoesController }