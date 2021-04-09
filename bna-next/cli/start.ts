import next from 'next'
import { createServer } from 'http'
import { srcDir, conf } from '../utils/'
import {
  getAssetPrefixByReq,
  getCdnHost,
} from '../components/dynamicAssetPrefix'

const port = parseInt(process.env.PORT || '3000', 10)

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
      app.setAssetPrefix(getAssetPrefixByReq(req)) // cdnHost + /_next/static/xx

      // @ts-ignore
      res.cdnHost = getCdnHost()
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
