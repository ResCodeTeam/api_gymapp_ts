import chai from "chai";
import chaiHttp from "chai-http";

const server = "http://localhost:8000/api/v1"
const alunoToken = "Bearer "

chai.should();
chai.use(chaiHttp)


describe("Obter todos posts route teste unitário",()=>{
  it("GET /posts",(done:Mocha.Done)=>{
    chai
    .request(server)
    .get("/posts")
    .set("authorization", alunoToken)
    .end((err,res)=>{
      console.log(res);
      res.should.have.status(200);
      res.body.should.have.property("publicacoes")
      done();
    })
  })
})