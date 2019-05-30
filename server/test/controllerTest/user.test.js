import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../../app.js';

const { expect } = chai;
chai.use(chaiHttp);

let userToken;

describe('POST /api/v1/auth/signup', () => {
    it('should return a 422 status if first name is not provided', (done) => {
        chai.request(app)
            .post('/api/v1/auth/signup')
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
            .post('/api/v1/auth/signup')
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
            .post('/api/v1/auth/signup')
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
            .post('/api/v1/auth/signup')
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
            .post('/api/v1/auth/signup')
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
            .post('/api/v1/auth/signup')
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
            .post('/api/v1/auth/signup')
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
            .post('/api/v1/auth/signup')
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
            .post('/api/v1/auth/signup')
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
            .post('/api/v1/auth/signup')
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
            .post('/api/v1/auth/signup')
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
            .post('/api/v1/auth/signup')
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
            .post('/api/v1/auth/signup')
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

describe('POST /api/v1/auth/signin', () => {
    it('Should return a 422 status if email was not provided', (done) => {
        chai.request(app)
            .post('/api/v1/auth/signin')
            .send({
                pasword: 'pass'
            })
            .end((error, res) => {
                if (error) done(error);
                expect(res).to.be.an('object');
                expect(res).to.have.status(422);
                expect(res.body.status).to.deep.equals('error');
                expect(res.body.message).to.deep.equal('email was not provided');
                done();
            });
    });
    it('Should return a 422 status if password was not provided', (done) => {
        chai.request(app)
            .post('/api/v1/auth/signin')
            .send({
                email: 'johndoe@gmail.com'
            })
            .end((error, res) => {
                if (error) done(error);
                expect(res).to.be.an('object');
                expect(res).to.have.status(422);
                expect(res.body.status).to.deep.equals('error');
                expect(res.body.message).to.deep.equal('password was not provided');
                done();
            });
    });

    it('Should return a 422 status if email has invalid characters', (done) => {
        chai.request(app)
            .post('/api/v1/auth/signin')
            .send({
                email: 'johndoe@gmail)(*).com**',
                password: 'pass'
            })
            .end((error, res) => {
                if (error) done(error);
                expect(res).to.be.an('object');
                expect(res).to.have.status(422);
                expect(res.body.status).to.deep.equals('error');
                expect(res.body.message).to.deep.equal('invalid email');
                done();
            });
    });

    it('Should return a 404 status if account does not exist', (done) => {
        chai.request(app)
            .post('/api/v1/auth/signin')
            .send({
                email: 'notauser@gmail.com',
                password: 'pass'
            })
            .end((error, res) => {
                if (error) done(error);
                expect(res).to.be.an('object');
                expect(res).to.have.status(404);
                expect(res.body.status).to.deep.equals('error');
                expect(res.body.message).to.deep.equal('incorrect email or password');
                done();
            });
    });

    it('Should return a 404 status if passwords do match', (done) => {
        chai.request(app)
            .post('/api/v1/auth/signin')
            .send({
                email: 'johndoe@gmail.com',
                password: 'notpass'
            })
            .end((error, res) => {
                if (error) done(error);
                expect(res).to.be.an('object');
                expect(res).to.have.status(404);
                expect(res.body.status).to.deep.equals('error');
                expect(res.body.message).to.deep.equal('incorrect email or password');
                done();
            });
    });

    it('Should return a 200 status on successful login', (done) => {
        chai.request(app)
            .post('/api/v1/auth/signin')
            .send({
                email: 'osahonoboite@gmail.com',
                password: 'pass'
            })
            .end((error, res) => {
                if (error) done(error);
                expect(res).to.be.an('object');
                expect(res).to.have.status(200);
                expect(res.body).to.have.keys('status', 'message', 'data');
                expect(res.body.status).to.deep.equals('success');
                expect(res.body.message).to.deep.equal('welcome back, Osahon!');
                expect(res.body.data).to.have.keys('token', 'id', 'firstName', 'lastName', 'email');
                userToken = res.body.data.token;
                done();
            });
    });
});

describe('POST /api/v1/auth/reset-password', () => {
    it('Should return a 422 error if email is not valid', (done) => {
        chai.request(app)
            .post('/api/v1/auth/reset-password')
            .send({
                email: 'invalid.mail'
            })
            .end((error, res) => {
                if (error) done(error);
                expect(res).to.be.an('object');
                expect(res).to.have.status(422);
                expect(res.body.status).to.deep.equal('error');
                expect(res.body.message).to.deep.equal('invalid email');
                done();
            });
    });

    it('Should return a 404 error if account does not exist', (done) => {
        chai.request(app)
            .post('/api/v1/auth/reset-password')
            .send({
                email: 'notauser@gmail.com'
            })
            .end((error, res) => {
                if (error) done(error);
                expect(res).to.be.an('object');
                expect(res).to.have.status(404);
                expect(res.body.status).to.deep.equal('error');
                expect(res.body.message).to.deep.equal('user account not found');
                done();
            });
    });

    it('Should send a 200 status if reset password mail was sent', (done) => {
        chai.request(app)
            .post('/api/v1/auth/reset-password')
            .send({
                email: 'osahonoboite@gmail.com'
            })
            .end((error, res) => {
                if (error) done(error);
                expect(res).to.be.an('object');
                expect(res).to.have.status(200);
                expect(res.body.status).to.deep.equal('success');
                expect(res.body.message).to.deep.equal('a password-reset link has been sent to your email');
                done();
            });
    });
});

describe('PATCH /api/v1/auth/reset-password/:token', () => {
    const wrongResetLink = '/api/v1/auth/reset-password/eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjYsInVzZXJFbWFpbCI6Im9zYWhvbm9ib2l0ZUBnbWFpbC5jb20iLCJpYXQiOjE1NTg3NTE5NzIsImV4cCI6MTU1ODgzNjU3Mn0.4dWAprRtYf_dFQ4EM1LiHyxn5qbSwSohoDsOWqS3d58';

    it('should return a 422 error if password was not provided', (done) => {
        chai.request(app)
            .patch(wrongResetLink)
            .send({
                confirmPassword: 'pass'
            })
            .end((error, res) => {
                if (error) done(error);
                expect(res).to.be.an('object');
                expect(res).to.have.status(422);
                expect(res.body.status).to.deep.equal('error');
                expect(res.body.message).to.deep.equal('password was not provided');
                done();
            });
    });

    it('should return a 422 error if password was not confirmed', (done) => {
        chai.request(app)
            .patch(wrongResetLink)
            .send({
                password: 'pass'
            })
            .end((error, res) => {
                if (error) done(error);
                expect(res).to.be.an('object');
                expect(res).to.have.status(422);
                expect(res.body.status).to.deep.equal('error');
                expect(res.body.message).to.deep.equal('password was not confirmed');
                done();
            });
    });

    it('should return a 422 error if passwords do not match', (done) => {
        chai.request(app)
            .patch(wrongResetLink)
            .send({
                password: 'pass',
                confirmPassword: 'notpass'
            })
            .end((error, res) => {
                if (error) done(error);
                expect(res).to.be.an('object');
                expect(res).to.have.status(422);
                expect(res.body.status).to.deep.equal('error');
                expect(res.body.message).to.deep.equal('passwords do not match');
                done();
            });
    });

    it('should return a 404 status if link has expired or is invalid', (done) => {
        chai.request(app)
            .patch(wrongResetLink)
            .send({
                password: 'pass',
                confirmPassword: 'pass'
            })
            .end((error, res) => {
                if (error) done(error);
                expect(res).to.be.an('object');
                expect(res).to.have.status(404);
                expect(res.body.status).to.deep.equal('error');
                expect(res.body.message).to.deep.equal('user not found. reset link may have expired');
                done();
            });
    });

    it('should update user password if everything checks out', (done) => {
        chai.request(app)
            .patch(`/api/v1/auth/reset-password/${userToken}`)
            .send({
                password: 'pass',
                confirmPassword: 'pass'
            })
            .end((error, res) => {
                if (error) done(error);
                expect(res).to.be.an('object');
                expect(res).to.have.status(200);
                expect(res.body.status).to.deep.equal('success');
                expect(res.body.message).to.deep.equal('password was successfully updated');
                done();
            });
    });

});