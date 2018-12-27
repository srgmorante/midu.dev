const {createServer} = require('http')
const {parse} = require('url')
const next = require('next')

const dev = process.env.NODE_ENV !== 'production'
const app = next({dev})
const handle = app.getRequestHandler()

const Posts = require('./Posts')

const handlers = {
  '/__get_posts': async ({res, query}) => {
    const {ids} = query
    res.writeHead(200, {'Content-Type': 'application/json'})
    const posts = await Posts.getPosts({ids})
    return res.end(JSON.stringify(posts))
  },
  '/__get_post': ({res}) => {
    res.writeHead(200, {'Content-Type': 'application/json'})
    return res.end(this.entriesAsJSON())
  }
}

app.prepare().then(() => {
  createServer((req, res) => {
    const parsedUrl = parse(req.url, true) // true determines if we need to parse the query object
    const {pathname, query} = parsedUrl
    const defaultHandler = _ => handle(req, res, parsedUrl)
    const parametersToHandlers = {req, res, parsedUrl, query}

    console.log(pathname)

    const handler = handlers[pathname] || defaultHandler
    handler(parametersToHandlers)
  }).listen(3001, err => {
    if (err) throw err
    console.log('> Ready on http://localhost:3001')
  })
})
