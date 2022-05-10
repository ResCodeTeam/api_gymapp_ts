import chai from 'chai';
import chaiHttp from 'chai-http';
import 'mocha';

chai.use(chaiHttp);
const expect = chai.expect;
const should = chai.should();
const baseUrl = "/api/v1"
const server = "localhost:8000"

describe('- Criar admin sem body', () => {
    it('Deve retornar erro de body incompleto', () => {
        return chai
        .request(server)
        .post(baseUrl+'/backend/registo')
        .then(res => {
        res.should.have.status(500)
        chai.expect(res.body).to.have.property("status")
        chai.expect(res.body).to.have.property("message")
        })
    })
})

describe('- Criar admin corretamente', () => {
    it('Deve retornar admin criado', () => {
      return chai
      .request(server)
      .post(baseUrl+'/backend/registo')
      .send({
        email: "admin6@admin.com",
        nome: "Joao",
        password: "admin",
        dataNasc: "2002-10-17",
        dataEntrada: "2022-10-05",
        genero: 1
      })
      .then(res => {
        
        res.should.have.status(200)
        console.log(res.body)
        // verificar se é um object
        chai.expect(res.body).to.be.an("object")

        //verificar se as propriedades todas existem
        chai.expect(res.body).to.have.property("uid")
        chai.expect(res.body).to.have.property("email")
        chai.expect(res.body).to.have.property("nome")
        chai.expect(res.body).to.have.property("password")
        chai.expect(res.body).to.have.property("dataNasc")
        chai.expect(res.body).to.have.property("dataEntrada")
        chai.expect(res.body).to.have.property("genero")

        //verificar tipos das propriedades
        chai.expect(res.body['uid']).to.be.a("string")
        chai.expect(res.body['email']).to.be.a("string")
        chai.expect(res.body['nome']).to.be.a("string")
        chai.expect(res.body['password']).to.be.a("string")
        chai.expect(res.body['dataNasc']).to.be.a("date")
        chai.expect(res.body['dataEntrada']).to.be.a("date")
        chai.expect(res.body['genero']).to.be.a("number")
        })
    })
})