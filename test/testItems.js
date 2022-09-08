const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = require('chai').expect;
chai.use(chaiHttp);
const url = 'http://localhost:8080/api/items';

describe('Testing 1: create a Version', () => {
  it('Should create a new version', (done) => {
    chai
      .request(url)
      .post('/create')
      .send({
        id: 5,
        minecraftIDName: 'prueba',
        minecraftID: 1,
        minecraftDataValue: 0,
        flamableItem: false,
      })
      .end((err, res) => {
        console.log(res.body);
        expect(res).to.have.status(200);
        done();
      });
  });
});

describe('Testing 2: Get all Versions', () => {
  it('Should get all versions', (done) => {
    chai
      .request(url)
      .get('/')
      .end((err, res) => {
        console.log(res.body);
        expect(res).to.have.status(200);
        done();
      });
  });
});
