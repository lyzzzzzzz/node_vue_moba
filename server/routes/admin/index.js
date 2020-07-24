module.exports = app => {
  const express = require('express')
  const router = express.Router()  //express子路由
  app.use('/admin/api/rest/:resource', async (req, res, next) => {
    let modelName = require('inflection').classify(req.params.resource)  //将小写‘categories’转成标准的类名‘Category’
    req.Model = require(`../../models/${modelName}`)
    next()
  }, router)

  //新增分类
  router.post('/', async (req, res) => {
    const category = await req.Model.create(req.body)
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
  router.get('/', async (req, res) => {
    let queryOptions={}
    if(req.Model.modelName==='Category'){
      queryOptions.populate='parent'
    }
    const categories = await req.Model.find().setOptions(queryOptions)
    // const categories = await req.Model.find().populate('parent')  //populate('parent')表示关联取出parent，前端会得到一个parent对象
    res.send(categories)
  })


  //根据id获取分类
  router.get('/:id', async (req, res) => {
    const category = await req.Model.findById(req.params.id)
    if (category) {
      res.send(category)
    } else {
      res.send({
        msg: "数据库查找失败"
      })
    }
  })


  //修改分类
  router.put('/:id', async (req, res) => {
    const category = await req.Model.findByIdAndUpdate(req.params.id, req.body)
    if (category) {
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
  router.delete('/:id', async (req, res) => {
    const category = await req.Model.findById(req.params.id)
    await category.remove()
    res.send({
      msg: "删除成功"
    })
  })
}