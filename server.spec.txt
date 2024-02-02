import request from "supertest";
import app from './server.js';

describe('Test Profile Api', () => {

    it('Test API Working', async() => {
        const res = await request(app).get('/')

        expect(res.statusCode).toEqual(200)
    });
})