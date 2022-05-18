
import chai from 'chai';
import chaiHttp from 'chai-http';
import 'mocha';
import { send } from 'process';

chai.use(chaiHttp);
const expect = chai.expect;
const should = chai.should();
const baseUrl = "/api/v1"
const server = "localhost:8000"

const tokenInvalido = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2NTAwMjQ1MzgsImV4cCI6MTY1MDAyNTQzOCwic3ViIjoiMDAwZDFlMTQtNjE3ZS00MjNlLThhMWEtZjYzZDRmYTVhZjZhIn0.b0U-__cRpH8YBsAtZEtClr0fAj4t9IOwDAcI2R3j-qk'
const idAgendamento = "14fea5d0-a857-4d1a-8bb4-a7ee9805b6f9"


let token = ''

describe("Teste aceitar avaliação", () => {
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
    it('Deve retornar erro de authToken invalido', () => {
      return chai
        .request(server)
        .put(baseUrl + '/treinador/agenda/avaliacao/' + idAgendamento + '/')
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
        .put(baseUrl + '/treinador/agenda/avaliacao/' + idAgendamento + '/')
        .set("Authorization", tokenInvalido)

        .then(res => {
          res.should.have.status(500)
          chai.expect(res.body).to.have.property("status")
          chai.expect(res.body).to.have.property("message")
        })
    })
  })

  describe('-Aceitar avaliação corretamente', () => {
    it('Deve retornar mensagem de aceitação', () => {
      return chai
        .request(server)
        .put(baseUrl + '/treinador/agenda/avaliacao/' + idAgendamento + '/')

        .set("Authorization", token)
        .then(res => {


          res.should.have.status(200)
          // chai.expect(res.body).to.have.property("status")
          // chai.expect(res.body).to.have.property("message")

          chai.expect(res.body).to.be.an("object")

          //verificar se as propriedades todas existem
          chai.expect(res.body).to.have.property("agendamento_id")
          chai.expect(res.body).to.have.property("uid")
          chai.expect(res.body).to.have.property("data_agendamento")
          chai.expect(res.body).to.have.property("ginasio_id")
          chai.expect(res.body).to.have.property("isAceite")
          chai.expect(res.body).to.have.property("isDeleted")

          //verificar tipos das propriedades
          chai.expect(res.body['agendamento_id']).to.be.a("string")
          chai.expect(res.body['uid']).to.be.a("string")
          chai.expect(res.body['data_agendamento']).to.be.a("string")
          chai.expect(res.body['ginasio_id']).to.be.a("string")
          chai.expect(res.body['isAceite']).to.be.a("boolean")
          chai.expect(res.body['isDeleted']).to.be.a("boolean")


        })
    })
  })
})


