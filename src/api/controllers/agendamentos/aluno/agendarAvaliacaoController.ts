import { Request, Response } from "express";
import { AgendarAvaliacaoService } from "../../../services/agendamentos/aluno/agendarAvaliacaoService";


export class AgendarAvaliacaoController {
    async handle(request: Request, response: Response){
      const uid = response.locals.uid;
      let {ginasioId} = request.body;
      if(ginasioId === undefined){
        throw new Error("Pedido inválido")
      }
      
      const dataAgendamento = new Date(Date.now());
      const agendarAvaliacaoService = new AgendarAvaliacaoService();
      const resp = await agendarAvaliacaoService.execute({uid, dataAgendamento, ginasioId});
      response.json(resp);
    }
}
