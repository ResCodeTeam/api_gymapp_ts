import { checkDesafioIdExists } from "../../helpers/dbHelpers";
import { client } from "../../prisma/client";

export class VerDesafioService{
    async execute(desafioId:string){

        const exists_desafio= await checkDesafioIdExists(desafioId)
        if(!exists_desafio){
            throw new Error("O desafio não existe")
        }

        const desafio = await client.desafios.findMany({
            where:{
                desafio_id:desafioId,
                
                isDeleted:false
                
            },
                })
        return desafio;
    }
}