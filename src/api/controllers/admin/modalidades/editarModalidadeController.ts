import { Request, Response } from "express";
import { EditarModalidadesService } from "../../../services/admin/modalidades/editarModalidadeService";


class EditarModalidadesController{

    async handle (request: Request, response: Response){
        const modalidadeId = request.params.id;

        const  editarModalidadesController = new EditarModalidadesService();
    const resp = await editarModalidadesController.execute(modalidadeId);
    response.json(resp);
    }
}
export{ EditarModalidadesController }