import getConfig from 'next/config'

const {
  publicRuntimeConfig: { NEXT_PUBLIC_GA_ID, NEXT_PUBLIC_STATIC_HOST },
} = getConfig()

const NODE_ENV = process.env.NODE_ENV

export const isProduction = NODE_ENV === 'production'
export const assetPrefix = NEXT_PUBLIC_STATIC_HOST
  ? `${NEXT_PUBLIC_STATIC_HOST}/static`
  : ''
export const assetPrefixWithDefault =
  assetPrefix || 'https://dex-bin.bnbstatic.com/static'
export const GOOGLE_ANALYTICS_ID = NEXT_PUBLIC_GA_ID
export const freshDeskId = '67000003151'
