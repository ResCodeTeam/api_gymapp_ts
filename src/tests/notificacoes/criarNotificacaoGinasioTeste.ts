import { doesNotReject } from 'assert';
import chai from 'chai';
import chaiHttp from 'chai-http';
import 'mocha';

chai.use(chaiHttp);
const expect = chai.expect;
const should = chai.should();
const baseUrl = "/api/v1"
const server = "localhost:8000"
const ginasioaId = 'dc8acc46-89eb-4d0f-a14a-2388b21c90a0'
const tokenInvalido = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2NTAwMjQ1MzgsImV4cCI6MTY1MDAyNTQzOCwic3ViIjoiMDAwZDFlMTQtNjE3ZS00MjNlLThhMWEtZjYzZDRmYTVhZjZhIn0.b0U-__cRpH8YBsAtZEtClr0fAj4t9IOwDAcI2R3j-qk'

let token = ''
describe("Teste criar notificação ginasio", () => {
    beforeEach((done) => {
        chai
            .request(server)
            .post(baseUrl + "/auth/login")
            .send({
                email: "admin@admin.com",
                password: "admin"
            })
            .end((err, res) => {
                token = `Bearer ${res.body.token}`;
                res.should.have.status(200);
                done()
            });
    });

    
    describe('- Sem token', () => {
        it('Deve retornar erro de authToken invalido', () => {
            return chai
                .request(server)
                .post(baseUrl + '/admin/notificacao/ginasio/' + ginasioaId)
                .then(res => {
                    res.should.have.status(500)
                    chai.expect(res.body).to.have.property("status")
                    chai.expect(res.body).to.have.property("message")
                })
        })
    })

    describe('- Token invalido', () => {
        it('Deve retornar erro de authToken invalido', () => {
            return chai
                .request(server)
                .post(baseUrl + '/admin/notificacao/ginasio/' + ginasioaId)
                .set("Authorization", tokenInvalido)
                .then(res => {
                    res.should.have.status(500)
                    chai.expect(res.body).to.have.property("status")
                    chai.expect(res.body).to.have.property("message")
                })
        })
    })

    describe('- Criar notificação ginasio', () => {
        it('Deve retornar erro de body incompleto', () => {
            return chai
                .request(server)
                .post(baseUrl + '/admin/notificacao/ginasio/' + ginasioaId)
                .set("Authorization", token)
                .then(res => {
                    res.should.have.status(500)
                    chai.expect(res.body).to.have.property("status")
                    chai.expect(res.body).to.have.property("message")
                })
        })
    })

    describe('- Criar notificação ginasio', () => {
        it('Deve retornar criar notificação ginasio com sucesso', () => {
            return chai
                .request(server)
                .post(baseUrl + '/admin/notificacao/ginasio/' + ginasioaId)
                .set("Authorization", token)
                .send({
                    conteudo: "Teste de notificação",
                    tipo: 0
                  })
                .then(res => {
                    res.should.have.status(200)

                    // verificar se é um object
                    chai.expect(res.body).to.be.an("object")

                    //verificar se as propriedades todas existem
                    chai.expect(res.body).to.have.property("user_id")
                    chai.expect(res.body).to.have.property("users")

                 


                })
        })
    })
})