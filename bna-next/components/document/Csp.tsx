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
  defaultSrc: ['self'],
  scriptSrc: ['self', isDev && 'unsafe-eval', (n: string) => `'nonce-${n}'`],
  styleSrc: ['self', isDev && 'unsafe-inline'],
  fontSrc: ['self', () => 'data:'],
  connectSrc: ['self', () => 'https://*.ingest.sentry.io'],
}

type Props = {
  nonce: string
  disabled?: boolean
}

export const CSPHead = ({ nonce, disabled }: Props): React.ReactElement => {
  if (disabled) return <></>

  const csp = Object.keys(directives)
    .map((key) => {
      const list = directives[key]
        .map((s: string | Function) =>
          typeof s === 'function' ? s(nonce) : `'${s}'`,
        )
        .filter((f: any) => f)

      return `${toLowerCase(key)} ${list.join(' ')}`
    })
    .join('; ')

  return <meta httpEquiv="Content-Security-Policy" content={csp} />
}
