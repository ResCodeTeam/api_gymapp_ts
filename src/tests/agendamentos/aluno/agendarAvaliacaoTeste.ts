import chai from 'chai';
import chaiHttp from 'chai-http';
import 'mocha';

chai.use(chaiHttp);
const expect = chai.expect;
const should = chai.should();
const baseUrl = "/api/v1"
const server = "localhost:8000"
const tokenInvalido = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2NTAwMjQ1MzgsImV4cCI6MTY1MDAyNTQzOCwic3ViIjoiMDAwZDFlMTQtNjE3ZS00MjNlLThhMWEtZjYzZDRmYTVhZjZhIn0.b0U-__cRpH8YBsAtZEtClr0fAj4t9IOwDAcI2R3j-qk'

let token = ''
describe("Teste agendar avaliação de aluno:", () => {
  beforeEach((done) => {
    chai
      .request(server)
      .post(baseUrl + "/auth/login")
      .send({
        email: "biancasilva@gmail.com",
        password: "passwd",
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
        .delete(baseUrl + '/aluno/agenda/avaliacao/')
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
        .delete(baseUrl + '/aluno/agenda/avaliacao/')
        .set("Authorization", tokenInvalido)
        .then(res => {
          res.should.have.status(500)
          chai.expect(res.body).to.have.property("status")
          chai.expect(res.body).to.have.property("message")
        })
    })
  })

  describe('- Criar agendamento corretamente para aluno', () => {
    it('Deve retornar agendamento criado', () => {
      return chai
        .request(server)
        .post(baseUrl + '/aluno/agenda/avaliacao/')
        .set("Authorization", token)
        .send({
          uid: "000d1e14-617e-423e-8a1a-f63d4fa5af6a",
          data_agendamento: "2022-05-20 13:24:10.574",
          ginasio_id: "cca94698-1048-487e-a67f-e238f2edb9d3"

        })
        .then(res => {

          res.should.have.status(200)
          // verificar se é um object
          chai.expect(res.body).to.be.an("object")

          //verificar se as propriedades todas existem
          chai.expect(res.body).to.have.property("uid")
          chai.expect(res.body).to.have.property("data_agendamento")
          chai.expect(res.body).to.have.property("ginasioId")


          chai.expect(res.body['uid']).to.be.a("string")
          chai.expect(res.body['data_agendamento']).to.be.a("date")
          chai.expect(res.body['ginasio_id']).to.be.a("string")



        })
    })
  })


})