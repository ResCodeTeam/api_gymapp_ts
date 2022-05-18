import { Interface } from "readline";
import { checkDonoOuTreinadorGinasio, checkGinasioExists, checkMobilidadeMarcaUser, getDonoMarca, getFuncaoId, getMarcaGym, getTreinadorMarca, getUserFuncao } from "../../helpers/dbHelpers";

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
        
        const marca_ginasio = (await getMarcaGym(ginasioId)).marca_id;
        const dono_marca = await getDonoMarca(marca_ginasio);
        
        const funcao = await getUserFuncao(userId);
        const treinador = await getFuncaoId("Treinador");
        const admin = await getFuncaoId("Administrador");

        if(funcao == treinador)
        {
            const marca_treinador = await getTreinadorMarca(userId)
            if(marca_treinador != marca_ginasio){
                throw new Error("Não tem autorização");
            }
        }
        // admin
        else if(funcao == admin)
        {
            if(userId != dono_marca){
                throw new Error("Não tem autorização");
            }
        }
        // aluno
        else{
            const { mobilidade, id } = await checkMobilidadeMarcaUser(userId);
            if(mobilidade){
                if(id['marca_id'] != marca_ginasio)
                {
                    throw new Error("Não possui permissão")
                }
            }
            else{
                if(id['ginasio_id'] != ginasioId)
                {
                    throw new Error("Não possui permissão")
                }
            }
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

        alunos.forEach(aluno => {
            users.push(aluno.users);
        });

        return {data: users, status: 200};
    }
}