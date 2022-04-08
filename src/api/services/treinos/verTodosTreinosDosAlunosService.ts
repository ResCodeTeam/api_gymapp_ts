import { checkPostExists, checkUserIdExists } from "../../helpers/dbHelpers";
import { client } from "../../prisma/client";

export class VerTodosTreinosDosAlunosService {
    async execute(){
        const treinosAlunos = await client.funcoes.findMany({
            where:{descricao: "Aluno"},
            include:{
                users:{
                    include:{
                        treinos:true
                    }
                }
            }
        })
        const arrayTreinos = [];
       

        
        for (let i = 0; i < treinosAlunos.length; i++) {
            for (let j = 0; j < treinosAlunos[i].users.length; j++) {
                for (let k = 0; k < treinosAlunos[i].users[j].treinos.length; k++) {
                    const objTreinos = {
                        nome : treinosAlunos[i].users[j].nome,
                        treinos: treinosAlunos[i].users[j].treinos[k]
                    }
                  arrayTreinos.push(objTreinos)
                }
            }
            
        }
        return arrayTreinos;
    }
}