import fs from 'fs';
import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../../app';

const { expect } = chai;

chai.use(chaiHttp);

describe('POST /api/v1/car', () => {
    it('should return a 422 status if form is not a multipart/form-data', (done) => {
        chai.request(app)
            .post('/api/v1/car')
            .type('form')
            .attach('displayImage', fs.readFileSync('./server/test/assets/toyota.jpg'), 'toyota.png')
            .field('state', 'used')
            .field('price', '300000')
            .field('manufacturer', 'toyota')
            .field('model', 'corolla')
            .field('bodyType', 'sedan')
            .end((error, res) => {
                if (error) done(error);
                expect(res).to.be.an('object');
                expect(res).to.have.status(422);
                expect(res.body).to.have.keys('status', 'message');
                expect(res.body.status).to.deep.equal('error');
                expect(res.body.status).to.deep.equal('Form enctype has to be "multipart/form-data"');
                done();
            });
    });

    it('should return a 422 status if user tries to upload more than one image', (done) => {
        chai.request(app)
            .post('/api/v1/car')
            .type('form')
            .set('enctype', 'multipart/form-data')
            .attach('displayImage', fs.readFileSync('./server/test/assets/toyota.jpg'), 'toyota.png')
            .attach('displayImage', fs.readFileSync('./server/test/assets/honda.jpg'), 'honda.png')
            .field('state', 'used')
            .field('price', '300000')
            .field('manufacturer', 'toyota')
            .field('model', '2014 corolla')
            .field('bodyType', 'sedan')
            .end((error, res) => {
                if (error) done(error);
                expect(res).to.be.an('object');
                expect(res).to.have.status(422);
                expect(res.body).to.have.keys('status', 'message');
                expect(res.body.status).to.deep.equal('error');
                expect(res.body.status).to.deep.equal('We currently do not support multiple images upload');
                done();
            });
    });

    it('should return a 422 status if user tries to upload an unsupported image type', (done) => {
        chai.request(app)
            .post('/api/v1/car')
            .type('form')
            .set('enctype', 'multipart/form-data')
            .attach('displayImage', fs.readFileSync('./server/test/assets/honor-code.pdf'), 'honor-code.pdf')
            .field('state', 'used')
            .field('price', '300000')
            .field('manufacturer', 'toyota')
            .field('model', '2014 corolla')
            .field('bodyType', 'sedan')
            .end((error, res) => {
                if (error) done(error);
                expect(res).to.be.an('object');
                expect(res).to.have.status(422);
                expect(res.body).to.have.keys('status', 'message');
                expect(res.body.status).to.deep.equal('error');
                expect(res.body.status).to.deep.equal('Unsupported image type');
                done();
            });
    });

    it('should return a 422 status if user tries to upload an image larger than 5mb', (done) => {
        chai.request(app)
            .post('/api/v1/car')
            .type('form')
            .set('enctype', 'multipart/form-data')
            .attach('displayImage', fs.readFileSync('./server/test/assets/large.jpg'), 'large.jpg')
            .field('state', 'used')
            .field('price', '300000')
            .field('manufacturer', 'toyota')
            .field('model', '2014 corolla')
            .field('bodyType', 'sedan')
            .end((error, res) => {
                if (error) done(error);
                expect(res).to.be.an('object');
                expect(res).to.have.status(422);
                expect(res.body).to.have.keys('status', 'message');
                expect(res.body.status).to.deep.equal('error');
                expect(res.body.status).to.deep.equal('Image size exceeds 5mb limit');
                done();
            });
    });

    it('should return a 422 error if display image was not attached', (done) => {
        chai.request(app)
            .post('/api/v1/car')
            .type('form')
            .set('enctype', 'multipart/form-data')
            .field('state', 'used')
            .field('price', '300000')
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
            .set('enctype', 'multipart/form-data')
            .attach('displayImage', fs.readFileSync('./server/test/assets/toyota.jpg'), 'toyota.png')
            .field('price', '300000')
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
            .set('enctype', 'multipart/form-data')
            .attach('displayImage', fs.readFileSync('./server/test/assets/toyota.jpg'), 'toyota.png')
            .field('state', 'new and used')
            .field('price', '300000')
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
            .type('form')
            .set('enctype', 'multipart/form-data')
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
                expect(res.body.message).to.deep.equal('Price should only consist of numbers');
                done();
            });
    });

    it('should return a 422 error if price has length greater than 12', (done) => {
        chai.request(app)
            .post('/api/v1/car')
            .type('form')
            .set('enctype', 'multipart/form-data')
            .attach('displayImage', fs.readFileSync('./server/test/assets/toyota.jpg'), 'toyota.png')
            .field('state', 'new')
            .field('price', '2000000000000000')
            .field('manufacturer', 'toyota')
            .field('model', 'corolla')
            .field('bodyType', 'sedan')
            .end((error, res) => {
                if (error) done(error);
                expect(res).to.be.an('object');
                expect(res).to.have.status(422);
                expect(res.body).to.have.keys('status', 'message');
                expect(res.body.status).to.deep.equal('error');
                expect(res.body.message).to.deep.equal('That is almost too expensive. Do you mind beating it down?');
                done();
            });
    });

    it('should return a 422 error if maufacturer was not specified', (done) => {
        chai.request(app)
            .post('/api/v1/car')
            .type('form')
            .set('enctype', 'multipart/form-data')
            .attach('displayImage', fs.readFileSync('./server/test/assets/toyota.jpg'), 'toyota.png')
            .field('state', 'new')
            .field('price', '300000000')
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
            .set('enctype', 'multipart/form-data')
            .attach('displayImage', fs.readFileSync('./server/test/assets/toyota.jpg'), 'toyota.png')
            .field('state', 'new')
            .field('price', '300000000')
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
            .set('enctype', 'multipart/form-data')
            .attach('displayImage', fs.readFileSync('./server/test/assets/toyota.jpg'), 'toyota.png')
            .field('state', 'new')
            .field('price', '300000000')
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
            .set('enctype', 'multipart/form-data')
            .attach('displayImage', fs.readFileSync('./server/test/assets/toyota.jpg'), 'toyota.png')
            .field('state', 'new')
            .field('price', '300000000')
            .field('manufacturer', 'toyota')
            .field('model', 'hddjdjfjjdskdjdjjjzdskjdjdfsdhfjsdfhjdfhdjfhdfhskjdaksjdjdhfjdfhjsdkajdkadjdkjdakdjakjak')
            .field('bodyType', 'sedan')
            .end((error, res) => {
                if (error) done(error);
                expect(res).to.be.an('object');
                expect(res).to.have.status(422);
                expect(res.body).to.have.keys('status', 'message');
                expect(res.body.status).to.deep.equal('error');
                expect(res.body.message).to.deep.equal("Model's name exceeds the maximun lenth of 30");
                done();
            });
    });

    it('should return a 422 error if body type was not specified', (done) => {
        chai.request(app)
            .post('/api/v1/car')
            .type('form')
            .set('enctype', 'multipart/form-data')
            .attach('displayImage', fs.readFileSync('./server/test/assets/toyota.jpg'), 'toyota.png')
            .field('state', 'new')
            .field('price', '300000000')
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

    it('should return a 422 error if body type is not a pure string', (done) => {
        chai.request(app)
            .post('/api/v1/car')
            .type('form')
            .set('enctype', 'multipart/form-data')
            .attach('displayImage', fs.readFileSync('./server/test/assets/toyota.jpg'), 'toyota.png')
            .field('state', 'new')
            .field('price', '300000000')
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
            .set('enctype', 'multipart/form-data')
            .attach('displayImage', fs.readFileSync('./server/test/assets/toyota.jpg'), 'toyota.png')
            .field('state', 'new')
            .field('price', '300000000')
            .field('manufacturer', 'toyota')
            .field('model', 'corolla')
            .field('bodyType', 'mmmjdjdjdkskdjfhndjjskndddhhdhddjdjdhdhjdkshjdksshdjdkjsdhdhndnjsdj')
            .end((error, res) => {
                if (error) done(error);
                expect(res).to.be.an('object');
                expect(res).to.have.status(422);
                expect(res.body).to.have.keys('status', 'message');
                expect(res.body.status).to.deep.equal('error');
                expect(res.body.message).to.deep.equal("Model's name exceeds the maximun lenth of 20");
                done();
            });
    });

    it('should return a 201 status if everything checks out', (done) => {
        chai.request(app)
            .post('/api/v1/car')
            .type('form')
            .set('enctype', 'multipart/form-data')
            .attach('displayImage', fs.readFileSync('./server/test/assets/toyota.jpg'), 'toyota.png')
            .field('state', 'used')
            .field('price', '300000')
            .field('manufacturer', 'toyota')
            .field('model', 'corolla')
            .field('bodyType', 'sedan')
            .end((error, res) => {
                if (error) done(error);
                expect(res).to.be.an('object');
                expect(res).to.have.status(201);
                expect(res.body).to.have.keys('status', 'data');
                expect(res.body.status).to.deep.equal('error');
                expect(res.body.data).to.have
                    .keys('id', 'owner', 'createdOn', 'manufacturer', 'model', 'price', 'state', 'status');
                done();
            });
    });

});