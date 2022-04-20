import { Interface } from "readline";
import { checkDonoOuTreinadorGinasio, checkGinasioExists } from "../../helpers/dbHelpers";

import { client } from '../../prisma/client';

interface IGinasioDono {
    ginasioId : string,
    userId : string
}

export class ObterAlunosGinasioService {
    async execute ({ginasioId, userId} : IGinasioDono) {

        const existsGinasio = await checkGinasioExists(ginasioId);
        if(!existsGinasio){
            throw new Error(`Ginásio não existe`);
        }

        // const checkPermissao = await checkDonoOuTreinadorGinasio(ginasioId, userId);
        // console.log(checkPermissao);
        // if (!checkPermissao) {
        //     throw new Error(`Não pode aceder a esse ginásio`);
        // }
        
        let users = [];
        const alunos = await client.aluno_ginasio.findMany({
            where : {
                ginasio_id: ginasioId
            },
            select : {
                users : {
                    select : {
                        uid : true,
                        nome : true,
                        hashtag : true,
                        imagem_url : true
                    }
                }
            }
        });
        
        if (alunos.length == 0) {
            throw new Error(`Não foi encontrado nenhum aluno`);
        }

        alunos.forEach(aluno => {
            users.push(aluno.users);
        });

        return users;
    }
}