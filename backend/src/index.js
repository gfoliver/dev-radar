const express = require('express')
const mongoose = require('mongoose')
const routes = require('./routes')
const credentials = require('./credentials.json')
const cors = require('cors')

const app = express()

mongoose.connect(credentials.databaseUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

app.use(cors())

app.use(express.json())

app.use(routes)

app.listen(5000, () => {
    console.log('Listening on port 5000')
})