module.exports = app => {
  const assert = require('http-assert')
  const express = require('express')
  const router = express.Router()  //express子路由
  const AdminUser = require('../../models/AdminUser')
  const jwt = require('jsonwebtoken')

  //校验中间件
  const authMiddleware = require('../../middleware/auth')
  //资源中间件
  const resourceMiddleware = require('../../middleware/resoruce')


  app.use('/admin/api/rest/:resource', authMiddleware(), resourceMiddleware(), router)


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

  const multer = require('multer')  //處理圖片
  const upload = multer({ dest: __dirname + '/../../uploads' })//上傳到uploads文件夾
  app.post('/admin/api/upload', authMiddleware(), upload.single('file'), (req, res) => {  //'file'前端傳過來數據的字段名
    let file = req.file
    file.url = `http://localhost:3000/uploads/${file.filename}`
    res.send(file)
  })


  app.post('/admin/api/login', async (req, res) => {
    const { username, password } = req.body
    //1、根据用户名找用户
    const user = await AdminUser.findOne({ username }).select('+password') //'+password'强制带出密码，因为AdminUser表里设置了password不可查
    assert(user, 422, '用户不存在')
    // 2、校验密码
    const isValid = require('bcrypt').compareSync(password, user.password)
    assert(isValid, 422, '密码错误')
    // 3、返回token
    const token = jwt.sign({ id: user._id }, app.get('secret'))
    res.send({ token })
  })



  //错误处理函数
  app.use(async (err, req, res, next) => {
    res.status(err.statusCode || 500).send({
      message: err.message
    })
  })
}

