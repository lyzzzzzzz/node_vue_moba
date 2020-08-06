const express = require('express')
const app = express()
const port = 3000
app.listen(port, () => console.log(`Example app listening on port port!`))

app.set('secret','gsgrhyerhebdfb')//设置秘钥

app.use(express.json())
app.use(require('cors')())
app.use('/uploads',express.static(__dirname+'/uploads'))//靜態文件託管，使得uploads裡面的圖片可訪問
require('./routes/admin')(app)  //引入admin路由，并把app传过去
require('./plugins/db')(app)