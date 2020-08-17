const { insertMany } = require('../../models/Article')

module.exports = app => {
  const mogoose = require('mongoose')
  const express = require('express')
  const router = express.Router()  //express子路由

  const Article = mogoose.model('Article')
  const Category = mogoose.model('Category')

  router.get('/news/init', async (req, res) => {
    const parent = await Category.findOne({
      name: "新闻资讯"
    })
    const cats = await Category.find().where({
      parent: parent
    }).lean()
    const newsTitles = ["8月17日服务器维护完成公告", "8月14日全服不停机优化公告", "8月14日体验服停机更新公告", "“游戏家中国行·王者零距离”活动重启说明",
      "8月12日净化游戏环境声明及处罚公告", "“缘起峡谷，情定七夕”——《王者荣耀》七夕告白季，邀你来峡谷，表达爱！", "叮！你的潇潇子已抵达王者营地",
      "策划有话说丨新一系野刀即将到来", "三分之地，阵营对决赢手机周边，快来参与！", "曲韵芳华丨经典咏流传 《数字化破局》新文创微纪录片首期全网上线",
      "8月17日服务器维护完成公告", "8月14日全服不停机优化公告", "8月14日体验服停机更新公告", "“游戏家中国行·王者零距离”活动重启说明",
      "8月12日IP核心团招募公告", "【看世冠对决 赢豪华大礼】活动公告", "应援世冠得好礼，墨子两款皮肤重塑完成即将登场",
      "夏日盛典开启，新英雄阿古朵登场！送皮肤、抽内测惊喜好礼享不停", "【三分探险】活动开启公告", "夏日有好礼，峡谷乐不停"]
    const newsList = newsTitles.map(title => {
      const redomCats = cats.slice(0).sort((a, b) => Math.random() - 0.5)
      return {
        categories: redomCats.slice(0, 2),
        title: title
      }
    })

    await Article.deleteMany({})
    await Article.insertMany(newsList)
    res.send(newsList)
  })



  router.get('/news/list', async (req, res) => {
    const parent = await Category.findOne({
      name: "新闻资讯"
    })
    const cats = await Category.aggregate([
      { $match: { parent: parent._id } },
      {
        $lookup: {
          from: 'articles',
          localField: '_id',
          foreignField: 'categories',
          as: 'list'
        }
      },
      {
        $addFields: {
          list: { $slice: ['$list', 5] }
        }
      }
    ])

    const subCats = cats.map(v => v._id)
    cats.unshift({
      name: '热门',
      list: await Article.find().where({
        categories: { $in: subCats }
      }).populate('categories').limit(5).lean()
    })


    cats.map(cat => {
      cat.list.map(news => {
        news.categoryName = cat.name==='热门'?news.categories[0].name:cat.name
        return news
      })
      return cat
    })

    res.send(cats)
  })

  app.use('/web/api', router)
}