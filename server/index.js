const express = require('express')
const app = express()
const port = 3000
app.listen(port, () => console.log(`Example app listening on port port!`))

app.use(express.json())
app.use(require('cors')())
require('./routes/admin')(app)  //引入admin路由，并把app传过去
require('./plugins/db')(app)