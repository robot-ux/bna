import next from 'next'
import { createServer } from 'http'
import { srcDir, conf } from '../utils/'

const port = parseInt(process.env.NEXT_SERVER_PORT || '3000', 10)

type ServerParams = {
  isDev?: boolean
}

export const dev = ({ isDev }: ServerParams = { isDev: true }) => {
  const app = next({
    dir: srcDir,
    conf: conf as any,
    dev: isDev,
  })
  const handle = app.getRequestHandler()

  app.prepare().then(() => {
    createServer((req, res) => {
      handle(req, res)
    }).listen(port, () => {
      console.log(
        `> Server listening at http://localhost:${port} as ${
          isDev ? 'development' : process.env.NODE_ENV
        }`,
      )
    })
  })
}

export const start = () => {
  return dev({ isDev: false })
}