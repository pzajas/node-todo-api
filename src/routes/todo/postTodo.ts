import Router from 'koa-router'

export const postTodo = new Router()

postTodo.post('/todos', async ctx => {
  ctx.body = 'post todo'
})
