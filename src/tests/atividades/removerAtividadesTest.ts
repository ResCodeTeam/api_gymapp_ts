import chai from 'chai';
import chaiHttp from 'chai-http';
import 'mocha';

chai.use(chaiHttp);
const expect = chai.expect;
const should = chai.should();
const baseUrl = "/api/v1"
const server = "localhost:8000"
const idAtividade = '62bc39bd-dc47-4e5c-98b5-adf3691a53d3'

describe("Teste Remover Atividade:", () => {
    describe('- Remover atividade corretamente', () => {
        it('Deve retornar mensagem de remoção', () => {
          return chai
          .request(server)
          .delete(baseUrl+'/backend/atividades/atividade'+idAtividade)
          .then(res => {
            res.should.have.status(500)
            chai.expect(res.body).to.have.property("status")
            chai.expect(res.body).to.have.property("message")
          })
        })
    })
})