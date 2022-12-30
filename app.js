import express from "express";
const app = express();

app.use(express.json())

import albums from './albums.json'

app.get('/', (req, res) => {
    res.send('Hello Express')
});


app.get("/albums", (req, res) => {
    res.send(albums)
})


app.get("/albums/:id", (req, res) => {
    const id = req.params.id
    const album = albums.find(album => album.id == id)
    if (album === undefined) {
        res.status(400).send("The item you requested does not exist.")
    } else {
        res.send(album)
    }

})

app.post('/albums', (req, res) => {
    const newAlbum = req.body
    if (albums.find(album => album.id === newAlbum.id)) {
        return res.status(409).send("You cannot create an album with an exisiting id.")
    } else {
        albums.push(newAlbum)
        res.status(201).send(newAlbum)
    }


})


app.delete('/albums/:id', (req, res) => {
    const id = req.params.id
    //QQQ:What's the best solution to delete an item from database? Which Array method to use?

    const albumToDelete = albums.find(album => album.id == id)
    if (albumToDelete !== undefined) {
        albums.splice(albumToDelete, 1)
        res.status(200).json({ success: true })

    } else {
        res.status(404)
    }


})


export default app