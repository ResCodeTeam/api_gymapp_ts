import { checkDesafioIdExists } from "../../helpers/dbHelpers";
import { client } from "../../prisma/client";

export class VerDesafioService{
    async execute(desafioId:string){

        const exists_desafio= await checkDesafioIdExists(desafioId)
        if(!exists_desafio){
            throw new Error("O desafio não existe")
        }

        const desafio = await client.desafios.findFirst({
            where:{
                desafio_id:desafioId,
                
                isDeleted:false
                
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
        return desafio;
    }
}