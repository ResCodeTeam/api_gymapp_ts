import { Request, Response } from "express";
import { AgendarDesafiosService } from "../../../services/agendamentos/aluno/agendarDesafiosService";

export class AgendarDesafiosController {
    async handle(request: Request, response: Response){
      const desafioId = request.params.id;
      let { uid, dataAgendamento, ginasioId, treinadorId } = request.body;
      
      dataAgendamento = new Date(dataAgendamento);
      const agendarDesafiosService = new AgendarDesafiosService();
      const resp = await agendarDesafiosService.execute({uid, dataAgendamento, desafioId, ginasioId, treinadorId});
      response.json(resp);
    }
}