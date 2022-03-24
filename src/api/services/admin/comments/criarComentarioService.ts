import initModels from "../../../models/init-models";
import db from "../../../../config/DB_Config";
import { check_post_exists, check_user_id_exists } from "../../../helpers/db_helpers";
const models = initModels(db);

module.exports=async(post_id,comentario,criador_id,data)=>{

    const exists_pub = await check_post_exists(post_id);
    if(!exists_pub){
        throw new Error("Erro ao criar comentário")
    }

    const exists_criador = await check_user_id_exists(criador_id);
    if(!exists_criador){
        throw new Error("Erro ao criar comentário")
    }

    await models.comentarios_publicacao.create({
        publicacao_id:post_id,
        comentario,
        criador_id:criador_id,
        data
    })
    return {
        msg: "Comentario publicado"
    }
}

/*
class CriarComentarioController{
    async handle(request:Request,response:Response){
        const post_id = request.params.id;
        const {comentario,criador_id,data}=request.body;

        const resp = await criar_comentario_service(post_id,comentario,criador_id,data)
        response.json(resp)
    }
}

export{ CriarComentarioController }
*/