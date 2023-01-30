import Router from 'koa-router'

export const deleteTodo = new Router()

deleteTodo.delete('/todos', async ctx => {
  ctx.body = 'delete todo'
})
