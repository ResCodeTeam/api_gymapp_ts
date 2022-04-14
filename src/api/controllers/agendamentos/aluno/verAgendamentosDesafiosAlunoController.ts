import { Request, Response } from "express";
import { VerAgendamentosDesafiosAlunoService } from "../../../services/agendamentos/aluno/verAgendamentosDesafiosAlunoService";

export class VerAgendamentosDesafiosAlunoController{
    async handle(request:Request,response:Response){
        const uId = request.params.id;

        const verAgendamentosDesafiosAlunoService = new VerAgendamentosDesafiosAlunoService();
        const resp = await verAgendamentosDesafiosAlunoService.execute(uId);
        response.json(resp)
    }
}