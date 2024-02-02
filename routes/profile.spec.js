import request from "supertest";
import app from '../server.js';
import { connect } from "../database/conn.js";

beforeAll(connect)

describe('Test Profile Api', () => {
    
    test('[POST] Test input new profile', async() => {
        const profile = {
            "id": 1,
            "name": "A Martinez",
            "description": "Adolph Larrue Martinez III.",
            "mbti": "ISFJ",
            "enneagram": "9w3",
            "variant": "sp/so",
            "tritype": 725,
            "socionics": "SEE",
            "sloan": "RCOEN",
            "psyche": "FEVL",
            "image": "https://soulverse.boo.world/images/1.png",
        }

        const res = await request(app)
            .post('/api/profile')
            .send(profile);

        expect(res.statusCode).toBe(200)
        expect(res.body.name).toBeEqual('A Martinez')
    });

    test('[GET] Test if get all profile collection', async() => {
        const res = await request(app).get('/api/profile')

        expect(res.statusCode).toEqual(200)
        // expect(res.body.name).toBeDefined()
    })

    test('[GET BY ID] get profile collection by id', async() => {
        const res = await request(app).get('/api/profile')

        expect(res.statusCode).toEqual(200)
        // expect(res.body.name).toBeDefined()
    })

})