import { client } from "../../prisma/client";

interface IDesafio{
    estado : number
    desafioId : string
}

export class EncerrarDesafiosService {
    async execute({estado, desafioId} : IDesafio){

        if (desafioId == null) {
            throw new Error("Impossível encerrar desafio.");
        }

        if (estado == -1) {
            const verificarEncerrado = await client.desafios.findUnique({
                where : {
                    desafio_id : desafioId
                },
                select : {
                    estado : true,
                }
            });

            if(verificarEncerrado.estado == -1){
                throw new Error("O desafio já se encontra encerrado.");
            }
            
            await client.desafios.update({
                where : {
                    desafio_id : desafioId
                },
                data: {
                    estado
                }
            });
            return {
                message: "Desafio encerrado com sucesso!"
            }
        }

        return {
            message: "Impossível encerrar desafio."
        }
    }
}