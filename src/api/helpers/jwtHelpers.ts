import { sign } from 'jsonwebtoken'
import { client } from '../prisma/client'
import { getFuncaoId, getUserFuncao } from './dbHelpers'

export async function generateRefreshToken(userId: string) {
    const token = sign({},
        process.env.SECRET_KEY_REFRESH_TOKEN, {
        subject: userId,
        expiresIn: "1y"
    }
    )
    return token
}
export async function generateSessionToken(uid: string) {
    const userFuncao = await getUserFuncao(uid)
    const funcao = (await client.funcoes.findUnique({
        where: {
            funcao_id: userFuncao
        }
    })).descricao

    const token = sign({
        funcao: funcao,
    },
        process.env.SECRET_KEY_TOKEN, {
        subject: uid,
        expiresIn: "15m"
    }
    )
    return token
}
