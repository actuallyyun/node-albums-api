import request from 'supertest'
import app from './app'


const server = request(app)

describe('Server test default route', () => {
    it('test GET /', async () => {
        const response = await server.get("/")
        expect(response.text).toEqual('Welcome to the music album API.');
    });
});


describe('GET /albums', () => {
    it('it should return all albums', async () => {
        const res = await server.get("/albums")
        expect(res.statusCode).toEqual(200)
        expect(res.body).toEqual([
            {
                "id": 1,
                "title": "accusamus beatae ad facilis cum similique qui sunt",
                "artist": "Pink Floyd",
                "url": "https://via.placeholder.com/600/92c952"
            },
            {
                "id": 2,
                "title": "reprehenderit est deserunt velit ipsam",
                "artist": "Pink Floyd",
                "url": "https://via.placeholder.com/600/771796"
            },
            {
                "id": 3,
                "title": "officia porro iure quia iusto qui ipsa ut modi",
                "artist": "Pink Floyd",
                "url": "https://via.placeholder.com/600/24f355"
            }
        ])

        expect(res.body.length).toEqual(3)

    })
})

describe('GET one album with id', () => {
    it("/albums/2 route should return album with id 2", async () => {
        const res = await server.get('/albums/2')
        expect(res.statusCode).toEqual(200)
        expect(res.body).toEqual({
            "id": 2,
            "title": "reprehenderit est deserunt velit ipsam",
            "artist": "Pink Floyd",
            "url": "https://via.placeholder.com/600/771796"
        })

    })
    it('if album with the id is not found,it should return 400 and an error message', async () => {
        const res = await server.get('/albums/10')
        expect(res.statusCode).toEqual(400)

    })
})

describe('POST /albums to add a new album', () => {


    it("POST request to albums/ with newAlbum should 1.return the new album 2./albums route with GET request should return 4 objects with this new album", async () => {
        const res = await server.post('/albums').send({
            "title": "Blonde on Blonde",
            "artist": "Bob Dylan",
            "url": "https://via.placeholder.com/600/d32776",
        })
            .set('Accept', 'application/json')
        expect(res.statusCode).toEqual(201)
        expect(res.body).toEqual({
            "id": 4,
            "title": "Blonde on Blonde",
            "artist": "Bob Dylan",
            "url": "https://via.placeholder.com/600/d32776",
        })
        const getRes = await server.get('/albums')
        expect(getRes.body.length).toEqual(4)
        expect(getRes.body[3]).toEqual({
            "id": 4,
            "title": "Blonde on Blonde",
            "artist": "Bob Dylan",
            "url": "https://via.placeholder.com/600/d32776",
        })
    })

    it("if POST an album with incomplete infomation, the server should return 409 and an empty object", async () => {
        const res = await server.post('/albums').send({
            "title": "",
            "url": "https://via.placeholder.com/600/92c952",
        })

        expect(res.statusCode).toEqual(409)
        expect(res.body).toEqual({})

        const getRes = await server.get('/albums')
        expect(getRes.body.length).toEqual(4)
    })

    it("if POST an album with exisiting title, the server should return 409 and an empty object", async () => {
        const res = await server.post('/albums').send({
            "title": "accusamus beatae ad facilis cum similique qui sunt",
            "artist": "Pink Floyd",
            "url": "https://via.placeholder.com/600/92c952",
        })

        expect(res.statusCode).toEqual(409)
        expect(res.body).toEqual({})

        const getRes = await server.get('/albums')
        expect(getRes.body.length).toEqual(4)
    })



})

describe('DELETE albums/:id route', () => {

    it('DELETE request to albums/1 should 1.delete album with id 1 from the json file 2.return 200 status code', async () => {
        const res = await server.delete('/albums/1')
        expect(res.statusCode).toEqual(200)
        expect(res.body.success).toBeTruthy

        const getAllRes = await server.get('/albums')

        expect(getAllRes.body.length).toEqual(3)
        expect(getAllRes.body.includes({
            "id": 1,
            "title": "accusamus beatae ad facilis cum similique qui sunt",
            "artist": "Pink Floyd",
            "url": "https://via.placeholder.com/600/92c952"
        })).toBeFalsy
    })


})