import chai from 'chai';
import chaiHttp from 'chai-http';
import 'mocha';

chai.use(chaiHttp);
const expect = chai.expect;
const should = chai.should();
const baseUrl = "/api/v1"
const server = "localhost:8000"
const tokenInvalido = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2NTAwMjQ1MzgsImV4cCI6MTY1MDAyNTQzOCwic3ViIjoiMDAwZDFlMTQtNjE3ZS00MjNlLThhMWEtZjYzZDRmYTVhZjZhIn0.b0U-__cRpH8YBsAtZEtClr0fAj4t9IOwDAcI2R3j-qk'
const token = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2NTAxMzAwNDIsImV4cCI6MTY1MDEzMDk0Miwic3ViIjoiMDAwZDFlMTQtNjE3ZS00MjNlLThhMWEtZjYzZDRmYTVhZjZhIn0.yIAIWlxMnxY5UHfFKrrP4m-P3mcSTnjmD2S-UDcUhBw'


describe('Criar post sem token', () => {
  it('Deve retornar erro de token invalido', () => {
    return chai
    .request(server)
    .post(baseUrl+'/posts')
    .send({
      descricao: "teste",
      tipo: 1,
      ginasio_id: "a97e6887-31dc-4186-ad27-09e0fb7d645e",
      identificacao: [
        "02de0f10-df8b-4d1e-955f-22d3211b66da",
        "0a169c30-208d-4931-9400-15d44ba57690"
      ]
    })
    .then(res => {
      res.should.have.status(500)
      chai.expect(res.body).to.have.property("status")
      chai.expect(res.body).to.have.property("message")
    })
  })
})

describe('Criar post sem token', () => {
  it('Deve retornar erro de token invalido', () => {
    return chai
    .request(server)
    .post(baseUrl+'/posts')
    .set("Authorization", tokenInvalido)
    .send({
      descricao: "teste",
      tipo: 1,
      ginasio_id: "a97e6887-31dc-4186-ad27-09e0fb7d645e",
      identificacao: [
        "02de0f10-df8b-4d1e-955f-22d3211b66da",
        "0a169c30-208d-4931-9400-15d44ba57690"
      ]
    })
    .then(res => {
      res.should.have.status(500)
      chai.expect(res.body).to.have.property("status")
      chai.expect(res.body).to.have.property("message")
    })
  })
})
describe('Criar post sem body', () => {
  it('Deve retornar erro de body incompleto', () => {
    return chai
    .request(server)
    .post(baseUrl+'/posts')
    .set("Authorization", token)
    .then(res => {
      res.should.have.status(500)
      chai.expect(res.body).to.have.property("status")
      chai.expect(res.body).to.have.property("message")
    })
  })
})

describe('Criar post corretamente', () => {
  it('Deve retornar post criado', () => {
    return chai
    .request(server)
    .post(baseUrl+'/posts')
    .set("Authorization", token)
    .send({
      descricao: "teste unitario",
      tipo: 1,
      ginasio_id: "a97e6887-31dc-4186-ad27-09e0fb7d645e",
      identificacao: [
        "02de0f10-df8b-4d1e-955f-22d3211b66da",
        "0a169c30-208d-4931-9400-15d44ba57690"
      ]
    })
    .then(res => {
      
      res.should.have.status(200)
    })
  })
})