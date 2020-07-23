module.exports = app => {
  const mongoose = require('mongoose')  //npm i mongoose  引入mongodb
  mongoose.connect('mongodb://localhost:27017/node-vue-moba', { useNewUrlParser: true, useUnifiedTopology: true })
}