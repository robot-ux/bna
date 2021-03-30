const { spawnSync } = require('child_process')
const next = require('next')
const { createServer } = require('http')
const { srcDir, conf } = require('./utils/')

const port = parseInt(process.env.PORT || '3000', 10)
const isDev = process.env.NODE_ENV !== 'production'

const dev = () => {
  const app = next({
    dir: srcDir,
    conf,
    dev: isDev,
  })
  const handle = app.getRequestHandler()

  app.prepare().then(() => {
    createServer((...args) => {
      handle(...args)
    }).listen(port, (err) => {
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

const start = () => {
  const dir = getDir()
  spawnSync(`next`, [`start`, dir], { stdio: 'inherit' })
}

module.exports = {
  dev,
  start,
}
