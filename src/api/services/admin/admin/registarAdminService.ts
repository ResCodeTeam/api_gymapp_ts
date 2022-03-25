import { hash } from "bcrypt";
import { checkEmail, checkGinasioExists, getFuncaoId } from "../../../helpers/dbHelpers";
import { getTag } from "../../../helpers/tagHelpers";
import { client } from "../../../prisma/client";

interface IRegistarAdminService{
    email:string,
    nome:string,
    password:string,
    data_nasc:Date,
    data_entrada:Date,
    genero:number,
}

export class RegistarAdminService{
    async execute({email,nome,password,data_nasc,data_entrada,genero}:IRegistarAdminService){
    
        // verificar se o aluno já está registado
        let existsEmail = await checkEmail(email);
        if(existsEmail){
            throw Error("Email já registado!")
        }
        
        // Obter tag do aluno
        let hashtag = await getTag(nome);
    
        //encriptar a password do aluno
        let passwd = await hash(password, 8);
        
        // obter o id da função
        //let funcao_id = await getFuncaoId("aluno")
        
        
        await client.users.create({
            data:{
                email,
                nome,
                password:passwd,
                data_nasc,
                hashtag,
                data_entrada,
                genero,
                funcao_id:"b6024af8-4809-498b-9db6-6cc14cae8209",
            }
        })
        
        
        
    }
    
}