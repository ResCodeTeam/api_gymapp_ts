import { changeTimeZone } from "../../helpers/dateHelpers";
import { checkDesafioIdExists, getDonoMarca, getFuncaoId, getGinasioDesafio, getMarcaGym, getTreinadorMarca, getUserFuncao } from "../../helpers/dbHelpers";
import { client } from "../../prisma/client";

interface Idata {
    nome: string,
    modalidade: string,
    data_inicio: Date,
    data_fim: Date,
    recompensa: number,
    descricao: string,
}

export class EditarDesafioService {
    async execute(uId: string, data: Idata, desafio_id: string) {

        if (data.data_inicio > data.data_fim) {
            throw new Error("A data de final começa antes da inicial")
        }

        const existsDesafio = await checkDesafioIdExists(desafio_id);
        if (!existsDesafio) {
            throw new Error("Desafio não existe")
        }

        const desafio = await client.desafios.findFirst({
            where: {
                desafio_id: desafio_id
            }
        })

        //verificar se a data é diferente da original
        if (data.data_inicio !== undefined || data.data_fim !== undefined) {
            let hoje = new Date();
            changeTimeZone(hoje);

            //já iniciado?
            if (desafio.data_inicio < hoje && desafio.data_fim < hoje) {
                throw new Error("Desafio já finalizado")
            }
            //sim
            if (desafio.data_inicio < hoje) {
                //verificar se se pretende alterar a data de inicio
                console.log(data.data_inicio, desafio.data_inicio)
                if (data.data_inicio !== undefined) {
                    throw new Error("A data de início não pode ser alterada")
                }
                //verificar se se pretende alterar a data de fim
                if (data.data_fim !== undefined) {
                    //verificar se a data de fim é anterior a data de inicio
                    //verificar se a data de fim é anterior a data atual
                    // verificar se o desafio ainda não terminou
                    if (data.data_fim <= hoje || data.data_fim <= data.data_inicio || desafio.data_fim <= hoje) {
                        throw new Error("A data de fim não pode ser alterada")
                    }

                }
                //não iniciou
            } else if (desafio.data_inicio >= hoje) {

                //verificar se a data de fim foi alterada
                if (data.data_fim !== undefined) {
                    //se a data de fim é posterior ao agora
                    //se a data de fim é posterior à data de inicio

                    if (data.data_fim <= hoje || data.data_fim <= desafio.data_inicio) {
                        throw new Error("A data de fim não pode ser alterada")
                    }
                }
                if (data.data_inicio !== undefined) {
                    if (data.data_inicio < hoje) {
                        throw new Error("A data de início não pode ser alterada")
                    }

                }

            }
        }

        const funcao = await getUserFuncao(uId);
        const treinador = await getFuncaoId("Treinador");

        const ginasio_desafio = await getGinasioDesafio(desafio_id);
        const marca_ginasio = (await getMarcaGym(ginasio_desafio)).marca_id;
        const dono_marca = await getDonoMarca(marca_ginasio);

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
            if(uId != dono_marca){
                throw new Error("Não tem autorização")
            }
        }

        return atualizarDesafio(data, desafio_id)
    }
}

async function atualizarDesafio(data: Idata, desafio_id: string) {
    const atualizarDesafio = await client.desafios.update({
        where: {
            desafio_id: desafio_id
        },
        data: {
            nome: data.nome,
            modalidade_id: data.modalidade,
            data_inicio: data.data_inicio,
            data_fim: data.data_fim,
            recompensa: data.recompensa,
            descricao: data.descricao
        },
        select: {
            desafio_id: true,
            nome: true,
            data_inicio: true,
            data_fim: true,
            recompensa: true,
            isEncerrado: true,
            descricao: true,
            users: {
                select: {
                    nome: true,
                    email: true,
                    imagem_url: true
                }
            },
            modalidades_ginasio: {
                select: {
                    nome: true
                }
            },
            regras_desafio: {
                select: {
                    descricao: true
                }
            },
            exercicios_desafio: {
                select: {
                    n_ordem_exercicio: true,
                    genero: true,
                    exercicios: {
                        select: {
                            nome: true,
                            descricao: true,
                            is_tempo: true,
                            imagens: {
                                select: {
                                    url: true
                                }
                            },
                            musculos: {
                                select: {
                                    musculos: {
                                        select: {
                                            nome: true,
                                            img_url: true
                                        }
                                    }
                                }
                            }
                        }
                    },
                    series_desafio: {
                        select: {
                            n_ordem_serie: true,
                            valor: true,
                        }
                    }
                }
            }
        }
    })

    return atualizarDesafio
}
