import { client } from "../../prisma/client";

export class VerDesafiosSubmissoesService {
    async execute(desafioId:string){
        const  desafios = await client.submissoes_desafios.findMany({
            where:{
                desafio_id:desafioId,
                desafios:{
                    isDeleted:false,
                    isEncerrado:false
                }
            },
        })
        
        return desafios;
    }
}