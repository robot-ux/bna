import { IncomingMessage } from 'http'
import React from 'react'

export const getAssetPrefixByReq = (req: IncomingMessage) => {
  const countryCode = req.headers['cloudfront-viewer-country']
  const _cdnHost =
    (countryCode === 'CN'
      ? process.env.NEXT_PUBLIC_STATIC_HOST_CN
      : process.env.NEXT_PUBLIC_STATIC_HOST) || ''

  return _cdnHost
}

const AssetPreifxContext = React.createContext('')

export const AssetPrefixProvider = ({
  children,
  value,
}: {
  children: any
  value: string
}) => {
  const Provider = AssetPreifxContext.Provider
  return <Provider value={value}>{children}</Provider>
}

export const useAssetPrefix = () => {
  return React.useContext(AssetPreifxContext)
}
