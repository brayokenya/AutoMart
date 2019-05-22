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
        .post('/api/v1/auth/signin')
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

describe('POST /api/v1/car', () => {
    it('should return a 422 status if form is not a multipart/form-data', (done) => {
        chai.request(app)
            .post('/api/v1/car')
            .set('Authorization', myToken)
            .type('form')
            .attach('displayImage', fs.readFileSync('./server/test/assets/toyota.jpg'), 'toyota.png')
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
                expect(res.body.message).to.deep.equal('Form enctype has to be "multipart/form-data"');
                done();
            });
    });

    it('should return a 422 status if user tries to upload more than one image', (done) => {
        chai.request(app)
            .post('/api/v1/car')
            .type('form')
            .set('Authorization', myToken)
            .set('enctype', 'multipart/form-data')
            .attach('displayImage', fs.readFileSync('./server/test/assets/toyota.jpg'), 'toyota.png')
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
                expect(res.body.message).to.deep.equal('We currently do not support multiple images upload');
                done();
            });
    });

    it('should return a 422 status if user tries to upload an unsupported image type', (done) => {
        chai.request(app)
            .post('/api/v1/car')
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
                expect(res.body.message).to.deep.equal('Unsupported image type');
                done();
            });
    });

    it('should return a 422 status if user tries to upload an image larger than 5mb', (done) => {
        chai.request(app)
            .post('/api/v1/car')
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
                expect(res.body.message).to.deep.equal('Image size exceeds 5mb limit');
                done();
            });
    });

    it('should return a 422 error if display image was not attached', (done) => {
        chai.request(app)
            .post('/api/v1/car')
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
                expect(res.body.message).to.deep.equal('Please upload a display image');
                done();
            });
    });

    it('should return a 422 error if car state is not specified', (done) => {
        chai.request(app)
            .post('/api/v1/car')
            .type('form')
            .set('Authorization', myToken)
            .set('enctype', 'multipart/form-data')
            .attach('displayImage', fs.readFileSync('./server/test/assets/toyota.jpg'), 'toyota.png')
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
                expect(res.body.message).to.deep.equal('Please specify the state of the automobile (new/used)');
                done();
            });
    });

    it('should return a 422 error if car state is neither new nor used', (done) => {
        chai.request(app)
            .post('/api/v1/car')
            .type('form')
            .set('Authorization', myToken)
            .set('enctype', 'multipart/form-data')
            .attach('displayImage', fs.readFileSync('./server/test/assets/toyota.jpg'), 'toyota.png')
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
                expect(res.body.message).to.deep.equal('Car state can either be "new" or "used"');
                done();
            });
    });

    it('should return a 422 error if price was not specified', (done) => {
        chai.request(app)
            .post('/api/v1/car')
            .set('Authorization', myToken)
            .set('enctype', 'multipart/form-data')
            .type('form')
            .attach('displayImage', fs.readFileSync('./server/test/assets/toyota.jpg'), 'toyota.png')
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
                expect(res.body.message).to.deep.equal('Price was not specified');
                done();
            });
    });

    it('should return a 422 error if price is not a number', (done) => {
        chai.request(app)
            .post('/api/v1/car')
            .type('form')
            .set('Authorization', myToken)
            .set('enctype', 'multipart/form-data')
            .attach('displayImage', fs.readFileSync('./server/test/assets/toyota.jpg'), 'toyota.png')
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
                expect(res.body.message).to.deep.equal('Invalid price');
                done();
            });
    });

    it('should return a 422 error if price has length greater than 12', (done) => {
        chai.request(app)
            .post('/api/v1/car')
            .type('form')
            .set('Authorization', myToken)
            .set('enctype', 'multipart/form-data')
            .attach('displayImage', fs.readFileSync('./server/test/assets/toyota.jpg'), 'toyota.png')
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
                expect(res.body.message).to.deep.equal('Wow! That is expensive');
                done();
            });
    });

    it('should return a 422 error if maufacturer was not specified', (done) => {
        chai.request(app)
            .post('/api/v1/car')
            .type('form')
            .set('Authorization', myToken)
            .set('enctype', 'multipart/form-data')
            .attach('displayImage', fs.readFileSync('./server/test/assets/toyota.jpg'), 'toyota.png')
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
                expect(res.body.message).to.deep.equal('Manufacturer was not specified');
                done();
            });
    });

    it('should return a 422 error if maufacturer has a length greater then 30', (done) => {
        chai.request(app)
            .post('/api/v1/car')
            .type('form')
            .set('Authorization', myToken)
            .set('enctype', 'multipart/form-data')
            .attach('displayImage', fs.readFileSync('./server/test/assets/toyota.jpg'), 'toyota.png')
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
                expect(res.body.message).to.deep.equal("Manufacturer's name exceeds the maximum length of 30");
                done();
            });
    });

    it('should return a 422 error if model was not specified', (done) => {
        chai.request(app)
            .post('/api/v1/car')
            .type('form')
            .set('Authorization', myToken)
            .set('enctype', 'multipart/form-data')
            .attach('displayImage', fs.readFileSync('./server/test/assets/toyota.jpg'), 'toyota.png')
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
                expect(res.body.message).to.deep.equal('Model was not specified');
                done();
            });
    });

    it('should return a 422 error if model has a length greater than 30', (done) => {
        chai.request(app)
            .post('/api/v1/car')
            .type('form')
            .set('Authorization', myToken)
            .set('enctype', 'multipart/form-data')
            .attach('displayImage', fs.readFileSync('./server/test/assets/toyota.jpg'), 'toyota.png')
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
                expect(res.body.message).to.deep.equal("Model's name exceeds the maximum length of 30");
                done();
            });
    });

    it('should return a 422 error if body type was not specified', (done) => {
        chai.request(app)
            .post('/api/v1/car')
            .type('form')
            .set('Authorization', myToken)
            .set('enctype', 'multipart/form-data')
            .attach('displayImage', fs.readFileSync('./server/test/assets/toyota.jpg'), 'toyota.png')
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
                expect(res.body.message).to.deep.equal('Body type was not specified');
                done();
            });
    });

    it('car status should default to "available"', (done) => {
        chai.request(app)
            .post('/api/v1/car')
            .type('form')
            .set('Authorization', myToken)
            .set('enctype', 'multipart/form-data')
            .attach('displayImage', fs.readFileSync('./server/test/assets/toyota.jpg'), 'toyota.png')
            .field('state', 'new')
            .field('price', 300000000)
            .field('manufacturer', 'toyota')
            .field('model', 'corolla')
            .field('bodyType', 'sedan')
            .end((error, res) => {
                if (error) done(error);
                expect(res).to.be.an('object');
                expect(res).to.have.status(201);
                expect(res.body).to.have.keys('status', 'data');
                expect(res.body.status).to.deep.equal('success');
                expect(res.body.data.status).to.deep.equal('available');
                done();
            });
    });

    it('should return a 422 error if body type is not a pure string', (done) => {
        chai.request(app)
            .post('/api/v1/car')
            .type('form')
            .set('Authorization', myToken)
            .set('enctype', 'multipart/form-data')
            .attach('displayImage', fs.readFileSync('./server/test/assets/toyota.jpg'), 'toyota.png')
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
                expect(res.body.message).to.deep.equal('Body type has invalid characters');
                done();
            });
    });

    it('should return a 422 error if body type is longer than 20 characters', (done) => {
        chai.request(app)
            .post('/api/v1/car')
            .type('form')
            .set('Authorization', myToken)
            .set('enctype', 'multipart/form-data')
            .attach('displayImage', fs.readFileSync('./server/test/assets/toyota.jpg'), 'toyota.png')
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
                expect(res.body.message).to.deep.equal('Body type exceeds the maximum length of 20');
                done();
            });
    });

    it('should return a 201 status if everything but status or date is specified', (done) => {
        chai.request(app)
            .post('/api/v1/car')
            .type('form')
            .set('Authorization', myToken)
            .set('enctype', 'multipart/form-data')
            .attach('displayImage', fs.readFileSync('./server/test/assets/toyota.jpg'), 'toyota.png')
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
                expect(res.body.data).to.have
                    .keys('id', 'manufacturer', 'price', 'state', 'model', 'bodyType', 'owner', 'status', 'imageUrl', 'createdOn');
                done();
            });
    });

    it('should return a 201 status if everything checks out', (done) => {
        chai.request(app)
            .post('/api/v1/car')
            .type('form')
            .set('Authorization', myToken)
            .set('enctype', 'multipart/form-data')
            .attach('displayImage', fs.readFileSync('./server/test/assets/toyota.jpg'), 'toyota.png')
            .field('state', 'used')
            .field('price', 300000)
            .field('manufacturer', 'toyota')
            .field('model', 'corolla')
            .field('bodyType', 'sedan')
            .field('status', 'sold')
            .field('createdOn', '20-07-2019')
            .end((error, res) => {
                if (error) done(error);
                expect(res).to.be.an('object');
                expect(res).to.have.status(201);
                expect(res.body).to.have.keys('status', 'data');
                expect(res.body.status).to.deep.equal('success');
                expect(res.body.data).to.have
                    .keys('id', 'manufacturer', 'price', 'state', 'model', 'bodyType', 'owner', 'status', 'imageUrl', 'createdOn');
                expect(res.body.data.status).to.deep.equal('sold');
                done();
            });
    });

});

describe('PATCH /api/v1/car/:carId/status', () => {
    it('should return a 404 error if car does not exist', (done) => {
        chai.request(app)
            .patch('/api/v1/car/300000000/status')
            .set('Authorization', myToken)
            .end((error, res) => {
                if (error) done(error);
                expect(res).to.be.an('object');
                expect(res).to.have.status(404);
                expect(res.body).to.have.keys('status', 'message');
                expect(res.body.status).to.deep.equal('error');
                expect(res.body.message).to.deep.equal('Car not found');
                done();
            });
    });

    it('should return a 404 error if user tries to update a car that is not his', (done) => {
        chai.request(app)
            .patch('/api/v1/car/1/status')
            .set('Authorization', myToken)
            .end((error, res) => {
                if (error) done(error);
                expect(res).to.be.an('object');
                expect(res).to.have.status(404);
                expect(res.body).to.have.keys('status', 'message');
                expect(res.body.status).to.deep.equal('error');
                expect(res.body.message).to.deep.equal('Car not found');
                done();
            });
    });

    it('should return a 404 error if car id is not an integer', (done) => {
        chai.request(app)
            .patch('/api/v1/car/notcar/status')
            .set('Authorization', myToken)
            .end((error, res) => {
                if (error) done(error);
                expect(res).to.be.an('object');
                expect(res).to.have.status(404);
                expect(res.body).to.have.keys('status', 'message');
                expect(res.body.status).to.deep.equal('error');
                expect(res.body.message).to.deep.equal('Car not found');
                done();
            });
    });

    it('should return a 200 status if car status was successfully updated', (done) => {
        chai.request(app)
            .patch('/api/v1/car/2/status')
            .set('Authorization', myToken)
            .end((error, res) => {
                if (error) done(error);
                expect(res).to.be.an('object');
                expect(res).to.have.status(200);
                expect(res.body).to.have.keys('status', 'data');
                expect(res.body.status).to.deep.equal('success');
                expect(res.body.data).to.have
                    .keys('id', 'owner', 'state', 'status', 'price', 'manufacturer', 'model', 'bodyType', 'imageUrl', 'createdOn');
                expect(res.body.data.status).to.deep.equal('sold');
                done();
            });
    });
});

describe('PATCH/api/v1/car/:carId/price', () => {
    it('should return a 404 status if car is not found', (done) => {
        chai.request(app)
            .patch('/api/v1/car/400/price')
            .set('Authorization', myToken)
            .send({
                price: 4000000
            })
            .end((error, res) => {
                if (error) return done(error);
                expect(res).to.be.an('object');
                expect(res).to.have.status(404);
                expect(res.body).to.have.keys('status', 'message');
                expect(res.body.status).to.deep.equal('error');
                expect(res.body.message).to.deep.equal('Car not found');
                done();
            });
    });

    it('should return a 404 status if carId is not a valid integer', (done) => {
        chai.request(app)
            .patch('/api/v1/car/urusnsjd/price')
            .set('Authorization', myToken)
            .send({
                price: 4000000
            })
            .end((error, res) => {
                if (error) return done(error);
                expect(res).to.be.an('object');
                expect(res).to.have.status(404);
                expect(res.body).to.have.keys('status', 'message');
                expect(res.body.status).to.deep.equal('error');
                expect(res.body.message).to.deep.equal('Car not found');
                done();
            });
    });

    it('should return a 404 error if car does not belong to user', (done) => {
        chai.request(app)
            .patch('/api/v1/car/6/price')
            .set('Authorization', myToken)
            .send({
                price: 4000000
            })
            .end((error, res) => {
                if (error) return done(error);
                expect(res).to.be.an('object');
                expect(res).to.have.status(404);
                expect(res.body).to.have.keys('status', 'message');
                expect(res.body.status).to.deep.equal('error');
                expect(res.body.message).to.deep.equal('Car not found');
                done();
            });
    });

    it('should return a 422 error if price was not provided', (done) => {
        chai.request(app)
            .patch('/api/v1/car/5/price')
            .set('Authorization', myToken)
            .end((error, res) => {
                if (error) return done(error);
                expect(res).to.be.an('object');
                expect(res).to.have.status(422);
                expect(res.body).to.have.keys('status', 'message');
                expect(res.body.status).to.deep.equal('error');
                expect(res.body.message).to.deep.equal('Price was not specified');
                done();
            });
    });

    it('should return a 422 error if price is not an integer', (done) => {
        chai.request(app)
            .patch('/api/v1/car/5/price')
            .set('Authorization', myToken)
            .send({
                price: 'hdhdhd'
            })
            .end((error, res) => {
                if (error) return done(error);
                expect(res).to.be.an('object');
                expect(res).to.have.status(422);
                expect(res.body).to.have.keys('status', 'message');
                expect(res.body.status).to.deep.equal('error');
                expect(res.body.message).to.deep.equal('Invalid price');
                done();
            });
    });

    it('should return a 422 error if price has length greater than 12', (done) => {
        chai.request(app)
            .patch('/api/v1/car/5/price')
            .set('Authorization', myToken)
            .send({
                price: 9000000000000000
            })
            .end((error, res) => {
                if (error) return done(error);
                expect(res).to.be.an('object');
                expect(res).to.have.status(422);
                expect(res.body).to.have.keys('status', 'message');
                expect(res.body.status).to.deep.equal('error');
                expect(res.body.message).to.deep.equal('Wow! That is expensive');
                done();
            });
    });

    it('should return a 200 status if price was successfully updated', (done) => {
        chai.request(app)
            .patch('/api/v1/car/5/price')
            .set('Authorization', myToken)
            .send({
                price: 4000000
            })
            .end((error, res) => {
                if (error) done(error);
                expect(res).to.be.an('object');
                expect(res).to.have.status(200);
                expect(res.body).to.have.keys('status', 'data');
                expect(res.body.status).to.deep.equal('success');
                expect(res.body.data).to.have
                    .keys('id', 'owner', 'state', 'status', 'price', 'manufacturer', 'model', 'bodyType', 'imageUrl', 'createdOn');
                expect(res.body.data.price).to.deep.equal(4000000);
                done();
            });
    });
});

describe('GET /api/v1/car/:carId', () => {
    it('Should return a 404 status if car does not exist', (done) => {
        chai.request(app)
            .get('/api/v1/car/33333')
            .set('Authorization', myToken)
            .end((error, res) => {
                if (error) done(error);
                expect(res).to.be.an('object');
                expect(res).to.have.status(404);
                expect(res.body).to.have.keys('status', 'message');
                expect(res.body.status).to.deep.equal('error');
                expect(res.body.message).to.deep.equal('Car not found');
                done();
            });
    });

    it('Should return a 404 status if carId is not an integer', (done) => {
        chai.request(app)
            .get('/api/v1/car/string')
            .set('Authorization', myToken)
            .end((error, res) => {
                if (error) done(error);
                expect(res).to.be.an('object');
                expect(res).to.have.status(404);
                expect(res.body).to.have.keys('status', 'message');
                expect(res.body.status).to.deep.equal('error');
                expect(res.body.message).to.deep.equal('Car not found');
                done();
            });
    });

    it('Should return a 200 status without an authorization token', (done) => {
        chai.request(app)
            .get('/api/v1/car/4')
            .end((error, res) => {
                if (error) done(error);
                expect(res).to.be.an('object');
                expect(res).to.have.status(200);
                expect(res.body).to.have.keys('status', 'data');
                expect(res.body.status).to.deep.equal('success');
                expect(res.body.data).to.have
                    .keys('id', 'owner', 'state', 'status', 'price', 'manufacturer', 'model', 'bodyType', 'imageUrl', 'createdOn');
                done();
            });
    });

    it('Should return a 200 status when an authorization token is provided', (done) => {
        chai.request(app)
            .get('/api/v1/car/4')
            .set('Authorization', myToken)
            .end((error, res) => {
                if (error) done(error);
                expect(res).to.be.an('object');
                expect(res).to.have.status(200);
                expect(res.body).to.have.keys('status', 'data');
                expect(res.body.status).to.deep.equal('success');
                expect(res.body.data).to.have
                    .keys('id', 'owner', 'state', 'status', 'price', 'manufacturer', 'model', 'bodyType', 'imageUrl', 'createdOn');
                done();
            });
    });
});

describe('GET /api/v1/car?status=available', () => {
    it('should return a 404 error if status query is not available', (done) => {
        chai.request(app)
            .get('/api/v1/car')
            .query({ status: 'notavailable' })
            .set('Authorization', myToken)
            .end((error, res) => {
                if (error) done(error);
                expect(res).to.be.an('object');
                expect(res).to.have.status(404);
                expect(res.body).to.have.keys('status', 'message');
                expect(res.body.status).to.deep.equal('error');
                expect(res.body.message).to.deep.equal('Cars not found');
                done();
            });
    });

    it('should return available cars when authorization token is not provided', (done) => {
        chai.request(app)
            .get('/api/v1/car')
            .query({ status: 'available' })
            .end((error, res) => {
                if (error) done(error);
                expect(res).to.be.an('object');
                expect(res).to.have.status(200);
                expect(res.body).to.have.keys('status', 'data');
                expect(res.body.status).to.deep.equal('success');
                expect(res.body.data).to.be.an('array');
                expect(res.body.data[0]).to.have
                    .keys('id', 'owner', 'state', 'status', 'price', 'manufacturer', 'model', 'bodyType', 'imageUrl', 'createdOn');
                done();
            });
    });

    it('should return available cars when authorization token is provided', (done) => {
        chai.request(app)
            .get('/api/v1/car')
            .query({ status: 'available' })
            .set('Authorization', myToken)
            .end((error, res) => {
                if (error) done(error);
                expect(res).to.be.an('object');
                expect(res).to.have.status(200);
                expect(res.body).to.have.keys('status', 'data');
                expect(res.body.status).to.deep.equal('success');
                expect(res.body.data).to.be.an('array');
                expect(res.body.data[0]).to.have
                    .keys('id', 'owner', 'state', 'status', 'price', 'manufacturer', 'model', 'bodyType', 'imageUrl', 'createdOn');
                done();
            });
    });
});

describe('GET /api/v1/car?status=available&min_price=XXXvalue&max_price=XXXvalue', () => {
    it('should return a 422 status if min price is not a number', (done) => {
        chai.request(app)
            .get('/api/v1/car')
            .query({
                status: 'available',
                min_price: 'string',
                max_price: 3000000
            })
            .set('Authorization', myToken)
            .end((error, res) => {
                if (error) done(error);
                expect(res).to.be.an('object');
                expect(res).to.have.status(422);
                expect(res.body.status).to.deep.equal('error');
                expect(res.body.message).to.deep.equal('Invalid minimum price');
                done();
            });
    });

    it('should return a 422 status if max price is not a number', (done) => {
        chai.request(app)
            .get('/api/v1/car')
            .query({
                status: 'available',
                min_price: 3000000,
                max_price: 'another string'
            })
            .set('Authorization', myToken)
            .end((error, res) => {
                if (error) done(error);
                expect(res).to.be.an('object');
                expect(res).to.have.status(422);
                expect(res.body.status).to.deep.equal('error');
                expect(res.body.message).to.deep.equal('Invalid maximum price');
                done();
            });
    });

    it('should set minimum pice to zero if not defined', (done) => {
        chai.request(app)
            .get('/api/v1/car')
            .query({
                status: 'available',
                max_price: 30000000
            })
            .set('Authorization', myToken)
            .end((error, res) => {
                if (error) done(error);
                expect(res).to.be.an('object');
                expect(res).to.have.status(200);
                expect(res.body).to.have.keys('status', 'data');
                expect(res.body.status).to.deep.equal('success');
                expect(res.body.data[0]).to.have
                    .keys('id', 'owner', 'state', 'status', 'price', 'manufacturer', 'model', 'bodyType', 'imageUrl', 'createdOn');
                done();
            });
    });

    it('should set maximum price to Infinity if it not defined', (done) => {
        chai.request(app)
            .get('/api/v1/car')
            .query({
                status: 'available',
                min_price: 1000000
            })
            .set('Authorization', myToken)
            .end((error, res) => {
                if (error) done(error);
                expect(res).to.be.an('object');
                expect(res).to.have.status(200);
                expect(res.body).to.have.keys('status', 'data');
                expect(res.body.status).to.deep.equal('success');
                expect(res.body.data[0]).to.have
                    .keys('id', 'owner', 'state', 'status', 'price', 'manufacturer', 'model', 'bodyType', 'imageUrl', 'createdOn');
                done();
            });
    });

    it('should return a 403 status if status is not defined and user is not an admin', (done) => {
        chai.request(app)
            .get('/api/v1/car')
            .query({
                min_price: 1000000,
                max_price: 30000000
            })
            .set('Authorization', myToken)
            .end((error, res) => {
                if (error) done(error);
                expect(res).to.be.an('object');
                expect(res).to.have.status(403);
                expect(res.body).to.have.keys('status', 'message');
                expect(res.body.status).to.deep.equal('error');
                expect(res.body.message).to.deep.equal('You do not have access to this resource');
                done();
            });
    });

    it('should return a 422 status if status is not equal to available', (done) => {
        chai.request(app)
            .get('/api/v1/car')
            .query({
                status: 'notavailable',
                min_price: 1000000,
                max_price: 30000000
            })
            .set('Authorization', myToken)
            .end((error, res) => {
                if (error) done(error);
                expect(res).to.be.an('object');
                expect(res).to.have.status(404);
                expect(res.body).to.have.keys('status', 'message');
                expect(res.body.status).to.deep.equal('error');
                expect(res.body.message).to.deep.equal('Cars not found');
                done();
            });
    });

    it('should return a 403 status no query parameter is supplied and user is not an admin', (done) => {
        chai.request(app)
            .get('/api/v1/car')
            .set('Authorization', myToken)
            .end((error, res) => {
                if (error) done(error);
                expect(res).to.be.an('object');
                expect(res).to.have.status(403);
                expect(res.body).to.have.keys('status', 'message');
                expect(res.body.status).to.deep.equal('error');
                expect(res.body.message).to.deep.equal('You do not have access to this resource');
                done();
            });
    });

    it('should return a 200 status even if user is not authenticated', (done) => {
        chai.request(app)
            .get('/api/v1/car')
            .query({
                status: 'available',
                min_price: 200000,
                max_price: 8000000
            })
            .end((error, res) => {
                if (error) done(error);
                expect(res).to.be.an('object');
                expect(res).to.have.status(200);
                expect(res.body).to.have.keys('status', 'data');
                expect(res.body.status).to.deep.equal('success');
                expect(res.body.data[0]).to.have
                    .keys('id', 'owner', 'state', 'status', 'price', 'manufacturer', 'model', 'bodyType', 'imageUrl', 'createdOn');
                done();
            });
    });
});

describe('DELETE /api/v1/car/:carId', () => {
    before((done) => {
        chai.request(app)
            .post('/api/v1/auth/signin')
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

    it('should return a 403 status if user is not an admin', (done) => {
        chai.request(app)
            .delete('/api/v1/car/3')
            .set('Authorization', myToken)
            .end((error, res) => {
                if (error) done(error);
                expect(res).to.be.an('object');
                expect(res).to.have.status(403);
                expect(res.body.status).to.deep.equal('error');
                expect(res.body.message).to.deep.equal('You do not have access to this resource');
                done();
            });
    });

    it('should return a 404 status if car does not exist', (done) => {
        chai.request(app)
            .delete('/api/v1/car/39999')
            .set('Authorization', adminToken)
            .end((error, res) => {
                if (error) done(error);
                expect(res).to.be.an('object');
                expect(res).to.have.status(404);
                expect(res.body.status).to.deep.equal('error');
                expect(res.body.message).to.deep.equal('Car not found');
                done();
            });
    });

    it('should return a 404 status if carId is not an integer', (done) => {
        chai.request(app)
            .delete('/api/v1/car/string')
            .set('Authorization', adminToken)
            .end((error, res) => {
                if (error) done(error);
                expect(res).to.be.an('object');
                expect(res).to.have.status(404);
                expect(res.body.status).to.deep.equal('error');
                expect(res.body.message).to.deep.equal('Car not found');
                done();
            });
    });

    it('should return a 200 status if car was successfully deleted', (done) => {
        chai.request(app)
            .delete('/api/v1/car/6')
            .set('Authorization', adminToken)
            .end((error, res) => {
                if (error) done(error);
                expect(res).to.be.an('object');
                expect(res).to.have.status(200);
                expect(res.body.status).to.deep.equal('success');
                expect(res.body.message).to.deep.equal('Car Ad successfully deleted');
                done();
            });
    });
});

describe('GET /api/v1/car', () => {
    it('should return a list of all cars, whether sold or not', (done) => {
        chai.request(app)
            .get('/api/v1/car')
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