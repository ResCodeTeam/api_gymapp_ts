import { Interface } from "readline";
import { checkDonoGinasio, checkGinasioExists } from "../../../helpers/dbHelpers";

import { client } from '../../../prisma/client';

interface IGinasioDono {
    ginasioId : string,
    userId : string
}

class ObterAlunosGinasioService {
    async execute ({ginasioId, userId} : IGinasioDono) {

        const exists_ginasio = await checkGinasioExists(ginasioId);
        if(!exists_ginasio){
            throw new Error(`Ginásio não existe`);
        }

        const check_dono = await checkDonoGinasio(ginasioId, userId);
        if (!check_dono) {
            throw new Error(`Não pode aceder a esse ginásio`);
        }

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

        // for (let i = 0; i < alunos.length; i++) {
        //     const utilizadores = await models.users.findOne({
        //         attributes: ['uid', 'nome', 'hashtag', 'imagem_url'],
        //         where: {uid: alunos[i].user_id}
        //     });
        //     users.push(utilizadores);
        // }

        // if (users.length == 0) {
        //     throw new Error(`Não foi encontrado nenhum utilizador`);
        // }

        for (let i = 0; i < alunos.length; i++) {
            console.log(alunos[i].users);
            users.push(alunos[i].users);
        }

        return {
            msg: "Obter alunos efetuada com sucesso",
            users
        }
    }
}

export { ObterAlunosGinasioService };