import { client } from "../prisma/client";
import dayjs from "dayjs";
import "dayjs/locale/pt";
import { Interface } from "readline";

export interface IDayWeek {
    name : string,
    abbreviation : string
}


let checkEmail = async(email : string)=>{
    const search = await client.users.findMany({
        where:{
            email
        }
    })
    return search.length != 0;
}
let checkDesafioIdExists = async(desafioId: string)=>{
    const search = await client.desafios.findMany({
        where:{
            desafio_id: desafioId
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
    console.log(userId)
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
            modalidade_id : modalidadeId,
            isDeleted : false
        }
    })
    return search.length != 0;
}
let checkExercicioExists= async(exercicioId : string) => {
    const search = await client.exercicios.findMany({
        where:{
            exercicio_id : exercicioId,
            isDeleted: false
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
    const searchAdmin = await client.ginasio.findFirst({
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

    if (searchAdmin?.marcas.dono_id != donoId) {
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


let checkMobilidadeMarcaUser = async (userId:string)=>{
    const userMarca = await client.alunos_marca.findFirst({
        where:{
            uid:userId,
        }
    })
    if(!userMarca){
        const userGinasio = await client.aluno_ginasio.findFirst({
            where:{
                user_id:userId
            }
        })
        return {mobilidade:false,id:userGinasio }
    }else{
        return {mobilidade:false,id:userMarca }
    }
}

let formatDate = async (data : Date) => {
    const date = dayjs(data).locale('pt').format('DD/MM/YYYY').toString();
    return date;
}

let formatDateHour = async (data : Date) => {
    const date = dayjs(data).locale('pt').format('DD/MM/YYYY HH:mm').toString();
    return date;
}

let getDayWeek = async (data : Date) => {
    let dayWeek : IDayWeek;
    const day = data.getDay();
    switch (day) {
        case 0:
            dayWeek = {name : "domingo", abbreviation : "dom."};
            break;
        case 1:
            dayWeek = {name : "segunda-feira", abbreviation : "seg."};
            break;
        case 2:
            dayWeek = {name : "terça-feira", abbreviation : "ter."};
            break;
        case 3:
            dayWeek = {name : "quarta-feira", abbreviation : "qua."};
            break;
        case 4:
            dayWeek = {name : "quinta-feira", abbreviation : "qui."};
            break;
        case 5:
            dayWeek = {name : "sexta-feira", abbreviation : "sex."};
            break;
        case 6:
            dayWeek = {name : "sábado", abbreviation : "sáb."};
            break;
        default:
            break;
    }
    return dayWeek;
}

let formatFullDate = async (data : Date) => {
    let newData : string;
    let s : IDayWeek = (await getDayWeek(data));
    console.log(s.abbreviation);
    console.log(s.name);

    return s;
    
}

let checkAutorExercicio = async(treinadorId, exercicioId)=>{
    const exercicio = await client.exercicios.findMany({
        where:{
            autor_id:treinadorId,
            exercicio_id:exercicioId
        }
    })
    return exercicio.length != 0
}

let checkTreinadorGinasio= async(ginasioId : string, treinadorId : string) => {
    const searchMarca = await client.ginasio.findUnique({
        where:{
            ginasio_id : ginasioId
        },
        select : {
            marca_id : true
        }
    })

    const searchTreinador = await client.treinadores_marca.findMany({
        where : {
            marca_id : searchMarca.marca_id,
            treinador_uid : treinadorId
        }
    })

    if (!searchTreinador) {
        throw new Error (`Não tem permissões`)
    }

    return true;
}

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
    getUserByID,
    formatDate,
    formatDateHour,
    formatFullDate,
    checkMobilidadeMarcaUser,
    checkDesafioIdExists,
    checkAutorExercicio,
    checkTreinadorGinasio
}

