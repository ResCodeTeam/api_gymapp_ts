import { Request, Response } from "express";
import { EditarGinasioService } from "../../services/ginasios/editarGinasioService";



export class EditarGinasioController {

    async handle(request: Request, response: Response) {
        const ginasioId = request.params.ginasioId;
        const adminId = request.params.adminId;

        const {
            nome,
            rua,
            descricao,
            imagemUrl,
            lat,
            long
        } = request.body;
        if (nome === undefined || rua === undefined || descricao === undefined || imagemUrl === undefined || lat === undefined || long === undefined) {
            throw new Error("Pedido inválido")
        }

        const editarGinasioService = new EditarGinasioService();

        const resp = await editarGinasioService.execute({
            adminId,
            ginasioId,
            nome,
            rua,
            descricao,
            imagemUrl,
            lat,
            long
        });
        response.json(resp);
    }
}
