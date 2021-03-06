import chai from 'chai';
import chaiHttp from 'chai-http';
import 'mocha';

chai.use(chaiHttp);
const expect = chai.expect;
const should = chai.should();
const baseUrl = "/api/v1"
const server = "localhost:8000"
const tokenInvalido = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2NTAwMjQ1MzgsImV4cCI6MTY1MDAyNTQzOCwic3ViIjoiMDAwZDFlMTQtNjE3ZS00MjNlLThhMWEtZjYzZDRmYTVhZjZhIn0.b0U-__cRpH8YBsAtZEtClr0fAj4t9IOwDAcI2R3j-qk'
const idPlano = '06622c79-e84e-4c64-8e69-dfaf8570c392'
let token = ''

describe("Teste removerplano de treino:", () => {
  beforeEach((done) => {
    chai
      .request(server)
      .post(baseUrl + "/auth/login")
      .send({
        email: "treinador@treinador.com",
        password: "treinador",
      })
      .end((err, res) => {
        token = `Bearer ${res.body.token}`;
        res.should.have.status(200);
        done();
      });
  });


  describe('- Sem token', () => {
    it('Deve retornar erro de token invalido', () => {
      return chai
        .request(server)
        .delete(baseUrl + '/treinador/plano/' + idPlano)
        .then(res => {
          res.should.have.status(500)
          chai.expect(res.body).to.have.property("status")
          chai.expect(res.body).to.have.property("message")
        })
    })
  })

  describe('- Token expirado', () => {
    it('Deve retornar erro de token invalido', () => {
      return chai
        .request(server)
        .delete(baseUrl + '/treinador/plano/' + idPlano)
        .set("Authorization", tokenInvalido)
        .then(res => {
          res.should.have.status(500)
          chai.expect(res.body).to.have.property("status")
          chai.expect(res.body).to.have.property("message")
        })
    })
  })
  describe('- Remover agendamento de avaliação corretamente', () => {
    it('Deve retornar mensagem de remoção', () => {
      return chai
        .request(server)
        .delete(baseUrl + '/treinador/plano/' + idPlano)
        .set("Authorization", token)
        .then(res => {


          res.should.have.status(200)
          chai.expect(res.body).to.have.property("msg")

          //verificar tipos das propriedades 
          chai.expect(res.body['msg']).to.be.a("string")
        })
    })
  })
})