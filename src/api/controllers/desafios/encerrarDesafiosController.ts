import { Request, Response} from "express";
import { EncerrarDesafiosService } from "../../services/desafios/encerrarDesafiosService";

export class EncerrarDesafiosController{
    async handle(request : Request, response : Response) {
        const uId = response.locals.uid;
        const desafioId = request.params.id;
        const { isEncerrado } = request.body;
        if(isEncerrado === undefined){
            throw new Error("Pedido inválido")
        }
        
        const encerrarDesafiosService = new EncerrarDesafiosService();

        const resp = await encerrarDesafiosService.execute({
            uId,
            isEncerrado, 
            desafioId
        });
        response.json(resp);
    }
}
