import Router from 'koa-router'

export const logoutRoute = new Router()

logoutRoute.post('/logout', async ctx => {
  ctx.body = 'logout page'
})
