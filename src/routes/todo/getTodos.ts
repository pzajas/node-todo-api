import Router from 'koa-router'

export const getTodos = new Router()

getTodos.get('/todos', async ctx => {
  ctx.body = 'get todos'
})
