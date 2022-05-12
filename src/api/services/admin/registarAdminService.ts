import { prisma } from "@prisma/client";
import { hash } from "bcrypt";
import { checkEmail, checkGinasioExists, getFuncaoId } from "../../helpers/dbHelpers";
import { getTag } from "../../helpers/tagHelpers";
import { client } from "../../prisma/client";

interface IRegistarAdminService{
    email:string,
    nome:string,
    password:string,
    dataNasc:Date,
    dataEntrada:Date,
    genero:number,
}

export class RegistarAdminService{
    async execute({email,nome,password,dataNasc,dataEntrada,genero}:IRegistarAdminService){
    
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
        let funcaoId = await getFuncaoId("Administrador")
        
        
        const admin = await client.users.create({
            data:{

                email,
                nome,
                password:passwd,
                data_nasc:dataNasc,
                hashtag,
                data_entrada:dataEntrada,
                genero,
                funcao_id:funcaoId,
            }
        })
        await client.definicoes_user.create({
            data:{
                identificacoes:true,
                is_privado:false,
                mencoes:true,
                usersuid:admin.uid    
            }
        })
         
        return admin
        
    }
    
}