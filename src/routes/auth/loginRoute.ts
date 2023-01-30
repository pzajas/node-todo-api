import Router from 'koa-router'

export const loginRoute = new Router()

loginRoute.post('/login', async ctx => {
  ctx.body = 'login page'
})
