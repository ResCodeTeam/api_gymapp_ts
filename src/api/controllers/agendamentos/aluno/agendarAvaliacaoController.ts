import { Request, Response } from "express";
import { AgendarAvaliacaoService } from "../../../services/agendamentos/aluno/agendarAvaliacaoService";


export class AgendarAvaliacaoController {
    async handle(request: Request, response: Response){
      let {uid, dataAgendamento, ginasioId, treinadorId} = request.body;
      
      dataAgendamento = new Date(dataAgendamento);
      const agendarAvaliacaoService = new AgendarAvaliacaoService();
      const resp = await agendarAvaliacaoService.execute({uid, dataAgendamento, ginasioId, treinadorId});
      response.json(resp);
    }
}
