const mongoose = require('mongoose') 

const schema=new mongoose.Schema({
  name:{type:String},
  parent:{type:mongoose.SchemaTypes.ObjectId,ref:'Category'}  //ref代表关联的是哪个表
})

schema.virtual('children',{
  localField:"_id",
  foreignField:'parent',
  justOne:false,
  red:'Category'
})

module.exports= mongoose.model('Category',schema)