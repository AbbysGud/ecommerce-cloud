const request = require('supertest');
const { app, db } = require('./index');

describe('GET /products', () => {
  it('harus mengembalikan status 200', async () => {
    const res = await request(app).get('/products');
    expect(res.statusCode).toBe(200);
  });

  afterAll(() => {
    db.end();
  });
});