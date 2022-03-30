import { checkPostExists, checkUserIdExists } from "../../../helpers/dbHelpers";
import { client } from "../../../prisma/client";

export class VerTodosOsExerciciosTreinadoresService {
    async execute(){
       /* const exer = await client.exercicios.findMany({
            where:{
                autor_id : {
                    where: {au}
                }
            },
            include : {
                users : {
                    include : {
                      

                    },
                }
            },
            
        })*/

        const exer = await client.funcoes.findMany({
            where:{
                descricao : "Treinador"
            },
            
            include:{
                users: {
                    include: {
                        exercicios:true,
                    }
                }
            },

        })

        var exerci = []

        for (let i = 0; i < exer.length; i++) {
            for (let j = 0; j < exer[i].users.length; j++) {
               for (let k = 0; k < exer[i].users[j].exercicios.length; k++) {
                   exerci.push(exer[i].users[j].exercicios[k])
               }
            }
        }
        
        return exerci;

    }
}