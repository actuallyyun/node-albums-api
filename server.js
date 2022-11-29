const express = require('express')

const app = express();

const albums = require("./albums.json")

app.get('/', (req, res) => {
    res.send('Hello Express')
});


app.get("/albums", (req, res) => {
    res.send(albums)
})


app.listen(3000, () => console.log("Server is up and running"))