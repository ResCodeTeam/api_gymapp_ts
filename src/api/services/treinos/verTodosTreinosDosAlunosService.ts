import { checkPostExists, checkTreinador, checkUserIdExists, getMobilidadeMarca, getTreinadorMarca } from "../../helpers/dbHelpers";
import { client } from "../../prisma/client";

export class VerTodosTreinosDosAlunosService {
    async execute(uid: string) {
        const existsTreinador = await checkTreinador(uid)
        if (!existsTreinador) {
            return { data: "Treinador Inexistente", status: 500 }
        }

        const marcaId = await getTreinadorMarca(uid);
        const treinosAlunos = await client.users.findMany({
            where: {
                OR: [
                    {
                        alunos_marca: {
                            some: {
                                marca_id: marcaId
                            }
                        }
                    },
                    {
                        aluno_ginasio: {
                            some: {
                                ginasio: {
                                    marca_id: marcaId
                                }
                            }
                        }
                    }
                ]
            },
            select: {
                uid: true,
                nome: true,
                email: true,
                treinos: true

            },


        })
        console.log(treinosAlunos)
        const arrayTreinos = [];

        for (let info of treinosAlunos) {
            if (info.treinos.length > 0) {
                arrayTreinos.push(info)
            }
        }

        // for (let i = 0; i < treinosAlunos.length; i++) {
        //     for (let j = 0; j < treinosAlunos[i].users.length; j++) {
        //         for (let k = 0; k < treinosAlunos[i].users[j].treinos.length; k++) {
        //             const objTreinos = {
        //                 nome: treinosAlunos[i].users[j].nome,
        //                 treinos: treinosAlunos[i].users[j].treinos[k]
        //             }
        //             arrayTreinos.push(objTreinos)
        //         }
        //     }

        // }
        return { data: arrayTreinos, status: 200 };
    }
}