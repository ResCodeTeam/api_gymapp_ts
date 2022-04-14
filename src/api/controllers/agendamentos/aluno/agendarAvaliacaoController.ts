import { Request, Response } from "express";
import { AgendarAvaliacaoService } from "../../../services/agendamentos/aluno/agendarAvaliacaoService";


export class AgendarAvaliacaoController {
    async handle(request: Request, response: Response){
      let {uid, ginasioId, treinadorId} = request.body;
      
      const dataAgendamento = new Date(Date.now());
      const agendarAvaliacaoService = new AgendarAvaliacaoService();
      const resp = await agendarAvaliacaoService.execute({uid, dataAgendamento, ginasioId, treinadorId});
      response.json(resp);
    }
}
