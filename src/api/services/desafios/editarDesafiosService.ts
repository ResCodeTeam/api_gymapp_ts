import { checkDesafioIdExists } from "../../helpers/dbHelpers";
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
    async execute(data: Idata,desafio_id:string) {

        if(data.data_inicio>data.data_fim){
            throw new Error("A data de final começa antes da inicial")
        }

        const existsDesafio = await checkDesafioIdExists(desafio_id);
        if(!existsDesafio){
            throw new Error("Desafio não existe")
        }

        const atualizarDesafio = await client.desafios.update({
            where:{
                desafio_id:desafio_id
            },
            data:{
                nome: data.nome,
                modalidade_id: data.modalidade,
                data_inicio: data.data_inicio,
                data_fim: data.data_fim,
                recompensa: data.recompensa,
                descricao: data.descricao
            },
            select:{
                desafio_id:true,
                nome:true,
                data_inicio:true,
                data_fim:true,
                recompensa:true,
                isEncerrado:true,
                descricao:true,
                users:{
                    select:{
                        nome:true,
                        email:true,
                        imagem_url:true
                    }
                },
                modalidades_ginasio:{
                    select:{
                        nome:true
                    }
                },
                regras_desafio:{
                    select:{
                        descricao:true
                    }
                },
                exercicios_desafio:{
                    select:{
                        n_ordem_exercicio:true,
                        genero:true,
                        exercicios:{
                            select:{
                                nome:true,
                                descricao:true,
                                is_tempo:true,
                                imagens:{
                                    select:{
                                        url:true
                                    }
                                },
                                musculos:{
                                    select:{ 
                                        musculos:{
                                            select:{
                                                nome:true,
                                                img_url:true
                                            }
                                        }
                                    }
                                }
                            }
                        },
                        series_desafio:{
                            select:{
                                n_ordem_serie:true,
                                valor:true,
                            }
                        }
                    }
                }
            }
        })

        return atualizarDesafio
           
    }
}
