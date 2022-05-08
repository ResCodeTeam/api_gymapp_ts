
import { checkGinasioExists, getAlunoMarca, getDonoMarca, getFuncaoId, getGinasioDesafio, getMarcaGym, getTreinadorMarca, getUserFuncao } from "../../helpers/dbHelpers";
import { client } from "../../prisma/client";

interface IGinasios{
    uId: string,
    ginasioId: string   
}

export class VerTodosDesafiosService{
    async execute({uId, ginasioId}: IGinasios){
        const exists_dst = await checkGinasioExists(ginasioId);
        if (!exists_dst) {
            throw new Error("O ginasio não existe");
        }

        const funcao = await getUserFuncao(uId);
        const treinador = await getFuncaoId("Treinador");
        const aluno = await getFuncaoId("Aluno");

        const marca_ginasio = (await getMarcaGym(ginasioId)).marca_id;
        const dono_marca = await getDonoMarca(marca_ginasio);
        
        // treinador
        if(funcao == treinador)
        {
            const marca_treinador = await getTreinadorMarca(uId)
            if(marca_treinador == marca_ginasio){
                const desafios = await client.desafios.findMany({
                    where:{
                        ginasio_id: ginasioId,
                        isDeleted: false
        
                    }, select:{
                        nome:true,
                        data_inicio:true,
                        data_fim: true,
                        recompensa: true,
                        descricao: true,
                        isEncerrado: true
                    }        
                 })
                return desafios;
            }
            else{
                throw new Error("Não tem autorização")
            }
        }
        // aluno
        else if(funcao == aluno){
            const aluno_marca = await getAlunoMarca(uId);
            console.log(aluno_marca)
            if(aluno_marca == marca_ginasio){
                const desafios = await client.desafios.findMany({
                    where:{
                        ginasio_id: ginasioId,
                        isDeleted: false
        
                    }, select:{
                        nome:true,
                        data_inicio:true,
                        data_fim: true,
                        recompensa: true,
                        descricao: true,
                        isEncerrado: true
                    }        
                 })
                return desafios;
            }
            else{
                throw new Error("Não tem autorização")
            }
        }
        else{
            if(uId == dono_marca)
            {
                const desafios = await client.desafios.findMany({
                    where:{
                        ginasio_id: ginasioId,
                        isDeleted: false
        
                    }, select:{
                        nome:true,
                        data_inicio:true,
                        data_fim: true,
                        recompensa: true,
                        descricao: true,
                        isEncerrado: true
                    }        
                 })
                return desafios;
            }
            else {
                throw new Error("Não tem autorização")
            }
        }
    }
}