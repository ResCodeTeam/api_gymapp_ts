import { checkDesafioDisponivel, checkDesafioIdExists, getDonoMarca, getFuncaoId, getGinasioDesafio, getMarcaGym, getTreinadorMarca, getUserFuncao } from "../../helpers/dbHelpers";
import { client } from "../../prisma/client";

interface IDesafio{
    uId: string,
    isEncerrado : boolean,
    desafioId : string,
}

export class EncerrarDesafiosService {
    async execute({uId, isEncerrado, desafioId} : IDesafio){

        const search_desafio = await checkDesafioIdExists(desafioId);
        if(!search_desafio){
            throw new Error("Não existe desafio com o id = " + desafioId)
        }

        const funcao = await getUserFuncao(uId);
        const treinador = await getFuncaoId("Treinador");

        const ginasio_desafio = await getGinasioDesafio(desafioId);
        const marca_ginasio = (await getMarcaGym(ginasio_desafio)).marca_id;
        const dono_marca = await getDonoMarca(marca_ginasio);
        
        const desafio_disponivel = await checkDesafioDisponivel(desafioId);
        if(!desafio_disponivel){
            throw new Error("O desafio já não está disponível")
        }
        
        // treinador
        if(funcao == treinador)
        {
            const marca_treinador = await getTreinadorMarca(uId)
            if(marca_treinador != marca_ginasio){
                throw new Error("Não tem autorização")
            }  
        }
        // admin
        else{
            if(uId != dono_marca)
            {
                throw new Error("Não tem autorização")
            }
        }

        await client.desafios.update({
            where : {
                desafio_id : desafioId
            },
            data: {
                isEncerrado
            }
        });
        return {
            data: "Desafio encerrado com sucesso.",
            status: 200
        };
    }
}