import { client } from "../../prisma/client";
import { checkUserIdExists } from "../../helpers/dbHelpers";

export class VerTreinosAlunosService{
    async execute(uId: string){

        const exists_user = await checkUserIdExists(uId);
        if (!exists_user) {
            throw new Error("O utilizador não existe");
        }

        const treinos = await client.treinos.findMany({
            where:{
                uid: uId,
                isDeleted:false
            },
        })

        return treinos;
    }
}