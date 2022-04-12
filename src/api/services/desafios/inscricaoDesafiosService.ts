import { client } from "../../prisma/client";


interface IDesafio{
    agendamentoId:string
    estado : number
    desafioId : string
}


export class InscreverDesafiosService {
    async execute({agendamentoId,estado, desafioId} : IDesafio){

        if (desafioId == null) {
            throw new Error("Impossível inscrever no desafio.");
        }

        if (estado == -1) {
            const verificaInscricao = await client.agendamentos_desafios.findUnique({
                where : {
                    agendamento_id : agendamentoId
                },
                select : {
                    estado : true,
                    desafio_id : true
                }
            });

            if(verificaInscricao.estado == -1){
                throw new Error("O desafio já se encontra encerrado.");
            }
            
            await client.agendamentos_desafios.update({
                where : {
                    agendamento_id : agendamentoId
                },
                data: {
                    estado,
                    desafio_id : desafioId

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