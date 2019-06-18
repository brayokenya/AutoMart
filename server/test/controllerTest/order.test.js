import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../../app';

const { expect } = chai;

chai.use(chaiHttp);

let myToken;

before((done) => {
    chai.request(app)
        .post('/api/v2/auth/signin')
        .send({
            email: 'ricardokaka@gmail.com',
            password: 'pass'
        })
        .end((err, res) => {
            if (err) done(err);
            myToken = res.body.data.token;
            done();
        });
});

describe('POST api/v2/order', () => {
    it('should send a 404 error if car is not found', (done) => {
        chai.request(app)
            .post('/api/v2/order')
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
            .post('/api/v2/order')
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
            .post('/api/v2/order')
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
            .post('/api/v2/order')
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
            .post('/api/v2/order')
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
            .post('/api/v2/order')
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
            .post('/api/v2/order')
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
                expect(res.body.data.status).to.deep.equal('pending');
                done();
            });
    });

    it('should send a 201 status if order was created from form data', (done) => {
        chai.request(app)
            .post('/api/v2/order')
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
                expect(res.body.data.status).to.deep.equal('pending');
                done();
            });
    });
});

describe('PATCH /api/v2/:orderId/price', () => {
    it('should send a 404 status error if purchase order does not exist', (done) => {
        chai.request(app)
            .patch('/api/v2/order/300/price')
            .set('Authorization', myToken)
            .send({
                newOffer: 4900000
            })
            .end((error, res) => {
                if (error) done(error);
                expect(res).to.be.an('object');
                expect(res).to.have.status(404);
                expect(res.body).to.have.keys('status', 'message');
                expect(res.body.status).to.deep.equal('error');
                expect(res.body.message).to.deep.equal('Purchase order not found');
                done();
            });
    });

    it('should send a 404 status error if order does not belong to user', (done) => {
        chai.request(app)
            .patch('/api/v2/order/3/price')
            .set('Authorization', myToken)
            .send({
                newOffer: 4900000
            })
            .end((error, res) => {
                if (error) done(error);
                expect(res).to.be.an('object');
                expect(res).to.have.status(404);
                expect(res.body).to.have.keys('status', 'message');
                expect(res.body.status).to.deep.equal('error');
                expect(res.body.message).to.deep.equal('Purchase order not found');
                done();
            });
    });

    it('should send a 422 status error if new offer was not provided', (done) => {
        chai.request(app)
            .patch('/api/v2/order/1/price')
            .set('Authorization', myToken)
            .send()
            .end((error, res) => {
                if (error) done(error);
                expect(res).to.be.an('object');
                expect(res).to.have.status(422);
                expect(res.body).to.have.keys('status', 'message');
                expect(res.body.status).to.deep.equal('error');
                expect(res.body.message).to.deep.equal('New offer was not specified');
                done();
            });
    });

    it('should send a 422 status error if new offer is not a number', (done) => {
        chai.request(app)
            .patch('/api/v2/order/1/price')
            .set('Authorization', myToken)
            .send({
                newOffer: 'yens8'
            })
            .end((error, res) => {
                if (error) done(error);
                expect(res).to.be.an('object');
                expect(res).to.have.status(422);
                expect(res.body).to.have.keys('status', 'message');
                expect(res.body.status).to.deep.equal('error');
                expect(res.body.message).to.deep.equal('Invalid input. New offer should be a number');
                done();
            });
    });

    it('should send a 422 status error if new offer is longer than 12 digits', (done) => {
        chai.request(app)
            .patch('/api/v2/order/1/price')
            .set('Authorization', myToken)
            .send({
                newOffer: 700000000000000
            })
            .end((error, res) => {
                if (error) done(error);
                expect(res).to.be.an('object');
                expect(res).to.have.status(422);
                expect(res.body).to.have.keys('status', 'message');
                expect(res.body.status).to.deep.equal('error');
                expect(res.body.message).to.deep.equal('Did you mean that?');
                done();
            });
    });

    it('should send a 200 status error if purchase order was successfully updated', (done) => {
        chai.request(app)
            .patch('/api/v2/order/1/price')
            .set('Authorization', myToken)
            .send({
                newOffer: 3000000
            })
            .end((error, res) => {
                if (error) done(error);
                expect(res).to.be.an('object');
                expect(res).to.have.status(200);
                expect(res.body).to.have.keys('status', 'data');
                expect(res.body.status).to.deep.equal('success');
                expect(res.body.data).to.be.an('object');
                done();
            });
    });

    it('ensure that urlencoded form works the same as application/json data', (done) => {
        chai.request(app)
            .patch('/api/v2/order/1/price')
            .set('Authorization', myToken)
            .type('form')
            .send({
                '_method': 'post',
                'newOffer': 4000000
            })
            .end((error, res) => {
                if (error) done(error);
                expect(res).to.be.an('object');
                expect(res).to.have.status(200);
                expect(res.body).to.have.keys('status', 'data');
                expect(res.body.status).to.deep.equal('success');
                expect(res.body.data).to.be.an('object');
                done();
            });
    });
});
