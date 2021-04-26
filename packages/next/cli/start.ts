import next from 'next'
import { createServer } from 'http'
import { loadEnvConfig } from '@next/env'
import { srcDir, getConfig } from '../utils'

const port = parseInt(process.env.PORT || '3000', 10)

type ServerParams = {
  isDev?: boolean
}

export const dev = async ({ isDev }: ServerParams = { isDev: true }) => {
  isDev && (await loadEnvConfig(srcDir))

  const app = next({
    dir: srcDir,
    conf: getConfig() as any,
    dev: isDev,
  })

  const handle = app.getRequestHandler()

  app.prepare().then(() => {
    createServer(handle).listen(port, () => {
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
