import { Request, Response } from "express";
import { EditarGinasioService } from "../../services/ginasios/editarGinasioService";



export class EditarGinasioController{
    
    async handle (request: Request, response: Response){
        const ginasioId = request.params.ginasioId;
        const adminId=response.locals.uid;
        
        const {
            nome,
            rua,
            descricao,
            imagemUrl,
            lat,
            long
        }=request.body;

        const  editarGinasioService = new EditarGinasioService();
     
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
