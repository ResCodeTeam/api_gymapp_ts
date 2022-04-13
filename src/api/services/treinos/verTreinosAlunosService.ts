import { client } from "../../prisma/client";

export class VerTreinosAlunosService{
    async execute(uId: string){

        const treinos = await client.treinos.findMany({
            where:{
                uid: uId,
                isDeleted:false
            },
        })

        return {
            treinos
        }
    }
}