import { Request, Response } from "express";
import { RemoverAgendarAvaliacaoService } from "../../../services/agendamentos/aluno/removerAgendarAvaliacaoService";

class RemoverAgendarAvaliacaoController{
    async handle(request: Request, response: Response){
        const agendamentoId = request.params.agendamento_id;
        const uId = request.params.id

    const removerAgendarAvaliacaoService = new RemoverAgendarAvaliacaoService();
    const resp = await removerAgendarAvaliacaoService.execute(agendamentoId, uId);
    response.json(resp);
    }
}

export{ RemoverAgendarAvaliacaoController }