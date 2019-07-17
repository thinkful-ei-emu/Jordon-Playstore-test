'use strict';

const app = require('../app');
const expect = require('chai').expect;
const supertest = require('supertest');
const sort = require('../app');

describe('All apps', () => {
  it('Should return all apps', () => {
    return supertest(app)
      .get('/apps')
      .expect(200)
      .expect('Content-Type', /json/)
      .then(res => {
        expect(res.body).to.be.an('array');
        expect(res.body).to.have.lengthOf.at.least(20);
      });
  });
  
  it('should sort apps decending by rating', () => {
    return supertest(app)
      .get('/apps')
      .query({ sort })
      .expect(200)
      .expect('Content-Type', /json/);
  });
  
});