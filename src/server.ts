import * as express from 'express'
import * as next from 'next'
import * as favicon from 'serve-favicon'
import * as path from 'path'

const dev = process.env.NODE_ENV !== 'production'

if (dev) {
  require('dotenv').config()
}

export type TContext = {
  isLoggedIn: boolean
  user?: {
    picture: string
    email: string
    name: string
    id: string
  }
  dev: boolean
}

console.log('HEYYYYYAAAzyyyyy', process.env)

const port = process.env.PORT || 3035
const app = next({ dev })
const handle = app.getRequestHandler()

app.prepare().then(() => {
  const server = express()

  server.use(favicon(path.join(__dirname, '..', 'static', 'share.png')))

  server.get('*', async (req, res) => {
      return handle(req, res)
  })

  server.listen(port, (err: Error) => {
    if (err) {
      throw err
    }
    console.log(`> Ready on ${port}`)
  })
})
