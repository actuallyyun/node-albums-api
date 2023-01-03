import express from "express"
import albums from './albums.json' assert  { type: 'json' }

const app = express()

app.use(express.json())


const getAlbumById = (req, res) => {
    const id = req.params.id
    const album = albums.find(album => album.id == id)
    if (album === undefined) {
        res.status(400).send("The item you requested does not exist.")
    } else {
        res.send(album)
    }
}

const createNewAlbum = (req, res) => {
    const newAlbum = req.body
    if (albums.find(album => album.id === newAlbum.id)) {
        return res.status(409).send("You cannot create an album with an exisiting id.")
    } else {
        albums.push(newAlbum)
        res.status(201).send(newAlbum)
    }
}

const deleteAlbumById = (req, res) => {
    const id = req.params.id
    const albumToDelete = albums.find(album => album.id == id)
    if (albumToDelete !== undefined) {
        albums.splice(albumToDelete, 1)
        res.status(200).json({ success: true })

    } else {
        res.status(404)
    }
}

app.get("/", (req, res) => {
    res.send("Welcome to the music album API.")
})

app.get("/albums", (req, res) => {
    res.send(albums)
})

app.get("/albums/:id", getAlbumById)

app.post('/albums', createNewAlbum)

app.delete('/albums/:id', deleteAlbumById)


export default app