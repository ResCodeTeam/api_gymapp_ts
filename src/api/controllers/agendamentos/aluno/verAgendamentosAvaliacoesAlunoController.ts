import { Request, Response } from "express";
import { VerAgendamentosAvaliacoesAlunoService } from "../../../services/agendamentos/aluno/verAgendamentosAvaliacoesAlunoService";

export class VerAgendamentosAvaliacoesAlunoController{
    async handle(request:Request,response:Response){
        const uId = response.locals.uid;

        const verAgendamentosAvaliacoesAlunoService = new VerAgendamentosAvaliacoesAlunoService();
        const resp = await verAgendamentosAvaliacoesAlunoService.execute(uId);
        response.json(resp)
    }
}