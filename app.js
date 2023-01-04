import express from "express"
import albums from './albums.json' assert  { type: 'json' }

const app = express()

app.use(express.json())


const getAlbumById = (req, res) => {
    const id = req.params.id
    const album = albums.find(album => album.id == id)
    const statusCode = album ? 200 : 400

    res.status(statusCode).send(album)

}

const validAlbum = (album) => {
    if (album.artist === undefined || album.title === undefined || album.artist === "" || album.title === "") {
        return false
    } else if (albums.find(a => a.title.toLocaleLowerCase() === album.title.toLocaleLowerCase())) {
        return false
    } else {
        return true
    }
}

const createNewAlbum = (req, res) => {
    const isValid = validAlbum(req.body)
    const statusCode = isValid ? 201 : 409

    let createdAlbum

    if (isValid) {
        const newAlbumContent = req.body
        const newAlbum = { id: albums.length + 1, title: newAlbumContent.title, artist: newAlbumContent.artist, url: newAlbumContent.url }
        albums.push(newAlbum)
        createdAlbum = newAlbum
    }
    res.status(statusCode).send(createdAlbum)
}


const deleteAlbumById = (req, res) => {
    const id = req.params.id
    const indexToDelete = albums.findIndex(album => album.id == id)
    const foundIndex = indexToDelete != -1

    const statusCode = foundIndex ? 200 : 404

    const deletedAlbum = foundIndex ? albums[indexToDelete] : (null)

    if (foundIndex) {
        albums.splice(indexToDelete, 1)
    }
    res.status(statusCode).send(deletedAlbum)
}

const updateAlbumById = (req, res) => {
    const id = req.params.id
    const album = albums.find(a => a.id == id)

    if (req.body.artist !== undefined) {
        album.artist = req.body.artist
    }
    if (req.body.title !== undefined) {
        album.title = req.body.title
    }

    res.status(200).send(album)
}

app.get("/", (req, res) => {
    res.send("Welcome to the music album API.")
})

app.get("/albums", (req, res) => {
    res.status(200).send(albums)
})

app.get("/albums/:id", getAlbumById)

app.post('/albums', createNewAlbum)

app.delete('/albums/:id', deleteAlbumById)

app.put("/albums/:id", updateAlbumById)


export default app