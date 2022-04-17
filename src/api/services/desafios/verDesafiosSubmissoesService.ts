import { client } from "../../prisma/client";

export class VerDesafiosSubmissoesService {
    async execute(desafioId:string){
        const  desafios = await client.desafios.findMany({
            where:{
                desafio_id:desafioId,
                isDeleted:false
            },
            include: {
                submissoes_desafios: true
            }
        })
        
        return desafios;
    }
}