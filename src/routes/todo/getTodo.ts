import Router from 'koa-router'

export const getTodo = new Router()

getTodo.get('/todos', async ctx => {
  ctx.body = 'get todo'
})
