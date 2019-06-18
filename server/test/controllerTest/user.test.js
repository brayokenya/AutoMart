import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../../app.js';

const { expect } = chai;
chai.use(chaiHttp);

describe('POST /api/v2/auth/signup', () => {
    it('should return a 422 status if first name is not provided', (done) => {
        chai.request(app)
            .post('/api/v2/auth/signup')
            .send({
                lastName: 'Doe',
                email: 'desmondoe@gmail.com',
                password: 'pass',
                address: '17 Lagos'
            })
            .end((error, res) => {
                if (error) done(error);
                expect(res).to.be.an('object');
                expect(res).to.have.status(422);
                expect(res.body).to.have.keys('status', 'message');
                expect(res.body.status).to.deep.equal('error');
                expect(res.body.message).to.deep.equals('first name was not specified');
                done();
            });
    });
    it('should return a 422 status if first name has invalid characters', (done) => {
        chai.request(app)
            .post('/api/v2/auth/signup')
            .send({
                firstName: '45Desmond',
                lastName: 'Doe',
                email: 'desmondoe@gmail.com',
                password: 'pass',
                address: '17 Lagos'
            })
            .end((error, res) => {
                if (error) done(error);
                expect(res).to.be.an('object');
                expect(res).to.have.status(422);
                expect(res.body).to.have.keys('status', 'message');
                expect(res.body.status).to.deep.equal('error');
                expect(res.body.message).to.deep.equals('first name has invalid characters');
                done();
            });
    });

    it('should return a 422 status if first name has more than 20 characters', (done) => {
        chai.request(app)
            .post('/api/v2/auth/signup')
            .send({
                firstName: 'somereallylongnamethatimadeupitistrulylong',
                lastName: 'Doe',
                email: 'desmondoe@gmail.com',
                password: 'pass',
                address: '17 Lagos'
            })
            .end((error, res) => {
                if (error) done(error);
                expect(res).to.be.an('object');
                expect(res).to.have.status(422);
                expect(res.body).to.have.keys('status', 'message');
                expect(res.body.status).to.deep.equal('error');
                expect(res.body.message).to.deep.equals('first name exceeds the maximum length of 20');
                done();
            });
    });
    it('should return a 422 status if last name is not provided', (done) => {
        chai.request(app)
            .post('/api/v2/auth/signup')
            .send({
                firstName: 'Doe',
                email: 'desmondoe@gmail.com',
                password: 'pass',
                address: '17 Lagos'
            })
            .end((error, res) => {
                if (error) done(error);
                expect(res).to.be.an('object');
                expect(res).to.have.status(422);
                expect(res.body).to.have.keys('status', 'message');
                expect(res.body.status).to.deep.equal('error');
                expect(res.body.message).to.deep.equals('last name was not specified');
                done();
            });
    });
    it('should return a 422 status if last name has invalid characters', (done) => {
        chai.request(app)
            .post('/api/v2/auth/signup')
            .send({
                firstName: 'Desmond',
                lastName: ')Doe',
                email: 'desmondoe@gmail.com',
                password: 'pass',
                address: '17 Lagos'
            })
            .end((error, res) => {
                if (error) done(error);
                expect(res).to.be.an('object');
                expect(res).to.have.status(422);
                expect(res.body).to.have.keys('status', 'message');
                expect(res.body.status).to.deep.equal('error');
                expect(res.body.message).to.deep.equals('last name has invalid characters');
                done();
            });
    });

    it('should return a 422 status if last name has more than 20 characters', (done) => {
        chai.request(app)
            .post('/api/v2/auth/signup')
            .send({
                firstName: 'Desmond',
                lastName: 'somereallylongnamethatimadeupitistrulylong',
                email: 'desmondoe@gmail.com',
                password: 'pass',
                address: '17 Lagos'
            })
            .end((error, res) => {
                if (error) done(error);
                expect(res).to.be.an('object');
                expect(res).to.have.status(422);
                expect(res.body).to.have.keys('status', 'message');
                expect(res.body.status).to.deep.equal('error');
                expect(res.body.message).to.deep.equals('last name exceeds the maximum length of 20');
                done();
            });
    });
    it('should return a 422 status if email was not provided', (done) => {
        chai.request(app)
            .post('/api/v2/auth/signup')
            .send({
                firstName: 'Desmond',
                lastName: 'Doe',
                password: 'pass',
                address: '17 Lagos'
            })
            .end((error, res) => {
                if (error) done(error);
                expect(res).to.be.an('object');
                expect(res).to.have.status(422);
                expect(res.body).to.have.keys('status', 'message');
                expect(res.body.status).to.deep.equal('error');
                expect(res.body.message).to.deep.equals('email was not provided');
                done();
            });
    });
    it('should return a 422 status if email is invalid', (done) => {
        chai.request(app)
            .post('/api/v2/auth/signup')
            .send({
                firstName: 'Desmond',
                lastName: 'Doe',
                email: '#jondoe@@gmal.',
                password: 'pass',
                address: '17 Lagos'
            })
            .end((error, res) => {
                if (error) done(error);
                expect(res).to.be.an('object');
                expect(res).to.have.status(422);
                expect(res.body).to.have.keys('status', 'message');
                expect(res.body.status).to.deep.equal('error');
                expect(res.body.message).to.deep.equals('invalid email');
                done();
            });
    });

    it('should return a 422 status if password was not provided', (done) => {
        chai.request(app)
            .post('/api/v2/auth/signup')
            .send({
                firstName: 'Desmond',
                lastName: 'Doe',
                email: 'desmonddoe@gmail.com',
                address: '17 Lagos'
            })
            .end((error, res) => {
                if (error) done(error);
                expect(res).to.be.an('object');
                expect(res).to.have.status(422);
                expect(res.body).to.have.keys('status', 'message');
                expect(res.body.status).to.deep.equal('error');
                expect(res.body.message).to.deep.equals('password was not provided');
                done();
            });
    });

    it('should return a 422 status if address was not provided', (done) => {
        chai.request(app)
            .post('/api/v2/auth/signup')
            .send({
                firstName: 'Desmond',
                lastName: 'Doe',
                email: 'desmonddoe@gmail.com',
                password: 'pass'
            })
            .end((error, res) => {
                if (error) done(error);
                expect(res).to.be.an('object');
                expect(res).to.have.status(422);
                expect(res.body).to.have.keys('status', 'message');
                expect(res.body.status).to.deep.equal('error');
                expect(res.body.message).to.deep.equals('address was not specified');
                done();
            });
    });

    it('should return a 422 status if address is invalid', (done) => {
        chai.request(app)
            .post('/api/v2/auth/signup')
            .send({
                firstName: 'Desmond',
                lastName: 'Doe',
                email: 'desmonddoe@gmail.com',
                password: 'pass',
                address: '#48..)) Benin'
            })
            .end((error, res) => {
                if (error) done(error);
                expect(res).to.be.an('object');
                expect(res).to.have.status(422);
                expect(res.body).to.have.keys('status', 'message');
                expect(res.body.status).to.deep.equal('error');
                expect(res.body.message).to.deep.equals('address has invalid characters');
                done();
            });
    });

    it('should return a 409 status if account exists', (done) => {
        chai.request(app)
            .post('/api/v2/auth/signup')
            .send({
                firstName: 'John',
                lastName: 'Doe',
                email: 'johndoe@gmail.com',
                password: 'pass',
                address: '17, lagos'
            })
            .end((error, res) => {
                if (error) done(error);
                expect(res).to.be.an('object');
                expect(res).to.have.status(409);
                expect(res.body).to.have.keys('status', 'message');
                expect(res.body.status).to.deep.equal('error');
                expect(res.body.message).to.deep.equals('email is already in use');
                done();
            });
    });

    it('should return a 201 status if account was created', (done) => {
        chai.request(app)
            .post('/api/v2/auth/signup')
            .send({
                firstName: 'Desmond',
                lastName: 'Doe',
                email: 'desmonddoe@gmail.com',
                password: 'pass',
                address: '17, Lagos Street, Benin'
            })
            .end((error, res) => {
                if (error) done(error);
                expect(res).to.be.an('object');
                expect(res).to.have.status(201);
                expect(res.body).to.have.keys('status', 'data', 'message');
                expect(res.body.data).to.have.keys('token', 'id', 'firstName', 'lastName', 'email');
                expect(res.body.status).to.deep.equal('success');
                expect(res.body.message).to.deep.equals('welcome, Desmond!');
                expect(res.body.data.firstName).to.deep.equals('Desmond');
                expect(res.body.data.lastName).to.deep.equals('Doe');
                expect(res.body.data.email).to.deep.equals('desmonddoe@gmail.com');
                done();
            });
    });
});
