//pedir ajuda ao roberto


import chai from 'chai';
import chaiHttp from 'chai-http';
import 'mocha';

chai.use(chaiHttp);
const expect = chai.expect;
const should = chai.should();
const baseUrl = "/api/v1"
const server = "localhost:8000"
const tokenInvalido = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2NTAwMjQ1MzgsImV4cCI6MTY1MDAyNTQzOCwic3ViIjoiMDAwZDFlMTQtNjE3ZS00MjNlLThhMWEtZjYzZDRmYTVhZjZhIn0.b0U-__cRpH8YBsAtZEtClr0fAj4t9IOwDAcI2R3j-qk'
const idGinasio = '059f2ecf-cdcc-408c-a139-1ceb7df0742e'
let token = ''

describe("Teste Obter todos os alunos de um ginásio", () => {
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
    it('Deve retornar erro de authToken invalido', () => {
      return chai.request(server).get(baseUrl + '/posts')
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
        .get(baseUrl + '/alunos/ginasio/:id')
        .set("Authorization", tokenInvalido)
        .then(res => {
          res.should.have.status(500)
          chai.expect(res.body).to.have.property("status")
          chai.expect(res.body).to.have.property("message")
        })
    })
  })

  describe('- Obter todos os alunos de ginásio corretamente', () => {
    it('Deve retornar alunos de ginásio', () => {
      return chai
        .request(server)
        .get(baseUrl + '/alunos/ginasio/:id')
        .set("Authorization", token)
        .then(res => {
          res.should.have.status(200)
          if (res.body.length > 0) {
            //verificar se é um objeto

            chai.expect(res.body[0]).to.be.an("object")

            //verificar se as propriedades todas existem
            chai.expect(res.body[0]).to.have.property("ginasio_id")
            chai.expect(res.body[0]).to.have.property("uid")
            chai.expect(res.body[0]).to.have.property("nome")
            chai.expect(res.body[0]).to.have.property("hashtag")
            chai.expect(res.body[0]).to.have.property("imagem_url")

            //verificar tipos das propriedades 
            chai.expect(res.body[0]['ginasio_id']).to.be.a("string")
            chai.expect(res.body[0]['uid']).to.be.a("string")
            chai.expect(res.body[0]['nome']).to.be.a("string")
            chai.expect(res.body[0]['hashtag']).to.be.a("string")
            chai.expect(res.body[0]['imagem_url']).to.be.a("string")







            // verificar se existe url da imagem
            chai.expect(res.body[0]['imagem_url'][0]).to.have.property("url")

            // verificar se url da imagem é uma string
            chai.expect(res.body[0]['imagem_url'][0]['url']).to.be.a("string")


          }
        })

    })
  })
})
