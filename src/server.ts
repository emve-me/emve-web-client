import express from 'express'
import next from 'next'
import { getCookie } from 'vanilla-cookies'

const dev = process.env.NODE_ENV !== 'production'
const port = process.env.PORT

const app = next({ dev })
const handle = app.getRequestHandler()

const protectedRoutes = ['player', 'join', 'history']

app.prepare().then(() => {
  const server = express()

  protectedRoutes.forEach(route => {
    server.get(`/${route}`, (req, res, next) => {
      const googleToken = getCookie('GTOKENID', req.headers.cookie || '')
      if (!googleToken) {
        res.redirect('/')
      } else {
        next()
      }
    })
  })

  server.all('*', (req, resp, next) => {
    if (req.hostname.startsWith('www.')) {
      resp.redirect(301, 'https://' + req.hostname.replace('www.', ''))
    } else {
      next()
    }
  })

  server.get('*', async (req, res) => {
    handle(req, res)
  })

  server.listen(port, () => {
    console.log(`> Ready on ${port}`)
  })
})
