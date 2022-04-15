import { client } from "../../prisma/client";

export class RegistarFuncoesService{
    async execute(nome:string){
        const funcao = await client.funcoes.create({
            data:{
                descricao:nome
            }
        })
        return funcao;
    }
}