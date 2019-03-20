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
  } else {
    ctx.body = { code: 0, msg: '查找失败' }
  }
})

router.post('/del', async ctx => {
  const { _id } = ctx.request.body
  const res = await DB.update(collectionName, { "_id": DB.getObjectId(_id) }, {"status": 2})
  if (res.result.ok === 1) {
    ctx.body = { code: 0, msg: '删除成功' }
  } else {
    ctx.body = { code: 1, msg: '删除失败' }
  }
})

router.post('/done', async ctx => {
  const { _id } = ctx.request.body
  const res = await DB.update(collectionName, { "_id": DB.getObjectId(_id) }, {"status": 1})
  if (res.result.ok === 1) {
    ctx.body = { code: 0, msg: '更新状态成功' }
  } else {
    ctx.body = { code: 1, msg: '更新状态失败' }
  }
})

router.post('/beDone', async ctx => {
  const { _id } = ctx.request.body
  const res = await DB.update(collectionName, { "_id": DB.getObjectId(_id) }, {"status": 0})
  if (res.result.ok === 1) {
    ctx.body = { code: 0, msg: '更新状态成功' }
  } else {
    ctx.body = { code: 1, msg: '更新状态失败' }
  }
})

module.exports = router
