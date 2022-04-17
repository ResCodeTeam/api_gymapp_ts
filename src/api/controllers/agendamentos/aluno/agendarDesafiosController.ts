import { Request, Response } from "express";
import { AgendarDesafiosService } from "../../../services/agendamentos/aluno/agendarDesafiosService";

export class AgendarDesafiosController {
    async handle(request: Request, response: Response){
      const uid = response.locals.uid;
      const desafioId = request.params.id;
      let { ginasioId, treinadorId } = request.body;
      if(ginasioId === undefined || treinadorId === undefined){
        throw new Error("Pedido inválido")
      }
      
      const dataAgendamento = new Date(Date.now());
      const agendarDesafiosService = new AgendarDesafiosService();
      const resp = await agendarDesafiosService.execute({uid, dataAgendamento, desafioId, ginasioId, treinadorId});
      response.json(resp);
    }
}
