import next from 'next'
import { createServer, IncomingMessage } from 'http'
import { srcDir, conf } from '../utils/'

const port = parseInt(process.env.PORT || '3000', 10)

type ServerParams = {
  isDev?: boolean
}

const _getAssetPrefixByReq = (req: IncomingMessage) => {
  const countryCode = req.headers['cloudfront-viewer-country']
  return (
    (countryCode === 'CN'
      ? process.env.NEXT_PUBLIC_STATIC_HOST_CN
      : process.env.NEXT_PUBLIC_STATIC_HOST) || ''
  )
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
      const cdnHost = _getAssetPrefixByReq(req)
      app.setAssetPrefix(cdnHost) // cdnHost + /_next/static/xx

      // @ts-ignore
      res.assetPrefix = cdnHost
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
