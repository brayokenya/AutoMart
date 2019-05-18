import fs from 'fs';
import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../../app';

chai.use(chaiHttp);
const { expect } = chai;

const invalidToken = 'hdhdnjwnejwhfwjewfoidshd9r9i0q2qeiqhfkjdvd vhndknfmdlkqnjk dmsdk';

describe('Auth manager', () => {
    it('should return status code 401 if token is invalid', (done) => {
        chai.request(app)
            .post('/api/v1/car')
            .set('enctype', 'multipart/form-data')
            .set('Authorization', invalidToken)
            .type('form')
            .attach('displayImage', fs.readFileSync('./server/test/assets/toyota.jpg'), 'toyota.png')
            .field('owner', '2')
            .field('state', 'used')
            .field('price', '300000')
            .field('manufacturer', 'toyota')
            .field('model', 'corolla')
            .field('bodyType', 'sedan')
            .end((error, res) => {
                if (error) done(error);
                expect(res).to.be.an('object');
                expect(res).to.have.status(401);
                expect(res.body).to.have.keys('status', 'message');
                expect(res.body.status).to.deep.equal('error');
                expect(res.body.message).to.deep.equal('Invalid authorization token');
                done();
            });
    });

    it('should return status code 401 if token was not provided', (done) => {
        chai.request(app)
            .post('/api/v1/car')
            .set('enctype', 'multipart/form-data')
            .type('form')
            .attach('displayImage', fs.readFileSync('./server/test/assets/toyota.jpg'), 'toyota.png')
            .field('owner', '2')
            .field('state', 'used')
            .field('price', '300000')
            .field('manufacturer', 'toyota')
            .field('model', 'corolla')
            .field('bodyType', 'sedan')
            .end((error, res) => {
                if (error) done(error);
                expect(res).to.be.an('object');
                expect(res).to.have.status(401);
                expect(res.body).to.have.keys('status', 'message');
                expect(res.body.status).to.deep.equal('error');
                expect(res.body.message).to.deep.equal('Authorization token was not provided');
                done();
            });
    });
});