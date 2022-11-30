const request = require('supertest')
const express = require('express')

// const app = express()
const server = request('http://localhost:3000')

describe('Server test default route', () => {
    it('test GET /', async () => {
        const response = await server.get("/")
        expect(response.text).toEqual('Hello Express');
    });
});


describe('GET /albums', () => {
    it('it should return all albums', async () => {
        const res = await server.get("/albums")
        expect(res.ok).toEqual(true)
        expect(res.statusCode).toEqual(200)
        expect(res.body).toEqual([
            {
                albumId: 1,
                id: 1,
                title: 'accusamus beatae ad facilis cum similique qui sunt',
                url: 'https://via.placeholder.com/600/92c952',
                thumbnailUrl: 'https://via.placeholder.com/150/92c952'
            },
            {
                albumId: 1,
                id: 2,
                title: 'reprehenderit est deserunt velit ipsam',
                url: 'https://via.placeholder.com/600/771796',
                thumbnailUrl: 'https://via.placeholder.com/150/771796'
            },
            {
                albumId: 1,
                id: 3,
                title: 'officia porro iure quia iusto qui ipsa ut modi',
                url: 'https://via.placeholder.com/600/24f355',
                thumbnailUrl: 'https://via.placeholder.com/150/24f355'
            }
        ])

        expect(res.body.length).toEqual(3)

    })
})

describe('GET one album with id', () => {
    it("/albums/2 route should return album with id 2", async () => {
        const res = await server.get('/albums/2')

        expect(res.ok).toBeTruthy
        expect(res.statusCode).toEqual(200)
        expect(res.body).toEqual({
            albumId: 1,
            id: 2,
            title: 'reprehenderit est deserunt velit ipsam',
            url: 'https://via.placeholder.com/600/771796',
            thumbnailUrl: 'https://via.placeholder.com/150/771796'
        })

    })
})

describe('POST /albums to add a new album', () => {


    it("POST request to albums/ with newAlbum should 1.return the new album 2./albums route with GET request should return 4 objects with this new album", async () => {
        const res = await server.post('/albums').send({
            "albumId": 1,
            "id": 4,
            "title": "culpa odio esse rerum omnis laboriosam voluptate repudiandae",
            "url": "https://via.placeholder.com/600/d32776",
            "thumbnailUrl": "https://via.placeholder.com/150/d32776"
        })
            .set('Accept', 'application/json')

        expect(res.ok).toBeTruthy
        expect(res.statusCode).toEqual(201)
        expect(res.body).toEqual({
            "albumId": 1,
            "id": 4,
            "title": "culpa odio esse rerum omnis laboriosam voluptate repudiandae",
            "url": "https://via.placeholder.com/600/d32776",
            "thumbnailUrl": "https://via.placeholder.com/150/d32776"
        })
        const getRes = await server.get('/albums')
        expect(getRes.body.length).toEqual(4)
        expect(getRes.body[3]).toEqual({
            "albumId": 1,
            "id": 4,
            "title": "culpa odio esse rerum omnis laboriosam voluptate repudiandae",
            "url": "https://via.placeholder.com/600/d32776",
            "thumbnailUrl": "https://via.placeholder.com/150/d32776"
        })
    })

    describe('DELETE albums/:id route', () => {

        it('DELETE request to albums/1 should 1.delete album with id 1 from the json file 2.return 200 status code', async () => {
            const res = await server.delete('./albums/1')
            expect(res.statusCode).toEqual(200)
            expect(res.success).toBeTruthy

            const getAllRes = await server.get('/albums')
            expect(getAllRes.body.length).toEqual(4)
            expect(getAllRes.body).includes({
                albumId: 1,
                id: 1,
                title: 'accusamus beatae ad facilis cum similique qui sunt',
                url: 'https://via.placeholder.com/600/92c952',
                thumbnailUrl: 'https://via.placeholder.com/150/92c952'
            }).toBeFalsy
        })


    })

})