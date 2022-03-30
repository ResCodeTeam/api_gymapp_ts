import { client } from "../../../prisma/client";



 class RemoverDesafiosService{
    async execute(desafioId: string){


        
        
        const desafio = await client.desafios.update({
            data:{
                isDeleted: true,
            },            
            
            where: {
                desafio_id: desafioId
                
            }
        });

        
        return {
            msg:"desafio removido com sucesso",
        };

    }
}

export { RemoverDesafiosService };
