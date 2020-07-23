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
        msg: "新建成功",
        data: category
      })
    } else {
      res.send({
        msg: "新建成功"
      })
    }
  })

  //获取全部分类
  router.get('/categories', async (req, res) => {
    const categories = await Category.find().populate('parent')  //populate('parent')表示关联取出parent，前端会得到一个parent对象
    res.send(categories)
  })


  //根据id获取分类
  router.get('/categories/:id', async (req, res) => {
    const category = await Category.findById(req.params.id)
    if (category) {
      res.send(category)
    } else {
      res.send({
        msg: "数据库查找失败"
      })
    }
  })
 

  //修改分类
  router.put('/categories/:id', async (req, res) => {
    const category = await Category.findById(req.params.id)
    if (category) {
      category.name = req.body.name
      await category.save()
      res.send({
        msg: "修改成功",
        data: category
      })
    } else {
      res.send({
        msg: "数据库查找失败"
      })
    }
  })


  //删除分类
  router.delete('/categories/:id', async (req, res) =>{
    const category = await Category.findById(req.params.id)
    await category.remove()
    res.send({
      msg: "删除成功"
    })
  })
}