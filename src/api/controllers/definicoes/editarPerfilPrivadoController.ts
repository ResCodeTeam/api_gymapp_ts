import { Request, Response } from "express";
import { EditarPerfilPrivadoService } from "../../services/definicoes/editarPerfilPrivadoService";


export class EditarPerfilPrivadoController {

    async handle(request: Request, response: Response) {
        const uId = request.params.userId;
        const { is_privado } = request.body;
        if (uId === undefined || is_privado === undefined) {
            response.json("Pedido inválido").status(500);
        }

        const editarPerfilPrivadoController = new EditarPerfilPrivadoService();
        const resp = await editarPerfilPrivadoController.execute(uId, is_privado);
        response.status(resp.status).json(resp.data);
    }
}
