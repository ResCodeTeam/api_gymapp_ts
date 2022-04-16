
import { checkGinasioExists } from "../../helpers/dbHelpers";
import { client } from "../../prisma/client";

interface IGinasios{
    donoId: string,
    ginasioId: string   
}

export class VerTodosDesafiosService{
    async execute({donoId, ginasioId}: IGinasios){
        const exists_dst = await checkGinasioExists(ginasioId);
        if (!exists_dst) {
            throw new Error("O ginasio não existe");
        }

        const desafios = await client.desafios.findMany({
            where:{
                ginasio_id: ginasioId,
                isDeleted: false

            }, select:{
                nome:true,
                data_inicio:true,
                data_fim: true,
                recompensa: true,
                descricao: true
            }        
         })
        return desafios;
    }
}