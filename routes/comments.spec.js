import request from "supertest";
import app from '../server.js';
import { connect } from "../database/conn.js";

async function insertProfile(partialProfile) {
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
        ...partialProfile
    }

    return await request(app)
        .post('/api/profile')
        .send(profile);
}

async function insertLike(commentId, userId)
{
    const like = {
        "commentId": commentId,
        "userId": userId
    }

    return await request(app)
        .post('/api/comments/like')
        .send(like);
}

async function inserComment(userFrom, userTo) {
    const comment = {
        "title": "Title Comment",
        "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus vitae scelerisque tellus, eu auctor lectus. Etiam lobortis massa a malesuada pellentesque. Ut fermentum lectus venenatis diam sagittis convallis.",
        "userId": userFrom,
        "profileId": userTo
    }

    return await request(app)
        .post('/api/comments')
        .send(comment);
}

async function createMockData() {
    await insertProfile({name: 'E. Alesson', mbti: "ALES", enneagram: '1w4'}),
    await insertProfile(),
    await insertProfile({name: 'Z. Alesson', mbti: "ZLES", enneagram: '8m1'})

    const comments = await Promise.all(
        [
            inserComment(2, 1),
            inserComment(3, 1),
            inserComment(1, 2)
        ]);
    await insertLike(comments[0].body._id, 1);
    await insertLike(comments[0].body._id, 2);
    await insertLike(comments[0].body._id, 3);
    await insertLike(comments[1].body._id, 1);
    await insertLike(comments[1].body._id, 2);
    await insertLike(comments[2].body._id, 3);

    return comments;
}

beforeAll(async () => {
    await connect();
})

describe('Test Profile Api', () => {
    
    test('[POST:Comment] Test input new comment', async() => {
        const res = await createMockData();

        expect(res[0].statusCode).toBe(200)
        expect(res[1].statusCode).toBe(200)
        expect(res[2].statusCode).toBe(200)
    });

    test('[GET: SORT] Test if get comments sorting by Likes', async() => {
        await createMockData();

        const res = await 
            request(app)
                .get('/api/comments/1?sort=best')
        
        const firstCommentLikes = res.body[0].likes.length
        const lastCommentLikes = res.body[3].likes.length

        expect(res.statusCode).toEqual(200)
        expect(firstCommentLikes > lastCommentLikes).toBeTruthy()
    })

    test('[GET: FILTER] Test if get comments by filter', async() => {
        await createMockData();

        const mbti = "ISFJ";
        const res = await 
            request(app)
                .get(`/api/comments/1?filter[mbti]=${mbti}`)

        expect(res.statusCode).toEqual(200)
        expect(res.body[0].mbti).toBe(mbti)
    })

})