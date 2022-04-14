import { Request, Response } from "express";
import { AgendarDesafiosService } from "../../../services/agendamentos/aluno/agendarDesafiosService";

export class AgendarDesafiosController {
    async handle(request: Request, response: Response){
      const desafioId = request.params.id;
      let { uid, ginasioId, treinadorId } = request.body;
      
      const dataAgendamento = new Date(Date.now());
      const agendarDesafiosService = new AgendarDesafiosService();
      const resp = await agendarDesafiosService.execute({uid, dataAgendamento, desafioId, ginasioId, treinadorId});
      response.json(resp);
    }
}
