import { client } from "../../prisma/client";

interface IDesafio{
    isEncerrado : boolean
    desafioId : string
}

export class EncerrarDesafiosService {
    async execute({isEncerrado, desafioId} : IDesafio){


        if (desafioId == null) {
            throw new Error("Impossível encerrar desafio.");
        }
        
        if (isEncerrado == true) {
            
            const verificarEncerrado = await client.desafios.findUnique({
                where : {
                    desafio_id : desafioId
                },
                select : {
                    isEncerrado : true,
                }
            });


            if(verificarEncerrado.isEncerrado == true){
                throw new Error("O desafio já se encontra encerrado.");
            }
            
            await client.desafios.update({
                where : {
                    desafio_id : desafioId
                },
                data: {
                    isEncerrado
                }
            });
            return {
                message: "Desafio encerrado com sucesso."
            };
        }

        return {
            message: "Impossível encerrar desafio."
        }
    }
}