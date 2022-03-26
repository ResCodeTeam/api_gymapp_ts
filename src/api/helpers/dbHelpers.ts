import { client } from "../prisma/client";


let checkEmail = async(email : string)=>{
    const search = await client.users.findMany({
        where:{
            email
        }
    })
    return search.length != 0;
}
let checkUserIdExists= async(userId : string)=>{
    const search = await client.users.findMany({
        where:{
            uid: userId
        }
    })
    return search.length != 0;
}

let getUserByID = async(userId:string)=>{
    const user = await client.users.findUnique({
        where:{
            uid: userId
        }
    })
    return user;
}
let getFuncaoId=async(nome : string)=>{
    const search = await client.funcoes.findFirst({
        where:{
            descricao : nome
        },
        select : {
            funcao_id : true
        }
    });
    if(search == null){
        throw new Error("função inexistente")
    }
    return search?.funcao_id;
}
let getUserFuncao=async(uid: string)=>{
    const search = await client.users.findUnique({
        where:{
            uid
        },
        select: {
            funcao_id : true
        }
    });

    return search?.funcao_id;
}
let checkPostExists = async(postId : string)=>{
    const search = await client.publicacoes.findMany({
        where:{
            publicacao_id : postId
        }
    });
    return search.length != 0;
}
let checkGinasioExists= async(ginasioId : string)=>{
    const search = await client.ginasio.findMany({
        where:{
            ginasio_id : ginasioId
        }
    });
    
    return search.length != 0;
}
let checkMarcaExists= async(marcaId : string) =>{
    const search = await client.marcas.findMany({
        where:{
            marca_id: marcaId
        }
    })
    return search.length != 0;
}
let checkModalidadeExists= async(modalidadeId : string) => {
    const search = await client.modalidades_ginasio.findMany({
        where:{
            modalidade_id : modalidadeId
        }
    })
    return search.length != 0;
}
let checkExercicioExists= async(exercicioId : string) => {
    const search = await client.exercicios.findMany({
        where:{
            exercicio_id : exercicioId
        }
    })
    return search.length != 0;
}
let getMarcaGym= async(ginasioId : string) => {
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
}
let checkDonoGinasio= async(ginasioId : string, donoId : string) => {
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
let checkDonoMarca= async(marcaID : string, userId : string) => {
    const search = await client.marcas.findFirst({
        where:{
            marca_id : marcaID,
            dono_id : userId
        },
        select : {
            marca_id : true
        }
    })

    if (!search?.marca_id) {
        throw new Error (`Não tem permissões`)
    }

    return true;
}
// função que permite verificar se já existe alguma modalidade registada no ginásio com aquele nome
let checkModalidadeNome = async (nome: string) => {
    const search = await client.modalidades_ginasio.findMany({
      where: {
        nome,
      },
    });
    return search.length != 0;
};
// função que permite verificar se já se encontra alguma marca com o nome registada
let checkNomeMarca = async (nome: string) => {
    const search = await client.marcas.findMany({
      where: {
        nome,
      },
    });
    return search.length != 0;
  };

export {
    checkEmail,
    checkUserIdExists,
    getFuncaoId,
    getUserFuncao,
    checkPostExists,
    checkGinasioExists,
    checkMarcaExists,
    checkModalidadeExists,
    checkExercicioExists,
    getMarcaGym,
    checkDonoGinasio,
    checkDonoMarca,
    checkModalidadeNome,
    checkNomeMarca,
    getUserByID
}

