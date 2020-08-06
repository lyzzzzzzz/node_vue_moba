module.exports = options => {
  return async (req, res, next) => {
    let modelName = require('inflection').classify(req.params.resource)  //将小写‘categories’转成标准的类名‘Category’
    req.Model = require(`../models/${modelName}`)
    next()
  }
}