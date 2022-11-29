const request = require('supertest')
const express = require('express')

// const app = express()
const server = request('http://localhost:3000')

describe('Server test suite', () => {
    it('test GET /', async () => {
        const response = await server.get("/"
        expect(response.text).toEqual('Hello Express');
    });
});