import chai from 'chai';
import chaiHttp from 'chai-http';
import 'mocha';

chai.use(chaiHttp);
const expect = chai.expect;
const should = chai.should();
const baseUrl = "/api/v1"
const server = "localhost:8000"
const tokenInvalido = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2NTAwMjQ1MzgsImV4cCI6MTY1MDAyNTQzOCwic3ViIjoiMDAwZDFlMTQtNjE3ZS00MjNlLThhMWEtZjYzZDRmYTVhZjZhIn0.b0U-__cRpH8YBsAtZEtClr0fAj4t9IOwDAcI2R3j-qk'

// buscar o token de quem está logado - neste caso a Bianca - linha 25
let token=''

describe("Teste Obter as definições do user", () => {
    beforeEach((done) => {
        chai
          .request(server)
          .post(baseUrl+"/auth/login")
          .send({
            email: "biancasilva@gmail.com",
            password: "passwd",
          })
          .end((err, res) => {
            token = `Bearer ${res.body.token}` ;
            res.should.have.status(200);
            done();
          });
    });
    describe('- Sem token', () => {
        it('Deve retornar erro de authToken invalido', () => {
          return chai
          .request(server)
          .get(baseUrl+'/definicoes')
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
            .get(baseUrl+'/definicoes')
            .set("Authorization", tokenInvalido)
            .then(res => {
                res.should.have.status(500)
                    chai.expect(res.body).to.have.property("status")
                    chai.expect(res.body).to.have.property("message")
            })
        })
    })

    describe('- Obter as definicoes do user corretamente', () => {
        it('Deve retornar definicoes', () => {
          return chai
          .request(server)
          .get(baseUrl+'/definicoes')
          .set("Authorization", token)
          .then(res => {
            res.should.have.status(200)
              //verificar se as propriedades todas existem
              chai.expect(res.body[0]).to.have.property("def_id")
              chai.expect(res.body[0]).to.have.property("useruid")
              chai.expect(res.body[0]).to.have.property("identificacoes")
              chai.expect(res.body[0]).to.have.property("is_privado")
              chai.expect(res.body[0]).to.have.property("mencoes")
              
              //verificar tipos das propriedades 
              chai.expect(res.body[0]['def_id']).to.be.a("string")
              chai.expect(res.body[0]['useruid']).to.be.a("string")
              chai.expect(res.body[0]['identificacoes']).to.be.a("boolean")
              chai.expect(res.body[0]['is_privado']).to.be.a("boolean")
              chai.expect(res.body[0]['mencoes']).to.be.a("boolean")
            })
        })
    })
})