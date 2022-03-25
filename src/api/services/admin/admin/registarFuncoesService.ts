import { client } from "../../../prisma/client";

export class RegistarFuncoesService{
    async execute(funcao:string){
        await client.funcoes.create({
            data:{
                descricao:funcao
            }
        })
    }
}