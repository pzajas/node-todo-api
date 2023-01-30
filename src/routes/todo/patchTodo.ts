import Router from 'koa-router'

export const patchTodo = new Router()

patchTodo.post('/todos', async ctx => {
  ctx.body = 'patch todo'
})
