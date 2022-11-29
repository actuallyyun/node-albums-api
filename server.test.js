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

describe('GET one album with id')