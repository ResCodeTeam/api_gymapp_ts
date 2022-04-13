import { Request, Response } from "express";
import { RemoverAgendarAvaliacaoService } from "../../services/agendamentos/removerAgendarAvaliacaoService";

class RemoverAgendarAvaliacaoController{
    async handle(request: Request, response: Response){
        const agendamentoId = request.params.id;

    const removerAgendarAvaliacaoService = new RemoverAgendarAvaliacaoService();
    const resp = await removerAgendarAvaliacaoService.execute(agendamentoId);
    response.json(resp);
    }
}

export{ RemoverAgendarAvaliacaoController }