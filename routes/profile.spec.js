import request from "supertest";
import app from '../server.js';
import { connect } from "../database/conn.js";

beforeAll(connect)

async function insertProfile() {
    const profile = {
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

    return await request(app)
        .post('/api/profile')
        .send(profile);
}

describe('Test Profile Api', () => {
    
    test('[POST] Test input new profile', async() => {
        const res = await insertProfile();

        expect(res.statusCode).toBe(200)
        expect(res.body.name).toEqual('A Martinez')
    });

    test('[GET] Test if get all profile collection', async() => {
        await insertProfile();

        const res = await request(app).get('/api/profile')
        expect(res.statusCode).toEqual(200)
    })

    test('[GET BY ID] get profile collection by id', async() => {
        await insertProfile();
        const res = await request(app).get('/api/profile/1')

        expect(res.statusCode).toEqual(200)
    })

})