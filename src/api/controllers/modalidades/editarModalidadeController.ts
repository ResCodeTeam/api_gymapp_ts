import { Request, Response } from "express";
import { EditarModalidadesService } from "../../services/modalidades/editarModalidadeService";


export class EditarModalidadesController {

    async handle(request: Request, response: Response) {
        const uid = request.params.adminId;
        const modalidadeId = request.params.id;
        const ginasioId = request.params.ginasioId;

        let { imagemUrl, nome } = request.body;
        if (uid === undefined || modalidadeId === undefined || ginasioId === undefined || imagemUrl === undefined || nome === undefined) {
            response.json("Pedido inválido").status(500);
        }


        const editarModalidadesController = new EditarModalidadesService();
        const resp = await editarModalidadesController.execute({ imagemUrl, nome, modalidadeId, ginasioId, uid });
        response.status(resp.status).json(resp.data);
    }
}
