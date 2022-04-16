import { Request, Response } from "express";
import { VerAgendamentosDesafiosAlunoService } from "../../../services/agendamentos/aluno/verAgendamentosDesafiosAlunoService";

export class VerAgendamentosDesafiosAlunoController{
    async handle(request:Request,response:Response){
        const uId = response.locals.uid;

        const verAgendamentosDesafiosAlunoService = new VerAgendamentosDesafiosAlunoService();
        const resp = await verAgendamentosDesafiosAlunoService.execute(uId);
        response.json(resp)
    }
}