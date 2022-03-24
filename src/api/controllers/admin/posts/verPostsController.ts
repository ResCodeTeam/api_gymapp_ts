import { Request, Response } from "express";



class VerPostsController{
async handle(request:Request,response:Response){
    let posts = [];
    const publicacoes = await .publicacoes.findAll()
        for (let i=0; i<publicacoes.length; i++){
            posts.push(publicacoes[i]['dataValues']) // fazer um append numa lista destes valores
        }
        console.log(posts)
    return {
        msg: "Publicação carregada",
        posts
    }
}
}