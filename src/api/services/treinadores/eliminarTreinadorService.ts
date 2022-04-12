import { checkUserIdExists } from "../../helpers/dbHelpers";
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
// falta testar

