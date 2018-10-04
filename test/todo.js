let chai = require('chai');
let chaiHttp = require('chai-http');
chai.use(chaiHttp);
let expect = chai.expect;
let should = chai.should;

let server = require('../server.js');

describe('Teste server working', function (done) {
    it('should get a server message', function (done) {
        chai.request(server)
            .get('/')
            .end(function (err, res) {
                expect(res.status).to.eql(200);
                done();
            });
    });
});

describe('Teste ToDo is working', function (done) {

    let id;

    it('should get ToDos', function (done) {
        chai.request(server)
            .get('/todo')
            .end(function (err, res) {
                expect(res.body.success).to.eql(true);
                expect(res.body.todos).to.be.an('array');
               
                done();
            });
    });

    it('should create ToDos', function (done) {
        chai.request(server)
            .post('/todo')
            .send({ title: "ToDo Teste" })
            .end(function (err, res) {
                expect(res.body.success).to.eql(true);
                expect(res.body.todo).to.not.be.undefined;
                expect(res.body.todo.is_complete).to.eql(false);

                id = res.body.todo._id;

                done();
            });
    });

    it('should update ToDo', function (done) {
        chai.request(server)
            .put('/todo')
            .send({ _id: id, is_complete: true })
            .end(function (err, res) {
                expect(res.body.success).to.eql(true);

                done();
            })
    });

});

