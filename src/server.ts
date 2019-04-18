import express from 'express'
import next from 'next'
import favicon from 'serve-favicon'
import path from 'path'
import { getCookie } from 'vanilla-cookies'
import url from 'url'

const dev = process.env.NODE_ENV !== 'production'


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

const port = process.env.PORT || 3035
const app = next({ dev })
const handle = app.getRequestHandler()

app.prepare().then(() => {
  const server = express()

  server.use(favicon(path.join(__dirname, '..', 'static', 'share.png')))

  server.get('*', async (req, res) => {

    const {path,query} = url.parse(req.url, true)

    console.log({path,query})


    const googleToken = getCookie('GTOKENID', req.headers.cookie)


    if(!googleToken){
      // app.render(req, res, '/login', query)
    }

    console.log('gotkenId', googleToken)

    return handle(req, res)


  })

  server.listen(port, (err: Error) => {
    if (err) {
      throw err
    }
    console.log(`> Ready on ${port}`)
  })
})
