const express = require('express')

const app = express();

app.use(express.json())

const albums = require("./albums.json")

app.get('/', (req, res) => {
    res.send('Hello Express')
});


app.get("/albums", (req, res) => {
    res.send(albums)
})


app.get("/albums/:id", (req, res) => {
    const id = req.params.id
    const album = albums.find(album => album.id == id)
    res.send(album)
})

app.post('/albums', (req, res) => {
    const newAlbum = req.body
    albums.push(newAlbum)
    res.status(201).send(newAlbum)
})



app.listen(3000, () => console.log("Server is up and running"))