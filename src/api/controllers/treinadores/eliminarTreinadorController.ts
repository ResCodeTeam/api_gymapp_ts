import { Request, Response } from "express";
import { EliminarTreinadorService } from "../../services/treinadores/eliminarTreinadorService";

class EliminarTreinadorController{
    async handle(request : Request, response : Response){
        const treinador_id = request.params.id;
        const userId = request.params.adminId;

        const eliminarTreinadorService = new EliminarTreinadorService();
        const resp = await eliminarTreinadorService.execute({treinador_id,userId});
        response.json(resp);
      };
}

export{ EliminarTreinadorController }

