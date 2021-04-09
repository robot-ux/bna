import { IncomingMessage } from 'http'

let cdnHost = ''

export const getAssetPrefixByReq = (req: IncomingMessage) => {
  const countryCode = req.headers['cloudfront-viewer-country']
  const _cdnHost =
    (countryCode === 'CN'
      ? process.env.NEXT_PUBLIC_STATIC_HOST_CN
      : process.env.NEXT_PUBLIC_STATIC_HOST) || ''

  setCdnHost(_cdnHost)
  return _cdnHost
}

export const setCdnHost = (s: string) => {
  cdnHost = s
}

export const getCdnHost = () => {
  return cdnHost
}
