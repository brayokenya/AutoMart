import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../app';

const { expect } = chai;
chai.use(chaiHttp);

describe('GET /', () => {
    it('Should redirect to index page', (done) => {
        chai.request(app)
            .get('/')
            .end((error, res) => {
                if (error) done(error);
                expect(res).to.redirect;
                expect(res).to.have.status(200);
                done();
            });
    });
});

describe('GET /docs', () => {
    it('Should render file', (done) => {
        chai.request(app)
            .get('/docs')
            .end((error, res) => {
                if (error) done(error);
                expect(res).to.be.an('object');
                expect(res).to.have.status(200);
                done();
            });
    });

});

describe('Wrong Path Handler', () => {
    it('Should send a 404 error if wrong endpoint is requested', (done) => {
        chai.request(app)
            .get('/somewrongendpoint')
            .end((error, res) => {
                if (error) done(error);
                expect(res).to.be.an('object');
                expect(res).to.have.status(404);
                expect(res.body.status).to.deep.equal('error');
                expect(res.body.message).to.deep.equal('this api endpoint does not exist');
                done();
            });
    });

    it('Should send a 404 error if wrong endpoint is requested', (done) => {
        chai.request(app)
            .post('/somewrongendpoint')
            .end((error, res) => {
                if (error) done(error);
                expect(res).to.be.an('object');
                expect(res).to.have.status(404);
                expect(res.body.status).to.deep.equal('error');
                expect(res.body.message).to.deep.equal('this api endpoint does not exist');
                done();
            });
    });

    it('Should send a 404 error if wrong endpoint is requested', (done) => {
        chai.request(app)
            .patch('/somewrongendpoint')
            .end((error, res) => {
                if (error) done(error);
                expect(res).to.be.an('object');
                expect(res).to.have.status(404);
                expect(res.body.status).to.deep.equal('error');
                expect(res.body.message).to.deep.equal('this api endpoint does not exist');
                done();
            });
    });

    it('Should send a 404 error if wrong endpoint is requested', (done) => {
        chai.request(app)
            .delete('/somewrongendpoint')
            .end((error, res) => {
                if (error) done(error);
                expect(res).to.be.an('object');
                expect(res).to.have.status(404);
                expect(res.body.status).to.deep.equal('error');
                expect(res.body.message).to.deep.equal('this api endpoint does not exist');
                done();
            });
    });

    it('Should send a 404 error if wrong endpoint is requested', (done) => {
        chai.request(app)
            .put('/somewrongendpoint')
            .end((error, res) => {
                if (error) done(error);
                expect(res).to.be.an('object');
                expect(res).to.have.status(404);
                expect(res.body.status).to.deep.equal('error');
                expect(res.body.message).to.deep.equal('this api endpoint does not exist');
                done();
            });
    });

});