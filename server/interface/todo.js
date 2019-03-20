const Router = require('koa-router')
const DB = require('../dbs/db')

const router = new Router({
  prefix: '/todo'
})

const collectionName = 'list'

router.post('/add', async (ctx) => {
  const result = ctx.request.body
  const res = await DB.insert(collectionName, result)
  if (res.result.ok === 1) {
    ctx.body = { code: 0, msg: '添加成功' }
  } else {
    ctx.body = { code: 1, msg: '添加失败' }
  }
})

router.get('/list', async ctx => {
  const res = await DB.find(collectionName, {})
  if (res) {
    ctx.body = {
      code: 0,
      msg: '查找成功',
      list: res
    }
  }
})

router.post('/del', async ctx => {
  const result = ctx.request.body
  console.log(result)
  // const res = await DB.remove(collectionName, result)
  if (res) {
    ctx.body = {
      code: 0,
      msg: '删除成功',
    }
  } else {
    ctx.body = {
      code: 1,
      msg: '删除失败',
    }
  }
})

module.exports = router
