import { Request, Response } from "express";
import { changeTimeZone } from "../../helpers/dateHelpers";
import { EditarDesafioService } from "../../services/desafios/editarDesafiosService";


export class EditarDesafioController {
    async handle(request: Request, response: Response) {
        const editarDesafioService = new EditarDesafioService()

        const data = {
            nome: request.body.nome,
            modalidade: request.body.modalidade,
            recompensa: request.body.recompensa,
            descricao: request.body.descricao,
            data_inicio: request.body.dataInicio !== undefined ? new Date(request.body.dataInicio) : undefined,
            data_fim: request.body.dataFim !== undefined ? new Date(request.body.dataFim) : undefined,
        }
        if (data.nome === undefined || data.recompensa === undefined || data.descricao === undefined) {
            throw new Error("Pedido inválido")
        }
        const desafioId = request.params.id;


        if (data.data_inicio >= data.data_fim) {
            throw new Error("Data de início deve ser anterior à data de fim")
        }

        if (data.data_fim <= data.data_inicio) {
            throw new Error("Data de fim deve ser posterior à data de início")
        }

        const resp = await editarDesafioService.execute(data, desafioId)

        response.json(resp);
    }
}
