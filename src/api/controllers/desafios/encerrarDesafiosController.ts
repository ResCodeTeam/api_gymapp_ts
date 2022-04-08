import { Request, Response} from "express";
import { EncerrarDesafiosService } from "../../services/desafios/encerrarDesafiosService";

export class EncerrarDesafiosController{
    async handle(request : Request, response : Response) {
        const desafioId = request.params.id;
        const { estado } = request.body;
        const encerrarDesafiosController = new EncerrarDesafiosService();

        const resp = await encerrarDesafiosController.execute({
            estado, 
            desafioId
        });
        response.json(resp);
    }
}
