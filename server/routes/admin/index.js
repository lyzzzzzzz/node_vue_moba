module.exports = app => {
  const express = require('express')
  const router = express.Router()  //express子路由


  app.use('/admin/api/rest/:resource', async (req, res, next) => {
    let modelName = require('inflection').classify(req.params.resource)  //将小写‘categories’转成标准的类名‘Category’
    req.Model = require(`../../models/${modelName}`)
    next()
  }, router)


  const multer = require('multer')  //處理圖片
  const upload = multer({ dest: __dirname + '/../../uploads' })//上傳到uploads文件夾
  app.post('/admin/api/upload', upload.single('file'), (req, res) => {  //'file'前端傳過來數據的字段名
    let file = req.file
    file.url = `http://localhost:3000/uploads/${file.filename}`
    res.send(file)
  })

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
    let queryOptions = {}
    if (req.Model.modelName === 'Category') {
      queryOptions.populate = 'parent'
    }
    if (req.Model.modelName === 'Article') {
      const articleTable = require('../../models/Category');
      queryOptions.populate = { path: 'categories', select: { name: 1 }, model: articleTable }//把分类信息带出来
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