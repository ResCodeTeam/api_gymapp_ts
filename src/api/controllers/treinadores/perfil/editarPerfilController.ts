import { Request, Response } from "express";



class EditarPerfilController{

    async handle (request: Request, response: Response){
        const uid = request.params.id;

        const  editarPerfilController = new EditarPerfilService();
    const resp = await editarPerfilController.execute(uid);
    response.json(resp);
    }
}
export{ EditarPerfilController }