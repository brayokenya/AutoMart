import fs from 'fs';
import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../../app';

const { expect } = chai;

chai.use(chaiHttp);

let myToken;
let adminToken;

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

describe('POST /api/v2/car', () => {
    it('should return a 422 status if form is not a multipart/form-data', (done) => {
        chai.request(app)
            .post('/api/v2/car')
            .set('Authorization', myToken)
            .type('form')
            .attach('displayImage', fs.readFileSync('./server/test/assets/toyota.jpg'), 'toyota.jpg')
            .field('state', 'used')
            .field('price', 300000)
            .field('manufacturer', 'toyota')
            .field('model', 'corolla')
            .field('bodyType', 'sedan')
            .end((error, res) => {
                if (error) done(error);
                expect(res).to.be.an('object');
                expect(res).to.have.status(422);
                expect(res.body).to.have.keys('status', 'message');
                expect(res.body.status).to.deep.equal('error');
                expect(res.body.message).to.deep.equal('form enctype has to be "multipart/form-data"');
                done();
            });
    });

    it('should return a 422 status if user tries to upload more than one image', (done) => {
        chai.request(app)
            .post('/api/v2/car')
            .type('form')
            .set('Authorization', myToken)
            .set('enctype', 'multipart/form-data')
            .attach('displayImage', fs.readFileSync('./server/test/assets/toyota.jpg'), 'toyota.jpg')
            .attach('displayImage', fs.readFileSync('./server/test/assets/honda.jpg'), 'honda.png')
            .field('state', 'used')
            .field('price', 300000)
            .field('manufacturer', 'toyota')
            .field('model', '2014 corolla')
            .field('bodyType', 'sedan')
            .end((error, res) => {
                if (error) done(error);
                expect(res).to.be.an('object');
                expect(res).to.have.status(422);
                expect(res.body).to.have.keys('status', 'message');
                expect(res.body.status).to.deep.equal('error');
                expect(res.body.message).to.deep.equal('we currently do not support multiple images upload');
                done();
            });
    });

    it('should return a 422 status if user tries to upload an unsupported image type', (done) => {
        chai.request(app)
            .post('/api/v2/car')
            .type('form')
            .set('Authorization', myToken)
            .set('enctype', 'multipart/form-data')
            .attach('displayImage', fs.readFileSync('./server/test/assets/honor-code.pdf'), 'honor-code.pdf')
            .field('state', 'used')
            .field('price', 300000)
            .field('manufacturer', 'toyota')
            .field('model', '2014 corolla')
            .field('bodyType', 'sedan')
            .end((error, res) => {
                if (error) done(error);
                expect(res).to.be.an('object');
                expect(res).to.have.status(422);
                expect(res.body).to.have.keys('status', 'message');
                expect(res.body.status).to.deep.equal('error');
                expect(res.body.message).to.deep.equal('unsupported image type');
                done();
            });
    });

    it('should return a 422 status if user tries to upload an image larger than 5mb', (done) => {
        chai.request(app)
            .post('/api/v2/car')
            .type('form')
            .set('Authorization', myToken)
            .set('enctype', 'multipart/form-data')
            .attach('displayImage', fs.readFileSync('./server/test/assets/large.jpg'), 'large.jpg')
            .field('state', 'used')
            .field('price', 300000)
            .field('manufacturer', 'toyota')
            .field('model', '2014 corolla')
            .field('bodyType', 'sedan')
            .end((error, res) => {
                if (error) done(error);
                expect(res).to.be.an('object');
                expect(res).to.have.status(422);
                expect(res.body).to.have.keys('status', 'message');
                expect(res.body.status).to.deep.equal('error');
                expect(res.body.message).to.deep.equal('image size exceeds 5mb limit');
                done();
            });
    });

    it('should return a 422 error if display image was not attached', (done) => {
        chai.request(app)
            .post('/api/v2/car')
            .type('form')
            .set('Authorization', myToken)
            .set('enctype', 'multipart/form-data')
            .field('state', 'used')
            .field('price', 300000)
            .field('manufacturer', 'toyota')
            .field('model', 'corolla')
            .field('bodyType', 'sedan')
            .end((error, res) => {
                if (error) done(error);
                expect(res).to.be.an('object');
                expect(res).to.have.status(422);
                expect(res.body).to.have.keys('status', 'message');
                expect(res.body.status).to.deep.equal('error');
                expect(res.body.message).to.deep.equal('please upload a display image');
                done();
            });
    });

    it('should return a 422 error if car state is not specified', (done) => {
        chai.request(app)
            .post('/api/v2/car')
            .type('form')
            .set('Authorization', myToken)
            .set('enctype', 'multipart/form-data')
            .attach('displayImage', fs.readFileSync('./server/test/assets/toyota.jpg'), 'toyota.jpg')
            .field('price', 300000)
            .field('manufacturer', 'toyota')
            .field('model', 'corolla')
            .field('bodyType', 'sedan')
            .end((error, res) => {
                if (error) done(error);
                expect(res).to.be.an('object');
                expect(res).to.have.status(422);
                expect(res.body).to.have.keys('status', 'message');
                expect(res.body.status).to.deep.equal('error');
                expect(res.body.message).to.deep.equal('please specify the state of the automobile (new/used)');
                done();
            });
    });

    it('should return a 422 error if car state is neither new nor used', (done) => {
        chai.request(app)
            .post('/api/v2/car')
            .type('form')
            .set('Authorization', myToken)
            .set('enctype', 'multipart/form-data')
            .attach('displayImage', fs.readFileSync('./server/test/assets/toyota.jpg'), 'toyota.jpg')
            .field('state', 'new and used')
            .field('price', 300000)
            .field('manufacturer', 'toyota')
            .field('model', 'corolla')
            .field('bodyType', 'sedan')
            .end((error, res) => {
                if (error) done(error);
                expect(res).to.be.an('object');
                expect(res).to.have.status(422);
                expect(res.body).to.have.keys('status', 'message');
                expect(res.body.status).to.deep.equal('error');
                expect(res.body.message).to.deep.equal('car state can either be "new" or "used"');
                done();
            });
    });

    it('should return a 422 error if price was not specified', (done) => {
        chai.request(app)
            .post('/api/v2/car')
            .set('Authorization', myToken)
            .set('enctype', 'multipart/form-data')
            .type('form')
            .attach('displayImage', fs.readFileSync('./server/test/assets/toyota.jpg'), 'toyota.jpg')
            .field('state', 'new')
            .field('manufacturer', 'toyota')
            .field('model', 'corolla')
            .field('bodyType', 'sedan')
            .end((error, res) => {
                if (error) done(error);
                expect(res).to.be.an('object');
                expect(res).to.have.status(422);
                expect(res.body).to.have.keys('status', 'message');
                expect(res.body.status).to.deep.equal('error');
                expect(res.body.message).to.deep.equal('price was not specified');
                done();
            });
    });

    it('should return a 422 error if price is not a number', (done) => {
        chai.request(app)
            .post('/api/v2/car')
            .type('form')
            .set('Authorization', myToken)
            .set('enctype', 'multipart/form-data')
            .attach('displayImage', fs.readFileSync('./server/test/assets/toyota.jpg'), 'toyota.jpg')
            .field('state', 'new')
            .field('price', '4893y9')
            .field('manufacturer', 'toyota')
            .field('model', 'corolla')
            .field('bodyType', 'sedan')
            .end((error, res) => {
                if (error) done(error);
                expect(res).to.be.an('object');
                expect(res).to.have.status(422);
                expect(res.body).to.have.keys('status', 'message');
                expect(res.body.status).to.deep.equal('error');
                expect(res.body.message).to.deep.equal('invalid price');
                done();
            });
    });

    it('should return a 422 error if price has length greater than 12', (done) => {
        chai.request(app)
            .post('/api/v2/car')
            .type('form')
            .set('Authorization', myToken)
            .set('enctype', 'multipart/form-data')
            .attach('displayImage', fs.readFileSync('./server/test/assets/toyota.jpg'), 'toyota.jpg')
            .field('state', 'new')
            .field('price', 2000000000000000)
            .field('manufacturer', 'toyota')
            .field('model', 'corolla')
            .field('bodyType', 'sedan')
            .end((error, res) => {
                if (error) done(error);
                expect(res).to.be.an('object');
                expect(res).to.have.status(422);
                expect(res.body).to.have.keys('status', 'message');
                expect(res.body.status).to.deep.equal('error');
                expect(res.body.message).to.deep.equal('whoa! that price is quite high');
                done();
            });
    });

    it('should return a 422 error if price has more than two decimal places', (done) => {
        chai.request(app)
            .post('/api/v2/car')
            .type('form')
            .set('Authorization', myToken)
            .set('enctype', 'multipart/form-data')
            .attach('displayImage', fs.readFileSync('./server/test/assets/toyota.jpg'), 'toyota.jpg')
            .field('state', 'new')
            .field('price', 200000.9999)
            .field('manufacturer', 'toyota')
            .field('model', 'corolla')
            .field('bodyType', 'sedan')
            .end((error, res) => {
                if (error) done(error);
                expect(res).to.be.an('object');
                expect(res).to.have.status(422);
                expect(res.body).to.have.keys('status', 'message');
                expect(res.body.status).to.deep.equal('error');
                expect(res.body.message).to.deep.equal('price has more than two decimal places');
                done();
            });
    });

    it('should return a 422 error if maufacturer was not specified', (done) => {
        chai.request(app)
            .post('/api/v2/car')
            .type('form')
            .set('Authorization', myToken)
            .set('enctype', 'multipart/form-data')
            .attach('displayImage', fs.readFileSync('./server/test/assets/toyota.jpg'), 'toyota.jpg')
            .field('state', 'new')
            .field('price', 300000000)
            .field('model', 'corolla')
            .field('bodyType', 'sedan')
            .end((error, res) => {
                if (error) done(error);
                expect(res).to.be.an('object');
                expect(res).to.have.status(422);
                expect(res.body).to.have.keys('status', 'message');
                expect(res.body.status).to.deep.equal('error');
                expect(res.body.message).to.deep.equal('manufacturer was not specified');
                done();
            });
    });

    it('should return a 422 error if maufacturer has a length greater then 30', (done) => {
        chai.request(app)
            .post('/api/v2/car')
            .type('form')
            .set('Authorization', myToken)
            .set('enctype', 'multipart/form-data')
            .attach('displayImage', fs.readFileSync('./server/test/assets/toyota.jpg'), 'toyota.jpg')
            .field('state', 'new')
            .field('price', 300000000)
            .field('manufacturer', 'toyotaaaaaaaaaaaaassddssddsssddssdssdaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa')
            .field('model', 'corolla')
            .field('bodyType', 'sedan')
            .end((error, res) => {
                if (error) done(error);
                expect(res).to.be.an('object');
                expect(res).to.have.status(422);
                expect(res.body).to.have.keys('status', 'message');
                expect(res.body.status).to.deep.equal('error');
                expect(res.body.message).to.deep.equal("manufacturer exceeds the maximum length of 30");
                done();
            });
    });

    it('should return a 422 error if model was not specified', (done) => {
        chai.request(app)
            .post('/api/v2/car')
            .type('form')
            .set('Authorization', myToken)
            .set('enctype', 'multipart/form-data')
            .attach('displayImage', fs.readFileSync('./server/test/assets/toyota.jpg'), 'toyota.jpg')
            .field('state', 'new')
            .field('price', 300000000)
            .field('manufacturer', 'toyota')
            .field('model', '(*gdbsk)')
            .field('bodyType', 'sedan')
            .end((error, res) => {
                if (error) done(error);
                expect(res).to.be.an('object');
                expect(res).to.have.status(422);
                expect(res.body).to.have.keys('status', 'message');
                expect(res.body.status).to.deep.equal('error');
                expect(res.body.message).to.deep.equal('model has invalid characters');
                done();
            });
    });

    it('should return a 422 error if model has invalid characters', (done) => {
        chai.request(app)
            .post('/api/v2/car')
            .type('form')
            .set('Authorization', myToken)
            .set('enctype', 'multipart/form-data')
            .attach('displayImage', fs.readFileSync('./server/test/assets/toyota.jpg'), 'toyota.jpg')
            .field('state', 'new')
            .field('price', 300000000)
            .field('manufacturer', 'toyota')
            .field('bodyType', 'sedan')
            .end((error, res) => {
                if (error) done(error);
                expect(res).to.be.an('object');
                expect(res).to.have.status(422);
                expect(res.body).to.have.keys('status', 'message');
                expect(res.body.status).to.deep.equal('error');
                expect(res.body.message).to.deep.equal('model was not specified');
                done();
            });
    });

    it('should return a 422 error if model has a length greater than 30', (done) => {
        chai.request(app)
            .post('/api/v2/car')
            .type('form')
            .set('Authorization', myToken)
            .set('enctype', 'multipart/form-data')
            .attach('displayImage', fs.readFileSync('./server/test/assets/toyota.jpg'), 'toyota.jpg')
            .field('state', 'new')
            .field('price', 300000000)
            .field('manufacturer', 'toyota')
            .field('model', 'hddjdjfjjdskdjdjjjzdskjdjdfsdhfjsdfhjdfhdjfhdfhskjdaksjdjdhfjdfhjsdkajdkadjdkjdakdjakjak')
            .field('bodyType', 'sedan')
            .end((error, res) => {
                if (error) done(error);
                expect(res).to.be.an('object');
                expect(res).to.have.status(422);
                expect(res.body).to.have.keys('status', 'message');
                expect(res.body.status).to.deep.equal('error');
                expect(res.body.message).to.deep.equal("model exceeds the maximum length of 30");
                done();
            });
    });

    it('should return a 422 error if body type was not specified', (done) => {
        chai.request(app)
            .post('/api/v2/car')
            .type('form')
            .set('Authorization', myToken)
            .set('enctype', 'multipart/form-data')
            .attach('displayImage', fs.readFileSync('./server/test/assets/toyota.jpg'), 'toyota.jpg')
            .field('state', 'new')
            .field('price', 300000000)
            .field('manufacturer', 'toyota')
            .field('model', 'corolla')
            .end((error, res) => {
                if (error) done(error);
                expect(res).to.be.an('object');
                expect(res).to.have.status(422);
                expect(res.body).to.have.keys('status', 'message');
                expect(res.body.status).to.deep.equal('error');
                expect(res.body.message).to.deep.equal('body type was not specified');
                done();
            });
    });

    it('should return a 422 error if body type is not a pure string', (done) => {
        chai.request(app)
            .post('/api/v2/car')
            .type('form')
            .set('Authorization', myToken)
            .set('enctype', 'multipart/form-data')
            .attach('displayImage', fs.readFileSync('./server/test/assets/toyota.jpg'), 'toyota.jpg')
            .field('state', 'new')
            .field('price', 300000000)
            .field('manufacturer', 'toyota')
            .field('model', 'corolla')
            .field('bodyType', '8djjddkmd')
            .end((error, res) => {
                if (error) done(error);
                expect(res).to.be.an('object');
                expect(res).to.have.status(422);
                expect(res.body).to.have.keys('status', 'message');
                expect(res.body.status).to.deep.equal('error');
                expect(res.body.message).to.deep.equal('body type has invalid characters');
                done();
            });
    });

    it('should return a 422 error if body type is longer than 25 characters', (done) => {
        chai.request(app)
            .post('/api/v2/car')
            .type('form')
            .set('Authorization', myToken)
            .set('enctype', 'multipart/form-data')
            .attach('displayImage', fs.readFileSync('./server/test/assets/toyota.jpg'), 'toyota.jpg')
            .field('state', 'new')
            .field('price', 300000000)
            .field('manufacturer', 'toyota')
            .field('model', 'corolla')
            .field('bodyType', 'mmmjdjdjdkskdjfhndjjskndddhhdhddjdjdhdhjdkshjdksshdjdkjsdhdhndnjsdj')
            .end((error, res) => {
                if (error) done(error);
                expect(res).to.be.an('object');
                expect(res).to.have.status(422);
                expect(res.body).to.have.keys('status', 'message');
                expect(res.body.status).to.deep.equal('error');
                expect(res.body.message).to.deep.equal('body type exceeds the maximum length of 25');
                done();
            });
    });

    it('should return a 201 status if everything checks out', (done) => {
        chai.request(app)
            .post('/api/v2/car')
            .type('form')
            .set('Authorization', myToken)
            .set('enctype', 'multipart/form-data')
            .attach('displayImage', fs.readFileSync('./server/test/assets/toyota.jpg'), 'toyota.jpg')
            .field('state', 'used')
            .field('price', 300000)
            .field('manufacturer', 'toyota')
            .field('model', 'corolla')
            .field('bodyType', 'sedan')
            .end((error, res) => {
                if (error) done(error);
                expect(res).to.be.an('object');
                expect(res).to.have.status(201);
                expect(res.body).to.have.keys('status', 'data');
                expect(res.body.status).to.deep.equal('success');
                expect(res.body.data).to.be.an('object');
                expect(res.body.data.status).to.deep.equal('available');
                done();
            });
    });
});

describe('PATCH /api/v2/car/:carId/status', () => {
    it('should return a 404 error if car does not exist', (done) => {
        chai.request(app)
            .patch('/api/v2/car/300000000/status')
            .set('Authorization', myToken)
            .end((error, res) => {
                if (error) done(error);
                expect(res).to.be.an('object');
                expect(res).to.have.status(404);
                expect(res.body).to.have.keys('status', 'message');
                expect(res.body.status).to.deep.equal('error');
                expect(res.body.message).to.deep.equal('car not found');
                done();
            });
    });

    it('should return a 404 error if user tries to update a car that is not his', (done) => {
        chai.request(app)
            .patch('/api/v2/car/1/status')
            .set('Authorization', myToken)
            .end((error, res) => {
                if (error) done(error);
                expect(res).to.be.an('object');
                expect(res).to.have.status(404);
                expect(res.body).to.have.keys('status', 'message');
                expect(res.body.status).to.deep.equal('error');
                expect(res.body.message).to.deep.equal('car not found');
                done();
            });
    });

    it('should return a 422 error if car id is not an integer', (done) => {
        chai.request(app)
            .patch('/api/v2/car/notcar/status')
            .set('Authorization', myToken)
            .end((error, res) => {
                if (error) done(error);
                expect(res).to.be.an('object');
                expect(res).to.have.status(422);
                expect(res.body).to.have.keys('status', 'message');
                expect(res.body.status).to.deep.equal('error');
                expect(res.body.message).to.deep.equal('invalid car id');
                done();
            });
    });

    it('should return a 200 status if car status was successfully updated', (done) => {
        chai.request(app)
            .patch('/api/v2/car/2/status')
            .set('Authorization', myToken)
            .end((error, res) => {
                if (error) done(error);
                expect(res).to.be.an('object');
                expect(res).to.have.status(200);
                expect(res.body).to.have.keys('status', 'data');
                expect(res.body.status).to.deep.equal('success');
                expect(res.body.data.status).to.deep.equal('sold');
                done();
            });
    });
});


describe('PATCH/api/v2/car/:carId/price', () => {
    it('should return a 404 status if car is not found', (done) => {
        chai.request(app)
            .patch('/api/v2/car/400/price')
            .set('Authorization', myToken)
            .send({
                newPrice: 4000000
            })
            .end((error, res) => {
                if (error) return done(error);
                expect(res).to.be.an('object');
                expect(res).to.have.status(404);
                expect(res.body).to.have.keys('status', 'message');
                expect(res.body.status).to.deep.equal('error');
                expect(res.body.message).to.deep.equal('car not found');
                done();
            });
    });

    it('should return a 422 status if carId is not a valid integer', (done) => {
        chai.request(app)
            .patch('/api/v2/car/urusnsjd/price')
            .set('Authorization', myToken)
            .send({
                newPrice: 4000000
            })
            .end((error, res) => {
                if (error) return done(error);
                expect(res).to.be.an('object');
                expect(res).to.have.status(422);
                expect(res.body).to.have.keys('status', 'message');
                expect(res.body.status).to.deep.equal('error');
                expect(res.body.message).to.deep.equal('invalid car id');
                done();
            });
    });

    it('should return a 404 error if car does not belong to user', (done) => {
        chai.request(app)
            .patch('/api/v2/car/6/price')
            .set('Authorization', myToken)
            .send({
                newPrice: 4000000
            })
            .end((error, res) => {
                if (error) return done(error);
                expect(res).to.be.an('object');
                expect(res).to.have.status(404);
                expect(res.body).to.have.keys('status', 'message');
                expect(res.body.status).to.deep.equal('error');
                expect(res.body.message).to.deep.equal('car not found');
                done();
            });
    });

    it('should return a 422 error if new price was not provided', (done) => {
        chai.request(app)
            .patch('/api/v2/car/5/price')
            .set('Authorization', myToken)
            .end((error, res) => {
                if (error) return done(error);
                expect(res).to.be.an('object');
                expect(res).to.have.status(422);
                expect(res.body).to.have.keys('status', 'message');
                expect(res.body.status).to.deep.equal('error');
                expect(res.body.message).to.deep.equal('new price was not specified');
                done();
            });
    });

    it('should return a 422 error if price is not an integer', (done) => {
        chai.request(app)
            .patch('/api/v2/car/5/price')
            .set('Authorization', myToken)
            .send({
                newPrice: 'hdhdhd'
            })
            .end((error, res) => {
                if (error) return done(error);
                expect(res).to.be.an('object');
                expect(res).to.have.status(422);
                expect(res.body).to.have.keys('status', 'message');
                expect(res.body.status).to.deep.equal('error');
                expect(res.body.message).to.deep.equal('invalid new price');
                done();
            });
    });

    it('should return a 422 error if price has length greater than 12', (done) => {
        chai.request(app)
            .patch('/api/v2/car/5/price')
            .set('Authorization', myToken)
            .send({
                newPrice: 9000000000000000
            })
            .end((error, res) => {
                if (error) return done(error);
                expect(res).to.be.an('object');
                expect(res).to.have.status(422);
                expect(res.body).to.have.keys('status', 'message');
                expect(res.body.status).to.deep.equal('error');
                expect(res.body.message).to.deep.equal('whoa! that new price is quite high');
                done();
            });
    });

    it('should return a 200 status if price was successfully updated', (done) => {
        chai.request(app)
            .patch('/api/v2/car/5/price')
            .set('Authorization', myToken)
            .send({
                newPrice: 4000000
            })
            .end((error, res) => {
                if (error) done(error);
                expect(res).to.be.an('object');
                expect(res).to.have.status(200);
                expect(res.body).to.have.keys('status', 'data');
                expect(res.body.status).to.deep.equal('success');
                expect(res.body.data.price).to.deep.equal(4000000);
                done();
            });
    });
});

describe('GET /api/v2/car/:carId', () => {
    it('Should return a 404 status if car does not exist', (done) => {
        chai.request(app)
            .get('/api/v2/car/33333')
            .set('Authorization', myToken)
            .end((error, res) => {
                if (error) done(error);
                expect(res).to.be.an('object');
                expect(res).to.have.status(404);
                expect(res.body).to.have.keys('status', 'message');
                expect(res.body.status).to.deep.equal('error');
                expect(res.body.message).to.deep.equal('car not found');
                done();
            });
    });

    it('Should return a 422 status if carId is not an integer', (done) => {
        chai.request(app)
            .get('/api/v2/car/string')
            .set('Authorization', myToken)
            .end((error, res) => {
                if (error) done(error);
                expect(res).to.be.an('object');
                expect(res).to.have.status(422);
                expect(res.body).to.have.keys('status', 'message');
                expect(res.body.status).to.deep.equal('error');
                expect(res.body.message).to.deep.equal('invalid car id');
                done();
            });
    });

    it('Should return a 200 status without an authorization token', (done) => {
        chai.request(app)
            .get('/api/v2/car/4')
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

    it('Should return a 200 status when an authorization token is provided', (done) => {
        chai.request(app)
            .get('/api/v2/car/4')
            .set('Authorization', myToken)
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


describe('GET /api/v2/car?status=available', () => {
    it('should return a 403 error if status query is not available', (done) => {
        chai.request(app)
            .get('/api/v2/car')
            .query({ status: 'notavailable' })
            .set('Authorization', myToken)
            .end((error, res) => {
                if (error) done(error);
                expect(res).to.be.an('object');
                expect(res).to.have.status(403);
                expect(res.body).to.have.keys('status', 'message');
                expect(res.body.status).to.deep.equal('error');
                expect(res.body.message).to.deep.equal('you do not have access to this resource');
                done();
            });
    });

    it('should return available cars when authorization token is not provided', (done) => {
        chai.request(app)
            .get('/api/v2/car')
            .query({ status: 'available' })
            .end((error, res) => {
                if (error) done(error);
                expect(res).to.be.an('object');
                expect(res).to.have.status(200);
                expect(res.body).to.have.keys('status', 'data');
                expect(res.body.status).to.deep.equal('success');
                expect(res.body.data).to.be.an('array');
                expect(res.body.data[0]).to.be.an('object');
                done();
            });
    });

    it('should return available cars when authorization token is provided', (done) => {
        chai.request(app)
            .get('/api/v2/car')
            .query({ status: 'available' })
            .set('Authorization', myToken)
            .end((error, res) => {
                if (error) done(error);
                expect(res).to.be.an('object');
                expect(res).to.have.status(200);
                expect(res.body).to.have.keys('status', 'data');
                expect(res.body.status).to.deep.equal('success');
                expect(res.body.data).to.be.an('array');
                expect(res.body.data[0]).to.be.an('object');
                done();
            });
    });
});

describe('(Admin) GET /api/v2/car', () => {

    before((done) => {
        chai.request(app)
            .post('/api/v2/auth/signin')
            .send({
                email: 'johndoe@gmail.com',
                password: 'pass'
            })
            .end((error, res) => {
                if (error) done(error);
                adminToken = res.body.data.token;
                done();
            });
    });


    it('should return a list of all cars, whether sold or not', (done) => {
        chai.request(app)
            .get('/api/v2/car')
            .set('Authorization', adminToken)
            .end((error, res) => {
                if (error) done(error);
                expect(res).to.be.an('object');
                expect(res).to.have.status(200);
                expect(res.body.status).to.deep.equal('success');
                expect(res.body.data.find(datum => datum.status === 'sold'))
                    .to.be.an('object');
                expect(res.body.data.find(datum => datum.status === 'available'))
                    .to.be.an('object');
                done();
            });
    });
});

describe('DELETE /api/v2/car/:carId', () => {

    it('should return a 403 status if user is not an admin', (done) => {
        chai.request(app)
            .delete('/api/v2/car/3')
            .set('Authorization', myToken)
            .end((error, res) => {
                if (error) done(error);
                expect(res).to.be.an('object');
                expect(res).to.have.status(403);
                expect(res.body.status).to.deep.equal('error');
                expect(res.body.message).to.deep.equal('you do not have access to this resource');
                done();
            });
    });

    it('should return a 404 status if car does not exist', (done) => {
        chai.request(app)
            .delete('/api/v2/car/39999')
            .set('Authorization', adminToken)
            .end((error, res) => {
                if (error) done(error);
                expect(res).to.be.an('object');
                expect(res).to.have.status(404);
                expect(res.body.status).to.deep.equal('error');
                expect(res.body.message).to.deep.equal('car not found');
                done();
            });
    });

    it('should return a 422 status if carId is not an integer', (done) => {
        chai.request(app)
            .delete('/api/v2/car/string')
            .set('Authorization', adminToken)
            .end((error, res) => {
                if (error) done(error);
                expect(res).to.be.an('object');
                expect(res).to.have.status(422);
                expect(res.body.status).to.deep.equal('error');
                expect(res.body.message).to.deep.equal('invalid car id');
                done();
            });
    });

    it('should return a 200 status if car was successfully deleted', (done) => {
        chai.request(app)
            .delete('/api/v2/car/6')
            .set('Authorization', adminToken)
            .end((error, res) => {
                if (error) done(error);
                expect(res).to.be.an('object');
                expect(res).to.have.status(200);
                expect(res.body.status).to.deep.equal('success');
                expect(res.body.message).to.deep.equal('car ad was successfully deleted');
                done();
            });
    });
});