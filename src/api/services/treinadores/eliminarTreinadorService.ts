import { checkUserIdExists, checkTreinador } from "../../helpers/dbHelpers";
import { client } from "../../prisma/client";

interface Itreinador{
    treinador_id : string
}

export class EliminarTreinadorService{
    async execute({treinador_id} : Itreinador){
        const exists_id = await checkUserIdExists(treinador_id);
        if (!exists_id) {
        throw new Error("User não existe");
        }

        const exists_treinador = await checkTreinador(treinador_id);
        if (!exists_treinador) {
        throw new Error("O user não é um treinador");
        }
        

        const users = await client.users.update({
        data:{
            isDeleted:true,
        },
        where:{
            uid:treinador_id,
        },
        })

        return {
        msg: "Treinador cessado das funções!"
        };
    }
}


