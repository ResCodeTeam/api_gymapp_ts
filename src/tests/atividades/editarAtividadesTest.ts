import chai from 'chai';
import chaiHttp from 'chai-http';
import 'mocha';

chai.use(chaiHttp);
const expect = chai.expect;
const should = chai.should();
const baseUrl = "/api/v1"
const server = "localhost:8000"
const idAtividade1 = '27c7eb59-2895-4b48-862c-fd1c2be1ca6c'
const idAtividade2 = '28895b6d-bd0c-422b-ad0b-d7ca6f89a18f'

describe('- Editar atividade que não existe', () => {
  it('Deve retornar erro de atividade não existe', () => {
      return chai
      .request(server)
      .put(baseUrl+'/backend/atividades/' + idAtividade1)
      .then(res => {
      res.should.have.status(500)
      chai.expect(res.body).to.have.property("status")
      chai.expect(res.body).to.have.property("message")
      })
  })
})

describe('- Editar atividade sem body', () => {
    it('Deve retornar erro de body incompleto', () => {
        return chai
        .request(server)
        .put(baseUrl+'/backend/atividades/' + idAtividade2)
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
      .put(baseUrl+'/backend/atividades/' + idAtividade2)
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
        chai.expect(res.body).to.have.property("descricao")
        chai.expect(res.body).to.have.property("icon")

        //verificar tipos das propriedades
        chai.expect(res.body['descricao']).to.be.a("string")
        chai.expect(res.body['icon']).to.be.a("string")
        })
    })
})