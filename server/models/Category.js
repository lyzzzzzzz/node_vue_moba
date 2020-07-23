const mongoose = require('mongoose') 

const schema=new mongoose.Schema({
  name:{type:String},
  parent:{type:mongoose.SchemaTypes.ObjectId,ref:'Category'}  //ref代表关联的是哪个表
})

module.exports= mongoose.model('Category',schema)