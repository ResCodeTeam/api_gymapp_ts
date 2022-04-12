import { client } from "../../prisma/client";


interface IDesafio{
    agendamentoId:string
    isAceite : boolean
    desafioId : string
}


export class InscreverDesafiosService {
    async execute({agendamentoId,isAceite, desafioId} : IDesafio){

        if (desafioId == null) {
            throw new Error("Impossível inscrever no desafio.");
        }

        if (isAceite == false) {
            const verificaInscricao = await client.agendamentos_desafios.findUnique({
                where : {
                    agendamento_id : agendamentoId
                },
                select : {
                    isAceite:true,
                    desafio_id : true
                }
            });

            if(verificaInscricao.isAceite == false){
                throw new Error("O desafio já se encontra encerrado.");
            }
            
            await client.agendamentos_desafios.update({
                where : {
                    agendamento_id : agendamentoId
                },
                data: {
                    isAceite,
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