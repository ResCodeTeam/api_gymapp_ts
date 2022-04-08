import { Request, Response } from "express";
import { AgendarAvaliacaoService } from "../../services/agendamentos/agendarAvaliacaoService";


export class AgendarAvaliacaoController {
    async handle(request: Request, response: Response){
      let {uid, dataAgendamento, estado, ginasioId, treinadorId} = request.body;
      
      dataAgendamento = new Date(dataAgendamento);
      const agendarAvaliacaoService = new AgendarAvaliacaoService();
      const resp = await agendarAvaliacaoService.execute({uid, dataAgendamento, estado, ginasioId, treinadorId});
      response.json(resp);
    }
}
