const express = require('express');
const connectToMongo = require('./db');
var cors = require('cors')


connectToMongo();
const port = 5000
const app = express()


app.use(cors())
app.use(express.json())


app.get('/', (req, res) => {
    res.send('Test App')
})

app.use('/api/auth', require('./routes/auth'));


app.listen(port, () => {
    console.log(`test app listening on port ${port}`)
})
