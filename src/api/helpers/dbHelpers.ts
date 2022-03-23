import { client } from "../prisma/client";

export = {
    checkEmail : async(email : string)=>{
        const search = await client.users.findMany({
            where:{
                email
            }
        })
        return search.length != 0;
    },
    checkUserIdExists: async(userId : string)=>{
        const search = await client.users.findMany({
            where:{
                uid: userId
            }
        })
        return search.length != 0;
    },
    getFuncaoId:async(nome : string)=>{
        const search = await client.funcoes.findFirst({
            where:{
                descricao : nome
            },
            select : {
                funcao_id : true
            }
        });
        return search?.funcao_id;
    },
    getUserFuncao:async(uid: string)=>{
        const search = await client.users.findUnique({
            where:{
                uid
            },
            select: {
                funcao_id : true
            }
        });
        
        return search?.funcao_id;
    },
    checkPostExists: async(postId : string)=>{
        const search = await client.publicacoes.findMany({
            where:{
                publicacao_id : postId
            }
        });
        return search.length != 0;
    },
    checkGinasioExists: async(ginasioId : string)=>{
        const search = await client.ginasio.findMany({
            where:{
                ginasio_id : ginasioId
            }
        });
        return search.length != 0;
    },
    checkMarcaExists: async(marcaId : string) =>{
        const search = await client.marcas.findMany({
            where:{
                marca_id: marcaId
            }
        })
        return search.length != 0;
    },
    checkModalidadeExists: async(modalidadeId : string) => {
        const search = await client.modalidades_ginasio.findMany({
            where:{
                modalidade_id : modalidadeId
            }
        })
        return search.length != 0;
    },
    checkExercicioExists: async(exercicioId : string) => {
        const search = await client.exercicios.findMany({
            where:{
                exercicio_id : exercicioId
            }
        })
        return search.length != 0;
    },
    getMarcaGym: async(ginasioId : string) => {
        const search = await client.ginasio.findFirst({
            where: {
                ginasio_id : ginasioId
            },
            select: {
                marca_id : true
            }
        })

        const marca = await client.marcas.findFirst({
            where:{
                marca_id : search?.marca_id
            }
        })

        return marca;
    },
    checkDonoGinasio: async(ginasioId : string, donoId : string) => {
        const search_admin = await client.ginasio.findFirst({
            where:{
                ginasio_id : ginasioId
            },
            select : {
                marca_id : true,
                marcas : {
                    select : {
                        dono_id: true,
                    }
                }
            }
        })

        if (search_admin?.marcas.dono_id != donoId) {
            throw new Error (`Não tem permissões`)
        }

        return true;
    }
}