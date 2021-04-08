const next = require('next')
const { createServer } = require('http')
const { srcDir, conf } = require('./utils/')

const port = parseInt(process.env.NEXT_SERVER_PORT || '3000', 10)

type ServerParams = {
  isDev?: boolean
}

export const dev = ({ isDev }: ServerParams = { isDev: true }) => {
  const app = next({
    dir: srcDir,
    conf,
    dev: isDev,
  })
  const handle = app.getRequestHandler()

  app.prepare().then(() => {
    createServer((...args: any) => {
      handle(...args)
    }).listen(port, (err: any) => {
      if (err) {
        console.error(err)
        return
      }

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
