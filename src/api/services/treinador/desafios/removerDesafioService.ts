import { client } from "../../../prisma/client";

export class RemoverDesafioService {
    async execute(desafio_id:string) {
        
        
        const verificarDesafio = await client.desafios.findUnique({
            where:{desafio_id:desafio_id}
        })

        if(verificarDesafio == null){
            throw new Error("Não existe desafio com o id = " + desafio_id)
        }

        const desafioDeleted = await client.desafios.update({
            where:{desafio_id: desafio_id},
            data: {
                isDeleted : true
            }
        })

        return desafioDeleted;
    }
}