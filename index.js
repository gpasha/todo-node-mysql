const express = require('express')
const path = require('path')
const app = express()

app.use(express.static(path.join(__dirname, 'public') ))
app.use((req, res, next) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'))
})


const PORT = process.env.PORT || 3000
app.listen(PORT)