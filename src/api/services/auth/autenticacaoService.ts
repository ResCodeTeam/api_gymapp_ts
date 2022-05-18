import { compare } from "bcrypt"
import { generateRefreshToken, generateSessionToken } from "../../helpers/jwtHelpers"
import { client } from "../../prisma/client"

export class AuthService{
    async execute(email:string, password:string){
        const user = await client.users.findFirst({
            where:{
                email
            }
        })
        
        if(user == null){
            throw new Error('Erro na autenticação!: Password ou Email errados')
        }
    
        const userId = user.uid
        const passwd = user.password

        const comp = await compare(password,passwd);
        if(!comp){
            throw new Error('Erro na autenticação!: Password ou Email errados')
        }
        
        const refreshToken = await generateRefreshToken(userId)
        await client.users.update({
            data:{
                refresh_token:refreshToken
            },
            where:{
                uid:userId
            }
        })
    
        const token = await generateSessionToken(userId)
    
        return {
            data:{message: "Login concluido com sucesso",
            token,
            refreshToken},
            status: 200
        }
    }
}

