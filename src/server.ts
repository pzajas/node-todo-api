import Koa from 'koa'
const app = new Koa()

app.use(async ctx => {
  ctx.body = 'Hello World'
})

app.listen(3000, () => {
  console.log('Server is listening to port 3000')
})
