import { checkPostExists, checkUserIdExists } from "../../../helpers/dbHelpers";
import { client } from "../../../prisma/client";
import { Identificacao } from "../../../Providers/identificacao";

export class CriarComentarioService {
    async execute(publicacao_id:string, comentario:string,criador_id:string,identificacao:Array<Identificacao>){
        
        if(publicacao_id == null){
            throw new Error("Identificador da publicação não inserido.")
        }
        if(comentario == ""){
            throw new Error("É necessario preencher o campo comentario.")
        }

        const publicacao = await client.publicacoes.findUnique({
            where: { 
                publicacao_id: publicacao_id
            }
        })
        if(publicacao == null){
            throw new Error("Não existe publicação com o identificador: " + publicacao_id)
        }

        const novoComentario = await client.comentarios_publicacao.create({
            data:{
                publicacao_id,
                comentario,
                criador_id,
                data : new Date()
            }
        })
        
        for(let i = 0; i < identificacao.length; i++){
            await client.identificacoes_publicacoes.create({
                data:{
    
              publicacao_id:identificacao[i].publicacaoId,
              usersuid:identificacao[i].userId
            }})
        }
    
        return novoComentario;
    }
    }
