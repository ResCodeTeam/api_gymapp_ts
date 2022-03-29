import { client } from "../../../prisma/client";

export class verDesafiosParticipantesService {
    async execute(){
        const  desafios = await client.desafios.findMany({
            include: {
                submissoes_desafios: true
            }
        })
        
        return desafios;
    }
}