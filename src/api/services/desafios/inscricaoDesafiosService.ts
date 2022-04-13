import { getDesafio } from "../../helpers/dbHelpers";
import { client } from "../../prisma/client";


interface IDesafio{
    agendamentoId:string
    isAceite : boolean
    desafioId : string
}


export class InscreverDesafiosService {
    async execute({agendamentoId,isAceite, desafioId} : IDesafio){
console.log(agendamentoId,isAceite,desafioId)
        if (desafioId == null) {
            throw new Error("Impossível inscrever no desafio.");
        }

        const desafio = await getDesafio(desafioId)
            
            if(desafio.isEncerrado){
                throw new Error("O desafio já se encontra encerrado.");
            }
            
            await client.agendamentos_desafios.update({
                where : {
                    agendamento_id : agendamentoId
                },
                data: {
                    isAceite:false,
                    desafio_id : desafioId

                }
            });
            return {
                message: "incriçao desafio com sucesso!"
            }
    
    }
}