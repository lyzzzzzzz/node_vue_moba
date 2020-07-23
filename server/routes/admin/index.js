module.exports = app => {
  const express = require('express')
  const router = express.Router()  //express子路由
  const Category = require('../../models/Category')  //Category表
  app.use('/admin/api', router)

  //新增分类
  router.post('/categories', async (req, res) => {
    const category = await Category.create(req.body)
    if (category) {
      res.send({
        msg: "保存成功",
        data: category
      })
    } else {
      res.send({
        msg: "保存成功"
      })
    }
  })

  router.get('/categories', async (req, res) => {
    const categories = await Category.find()
    res.send(categories)
  })
}