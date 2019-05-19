import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../../app';

const { expect } = chai;

chai.use(chaiHttp);

let myToken;

before((done) => {
    chai.request(app)
        .post('/api/v1/auth/signin')
        .send({
            email: 'johndoe@gmail.com',
            password: 'pass'
        })
        .end((err, res) => {
            if (err) done(err);
            myToken = res.body.data.token;
            done();
        });
});

describe('POST api/v1/order', () => {
    it('should send a 404 error if car is not found', (done) => {
        chai.request(app)
            .post('/api/v1/order')
            .set('Authorization', myToken)
            .send({
                carId: 39,
                offer: 400000
            })
            .end((error, res) => {
                if (error) done(error);
                expect(res).to.be.an('object');
                expect(res).to.have.status(404);
                expect(res.body).to.have.keys('status', 'message');
                expect(res.body.status).to.deep.equal('error');
                expect(res.body.message).to.deep.equal("Car does not exist");
                done();
            });
    });

    it('should send a 422 error if carId was not specified', (done) => {
        chai.request(app)
            .post('/api/v1/order')
            .set('Authorization', myToken)
            .send({
                offer: 400000
            })
            .end((error, res) => {
                if (error) done(error);
                expect(res).to.be.an('object');
                expect(res).to.have.status(422);
                expect(res.body).to.have.keys('status', 'message');
                expect(res.body.status).to.deep.equal('error');
                expect(res.body.message).to.deep.equal("Car id was not specified");
                done();
            });
    });

    it('should send a 422 error if carId is not a number', (done) => {
        chai.request(app)
            .post('/api/v1/order')
            .set('Authorization', myToken)
            .send({
                carId: 'yue',
                offer: 400000
            })
            .end((error, res) => {
                if (error) done(error);
                expect(res).to.be.an('object');
                expect(res).to.have.status(422);
                expect(res.body).to.have.keys('status', 'message');
                expect(res.body.status).to.deep.equal('error');
                expect(res.body.message).to.deep.equal("Order could not be placed. Ad does not exist");
                done();
            });
    });

    it('should send a 422 error if offer was not specified', (done) => {
        chai.request(app)
            .post('/api/v1/order')
            .set('Authorization', myToken)
            .send({
                carId: 2
            })
            .end((error, res) => {
                if (error) done(error);
                expect(res).to.be.an('object');
                expect(res).to.have.status(422);
                expect(res.body).to.have.keys('status', 'message');
                expect(res.body.status).to.deep.equal('error');
                expect(res.body.message).to.deep.equal("Offer was not specified");
                done();
            });
    });

    it('should send a 422 error if offer is not a number', (done) => {
        chai.request(app)
            .post('/api/v1/order')
            .set('Authorization', myToken)
            .send({
                carId: 2,
                offer: 'jnksmkd'
            })
            .end((error, res) => {
                if (error) done(error);
                expect(res).to.be.an('object');
                expect(res).to.have.status(422);
                expect(res.body).to.have.keys('status', 'message');
                expect(res.body.status).to.deep.equal('error');
                expect(res.body.message).to.deep.equal("Invalid offer");
                done();
            });
    });

    it('should send a 422 error if offer has more than 12 digits', (done) => {
        chai.request(app)
            .post('/api/v1/order')
            .set('Authorization', myToken)
            .send({
                carId: 2,
                offer: 2000000000000000
            })
            .end((error, res) => {
                if (error) done(error);
                expect(res).to.be.an('object');
                expect(res).to.have.status(422);
                expect(res.body).to.have.keys('status', 'message');
                expect(res.body.status).to.deep.equal('error');
                expect(res.body.message).to.deep.equal("Did you mean that?");
                done();
            });
    });

    it('should send a 201 status if everything checks out', (done) => {
        chai.request(app)
            .post('/api/v1/order')
            .set('Authorization', myToken)
            .send({
                carId: 2,
                offer: 3000000
            })
            .end((error, res) => {
                if (error) done(error);
                expect(res).to.be.an('object');
                expect(res).to.have.status(201);
                expect(res.body).to.have.keys('status', 'data');
                expect(res.body.status).to.deep.equal('success');
                expect(res.body.data).to.have.keys('id', 'carId', 'status', 'price', 'offer', 'buyer', 'createdOn');
                done();
            });
    });

    it('should send a 201 status if order was created from form data', (done) => {
        chai.request(app)
            .post('/api/v1/order')
            .set('Authorization', myToken)
            .type('form')
            .send({
                '_method': 'post',
                'carId': 3,
                'offer': 4000000
            })
            .end((error, res) => {
                if (error) done(error);
                expect(res).to.be.an('object');
                expect(res).to.have.status(201);
                expect(res.body).to.have.keys('status', 'data');
                expect(res.body.status).to.deep.equal('success');
                expect(res.body.data).to.have.keys('id', 'carId', 'status', 'price', 'offer', 'buyer', 'createdOn');
                expect(res.body.data.id).to.be.a('number');
                expect(res.body.data.carId).to.be.a('number');
                expect(res.body.data.status).to.be.a('string');
                expect(res.body.data.price).to.be.a('number');
                expect(res.body.data.offer).to.be.a('number');
                expect(res.body.data.buyer).to.be.a('number');
                expect(res.body.data.createdOn).to.be.a('string');
                done();
            });
    });
});
