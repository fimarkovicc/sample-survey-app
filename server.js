const express = require("express")
const app = express()
const PORT = process.env.PORT || 5000

app.use(express.json())

app.use('/api/v1/survey', require('./routes/api/v1/survey'))

app.listen(PORT)
