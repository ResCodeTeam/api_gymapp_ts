import { Request, Response } from "express";
import { changeTimeZone } from "../../helpers/dateHelpers";
import { EditarDesafioService } from "../../services/desafios/editarDesafiosService";


export class EditarDesafioController {
    async handle(request: Request, response: Response) {
        const editarDesafioService = new EditarDesafioService()
        const uId = request.params.userId;

        const data = {
            nome: request.body.nome,
            modalidade: request.body.modalidade,
            recompensa: request.body.recompensa,
            descricao: request.body.descricao,
            data_inicio: request.body.dataInicio !== undefined ? new Date(request.body.dataInicio) : undefined,
            data_fim: request.body.dataFim !== undefined ? new Date(request.body.dataFim) : undefined,
        }
        if (uId === undefined || data.nome === undefined || data.recompensa === undefined || data.descricao === undefined) {
            response.json("Pedido inválido").status(500);
        }
        const desafioId = request.params.id;


        if (data.data_inicio >= data.data_fim) {
            response.json("Data de início deve ser anterior à data de fim").status(500);
        }

        if (data.data_fim <= data.data_inicio) {
            response.json("Data de fim deve ser posterior à data de início").status(500);
        }

        const resp = await editarDesafioService.execute(uId, data, desafioId)

        response.json(resp.data).status(resp.status);
    }
}
