import chai from 'chai';
import chaiHttp from 'chai-http';
import 'mocha';

chai.use(chaiHttp);
const expect = chai.expect;
const should = chai.should();
const baseUrl = "/api/v1"
const server = "localhost:8000"
const idAtividade = '6cd0ad96-b223-4ef8-bfa5-30431a3f1efc'

describe('- Editar atividade sem body', () => {
    it('Deve retornar erro de body incompleto', () => {
        return chai
        .request(server)
        .put(baseUrl+'/backend/atividades/atividade' + idAtividade)
        .then(res => {
        res.should.have.status(500)
        chai.expect(res.body).to.have.property("status")
        chai.expect(res.body).to.have.property("message")
        })
    })
})

describe('- Editar atividade corretamente', () => {
    it('Deve retornar atividade editada', () => {
      return chai
      .request(server)
      .put(baseUrl+'/backend/atividades/atividade' + idAtividade)
      .send({
        descricao: "teste unitario21",
        icon:"img2",
      })
      .then(res => {
        
        res.should.have.status(200)
        console.log(res.body)
        // verificar se é um object
        chai.expect(res.body).to.be.an("object")

        //verificar se as propriedades todas existem
        chai.expect(res.body).to.have.property("atividade_id")
        chai.expect(res.body).to.have.property("descricao")
        chai.expect(res.body).to.have.property("icon")

        //verificar tipos das propriedades
        chai.expect(res.body['atividade_id']).to.be.a("string")
        chai.expect(res.body['descricao']).to.be.a("string")
        chai.expect(res.body['icon']).to.be.a("string")
        })
    })
})