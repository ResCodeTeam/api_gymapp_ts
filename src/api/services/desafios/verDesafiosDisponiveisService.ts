
import { checkAlunoGinasio, checkGinasioExists, checkMobilidadeMarcaUser, getAlunoMarca, getDonoMarca, getFuncaoId, getGinasioAluno, getMarcaGym, getTreinadorMarca, getUserFuncao } from "../../helpers/dbHelpers";
import { client } from "../../prisma/client";

interface IGinasios{
    uId: string,
    ginasioId: string   
}

export class VerDesafiosDisponiveisService{
    async execute({uId, ginasioId}: IGinasios){
        const exists_dst = await checkGinasioExists(ginasioId);
        if (!exists_dst) {
            throw new Error("O ginasio não existe");
        }
        
        const funcao = await getUserFuncao(uId);
        const treinador = await getFuncaoId("Treinador");
        const admin = await getFuncaoId("Administrador");

        const marca_ginasio = (await getMarcaGym(ginasioId)).marca_id;
        const dono_marca = await getDonoMarca(marca_ginasio);
        
        // treinador
        if(funcao == treinador)
        {
            const marca_treinador = await getTreinadorMarca(uId)
            if(marca_treinador != marca_ginasio){
                throw new Error("Não tem autorização");
            }
        }
        // admin
        else if(funcao == admin)
        {
            if(uId != dono_marca){
                throw new Error("Não tem autorização");
            }
        }
        // aluno
        else{
            const { mobilidade, id } = await checkMobilidadeMarcaUser(uId);
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

        const desafios = await client.desafios.findMany({
            where:{
                ginasio_id: ginasioId,
                isDeleted: false,
                isEncerrado: false
            }, select:{
                nome:true,
                data_inicio:true,
                data_fim: true,
                recompensa: true,
                descricao: true
            }        
         })
        return {data: desafios, status: 200};
    }
}