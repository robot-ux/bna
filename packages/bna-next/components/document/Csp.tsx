import React from 'react'
import crypto from 'crypto'

const isDev = process.env.NODE_ENV !== 'production'

export const createNonce = () => {
  return crypto.randomBytes(16).toString('base64')
}

const toLowerCase = (s: string) => {
  return s.replace(/([A-Z])/g, (_, p1) => `-${p1.toLowerCase()}`)
}

const directives: any = {
  defaultSrc: ["'self'"],
  scriptSrc: [
    "'self'",
    isDev && "'unsafe-eval'",
    (n: string) => `'nonce-${n}'`,
  ],
  styleSrc: ["'self'", isDev && "'unsafe-inline'"],
  fontSrc: ["'self'", 'data:'],
  connectSrc: ["'self'", 'https://report.binance.org'],
}

type Props = {
  nonce: string
  disabled?: boolean
  directives?: {
    [k: string]: any
  }
}

const _combineCspConfig = (custom: any = {}, nonce: string) => {
  const csp = Object.keys(directives)
    .map((key) => {
      const customList = custom[key] || []
      const originList = directives[key] || []
      let _list = originList.concat(...customList)

      _list = _list
        .map((s: string | Function) =>
          typeof s === 'function' ? s(nonce) : `${s}`,
        )
        .filter((f: any) => f)

      return `${toLowerCase(key)} ${_list.join(' ')}`
    })
    .join('; ')

  return csp
}

export const CSPHead = ({
  nonce,
  disabled,
  directives,
}: Props): React.ReactElement => {
  if (disabled) return <></>

  const csp = React.useMemo(() => _combineCspConfig(directives, nonce), [
    directives,
    nonce,
  ])

  return <meta httpEquiv="Content-Security-Policy" content={csp} />
}
