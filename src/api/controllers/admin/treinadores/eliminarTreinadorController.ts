import { Request, Response } from "express";
import { EliminarTreinadorService } from "../../../services/admin/treinadores/eliminarTreinadorService";

class EliminarTreinadorController{
    async handle(request : Request, response : Response){
        const treinador_id = request.params.id;

        const eliminarTreinadorService = new EliminarTreinadorService();
        const resp = await eliminarTreinadorService.execute({treinador_id});
        response.json(resp);
      };
}

export{ EliminarTreinadorController }

